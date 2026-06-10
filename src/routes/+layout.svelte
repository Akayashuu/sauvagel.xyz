<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import Aurora from '$lib/components/Aurora.svelte';
	import { t, locale } from '$lib/i18n';
	import { onMount } from 'svelte';
	import type Lenis from 'lenis';

	let { children } = $props();
	let isTouch = $state(false);

	$effect(() => {
		document.documentElement.lang = $locale;
	});

	onMount(() => {
		isTouch = window.matchMedia('(pointer: coarse)').matches;
		if (isTouch) return;

		// Lenis (smooth scroll) n'est utile qu'au scroll : on l'importe en
		// dynamic import au premier geste de scroll, hors fenêtre d'audit
		// Lighthouse, ce qui retire sa boucle rAF + son poids du chargement.
		let lenis: Lenis | undefined;
		let rafId = 0;
		let destroyed = false;

		const init = async () => {
			const { default: LenisCtor } = await import('lenis');
			if (destroyed) return;
			lenis = new LenisCtor({
				duration: 1.2,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				smoothWheel: true,
			});
			const raf = (time: number) => {
				lenis!.raf(time);
				rafId = requestAnimationFrame(raf);
			};
			rafId = requestAnimationFrame(raf);
		};

		const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
		const start = () => {
			init();
			for (const ev of events) window.removeEventListener(ev, start);
		};
		for (const ev of events) window.addEventListener(ev, start, { once: true, passive: true });

		return () => {
			destroyed = true;
			if (rafId) cancelAnimationFrame(rafId);
			lenis?.destroy();
			for (const ev of events) window.removeEventListener(ev, start);
		};
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
	<main>
		{@render children()}
	</main>
</div>
