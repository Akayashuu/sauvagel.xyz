<script lang="ts">
	import { onMount } from 'svelte';

	import type { Snippet } from 'svelte';

	let { children, delay = 0, y = 40 }: { children: Snippet; delay?: number; y?: number } = $props();
	let el: HTMLDivElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={el}
	class="transition-all duration-700 ease-out"
	style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : y}px); transition-delay: {delay}s;"
>
	{@render children()}
</div>
