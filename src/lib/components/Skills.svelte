<script lang="ts">
	import { skills, techIcons } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section id="skills" class="relative py-32 2xl:py-40">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<ScrollReveal>
			<div class="mb-16 text-center">
				<span class="mb-4 inline-block font-mono text-sm tracking-widest text-primary-400 uppercase 2xl:text-base">{$t.skills.label}</span>
				<h2 class="text-4xl font-bold sm:text-5xl 2xl:text-6xl">
					<span class="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
						{$t.skills.title}
					</span>
				</h2>
			</div>
		</ScrollReveal>

		<div class="grid gap-8 md:grid-cols-2">
			{#each skills as category, ci (category.category)}
				<ScrollReveal delay={0.1 * ci}>
					<div class="glass rounded-2xl p-6 2xl:p-8">
						<h3 class="mb-6 flex items-center gap-2 text-lg font-bold text-zinc-100 2xl:text-xl">
							<span class="h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_8px_rgba(168,130,255,0.6)]"></span>
							{category.category}
						</h3>
						<div class="flex flex-wrap gap-3">
							{#each category.items as skill (skill)}
								{@const icon = techIcons[skill]}
								<div class="group flex items-center gap-2.5 rounded-xl border border-zinc-700/30 bg-zinc-800/50 px-4 py-2.5 transition-all duration-300 hover:border-primary-500/30 hover:bg-primary-500/5 hover:shadow-lg hover:shadow-primary-500/5">
									{#if icon}
										<img
											src={icon}
											alt={skill}
											class="h-6 w-6 transition-transform duration-300 group-hover:scale-110 2xl:h-7 2xl:w-7"
										/>
									{/if}
									<span class="text-sm font-medium text-zinc-300 transition-colors group-hover:text-primary-300 2xl:text-base">{skill}</span>
								</div>
							{/each}
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
