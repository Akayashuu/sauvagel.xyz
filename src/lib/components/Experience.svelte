<script lang="ts">
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="experience" class="relative py-28 2xl:py-36">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<SectionHeader label={$t.experience.label} title={$t.experience.title} />

		<!-- Une seule colonne : la frise en zigzag coupait la lecture en deux et
		     obligeait l'œil à repartir à gauche à chaque poste. -->
		<div class="relative max-w-4xl border-l border-zinc-800 pl-8 sm:pl-12">
			{#each $t.experience.items as exp, i (exp.company)}
				<ScrollReveal delay={0.1 * i}>
					<article class="relative pb-12 last:pb-0">
						<!-- Le repère reprend le carré de la grille, pas une pastille ronde. -->
						<span
							class="absolute top-1.5 -left-8 h-2.5 w-2.5 border border-primary-400 bg-zinc-950 sm:-left-12"
							aria-hidden="true"
						></span>

						<div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
							<h3 class="text-xl font-bold text-zinc-100 2xl:text-2xl">{exp.company}</h3>
							<span class="font-mono text-xs tracking-wider text-zinc-500 2xl:text-sm">
								{exp.period}
							</span>
						</div>
						<p class="mt-1 font-medium text-primary-300 2xl:text-lg">{exp.role}</p>

						<ul class="mt-4 space-y-2">
							{#each exp.description as item, di (di)}
								<li class="flex items-start gap-3 text-sm text-zinc-400 2xl:text-base">
									<span class="mt-2 h-1 w-1 shrink-0 bg-primary-500/60" aria-hidden="true"></span>
									{item}
								</li>
							{/each}
						</ul>
					</article>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
