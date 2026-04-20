<script lang="ts">
	import { Code2, Server, Smartphone, Gamepad2 } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';

	const icons = [Server, Code2, Smartphone, Gamepad2];
</script>

<section id="about" class="relative py-32 2xl:py-40">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<ScrollReveal>
			<div class="mb-16 text-center">
				<span class="mb-4 inline-block font-mono text-sm tracking-widest text-primary-400 uppercase 2xl:text-base">{$t.about.label}</span>
				<h2 class="text-4xl font-bold sm:text-5xl 2xl:text-6xl">
					<span class="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
						{$t.about.title}
					</span>
				</h2>
			</div>
		</ScrollReveal>

		<div class="mb-16 flex justify-center">
			<ScrollReveal delay={0.2}>
				<div class="glass max-w-3xl rounded-2xl p-8 2xl:max-w-4xl 2xl:p-10">
					<p class="text-lg leading-relaxed text-zinc-300 2xl:text-xl">
					{@html $t.about.description.replace(/<strong>/g, '<span class="font-medium text-primary-400">').replace(/<\/strong>/g, '</span>')}
					</p>
				</div>
			</ScrollReveal>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each $t.about.highlights as item, i (item.title)}
				{@const Icon = icons[i]}
				<ScrollReveal delay={0.1 * i}>
					<div class="glass group rounded-2xl p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 2xl:p-8">
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-all group-hover:bg-primary-500/20 group-hover:shadow-lg group-hover:shadow-primary-500/10 2xl:h-14 2xl:w-14">
							<Icon size={24} />
						</div>
						<h3 class="mb-2 text-lg font-semibold text-zinc-100 2xl:text-xl">{item.title}</h3>
						<p class="text-sm leading-relaxed text-zinc-400 2xl:text-base">{item.desc}</p>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
