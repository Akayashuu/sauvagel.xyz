<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let { children, className = '' }: { children: Snippet; className?: string } = $props();
	let el: HTMLDivElement;
	let rotateX = $state(0);
	let rotateY = $state(0);
	let glareX = $state(50);
	let glareY = $state(50);
	let isHovering = $state(false);
	let isTouch = $state(true);

	let rafId = 0;
	let lastX = 0;
	let lastY = 0;

	onMount(() => {
		isTouch = window.matchMedia('(pointer: coarse)').matches;
		return () => { if (rafId) cancelAnimationFrame(rafId); };
	});

	// Throttle au rythme de l'écran : un seul recalcul (et un seul reflow via
	// getBoundingClientRect) par frame, au lieu d'un par event mousemove.
	function handleMouseMove(e: MouseEvent) {
		if (isTouch) return;
		lastX = e.clientX;
		lastY = e.clientY;
		isHovering = true;
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			rafId = 0;
			const rect = el.getBoundingClientRect();
			const x = (lastX - rect.left) / rect.width;
			const y = (lastY - rect.top) / rect.height;
			rotateX = (y - 0.5) * -15;
			rotateY = (x - 0.5) * 15;
			glareX = x * 100;
			glareY = y * 100;
		});
	}

	function handleMouseLeave() {
		if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
		rotateX = 0;
		rotateY = 0;
		isHovering = false;
	}
</script>

<div
	bind:this={el}
	class={className}
	role="presentation"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	style={isTouch ? '' : `transform: perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovering ? 'scale(1.02)' : 'scale(1)'}; transition: transform 0.15s ease-out;`}
>
	{@render children()}
	{#if isHovering && !isTouch}
		<div
			class="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-20"
			style="background: radial-gradient(circle at {glareX}% {glareY}%, rgba(168, 130, 255, 0.3), transparent 60%);"
		></div>
	{/if}
</div>
