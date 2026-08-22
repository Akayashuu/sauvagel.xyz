<script lang="ts">
	import { techIcons } from '$lib/data/tech';

	let {
		name,
		size = 20,
		eager = false,
		class: className = ''
	}: { name: string; size?: number; eager?: boolean; class?: string } = $props();

	const icon = $derived(techIcons[name]);
</script>

{#if icon}
	<img
		src={icon.src}
		alt=""
		width={size}
		height={size}
		loading={eager ? 'eager' : 'lazy'}
		decoding="async"
		class="{icon.lighten ? 'lighten' : ''} {className}"
		style="width: {size}px; height: {size}px"
	/>
{/if}

<style>
	/* Les logos livrés en noir uni (Rust, Prisma, Symfony…) disparaissent sur le
	   fond du site. On les repasse en clair sans toucher aux logos en couleur. */
	.lighten {
		filter: invert(1) brightness(1.35) saturate(0);
	}
</style>
