<script lang="ts">
	import { Code2, Server, Smartphone, Gamepad2 } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import ScrollReveal from './ScrollReveal.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const icons = [Server, Code2, Smartphone, Gamepad2];

	// Le texte est découpé en segments plutôt que rendu en {@html} : un bloc HTML
	// brut posé par le serveur n'est pas repris à l'hydratation, et le paragraphe
	// restait figé dans la langue du rendu serveur.
	let parts = $derived(
		$t.about.description
			.split(/<\/?strong>/)
			.map((text, i) => ({ text, strong: i % 2 === 1 }))
	);
</script>

<section id="about" class="relative py-28 2xl:py-36">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<SectionHeader label={$t.about.label} title={$t.about.title} />

		<ScrollReveal delay={0.1}>
			<p class="max-w-3xl text-lg leading-relaxed text-zinc-300 2xl:max-w-4xl 2xl:text-xl">
				{#each parts as part, i (i)}{#if part.strong}<span
							class="font-medium text-primary-300">{part.text}</span
						>{:else}{part.text}{/if}{/each}
			</p>
		</ScrollReveal>

		<div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each $t.about.highlights as item, i (item.title)}
				{@const Icon = icons[i]}
				<ScrollReveal delay={0.08 * i}>
					<article class="surface surface-hover h-full p-6 2xl:p-8">
						<Icon size={22} class="text-primary-400" />
						<h3 class="mt-5 text-lg font-semibold text-zinc-100 2xl:text-xl">{item.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-zinc-400 2xl:text-base">{item.desc}</p>
					</article>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>
