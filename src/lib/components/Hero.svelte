<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import GenerativeGrid from './GenerativeGrid.svelte';
	import TextScramble from './TextScramble.svelte';
	import MagneticButton from './MagneticButton.svelte';
	import { Mail, MapPin } from 'lucide-svelte';
	import GithubIcon from './GithubIcon.svelte';
</script>

<section id="hero" class="relative flex min-h-screen items-center overflow-hidden">

	<GenerativeGrid mode="hero" seed="leo-sauvage" step={30} interactive />

	<div
		class="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40"
	></div>

	<div class="relative z-10 mx-auto w-full max-w-7xl px-6 2xl:max-w-400">
		<div class="max-w-2xl 2xl:max-w-3xl">
			<span
				class="enter section-label inline-block border border-primary-500/40 px-3 py-1.5"
				style="--enter-delay: 0.1s; border-radius: var(--radius-card)"
			>
				{$t.hero.greeting}
			</span>

			<h1
				class="hero-name mt-6 text-5xl leading-[0.95] font-bold tracking-tighter text-zinc-50 sm:text-7xl lg:text-8xl 2xl:text-9xl"
			>
				<TextScramble text={profile.name} />
			</h1>

			<p
				class="enter mt-6 font-mono text-sm tracking-wider text-accent-400 uppercase 2xl:text-base"
				style="--enter-delay: 0.35s"
			>
				{$t.profile.title}
			</p>

			<p class="enter mt-3 max-w-lg text-zinc-400 2xl:text-lg" style="--enter-delay: 0.45s">
				{$t.profile.subtitle}
			</p>

			<div class="mt-10 flex flex-wrap items-center gap-4">
				<MagneticButton
					href="mailto:{profile.email}"
					className="enter-link flex items-center gap-2 bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-400 2xl:text-base"
				>
					<Mail size={16} />
					<span>{$t.hero.cta}</span>
				</MagneticButton>

				<MagneticButton
					href={profile.github}
					target="_blank"
					rel="noopener noreferrer"
					className="enter-link flex items-center gap-2 border border-zinc-800 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-accent-500/50 hover:text-white 2xl:text-base"
				>
					<GithubIcon size={16} />
					<span>{$t.contact.github}</span>
				</MagneticButton>

				<span class="enter-link flex items-center gap-2 text-sm text-zinc-500">
					<MapPin size={14} />
					{profile.location}
				</span>
			</div>
		</div>
	</div>

	<a
		href="#about"
		class="enter-link absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-zinc-600 transition-colors hover:text-accent-400"
	>
		<span class="font-mono text-[11px] tracking-wider uppercase">{$t.hero.scroll}</span>
		<svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
			<path
				d="M8 4v12m0 0l-4-4m4 4l4-4"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
		</svg>
	</a>
</section>

<style>

	:global(#hero [data-magnetic]) {
		border-radius: var(--radius-card);
	}
</style>
