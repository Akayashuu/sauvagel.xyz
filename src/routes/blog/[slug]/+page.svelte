<script lang="ts">
	import { ArrowLeft, Clock } from 'lucide-svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import GenerativeGrid from '$lib/components/GenerativeGrid.svelte';
	import PostBody from '$lib/components/PostBody.svelte';
	import { posts } from '$lib/data/posts';
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

	$effect(() => {
		window.scrollTo(0, 0);
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
	<meta property="og:image" content="https://sauvagel.xyz/og/blog-{meta.slug}.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{content.title} | Léo Sauvage" />
	<meta name="twitter:description" content={content.excerpt} />
	<meta name="twitter:image" content="https://sauvagel.xyz/og/blog-{meta.slug}.png" />
	<link rel="canonical" href="https://sauvagel.xyz/blog/{meta.slug}" />
</svelte:head>

<section class="relative pt-24 pb-20 sm:pt-32">
	<div class="pointer-events-none absolute inset-x-0 top-0 h-[55vh] overflow-hidden">
		<GenerativeGrid mode="hero" seed={meta.slug} step={30} />
		<div class="absolute inset-0 bg-linear-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950"></div>
	</div>

	<div class="relative mx-auto max-w-3xl px-6">
		<a
			href="/blog"
			class="group mb-10 inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-accent-400"
		>
			<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
			{$t.blog.back}
		</a>

		<header>
			<h1 class="text-3xl leading-tight font-bold tracking-tight text-zinc-50 sm:text-5xl">
				{content.title}
			</h1>
			<div
				class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-zinc-800/80 py-4 font-mono text-xs text-zinc-500"
			>
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
			<p class="mt-6 text-lg leading-relaxed text-zinc-300">{content.excerpt}</p>
		</header>

		<article class="mt-12">
			<PostBody body={content.body} />
		</article>

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
