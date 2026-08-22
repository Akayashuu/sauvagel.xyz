<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import { projectMeta } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import GenerativeGrid from './GenerativeGrid.svelte';
	import TechLogo from './TechLogo.svelte';
</script>

<section id="projects" class="relative py-28 2xl:py-36">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<SectionHeader label={$t.projects.label} title={$t.projects.title} />

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each $t.projects.items as project, i (projectMeta[i].slug)}
				{@const meta = projectMeta[i]}
				<ScrollReveal delay={0.08 * i}>
					<a
						href="/projects/{meta.slug}"
						class="surface surface-hover group flex h-full flex-col overflow-hidden"
					>
						<div class="relative aspect-16/10 overflow-hidden border-b border-zinc-800 bg-zinc-950">
							<!-- Vignette calculée depuis le slug : chaque projet a son propre
							     dessin, stable d'un déploiement à l'autre, même sans capture. -->
							<GenerativeGrid mode="thumb" seed={meta.slug} step={22} />

							{#if meta.image}
								<img
									src={meta.image}
									alt="Aperçu de {project.name}"
									loading="lazy"
									decoding="async"
									class="absolute inset-0 h-full w-full object-cover object-top opacity-70 transition-opacity duration-500 group-hover:opacity-100"
								/>
							{/if}

							<span
								class="absolute top-3 right-3 flex h-7 w-7 items-center justify-center border border-zinc-700 bg-zinc-950/80 text-zinc-400 transition-colors group-hover:border-accent-500/60 group-hover:text-accent-400"
								style="border-radius: var(--radius-card)"
							>
								<ArrowUpRight size={14} />
							</span>
						</div>

						<div class="flex flex-1 flex-col p-6 2xl:p-8">
							<h3 class="text-xl font-bold text-zinc-100 2xl:text-2xl">{project.name}</h3>
							<p class="mt-1 text-sm font-medium text-primary-300 2xl:text-base">
								{project.tagline}
							</p>
							<p class="mt-3 flex-1 text-sm leading-relaxed text-zinc-400 2xl:text-base">
								{project.description}
							</p>

							<div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
								{#each meta.logos as logo (logo)}
									<span class="flex items-center gap-1.5">
										<TechLogo name={logo} size={16} />
										<span class="font-mono text-[11px] tracking-wide text-zinc-500">{logo}</span>
									</span>
								{/each}
								{#if meta.tech.length > meta.logos.length}
									<span class="font-mono text-[11px] text-zinc-600 tabular-nums">
										+{meta.tech.length - meta.logos.length}
									</span>
								{/if}
							</div>
						</div>
					</a>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
