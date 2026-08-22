<script lang="ts">
	import { ArrowRight, Clock } from 'lucide-svelte';
	import GenerativeGrid from '$lib/components/GenerativeGrid.svelte';
	import { posts } from '$lib/data/posts';
	import { t, locale } from '$lib/i18n';

	let entries = $derived(
		posts.map((post) => ({
			meta: post.meta,
			content: post[$locale],
			// La date est écrite en ISO dans les données : la locale du visiteur
			// décide seule de la façon dont elle se lit.
			formatted: new Date(post.meta.date).toLocaleDateString(
				$locale === 'fr' ? 'fr-FR' : 'en-GB',
				{ year: 'numeric', month: 'long', day: 'numeric' }
			)
		}))
	);

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

<section class="relative min-h-screen pt-24 pb-20 sm:pt-32">
	<div class="pointer-events-none absolute inset-x-0 top-0 h-[60vh] overflow-hidden">
		<GenerativeGrid mode="hero" seed="blog" step={30} />
		<div class="absolute inset-0 bg-linear-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950"></div>
	</div>

	<div class="relative mx-auto max-w-4xl px-6">
		<h1 class="section-label">{$t.blog.label}</h1>
		<p class="mt-4 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">{$t.blog.title}</p>
		<p class="mt-4 max-w-2xl text-lg text-zinc-400">{$t.blog.subtitle}</p>

		<div class="mt-12 grid gap-4">
			{#each entries as entry (entry.meta.slug)}
				<a href="/blog/{entry.meta.slug}" class="surface surface-hover group block p-6 sm:p-8">
					<div class="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-zinc-500">
						<time datetime={entry.meta.date}>{entry.formatted}</time>
						<span class="flex items-center gap-1.5">
							<Clock size={12} />
							{entry.meta.readingMinutes} {$t.blog.minutes}
						</span>
					</div>
					<h2
						class="mt-3 text-2xl font-bold tracking-tight text-zinc-100 transition-colors group-hover:text-accent-300"
					>
						{entry.content.title}
					</h2>
					<p class="mt-3 leading-relaxed text-zinc-400">{entry.content.excerpt}</p>
					<div class="mt-5 flex flex-wrap items-center gap-2">
						{#each entry.meta.tags as tag (tag)}
							<span
								class="border border-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
								style="border-radius: var(--radius-card)"
							>
								{tag}
							</span>
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
	</div>
</section>
