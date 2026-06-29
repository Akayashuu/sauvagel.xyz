<script lang="ts">
	import { ArrowLeft, ExternalLink, Lock } from 'lucide-svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';

	import MatrixRain from '$lib/components/MatrixRain.svelte';
	import { techIcons } from '$lib/data/profile';
	import { scaledPreview } from '$lib/actions/scaledPreview';
	import { t } from '$lib/i18n';

	let { data } = $props();

	let project = $derived($t.projects.items[data.index]);
	let meta = $derived(data.meta);
	let displayUrl = $derived(
		(meta.externalUrl ?? meta.preview ?? '').replace(/^https?:\/\//, '').replace(/\/+$/, '')
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
	<meta property="og:description" content="{project.tagline} — {project.description.slice(0, 140)}" />
	<meta property="og:site_name" content="Léo Sauvage" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{project.name} | Léo Sauvage" />
	<meta name="twitter:description" content="{project.tagline}" />
	<link rel="canonical" href="https://sauvagel.xyz/projects/{meta.slug}" />
</svelte:head>

<section class="relative min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-20">
	<MatrixRain color={meta.color} />
	<div class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-primary-500/2 to-transparent"></div>

	<div class="relative mx-auto max-w-4xl px-6">
		<a
			href="/#projects"
			class="group mb-10 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-primary-400"
		>
			<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
			{$t.projectPage.back}
		</a>

		{#if meta.preview}
			<div class="mb-8 sm:mb-12">
				<div class="mb-6 flex flex-wrap items-end justify-between gap-4">
					<div>
						<h1 class="text-3xl font-bold sm:text-5xl">
							<span class="bg-linear-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">{project.name}</span>
						</h1>
						<p class="mt-2 text-base font-medium sm:text-lg" style="color: {meta.color}">{project.tagline}</p>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each meta.logos as logo (logo)}
							{@const iconUrl = techIcons[logo]}
							{#if iconUrl}
								<span class="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 sm:h-10 sm:w-10">
									<img src={iconUrl} alt={logo} class="h-5 w-5 sm:h-6 sm:w-6" />
								</span>
							{/if}
						{/each}
					</div>
				</div>

				<a
					href={meta.externalUrl ?? meta.preview}
					target="_blank"
					rel="noopener noreferrer"
					class="group/preview relative block"
				>
					<div
						class="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-25 blur-2xl transition-opacity duration-500 group-hover/preview:opacity-45"
						style="background: radial-gradient(ellipse at center, {meta.color}, transparent 70%)"
					></div>

					<div class="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50 ring-1 ring-white/5 transition-transform duration-500 group-hover/preview:-translate-y-1 sm:rounded-2xl">
						<div class="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5">
							<div class="flex gap-1.5">
								<span class="h-3 w-3 rounded-full bg-red-400/70"></span>
								<span class="h-3 w-3 rounded-full bg-yellow-400/70"></span>
								<span class="h-3 w-3 rounded-full bg-green-400/70"></span>
							</div>
							<div class="flex min-w-0 flex-1 justify-center">
								<span class="flex max-w-full items-center gap-1.5 truncate rounded-md bg-zinc-800/80 px-3 py-1 font-mono text-xs text-zinc-400">
									<Lock size={11} class="shrink-0" />
									{displayUrl}
								</span>
							</div>
							<span class="flex shrink-0 items-center gap-1.5 text-xs font-medium text-emerald-400">
								<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
								<span class="hidden sm:inline">{$t.projectPage.livePreview}</span>
							</span>
						</div>
						<div class="preview-header relative aspect-video w-full bg-zinc-950" use:scaledPreview={1440}>
							<iframe
								src={meta.preview}
								title="Aperçu de {project.name}"
								loading="lazy"
								tabindex="-1"
								aria-hidden="true"
								scrolling="no"
								referrerpolicy="no-referrer"
								sandbox="allow-scripts allow-same-origin"
								style="color-scheme: {meta.previewScheme ?? 'light'}"
								class="preview-frame"
							></iframe>
							<div class="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-zinc-950/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 ring-1 ring-white/10 backdrop-blur-sm transition-opacity duration-300 group-hover/preview:opacity-100">
								{$t.projectPage.openSite}
								<ExternalLink size={14} />
							</div>
						</div>
					</div>
				</a>
			</div>
		{:else}
			<div class="relative mb-8 overflow-hidden rounded-2xl bg-linear-to-br sm:mb-12 sm:rounded-3xl {meta.gradient}">
				<div class="absolute inset-0 bg-black/20"></div>
				<div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 32px 32px;"></div>
				<div class="relative flex flex-col items-center gap-4 px-4 py-10 sm:gap-6 sm:px-8 sm:py-16">
					<div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
						{#each meta.logos as logo (logo)}
							{@const iconUrl = techIcons[logo]}
							{#if iconUrl}
								<img
									src={iconUrl}
									alt={logo}
									class="h-10 w-10 drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] sm:h-14 sm:w-14"
								/>
							{/if}
						{/each}
					</div>
					<div class="text-center">
						<h1 class="mb-2 text-3xl font-bold text-white sm:text-5xl">{project.name}</h1>
						<p class="text-base font-medium text-white/70 sm:text-lg">{project.tagline}</p>
					</div>
				</div>
			</div>
		{/if}

		<div class="grid gap-8 md:grid-cols-3">
			<div class="md:col-span-2">
				<div class="glass rounded-2xl p-5 sm:p-8">
					<h2 class="mb-4 text-xl font-bold text-zinc-100">{$t.projectPage.about}</h2>
					<p class="mb-8 leading-relaxed text-zinc-400">{project.description}</p>

					{#if project.details?.features}
						<h3 class="mb-4 text-lg font-semibold text-zinc-200">{$t.projectPage.features}</h3>
						<ul class="space-y-3">
							{#each project.details.features as feature, fi (fi)}
								<li class="flex items-start gap-3 text-sm text-zinc-400">
									<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400"></span>
									{feature}
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>

			<div class="space-y-6">
				<div class="glass rounded-2xl p-6">
					<h3 class="mb-4 text-sm font-semibold tracking-widest text-zinc-300 uppercase">{$t.projectPage.techStack}</h3>
					<div class="flex flex-wrap gap-2">
						{#each meta.tech as tech (tech)}
							{@const icon = techIcons[tech]}
							<span class="flex items-center gap-1.5 rounded-full border border-zinc-700/30 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300">
								{#if icon}
									<img src={icon} alt={tech} class="h-4 w-4" />
								{/if}
								{tech}
							</span>
						{/each}
					</div>
				</div>

				{#if meta.ecosystem}
					<div class="glass rounded-2xl p-6">
						<h3 class="mb-2 text-sm font-semibold tracking-widest text-zinc-300 uppercase">{$t.projectPage.ecosystem}</h3>
						<p class="mb-4 text-xs leading-relaxed text-zinc-500">{$t.projectPage.ecosystemNote}</p>
						<div class="flex flex-wrap gap-2">
							{#each meta.ecosystem as pkg (pkg.url)}
								<a
									href={pkg.url}
									target="_blank"
									rel="noopener noreferrer"
									class="group/pkg flex items-center gap-1.5 rounded-full border border-zinc-700/30 bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300 transition-all hover:border-primary-500/30 hover:text-primary-300"
								>
									<GithubIcon size={13} />
									<span class="font-mono">{pkg.name}</span>
									<span class="text-[10px] text-zinc-500 group-hover/pkg:text-primary-400/70">{pkg.tag}</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}

				<div class="glass rounded-2xl p-6">
					<h3 class="mb-4 text-sm font-semibold tracking-widest text-zinc-300 uppercase">{$t.projectPage.links}</h3>
					<div class="space-y-3">
						<a
							href={meta.link}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 rounded-xl border border-zinc-700/30 bg-zinc-800/50 px-4 py-3 text-sm text-zinc-300 transition-all hover:border-primary-500/30 hover:text-primary-300"
						>
							<GithubIcon size={18} />
							{$t.projectPage.github}
							<ExternalLink size={14} class="ml-auto text-zinc-500" />
						</a>
						{#if meta.externalUrl}
							<a
								href={meta.externalUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-3 rounded-xl border border-zinc-700/30 bg-zinc-800/50 px-4 py-3 text-sm text-zinc-300 transition-all hover:border-primary-500/30 hover:text-primary-300"
							>
								<ExternalLink size={18} />
								{$t.projectPage.website}
								<ExternalLink size={14} class="ml-auto text-zinc-500" />
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.preview-frame {
		position: absolute;
		top: 0;
		left: 0;
		width: 1440px;
		height: 810px;
		border: 0;
		pointer-events: none;
		transform-origin: top left;
		transform: scale(var(--preview-scale, 0.6));
	}
</style>
