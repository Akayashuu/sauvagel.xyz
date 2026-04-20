<script lang="ts">
	import { ArrowLeft, ExternalLink } from 'lucide-svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';

	import MatrixRain from '$lib/components/MatrixRain.svelte';
	import { techIcons } from '$lib/data/profile';
	import { t } from '$lib/i18n';

	let { data } = $props();

	let project = $derived($t.projects.items[data.index]);
	let meta = $derived(data.meta);

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
