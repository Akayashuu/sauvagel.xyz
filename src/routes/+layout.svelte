<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import Aurora from '$lib/components/Aurora.svelte';
	import { t, locale } from '$lib/i18n';
	import { onMount } from 'svelte';
	import Lenis from 'lenis';

	let { children } = $props();
	let mounted = $state(false);
	let isTouch = $state(false);

	$effect(() => {
		document.documentElement.lang = $locale;
	});

	onMount(() => {
		mounted = true;
		isTouch = window.matchMedia('(pointer: coarse)').matches;

		if (!isTouch) {
			const lenis = new Lenis({
				duration: 1.2,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				smoothWheel: true,
			});

			function raf(time: number) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}
			requestAnimationFrame(raf);

			return () => lenis.destroy();
		}
	});
</script>

<svelte:head>
	<title>Léo Sauvage | {$t.profile.title}</title>
	<meta name="description" content="{$locale === 'fr' ? 'Léo Sauvage — Développeur Full Stack spécialisé TypeScript, Node.js, Svelte et systèmes distribués.' : 'Léo Sauvage — Full Stack Developer specializing in TypeScript, Node.js, Svelte and distributed systems.'}" />
</svelte:head>


<CustomCursor />
<Aurora />

<div class={isTouch ? '' : 'cursor-none'}>
	<Navbar />
	<main class="transition-opacity duration-500" style="opacity: {mounted ? 1 : 0}">
		{@render children()}
	</main>
</div>
