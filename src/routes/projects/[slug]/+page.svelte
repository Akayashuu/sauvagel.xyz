<script lang="ts">
	import { ArrowLeft, ExternalLink, Lock } from 'lucide-svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import GenerativeGrid from '$lib/components/GenerativeGrid.svelte';
	import TechLogo from '$lib/components/TechLogo.svelte';
	import { t } from '$lib/i18n';

	let { data } = $props();

	let project = $derived($t.projects.items[data.index]);
	let meta = $derived(data.meta);
	let displayUrl = $derived(
		(meta.externalUrl ?? '').replace(/^https?:\/\//, '').replace(/\/+$/, '')
	);

	$effect(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>{project.name} | Léo Sauvage</title>
	<meta name="description" content="{project.tagline} — {project.description.slice(0, 140)}" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://sauvagel.xyz/projects/{meta.slug}" />
	<meta property="og:title" content="{project.name} | Léo Sauvage" />
	<meta
		property="og:description"
		content="{project.tagline} — {project.description.slice(0, 140)}"
	/>
	<meta property="og:site_name" content="Léo Sauvage" />
	<meta property="og:image" content="https://sauvagel.xyz/og/{meta.slug}.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{project.name} | Léo Sauvage" />
	<meta name="twitter:description" content={project.tagline} />
	<meta name="twitter:image" content="https://sauvagel.xyz/og/{meta.slug}.png" />
	<link rel="canonical" href="https://sauvagel.xyz/projects/{meta.slug}" />
</svelte:head>

<section class="relative min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-20">
	<!-- La grille du projet, calculée sur son slug : la même image que sa vignette
	     sur la page d'accueil, en plein écran. -->
	<div class="pointer-events-none absolute inset-x-0 top-0 h-[70vh] overflow-hidden">
		<GenerativeGrid mode="hero" seed={meta.slug} step={30} />
		<div class="absolute inset-0 bg-linear-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950"></div>
	</div>

	<div class="relative mx-auto max-w-4xl px-6">
		<a
			href="/#projects"
			class="group mb-10 inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-accent-400"
		>
			<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
			{$t.projectPage.back}
		</a>

		<header class="mb-10 flex flex-wrap items-end justify-between gap-6">
			<div>
				<h1 class="text-3xl font-bold tracking-tight text-zinc-50 sm:text-5xl">{project.name}</h1>
				<p class="mt-2 text-base font-medium text-primary-300 sm:text-lg">{project.tagline}</p>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each meta.logos as logo (logo)}
					<span
						class="flex h-10 w-10 items-center justify-center border border-zinc-800 bg-zinc-900/60"
						style="border-radius: var(--radius-card)"
						title={logo}
					>
						<TechLogo name={logo} size={20} />
					</span>
				{/each}
			</div>
		</header>

		{#if meta.image}
			{@const Wrapper = meta.externalUrl ? 'a' : 'div'}
			<svelte:element
				this={Wrapper}
				href={meta.externalUrl}
				target={meta.externalUrl ? '_blank' : undefined}
				rel={meta.externalUrl ? 'noopener noreferrer' : undefined}
				class="group/preview mb-10 block sm:mb-14"
			>
				<div
					class="surface overflow-hidden transition-transform duration-500 group-hover/preview:-translate-y-1"
				>
					<!-- La barre d'adresse n'a de sens que pour un projet qui a un site en
					     ligne ; un outil de bureau garde juste le cadre et sa capture. -->
					{#if meta.externalUrl}
						<div class="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
							<div class="flex gap-1.5" aria-hidden="true">
								<span class="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
								<span class="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
								<span class="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
							</div>
							<div class="flex min-w-0 flex-1 justify-center">
								<span
									class="flex max-w-full items-center gap-1.5 truncate bg-zinc-800/70 px-3 py-1 font-mono text-xs text-zinc-400"
									style="border-radius: var(--radius-card)"
								>
									<Lock size={11} class="shrink-0" />
									{displayUrl}
								</span>
							</div>
							<span class="flex shrink-0 items-center gap-1.5 font-mono text-xs text-accent-400">
								<span class="h-1.5 w-1.5 rounded-full bg-accent-400"></span>
								<span class="hidden sm:inline">{$t.projectPage.livePreview}</span>
							</span>
						</div>
					{/if}
					<div class="relative aspect-video w-full overflow-hidden bg-zinc-950">
						<img
							src={meta.image}
							alt="Aperçu de {project.name}"
							loading="lazy"
							decoding="async"
							class="h-full w-full object-cover object-top"
						/>
						{#if meta.externalUrl}
							<span
								class="absolute right-3 bottom-3 flex items-center gap-2 bg-zinc-950/85 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100"
								style="border-radius: var(--radius-card)"
							>
								{$t.projectPage.openSite}
								<ExternalLink size={14} />
							</span>
						{/if}
					</div>
				</div>
			</svelte:element>
		{/if}

		<div class="grid gap-4 md:grid-cols-3">
			<div class="md:col-span-2">
				<div class="surface h-full p-6 sm:p-8">
					<h2 class="section-label">{$t.projectPage.about}</h2>
					<p class="mt-4 leading-relaxed text-zinc-400">{project.description}</p>

					{#if project.details?.features}
						<h3 class="mt-8 text-lg font-semibold text-zinc-200">{$t.projectPage.features}</h3>
						<ul class="mt-4 space-y-3">
							{#each project.details.features as feature, fi (fi)}
								<li class="flex items-start gap-3 text-sm text-zinc-400">
									<span class="mt-2 h-1 w-1 shrink-0 bg-primary-500/60" aria-hidden="true"></span>
									{feature}
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>

			<div class="grid gap-4 self-start">
				<div class="surface p-6">
					<h3 class="section-label">{$t.projectPage.techStack}</h3>
					<ul class="mt-4 grid gap-2.5">
						{#each meta.tech as tech (tech)}
							<li class="flex items-center gap-2.5 text-sm text-zinc-300">
								<TechLogo name={tech} size={16} />
								{tech}
							</li>
						{/each}
					</ul>
				</div>

				{#if meta.ecosystem}
					<div class="surface p-6">
						<h3 class="section-label">{$t.projectPage.ecosystem}</h3>
						<p class="mt-2 text-xs leading-relaxed text-zinc-500">{$t.projectPage.ecosystemNote}</p>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each meta.ecosystem as pkg (pkg.url)}
								<a
									href={pkg.url}
									target="_blank"
									rel="noopener noreferrer"
									class="group/pkg flex items-center gap-1.5 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-accent-500/50 hover:text-accent-300"
									style="border-radius: var(--radius-card)"
								>
									<GithubIcon size={13} />
									<span class="font-mono">{pkg.name}</span>
									<span class="text-[10px] text-zinc-500">{pkg.tag}</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}

				<div class="surface p-6">
					<h3 class="section-label">{$t.projectPage.links}</h3>
					<div class="mt-4 grid gap-2.5">
						<a
							href={meta.link}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 border border-zinc-800 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-accent-500/50 hover:text-accent-300"
							style="border-radius: var(--radius-card)"
						>
							<GithubIcon size={18} />
							{$t.projectPage.github}
							<ExternalLink size={14} class="ml-auto text-zinc-600" />
						</a>
						{#if meta.externalUrl}
							<a
								href={meta.externalUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-3 border border-zinc-800 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-accent-500/50 hover:text-accent-300"
								style="border-radius: var(--radius-card)"
							>
								<ExternalLink size={18} />
								{$t.projectPage.website}
								<ExternalLink size={14} class="ml-auto text-zinc-600" />
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
