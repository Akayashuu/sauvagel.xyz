<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import CodeCube from './CodeCube.svelte';
	import TextScramble from './TextScramble.svelte';
	import MagneticButton from './MagneticButton.svelte';
	import { Mail, MapPin } from 'lucide-svelte';
	import GithubIcon from './GithubIcon.svelte';
	import anime from 'animejs';

	onMount(() => {
		anime.timeline({ easing: 'easeOutCubic' })
			.add({ targets: '.hero-badge', scale: [0.8, 1], opacity: [0, 1], duration: 500, delay: 200 })
			.add({ targets: '.hero-greeting', translateY: [20, 0], opacity: [0, 1], duration: 600 }, '-=200')
			.add({ targets: '.hero-name', translateY: [40, 0], opacity: [0, 1], duration: 800 }, '-=300')
			.add({ targets: '.hero-title', opacity: [0, 1], duration: 600 }, '-=400')
			.add({ targets: '.hero-sub', translateY: [15, 0], opacity: [0, 1], duration: 600 }, '-=300')
			.add({ targets: '.hero-link', translateY: [15, 0], opacity: [0, 1], duration: 500, delay: anime.stagger(80) }, '-=200')
			.add({ targets: '.hero-scroll', opacity: [0, 1], duration: 600 }, '-=200');
	});
</script>

<section id="hero" class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<div class="absolute inset-0 z-0">
		<CodeCube />
	</div>

	<div class="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30"></div>

	<div class="pointer-events-none absolute inset-0 z-2" aria-hidden="true">
		<div class="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl animate-pulse 2xl:h-96 2xl:w-96"></div>
		<div class="absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full bg-accent-500/10 blur-3xl animate-pulse [animation-delay:2s] 2xl:h-72 2xl:w-72"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-3xl px-6 text-center 2xl:max-w-4xl">
		<div class="hero-badge mb-6 inline-block rounded-full gradient-border px-4 py-1.5 opacity-0">
			<span class="text-xs font-medium tracking-wider text-primary-300 uppercase 2xl:text-sm">
				{$t.hero.greeting}
			</span>
		</div>

		<h1 class="hero-name mb-6 text-5xl font-bold tracking-tight opacity-0 sm:text-7xl lg:text-8xl 2xl:text-9xl">
			<span class="bg-linear-to-r from-zinc-50 via-primary-200 to-accent-400 bg-clip-text text-transparent">
				<TextScramble text={profile.name} />
			</span>
		</h1>

		<p class="hero-title mb-4 font-mono text-sm text-primary-400 opacity-0 glow-text 2xl:text-base">
			{$t.profile.title}
		</p>

		<p class="hero-sub mx-auto mb-10 max-w-lg text-zinc-400 opacity-0 2xl:text-lg">
			{$t.profile.subtitle}
		</p>

		<div class="flex flex-wrap items-center justify-center gap-4">
			<MagneticButton
				href={profile.github}
				target="_blank"
				rel="noopener noreferrer"
				className="hero-link flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm px-5 py-2.5 text-sm text-zinc-300 opacity-0 transition-colors hover:border-primary-500/50 hover:text-white 2xl:text-base"
			>
				<GithubIcon size={16} />
				<span>{$t.contact.github}</span>
			</MagneticButton>

			<MagneticButton
				href="mailto:{profile.email}"
				className="hero-link flex items-center gap-2 rounded-lg bg-linear-to-r from-primary-500 to-accent-500 px-5 py-2.5 text-sm font-medium text-white opacity-0 transition-shadow hover:shadow-lg hover:shadow-primary-500/25 2xl:text-base"
			>
				<Mail size={16} />
				<span>{$t.hero.cta}</span>
			</MagneticButton>

			<span class="hero-link flex items-center gap-2 text-sm text-zinc-500 opacity-0">
				<MapPin size={14} />
				{profile.location}
			</span>
		</div>
	</div>

	<div class="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0">
		<a href="#about" class="flex flex-col items-center gap-1 text-zinc-600 transition-colors hover:text-zinc-400">
			<span class="text-[11px] tracking-wider uppercase">{$t.hero.scroll}</span>
			<svg width="16" height="24" viewBox="0 0 16 24" fill="none" class="animate-bounce"><path d="M8 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
		</a>
	</div>
</section>
