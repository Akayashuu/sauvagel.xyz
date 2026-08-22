<script lang="ts">
	import { skills, projectMeta } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import TechLogo from './TechLogo.svelte';

	const usage = new Map<string, number>();
	for (const project of projectMeta) {
		for (const tech of project.tech) {
			usage.set(tech, (usage.get(tech) ?? 0) + 1);
		}
	}
</script>

<section id="skills" class="relative py-28 2xl:py-36">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<SectionHeader label={$t.skills.label} title={$t.skills.title} />

		<div class="grid gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-2">
			{#each skills as category, ci (category.category)}
				<ScrollReveal delay={0.06 * ci}>
					<div class="h-full bg-zinc-950 p-6 2xl:p-8">
						<h3 class="section-label">{category.category}</h3>
						<ul class="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
							{#each category.items as skill (skill)}
								{@const count = usage.get(skill) ?? 0}
								<li class="flex items-center gap-3">
									<TechLogo name={skill} size={22} />
									<span class="min-w-0">
										<span class="block truncate text-sm text-zinc-200 2xl:text-base">{skill}</span>
										{#if count > 0}
											<span class="block font-mono text-[11px] tracking-wide text-zinc-500 tabular-nums">
												{count}
												{count > 1 ? $t.skills.usedPlural : $t.skills.usedSingular}
											</span>
										{/if}
									</span>
								</li>
							{/each}
						</ul>
					</div>
				</ScrollReveal>
			{/each}
		</div>

		<p class="mt-4 font-mono text-xs text-zinc-600">{$t.skills.note}</p>
	</div>
</section>
