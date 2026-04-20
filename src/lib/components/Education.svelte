<script lang="ts">
	import { t } from '$lib/i18n';
	import { GraduationCap } from 'lucide-svelte';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section id="education" class="relative py-32 2xl:py-40">
	<div class="mx-auto max-w-4xl px-6 2xl:max-w-5xl">
		<ScrollReveal>
			<div class="mb-16 text-center">
				<span class="mb-4 inline-block font-mono text-sm tracking-widest text-primary-400 uppercase 2xl:text-base">{$t.education.label}</span>
				<h2 class="text-4xl font-bold sm:text-5xl 2xl:text-6xl">
					<span class="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
						{$t.education.title}
					</span>
				</h2>
			</div>
		</ScrollReveal>

		<div class="space-y-6">
			{#each $t.education.items as edu, i (edu.degree)}
				<ScrollReveal delay={0.15 * i}>
					<div class="glass group rounded-2xl p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 2xl:p-8">
						<div class="flex items-start gap-4">
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-all group-hover:bg-primary-500/20 2xl:h-14 2xl:w-14">
								<GraduationCap size={24} />
							</div>
							<div class="flex-1">
								<div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
									<h3 class="text-lg font-bold text-zinc-100 2xl:text-xl">{edu.degree}</h3>
									<span class="shrink-0 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-1 font-mono text-xs text-zinc-400 2xl:text-sm">
										{edu.period}
									</span>
								</div>
								<p class="mt-1 text-sm font-medium text-primary-400/80 2xl:text-base">{edu.school}</p>
							</div>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
