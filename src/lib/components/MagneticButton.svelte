<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let { children, href = '', target = '', rel = '', className = '' }: {
		children: Snippet;
		href?: string;
		target?: string;
		rel?: string;
		className?: string;
	} = $props();

	let el: HTMLAnchorElement;
	let x = $state(0);
	let y = $state(0);
	let isTouch = $state(true);

	onMount(() => {
		isTouch = window.matchMedia('(pointer: coarse)').matches;
	});

	function handleMouseMove(e: MouseEvent) {
		if (isTouch) return;
		const rect = el.getBoundingClientRect();
		const halfW = rect.width / 2;
		const halfH = rect.height / 2;
		x = (e.clientX - rect.left - halfW) * 0.1;
		y = (e.clientY - rect.top - halfH) * 0.1;
	}

	function handleMouseLeave() {
		x = 0;
		y = 0;
	}
</script>

<a
	bind:this={el}
	{href}
	{target}
	{rel}
	class={className}
	data-magnetic
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	style:transform={isTouch ? '' : `translate(${x}px, ${y}px)`}
	style:transition={isTouch ? '' : 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'}
>
	{@render children()}
</a>
