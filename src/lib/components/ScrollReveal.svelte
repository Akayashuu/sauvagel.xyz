<script lang="ts">
	import { onMount } from 'svelte';

	import type { Snippet } from 'svelte';

	let { children, delay = 0, y = 40 }: { children: Snippet; delay?: number; y?: number } = $props();
	let el: HTMLDivElement;
	let visible = $state(false);
	// Le contenu ne doit jamais dépendre de l'animation pour être lisible : si le
	// visiteur demande moins de mouvement, tout est affiché tout de suite.
	let reduced = $state(false);

	onMount(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			visible = true;
			return;
		}

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
	class="transition-all duration-700 ease-out motion-reduce:transition-none"
	style="opacity: {visible ? 1 : 0}; transform: translateY({visible || reduced ? 0 : y}px); transition-delay: {reduced ? 0 : delay}s;"
>
	{@render children()}
</div>
