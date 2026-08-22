<script lang="ts">
	import { ArrowRight, Clock, Hash, Rss, Search, X } from 'lucide-svelte';
	import GenerativeGrid from '$lib/components/GenerativeGrid.svelte';
	import TechLogo from '$lib/components/TechLogo.svelte';
	import { posts } from '$lib/data/posts';
	import { projectMeta } from '$lib/data/profile';
	import { techIcons } from '$lib/data/tech';
	import { t, locale } from '$lib/i18n';

	// Six par page : deux colonnes pleines sur un écran large, et assez peu pour
	// que la pagination reste un confort plutôt qu'un parcours obligé.
	const PER_PAGE = 6;
	// Filtrer une liste d'un seul élément n'apprend rien au visiteur : la barre
	// n'apparaît qu'à partir du moment où elle sert vraiment à trier.
	const CONTROLS_FROM = 2;

	let query = $state('');
	let filter = $state<{ kind: 'all' | 'project' | 'tag'; value: string }>({
		kind: 'all',
		value: ''
	});
	let page = $state(1);
	// Huit sujets tiennent sur deux lignes ; au delà la barre devient un mur, donc
	// le reste attend un clic.
	const TAGS_SHOWN = 8;
	let allTags = $state(false);

	let entries = $derived(
		posts.map((post) => {
			const projectIndex = post.meta.project
				? projectMeta.findIndex((p) => p.slug === post.meta.project)
				: -1;
			return {
				meta: post.meta,
				content: post[$locale],
				projectName: projectIndex >= 0 ? $t.projects.items[projectIndex].name : undefined,
				// La date est écrite en ISO dans les données : la locale du visiteur
				// décide seule de la façon dont elle se lit.
				formatted: new Date(post.meta.date).toLocaleDateString(
					$locale === 'fr' ? 'fr-FR' : 'en-GB',
					{ year: 'numeric', month: 'long', day: 'numeric' }
				)
			};
		})
	);

	// Les projets et les technos ne se filtrent pas de la même façon : un projet
	// est un fil continu, une techno est un sujet. Les deux familles restent donc
	// séparées dans la barre plutôt que mélangées en un seul nuage de mots.
	let projectFacets = $derived(
		[...new Set(posts.map((p) => p.meta.project).filter((s): s is string => !!s))].map((slug) => ({
			slug,
			name: entries.find((e) => e.meta.project === slug)?.projectName ?? slug,
			count: posts.filter((p) => p.meta.project === slug).length
		}))
	);

	let tagFacets = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const post of posts) {
			for (const tag of post.meta.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
		return [...counts]
			.map(([tag, count]) => ({ tag, count }))
			.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
	});

	let filtered = $derived.by(() => {
		const needle = query.trim().toLowerCase();
		return entries.filter((entry) => {
			if (filter.kind === 'project' && entry.meta.project !== filter.value) return false;
			if (filter.kind === 'tag' && !entry.meta.tags.includes(filter.value)) return false;
			if (!needle) return true;
			const haystack = [
				entry.content.title,
				entry.content.excerpt,
				entry.projectName ?? '',
				...entry.meta.tags
			]
				.join(' ')
				.toLowerCase();
			return haystack.includes(needle);
		});
	});

	let isBrowsing = $derived(filter.kind === 'all' && query.trim() === '');
	// L'article le plus récent est mis en avant tant que le visiteur n'a pas pris
	// la main : dès qu'il filtre ou cherche, tout revient au même format.
	let featured = $derived(isBrowsing && page === 1 ? filtered[0] : undefined);
	let listed = $derived(featured ? filtered.slice(1) : filtered);
	let pageCount = $derived(Math.max(1, Math.ceil(listed.length / PER_PAGE)));
	let paged = $derived(listed.slice((page - 1) * PER_PAGE, page * PER_PAGE));

	function select(kind: 'all' | 'project' | 'tag', value = '') {
		filter = { kind, value };
		page = 1;
	}

	function reset() {
		query = '';
		select('all');
	}

	function goto(next: number) {
		page = Math.min(Math.max(1, next), pageCount);
		document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Le listing est décrit en Blog + ItemList : les moteurs voient la liste des
	// articles sans avoir à visiter chaque page.
	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Blog',
			name: $t.blog.title,
			description: $t.blog.subtitle,
			url: 'https://sauvagel.xyz/blog',
			inLanguage: $locale === 'fr' ? 'fr-FR' : 'en-GB',
			author: { '@type': 'Person', name: 'Léo Sauvage', url: 'https://sauvagel.xyz' },
			blogPost: entries.map((entry) => ({
				'@type': 'BlogPosting',
				headline: entry.content.title,
				description: entry.content.excerpt,
				datePublished: entry.meta.date,
				keywords: entry.meta.tags.join(', '),
				url: `https://sauvagel.xyz/blog/${entry.meta.slug}`
			}))
		})
	);
</script>

