<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';

	import { projectMeta, techIcons } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';
	import TiltCard from './TiltCard.svelte';
</script>

<section id="projects" class="relative py-32 2xl:py-40">
	<div class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-primary-500/2 to-transparent"></div>

	<div class="relative mx-auto max-w-7xl px-6 2xl:max-w-400">
		<ScrollReveal>
			<div class="mb-16 text-center">
				<span class="mb-4 inline-block font-mono text-sm tracking-widest text-primary-400 uppercase 2xl:text-base">{$t.projects.label}</span>
				<h2 class="text-4xl font-bold sm:text-5xl 2xl:text-6xl">
					<span class="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
						{$t.projects.title}
					</span>
				</h2>
			</div>
		</ScrollReveal>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each $t.projects.items as project, i (projectMeta[i].slug)}
				{@const meta = projectMeta[i]}
				<ScrollReveal delay={0.1 * i}>
					<TiltCard className="relative h-full">
						<a
							href="/projects/{meta.slug}"
							class="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/10"
						>
							<div class="relative h-32 overflow-hidden bg-linear-to-br {meta.gradient} 2xl:h-40">
								<div class="absolute inset-0 bg-black/20"></div>
								<div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 24px 24px;"></div>
								<div class="absolute inset-0 flex items-center justify-center gap-4">
									{#each meta.logos as logo (logo)}
										{@const iconUrl = techIcons[logo]}
										{#if iconUrl}
											<img
												src={iconUrl}
												alt={logo}
												class="h-10 w-10 opacity-80 drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] 2xl:h-12 2xl:w-12"
											/>
										{/if}
									{/each}
								</div>
								<div class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 opacity-100 backdrop-blur-sm transition-all md:opacity-0 md:group-hover:opacity-100">
									<ExternalLink size={14} class="text-white" />
								</div>
							</div>

							<div class="flex flex-1 flex-col p-6 2xl:p-8">
								<h3 class="mb-1 text-xl font-bold text-zinc-100 transition-colors group-hover:text-primary-300 2xl:text-2xl">
									{project.name}
								</h3>
								<p class="mb-3 text-sm font-medium text-primary-400 2xl:text-base">{project.tagline}</p>
								<p class="mb-4 flex-1 text-sm leading-relaxed text-zinc-400 2xl:text-base">
									{project.description}
								</p>
								<div class="flex flex-wrap gap-1.5">
									{#each meta.tech as tech (tech)}
										{@const icon = techIcons[tech]}
										<span class="flex items-center gap-1 rounded-full border border-zinc-700/30 bg-zinc-800/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400 transition-colors group-hover:border-primary-500/20 group-hover:text-zinc-300 2xl:text-xs">
											{#if icon}
												<img src={icon} alt={tech} class="h-3 w-3" />
											{/if}
											{tech}
										</span>
									{/each}
								</div>
							</div>

							<div class="h-0.5 w-0 bg-linear-to-r {meta.gradient} transition-all duration-500 group-hover:w-full"></div>
						</a>
					</TiltCard>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
