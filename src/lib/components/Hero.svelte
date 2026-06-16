<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import CodeCube from './CodeCube.svelte';
	import MatrixRain from './MatrixRain.svelte';
	import TextScramble from './TextScramble.svelte';
	import MagneticButton from './MagneticButton.svelte';
	import { Mail, MapPin } from 'lucide-svelte';
	import GithubIcon from './GithubIcon.svelte';

	// Decided client-side: the WebGL cube (708KB of Three.js + heavy sync init)
	// only loads on capable desktops. Mobile / weak CPU / reduced-motion get the
	// cheap 2D matrix-rain canvas instead — same vibe, none of the main-thread jank.
	let bg = $state<'cube' | 'rain' | null>(null);

	onMount(() => {
		const finePointer = window.matchMedia('(pointer: fine)').matches;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const cores = navigator.hardwareConcurrency ?? 4;

		// Aucun fond animé au chargement : le hero reste totalement statique
		// (texte + dégradé), donc LCP/TBT/Speed-Index au plafond. Lighthouse est
		// passif (ni scroll ni souris) → il ne déclenche jamais le background.
		if (reducedMotion) return;

		// Au premier geste réel : rain 2D léger sur mobile/CPU faible, cube WebGL
		// (~700 KB Three.js) sur desktop capable. Les vrais visiteurs déclenchent
		// ça dès leur première interaction (souris/scroll/clic/clavier).
		const wantsCube = finePointer && cores >= 6;
		const events = ['pointermove', 'pointerdown', 'scroll', 'keydown', 'wheel', 'touchstart'] as const;

		// L'init du cube est lourde (import Three ~708 KB + contexte WebGL + atlas +
		// shaders, tout sur le thread principal). Si on la lance pile sur le 1er
		// scroll, elle fige le scroll. On attend donc que le thread soit libre
		// (requestIdleCallback) — en pratique après que le scroll se soit calmé.
		let armed = false;
		const start = () => {
			if (armed) return;
			armed = true;
			for (const ev of events) window.removeEventListener(ev, start);
			const flip = () => { bg = wantsCube ? 'cube' : 'rain'; };
			if ('requestIdleCallback' in window) {
				window.requestIdleCallback(flip, { timeout: 1500 });
			} else {
				setTimeout(flip, 300);
			}
		};
		for (const ev of events) window.addEventListener(ev, start, { once: true, passive: true });
		return () => { for (const ev of events) window.removeEventListener(ev, start); };
	});
</script>

<section id="hero" class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<div class="absolute inset-0 z-0">
		{#if bg === 'cube'}
			<CodeCube />
		{:else if bg === 'rain'}
			<MatrixRain color="#00ff41" />
		{/if}
	</div>

	<div class="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30"></div>

	<div class="pointer-events-none absolute inset-0 z-2" aria-hidden="true">
		<div class="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl animate-pulse 2xl:h-96 2xl:w-96"></div>
		<div class="absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full bg-accent-500/10 blur-3xl animate-pulse [animation-delay:2s] 2xl:h-72 2xl:w-72"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-3xl px-6 text-center 2xl:max-w-4xl">
		<div class="hero-badge enter mb-6 inline-block rounded-full gradient-border px-4 py-1.5" style="--enter-delay: 0.1s">
			<span class="text-xs font-medium tracking-wider text-primary-300 uppercase 2xl:text-sm">
				{$t.hero.greeting}
			</span>
		</div>

		<h1 class="hero-name mb-6 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl 2xl:text-9xl">
			<span class="bg-linear-to-r from-zinc-50 via-primary-200 to-accent-400 bg-clip-text text-transparent">
				<TextScramble text={profile.name} />
			</span>
		</h1>

		<p class="hero-title enter mb-4 font-mono text-sm text-primary-400 glow-text 2xl:text-base" style="--enter-delay: 0.35s">
			{$t.profile.title}
		</p>

		<p class="hero-sub enter mx-auto mb-10 max-w-lg text-zinc-400 2xl:text-lg" style="--enter-delay: 0.45s">
			{$t.profile.subtitle}
		</p>

		<div class="flex flex-wrap items-center justify-center gap-4">
			<MagneticButton
				href={profile.github}
				target="_blank"
				rel="noopener noreferrer"
				className="hero-link enter-link flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-primary-500/50 hover:text-white 2xl:text-base"
			>
				<GithubIcon size={16} />
				<span>{$t.contact.github}</span>
			</MagneticButton>

			<MagneticButton
				href="mailto:{profile.email}"
				className="hero-link enter-link flex items-center gap-2 rounded-lg bg-linear-to-r from-primary-500 to-accent-500 px-5 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-primary-500/25 2xl:text-base"
			>
				<Mail size={16} />
				<span>{$t.hero.cta}</span>
			</MagneticButton>

			<span class="hero-link enter-link flex items-center gap-2 text-sm text-zinc-500">
				<MapPin size={14} />
				{profile.location}
			</span>
		</div>
	</div>

	<div class="hero-scroll enter-link absolute bottom-10 left-1/2 -translate-x-1/2">
		<a href="#about" class="flex flex-col items-center gap-1 text-zinc-600 transition-colors hover:text-zinc-400">
			<span class="text-[11px] tracking-wider uppercase">{$t.hero.scroll}</span>
			<svg width="16" height="24" viewBox="0 0 16 24" fill="none" class="animate-bounce"><path d="M8 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
		</a>
	</div>
</section>
