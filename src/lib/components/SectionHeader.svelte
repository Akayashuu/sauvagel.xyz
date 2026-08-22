<script lang="ts">
	import ScrollReveal from './ScrollReveal.svelte';

	let { label, title }: { label: string; title: string } = $props();
</script>

<ScrollReveal>
	<header class="mb-14 flex items-baseline gap-4 border-b border-zinc-800 pb-6">
		<span class="section-label shrink-0">{label}</span>
		<h2 class="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl 2xl:text-5xl">
			{title}
		</h2>
	</header>
</ScrollReveal>
