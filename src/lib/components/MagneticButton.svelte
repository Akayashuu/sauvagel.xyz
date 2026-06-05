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

	let rafId = 0;
	let lastX = 0;
	let lastY = 0;

	onMount(() => {
		isTouch = window.matchMedia('(pointer: coarse)').matches;
		return () => { if (rafId) cancelAnimationFrame(rafId); };
	});

	// Throttle au rythme de l'écran : un reflow max par frame au survol.
	function handleMouseMove(e: MouseEvent) {
		if (isTouch) return;
		lastX = e.clientX;
		lastY = e.clientY;
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			rafId = 0;
			const rect = el.getBoundingClientRect();
			x = (lastX - rect.left - rect.width / 2) * 0.1;
			y = (lastY - rect.top - rect.height / 2) * 0.1;
		});
	}

	function handleMouseLeave() {
		if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
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
