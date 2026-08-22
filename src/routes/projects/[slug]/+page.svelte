<script lang="ts">
	import { ArrowLeft, ArrowRight, ExternalLink, Lock } from 'lucide-svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import GenerativeGrid from '$lib/components/GenerativeGrid.svelte';
	import TechLogo from '$lib/components/TechLogo.svelte';
	import ArchitectureDiagram from '$lib/components/ArchitectureDiagram.svelte';
	import { projectMeta } from '$lib/data/profile';
	import { t } from '$lib/i18n';

	let { data } = $props();

	let project = $derived($t.projects.items[data.index]);
	let meta = $derived(data.meta);
	let displayUrl = $derived(
		(meta.externalUrl ?? '').replace(/^https?:\/\//, '').replace(/\/+$/, '')
	);

	// Les voisins bouclent : une fiche ne doit jamais être un cul-de-sac.
	let prev = $derived({
		meta: projectMeta[(data.index - 1 + projectMeta.length) % projectMeta.length],
		name: $t.projects.items[(data.index - 1 + projectMeta.length) % projectMeta.length].name
	});
	let next = $derived({
		meta: projectMeta[(data.index + 1) % projectMeta.length],
		name: $t.projects.items[(data.index + 1) % projectMeta.length].name
	});

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

<section class="relative pt-24 pb-16 sm:pt-32 sm:pb-20">
	<!-- La grille du projet, calculée sur son slug : la même image que sa vignette
	     sur la page d'accueil, en plein écran. -->
	<div class="pointer-events-none absolute inset-x-0 top-0 h-[70vh] overflow-hidden">
		<GenerativeGrid mode="hero" seed={meta.slug} step={30} />
		<div class="absolute inset-0 bg-linear-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950"></div>
	</div>

	<div class="relative mx-auto max-w-5xl px-6">
		<a
			href="/#projects"
			class="group mb-10 inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-accent-400"
		>
			<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
			{$t.projectPage.back}
		</a>

		<header class="mb-10 sm:mb-14">
			<div class="flex flex-wrap items-start justify-between gap-6">
				<div class="min-w-0">
					<h1 class="text-4xl font-bold tracking-tight text-zinc-50 sm:text-6xl">{project.name}</h1>
					<p class="mt-3 text-lg font-medium text-primary-300 sm:text-xl">{project.tagline}</p>
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
			</div>

			<!-- Une ligne de faits relevés sur le dépôt lui-même, plutôt qu'un
			     adjectif : l'année, qui peut lire le code, et sa taille réelle. -->
			<dl
				class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-zinc-800/80 py-4 font-mono text-xs text-zinc-500"
			>
				{#if meta.since}
					<div class="flex items-center gap-2">
						<dt class="text-zinc-600">{$t.projectPage.since}</dt>
						<dd class="text-zinc-300 tabular-nums">{meta.since}</dd>
					</div>
				{/if}
				<div class="flex items-center gap-2">
					<dt class="sr-only">{$t.projectPage.github}</dt>
					<dd class="flex items-center gap-2 text-zinc-300">
						<span
							class="h-1.5 w-1.5 rounded-full {meta.visibility === 'public'
								? 'bg-accent-400'
								: 'bg-zinc-600'}"
							aria-hidden="true"
						></span>
						{meta.visibility === 'public' ? $t.projectPage.openSource : $t.projectPage.privateCode}
						{#if meta.license}
							<span class="text-zinc-600">· {meta.license}</span>
						{/if}
					</dd>
				</div>
				{#if meta.ecosystem}
					<div class="flex items-center gap-2">
						<dt class="sr-only">{$t.projectPage.ecosystem}</dt>
						<dd class="text-zinc-300 tabular-nums">
							{meta.ecosystem.length}
							<span class="text-zinc-500">{$t.projectPage.repos}</span>
						</dd>
					</div>
				{/if}
			</dl>

			<div class="mt-6 flex flex-wrap gap-3">
				{#if meta.link}
					<a
						href={meta.link}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2.5 border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-200 transition-colors hover:border-accent-500/50 hover:text-accent-300"
						style="border-radius: var(--radius-card)"
					>
						<GithubIcon size={16} />
						{$t.projectPage.github}
					</a>
				{/if}
				{#if meta.externalUrl}
					<a
						href={meta.externalUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2.5 bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-500"
						style="border-radius: var(--radius-card)"
					>
						<ExternalLink size={16} />
						{$t.projectPage.website}
					</a>
				{/if}
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

		<div class="grid items-start gap-4 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<div class="surface p-6 sm:p-8">
					<h2 class="section-label">{$t.projectPage.about}</h2>
					<p class="mt-4 text-lg leading-relaxed text-zinc-300">{project.description}</p>
				</div>

				{#if project.details?.features}
					<div class="surface mt-4 p-6 sm:p-8">
						<h2 class="section-label">{$t.projectPage.features}</h2>
						<!-- Numérotées et sur deux colonnes : une liste de neuf puces
						     identiques se lisait comme un paragraphe haché. -->
						<ol class="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
							{#each project.details.features as feature, fi (fi)}
								<li class="flex gap-3 text-sm leading-relaxed text-zinc-400">
									<span class="mt-0.5 font-mono text-xs text-zinc-600 tabular-nums">
										{String(fi + 1).padStart(2, '0')}
									</span>
									<span>{feature}</span>
								</li>
							{/each}
						</ol>
					</div>
				{/if}
			</div>

			<div class="grid gap-4 lg:sticky lg:top-24">
				<div class="surface p-6">
					<h2 class="section-label">{$t.projectPage.techStack}</h2>
					<ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
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
						<h2 class="section-label">{$t.projectPage.ecosystem}</h2>
						<p class="mt-2 text-xs leading-relaxed text-zinc-500">
							{project.details?.ecosystemNote ?? $t.projectPage.ecosystemNote}
						</p>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each meta.ecosystem as pkg (pkg.name)}
								{#if pkg.url}
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
								{:else}
									<!-- Dépôt privé : le nom reste, le lien mènerait à une 404. -->
									<span
										class="flex items-center gap-1.5 border border-zinc-800/60 px-2.5 py-1 text-xs text-zinc-400"
										style="border-radius: var(--radius-card)"
									>
										<Lock size={13} class="text-zinc-600" />
										<span class="font-mono">{pkg.name}</span>
										<span class="text-[10px] text-zinc-500">{pkg.tag}</span>
									</span>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>

		{#if meta.diagram}
			<!-- Le schéma a besoin de la largeur de la page : dans la colonne de
			     texte, ses quatre bords se réduisaient à une bande à faire défiler. -->
			<section class="mt-12">
				<h2 class="section-label">{$t.projectPage.architecture}</h2>
				<div class="mt-4">
					<ArchitectureDiagram
						diagram={meta.diagram}
						caption={project.details?.diagramCaption ?? project.tagline}
					/>
				</div>
			</section>
		{/if}

		<nav class="mt-16 grid gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-2">
			<a
				href="/projects/{prev.meta.slug}"
				class="surface surface-hover group flex items-center gap-4 p-5"
			>
				<ArrowLeft size={18} class="shrink-0 text-zinc-600 transition-colors group-hover:text-accent-400" />
				<span class="min-w-0">
					<span class="block font-mono text-[11px] tracking-wide text-zinc-500">
						{$t.projectPage.prev}
					</span>
					<span class="block truncate text-sm font-medium text-zinc-200">{prev.name}</span>
				</span>
			</a>
			<a
				href="/projects/{next.meta.slug}"
				class="surface surface-hover group flex items-center justify-end gap-4 p-5 text-right"
			>
				<span class="min-w-0">
					<span class="block font-mono text-[11px] tracking-wide text-zinc-500">
						{$t.projectPage.next}
					</span>
					<span class="block truncate text-sm font-medium text-zinc-200">{next.name}</span>
				</span>
				<ArrowRight size={18} class="shrink-0 text-zinc-600 transition-colors group-hover:text-accent-400" />
			</a>
		</nav>
	</div>
</section>
