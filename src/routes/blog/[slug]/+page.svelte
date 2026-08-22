<script lang="ts">
	import { ArrowLeft, Clock } from 'lucide-svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import GenerativeGrid from '$lib/components/GenerativeGrid.svelte';
	import PostBody from '$lib/components/PostBody.svelte';
	import { posts, headingId } from '$lib/data/posts';
	import { projectMeta } from '$lib/data/profile';
	import { t, locale } from '$lib/i18n';

	let { data } = $props();

	let post = $derived(posts[data.index]);
	let content = $derived(post[$locale]);
	let meta = $derived(post.meta);
	let formatted = $derived(
		new Date(meta.date).toLocaleDateString($locale === 'fr' ? 'fr-FR' : 'en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
	let project = $derived(
		meta.project ? projectMeta.find((p) => p.slug === meta.project) : undefined
	);
	let projectName = $derived(
		project ? $t.projects.items[projectMeta.indexOf(project)].name : undefined
	);

	let authors = $derived(content.body.find((b) => b.t === 'people')?.items ?? []);

	let headings = $derived(
		content.body
			.filter((b) => b.t === 'h')
			.map((b) => ({ id: headingId(b.text), text: b.text, icon: b.icon }))
	);
	let activeId = $state('');

	let wordCount = $derived(
		content.body.reduce((n, b) => {
			const texts: string[] = [];
			if (b.t === 'p' || b.t === 'note') texts.push(b.text);
			if (b.t === 'h') texts.push(b.text);
			if (b.t === 'list') texts.push(...b.items);
			if (b.t === 'tldr') texts.push(...b.items.map((i) => `${i.title} ${i.text}`));
			return n + texts.join(' ').split(/\s+/).filter(Boolean).length;
		}, 0)
	);
	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: content.title,
			description: content.excerpt,
			image: `https://sauvagel.xyz/og/blog-${meta.slug}.png`,
			datePublished: meta.date,
			dateModified: meta.date,
			inLanguage: $locale === 'fr' ? 'fr-FR' : 'en-GB',
			wordCount,
			keywords: meta.tags.join(', '),
			author: {
				'@type': 'Person',
				name: 'Léo Sauvage',
				url: 'https://sauvagel.xyz',
				sameAs: ['https://github.com/Akayashuu']
			},
			publisher: { '@type': 'Person', name: 'Léo Sauvage', url: 'https://sauvagel.xyz' },
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `https://sauvagel.xyz/blog/${meta.slug}`
			},
			isPartOf: { '@type': 'Blog', name: 'Notes de terrain', url: 'https://sauvagel.xyz/blog' }
		})
	);
	let breadcrumbLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://sauvagel.xyz/blog' },
				{
					'@type': 'ListItem',
					position: 2,
					name: content.title,
					item: `https://sauvagel.xyz/blog/${meta.slug}`
				}
			]
		})
	);

	$effect(() => {
		if (!window.location.hash) window.scrollTo(0, 0);
	});

	$effect(() => {
		const ids = headings.map((h) => h.id);
		const seen = new Map<string, boolean>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) seen.set(entry.target.id, entry.isIntersecting);
				const current = ids.find((id) => seen.get(id));
				if (current) activeId = current;
			},
			{ rootMargin: '-96px 0px -70% 0px' }
		);
		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{content.title} | Léo Sauvage</title>
	<meta name="description" content={content.excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://sauvagel.xyz/blog/{meta.slug}" />
	<meta property="og:title" content="{content.title} | Léo Sauvage" />
	<meta property="og:description" content={content.excerpt} />
	<meta property="article:published_time" content={meta.date} />
	<meta property="article:modified_time" content={meta.date} />
	<meta property="article:author" content="Léo Sauvage" />
	{#each meta.tags as tag (tag)}
		<meta property="article:tag" content={tag} />
	{/each}
	<meta property="og:site_name" content="Léo Sauvage" />
	<meta property="og:locale" content={$locale === 'fr' ? 'fr_FR' : 'en_GB'} />
	<meta name="author" content="Léo Sauvage" />
	<meta name="keywords" content={meta.tags.join(', ')} />
	<meta property="og:image" content="https://sauvagel.xyz/og/blog-{meta.slug}.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{content.title} | Léo Sauvage" />
	<meta name="twitter:description" content={content.excerpt} />
	<meta name="twitter:image" content="https://sauvagel.xyz/og/blog-{meta.slug}.png" />
	<link rel="canonical" href="https://sauvagel.xyz/blog/{meta.slug}" />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Léo Sauvage"
		href="https://sauvagel.xyz/rss.xml"
	/>
	{@html `<script type="application/ld+json">${jsonLd}${'<'}/script>`}
	{@html `<script type="application/ld+json">${breadcrumbLd}${'<'}/script>`}
</svelte:head>

<section class="relative pt-24 pb-20 sm:pt-32">
	<div class="pointer-events-none absolute inset-x-0 top-0 h-[55vh] overflow-hidden">
		<GenerativeGrid mode="hero" seed={meta.slug} step={30} />
		<div class="absolute inset-0 bg-linear-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950"></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-10">
		<a
			href="/blog"
			class="group mb-10 inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-accent-400"
		>
			<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
			{$t.blog.back}
		</a>

		<header>
			<h1 class="max-w-4xl text-3xl leading-tight font-bold tracking-tight text-zinc-50 sm:text-5xl">
				{content.title}
			</h1>
			<div
				class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-zinc-800/80 py-4 font-mono text-xs text-zinc-500"
			>
				{#if authors.length}
					<span class="flex items-center gap-2.5">
						<span class="flex -space-x-2">
							{#each authors as person (person.handle)}
								<img
									src={person.avatar}
									alt=""
									width="26"
									height="26"
									loading="lazy"
									decoding="async"
									class="h-[26px] w-[26px] rounded-full border border-zinc-700 bg-zinc-900 object-cover"
								/>
							{/each}
						</span>
						<span class="flex flex-wrap items-center gap-x-1.5">
							{#each authors as person, ai (person.handle)}
								<a
									href={person.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-zinc-300 transition-colors hover:text-accent-300"
								>
									{person.name}
								</a>
								{#if ai < authors.length - 1}
									<span class="text-zinc-600">+</span>
								{/if}
							{/each}
						</span>
					</span>
				{/if}
				<time datetime={meta.date} class="text-zinc-300">{formatted}</time>
				<span class="flex items-center gap-1.5">
					<Clock size={12} />
					{meta.readingMinutes} {$t.blog.minutes}
				</span>
				{#if projectName}
					<a
						href="/projects/{meta.project}"
						class="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-accent-300"
					>
						<GithubIcon size={12} />
						{projectName}
					</a>
				{/if}
			</div>
			<p class="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">{content.excerpt}</p>
		</header>

		<div class="mt-12 gap-16 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
			<article class="min-w-0">
				<PostBody body={content.body} />
			</article>

			<aside class="hidden lg:block lg:sticky lg:top-24">
				<h2 class="section-label">{$t.blog.contents}</h2>
				<nav class="mt-4 flex flex-col gap-1 border-l border-zinc-800">
					{#each headings as heading (heading.id)}
						<a
							href="#{heading.id}"
							class="-ml-px border-l py-1.5 pl-4 text-sm leading-snug transition-colors {activeId ===
							heading.id
								? 'border-accent-400 text-accent-300'
								: 'border-transparent text-zinc-500 hover:text-zinc-300'}"
						>
							{heading.text}
						</a>
					{/each}
				</nav>
			</aside>
		</div>

		<nav class="mt-16 border-t border-zinc-800 pt-8">
			<a
				href="/blog"
				class="group inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-accent-400"
			>
				<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
				{$t.blog.back}
			</a>
		</nav>
	</div>
</section>
