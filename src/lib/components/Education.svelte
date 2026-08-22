<script lang="ts">
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="education" class="relative py-28 2xl:py-36">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<SectionHeader label={$t.education.label} title={$t.education.title} />

		<div class="grid max-w-4xl gap-4">
			{#each $t.education.items as edu, i (edu.degree)}
				<ScrollReveal delay={0.1 * i}>
					<article class="surface surface-hover p-6 2xl:p-8">
						<div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
							<h3 class="text-lg font-bold text-zinc-100 2xl:text-xl">{edu.degree}</h3>
							<span class="shrink-0 font-mono text-xs tracking-wider text-zinc-500 2xl:text-sm">
								{edu.period}
							</span>
						</div>
						<p class="mt-1 text-sm font-medium text-primary-300 2xl:text-base">{edu.school}</p>
					</article>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
