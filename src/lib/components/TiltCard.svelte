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

	onMount(() => {
		isTouch = window.matchMedia('(pointer: coarse)').matches;
	});

	function handleMouseMove(e: MouseEvent) {
		if (isTouch) return;
		const rect = el.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;

		rotateX = (y - 0.5) * -15;
		rotateY = (x - 0.5) * 15;
		glareX = x * 100;
		glareY = y * 100;
		isHovering = true;
	}

	function handleMouseLeave() {
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
