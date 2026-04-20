<script lang="ts">
	import { experienceLogos } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section id="experience" class="relative py-32 2xl:py-40">
	<div class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-primary-500/2 to-transparent"></div>

	<div class="relative mx-auto max-w-5xl px-6 2xl:max-w-7xl">
		<ScrollReveal>
			<div class="mb-16 text-center">
				<span class="mb-4 inline-block font-mono text-sm tracking-widest text-primary-400 uppercase 2xl:text-base">{$t.experience.label}</span>
				<h2 class="text-4xl font-bold sm:text-5xl 2xl:text-6xl">
					<span class="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
						{$t.experience.title}
					</span>
				</h2>
			</div>
		</ScrollReveal>

		<div class="relative">
			<div class="absolute top-0 bottom-0 left-8 w-px bg-linear-to-b from-primary-500/50 via-primary-500/20 to-transparent md:left-1/2"></div>

			{#each $t.experience.items as exp, i (exp.company)}
				<ScrollReveal delay={0.15 * i}>
					<div class="relative mb-12 flex flex-col md:flex-row {i % 2 === 0 ? 'md:flex-row-reverse' : ''}">
						<div class="absolute left-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2">
							<div class="h-4 w-4 rounded-full border-2 border-primary-400 bg-zinc-950"></div>
							<div class="absolute h-4 w-4 animate-ping rounded-full bg-primary-400/30"></div>
						</div>

						<div class="ml-16 md:ml-0 md:w-1/2 {i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}">
							<div class="glass group rounded-2xl p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 2xl:p-8">
								<div class="mb-4 flex items-start justify-between gap-4">
									<div>
										<div class="mb-1 flex items-center gap-3">
											<span class="text-2xl">{experienceLogos[i]}</span>
											<h3 class="text-xl font-bold text-zinc-100 2xl:text-2xl">{exp.company}</h3>
										</div>
										<p class="font-medium text-primary-400 2xl:text-lg">{exp.role}</p>
									</div>
									<span class="shrink-0 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-1 font-mono text-xs text-zinc-400 2xl:text-sm">
										{exp.period}
									</span>
								</div>
								<ul class="space-y-2">
									{#each exp.description as item, di (di)}
										<li class="flex items-start gap-2 text-sm text-zinc-400 2xl:text-base">
											<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500/50"></span>
											{item}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