<svelte:head>
	<title>{$t.blog.title} | Léo Sauvage</title>
	<meta name="description" content={$t.blog.subtitle} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://sauvagel.xyz/blog" />
	<meta property="og:title" content="{$t.blog.title} | Léo Sauvage" />
	<meta property="og:description" content={$t.blog.subtitle} />
	<meta property="og:image" content="https://sauvagel.xyz/og/blog.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://sauvagel.xyz/og/blog.png" />
	<link rel="canonical" href="https://sauvagel.xyz/blog" />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Léo Sauvage"
		href="https://sauvagel.xyz/rss.xml"
	/>
	{@html `<script type="application/ld+json">${jsonLd}${'<'}/script>`}
</svelte:head>

{#snippet tagChip(tag: string)}
	<span
		class="flex items-center gap-1.5 border border-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
		style="border-radius: var(--radius-card)"
	>
		{#if techIcons[tag]}
			<TechLogo name={tag} size={14} eager />
		{:else}
			<Hash size={12} class="text-zinc-600" />
		{/if}
		{tag}
	</span>
{/snippet}

<section class="relative min-h-screen pt-24 pb-20 sm:pt-32">
	<div class="pointer-events-none absolute inset-x-0 top-0 h-[60vh] overflow-hidden">
		<GenerativeGrid mode="hero" seed="blog" step={30} />
		<div class="absolute inset-0 bg-linear-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950"></div>
	</div>

	<div class="relative mx-auto max-w-6xl px-6 lg:px-10">
		<h1 class="section-label">{$t.blog.label}</h1>
		<div class="mt-4 flex flex-wrap items-end justify-between gap-6">
			<div>
				<p class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">{$t.blog.title}</p>
				<p class="mt-4 max-w-2xl text-lg text-zinc-400">{$t.blog.subtitle}</p>
			</div>
			<a
				href="/rss.xml"
				class="surface surface-hover flex shrink-0 items-center gap-2 px-3.5 py-2 font-mono text-xs text-zinc-400"
			>
				<Rss size={13} />
				RSS
			</a>
		</div>

		{#if posts.length >= CONTROLS_FROM}
			<div class="mt-10 flex flex-col gap-4">
				<label class="surface flex items-center gap-3 px-4 py-2.5">
					<Search size={15} class="shrink-0 text-zinc-600" />
					<span class="sr-only">{$t.blog.search}</span>
					<input
						type="search"
						bind:value={query}
						oninput={() => (page = 1)}
						placeholder={$t.blog.searchPlaceholder}
						class="w-full bg-transparent font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
					/>
					{#if query}
						<button
							type="button"
							onclick={() => ((query = ''), (page = 1))}
							class="shrink-0 text-zinc-600 transition-colors hover:text-zinc-300"
							aria-label={$t.blog.reset}
						>
							<X size={14} />
						</button>
					{/if}
				</label>

				<div class="flex flex-wrap items-center gap-2">
					<button
						type="button"
						onclick={() => select('all')}
						aria-pressed={filter.kind === 'all'}
						class="border px-3 py-1.5 font-mono text-xs transition-colors {filter.kind === 'all'
							? 'border-accent-500/50 bg-accent-500/10 text-accent-300'
							: 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
						style="border-radius: var(--radius-card)"
					>
						{$t.blog.all}
						<span class="ml-1.5 text-zinc-600 tabular-nums">{posts.length}</span>
					</button>

					{#each projectFacets as facet (facet.slug)}
						<button
							type="button"
							onclick={() => select('project', facet.slug)}
							aria-pressed={filter.kind === 'project' && filter.value === facet.slug}
							class="border px-3 py-1.5 font-mono text-xs transition-colors {filter.kind ===
								'project' && filter.value === facet.slug
								? 'border-accent-500/50 bg-accent-500/10 text-accent-300'
								: 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
							style="border-radius: var(--radius-card)"
						>
							{facet.name}
							<span class="ml-1.5 text-zinc-600 tabular-nums">{facet.count}</span>
						</button>
					{/each}

					<span class="mx-1 hidden h-4 w-px bg-zinc-800 sm:block"></span>

					{#each allTags ? tagFacets : tagFacets.slice(0, TAGS_SHOWN) as facet (facet.tag)}
						<button
							type="button"
							onclick={() => select('tag', facet.tag)}
							aria-pressed={filter.kind === 'tag' && filter.value === facet.tag}
							class="flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs transition-colors {filter.kind ===
								'tag' && filter.value === facet.tag
								? 'border-accent-500/50 bg-accent-500/10 text-accent-300'
								: 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
							style="border-radius: var(--radius-card)"
						>
							{#if techIcons[facet.tag]}
								<TechLogo name={facet.tag} size={16} eager />
							{:else}
								<Hash size={12} class="text-zinc-600" />
							{/if}
							{facet.tag}
							<span class="text-zinc-600 tabular-nums">{facet.count}</span>
						</button>
					{/each}

					{#if tagFacets.length > TAGS_SHOWN}
						<button
							type="button"
							onclick={() => (allTags = !allTags)}
							class="px-2 py-1.5 font-mono text-xs text-zinc-500 transition-colors hover:text-accent-400"
						>
							{allTags ? $t.blog.less : `+${tagFacets.length - TAGS_SHOWN}`}
						</button>
					{/if}
				</div>
			</div>
		{/if}

		<div
			id="articles"
			class="mt-10 flex items-center justify-between border-b border-zinc-900 pb-3 font-mono text-xs text-zinc-500"
		>
			<span class="tabular-nums">
				{filtered.length}
				{filtered.length === 1 ? $t.blog.one : $t.blog.many}
			</span>
			{#if !isBrowsing}
				<button
					type="button"
					onclick={reset}
					class="transition-colors hover:text-accent-400">{$t.blog.reset}</button
				>
			{/if}
		</div>

		{#if filtered.length === 0}
			<p class="surface mt-8 px-6 py-12 text-center text-zinc-500">{$t.blog.empty}</p>
		{/if}

		{#if featured}
			<a
				href="/blog/{featured.meta.slug}"
				class="surface surface-hover group mt-8 block overflow-hidden p-6 sm:p-10"
			>
				<div class="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
					<span class="text-accent-400">{$t.blog.featured}</span>
					<time datetime={featured.meta.date} class="text-zinc-500">{featured.formatted}</time>
					<span class="flex items-center gap-1.5 text-zinc-500">
						<Clock size={12} />
						{featured.meta.readingMinutes}
						{$t.blog.minutes}
					</span>
					{#if featured.projectName}
						<span class="text-zinc-500">{featured.projectName}</span>
					{/if}
				</div>
				<h2
					class="mt-4 text-3xl font-bold tracking-tight text-zinc-100 transition-colors group-hover:text-accent-300 sm:text-4xl"
				>
					{featured.content.title}
				</h2>
				<p class="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-400">
					{featured.content.excerpt}
				</p>
				<div class="mt-6 flex flex-wrap items-center gap-2">
					{#each featured.meta.tags as tag (tag)}
						{@render tagChip(tag)}
					{/each}
					<span
						class="ml-auto flex items-center gap-1.5 text-sm text-accent-400 transition-transform group-hover:translate-x-1"
					>
						{$t.blog.read}
						<ArrowRight size={14} />
					</span>
				</div>
			</a>
		{/if}

		{#if paged.length}
			<div class="mt-4 grid gap-4 lg:grid-cols-2">
				{#each paged as entry (entry.meta.slug)}
					<a
						href="/blog/{entry.meta.slug}"
						class="surface surface-hover group flex flex-col p-6 sm:p-7"
					>
						<div class="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-zinc-500">
							<time datetime={entry.meta.date}>{entry.formatted}</time>
							<span class="flex items-center gap-1.5">
								<Clock size={12} />
								{entry.meta.readingMinutes}
								{$t.blog.minutes}
							</span>
							{#if entry.projectName}
								<span>{entry.projectName}</span>
							{/if}
						</div>
						<h2
							class="mt-3 text-2xl font-bold tracking-tight text-zinc-100 transition-colors group-hover:text-accent-300"
						>
							{entry.content.title}
						</h2>
						<p class="mt-3 leading-relaxed text-zinc-400">{entry.content.excerpt}</p>
						<div class="mt-5 flex flex-wrap items-center gap-2 pt-1">
							{#each entry.meta.tags as tag (tag)}
								{@render tagChip(tag)}
							{/each}
							<span
								class="ml-auto flex items-center gap-1.5 text-sm text-accent-400 opacity-0 transition-opacity group-hover:opacity-100"
							>
								{$t.blog.read}
								<ArrowRight size={14} />
							</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}

		{#if pageCount > 1}
			<nav class="mt-10 flex items-center justify-center gap-2 font-mono text-xs">
				<button
					type="button"
					onclick={() => goto(page - 1)}
					disabled={page === 1}
					class="surface surface-hover px-3 py-2 text-zinc-400 disabled:pointer-events-none disabled:opacity-30"
				>
					{$t.blog.prev}
				</button>
				{#each Array.from({ length: pageCount }, (_, i) => i + 1) as n (n)}
					<button
						type="button"
						onclick={() => goto(n)}
						aria-current={n === page ? 'page' : undefined}
						class="border px-3 py-2 tabular-nums transition-colors {n === page
							? 'border-accent-500/50 bg-accent-500/10 text-accent-300'
							: 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
						style="border-radius: var(--radius-card)"
					>
						{n}
					</button>
				{/each}
				<button
					type="button"
					onclick={() => goto(page + 1)}
					disabled={page === pageCount}
					class="surface surface-hover px-3 py-2 text-zinc-400 disabled:pointer-events-none disabled:opacity-30"
				>
					{$t.blog.next}
				</button>
			</nav>
		{/if}
	</div>
</section>
