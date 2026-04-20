<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X, Globe } from 'lucide-svelte';
	import { t, locale } from '$lib/i18n';

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	const linkKeys = [
		{ key: 'home' as const, href: '/#hero' },
		{ key: 'about' as const, href: '/#about' },
		{ key: 'experience' as const, href: '/#experience' },
		{ key: 'skills' as const, href: '/#skills' },
		{ key: 'projects' as const, href: '/#projects' },
		{ key: 'education' as const, href: '/#education' },
		{ key: 'travels' as const, href: '/#travels' },
		{ key: 'contact' as const, href: '/#contact' },
	];

	onMount(() => {
		const handler = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});

	function handleClick() {
		mobileOpen = false;
	}

	function toggleLocale() {
		locale.update((l) => (l === 'fr' ? 'en' : 'fr'));
	}
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 {scrolled
		? 'glass shadow-lg shadow-primary-500/5'
		: 'bg-transparent'}"
>
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<div class="flex h-16 items-center justify-between">
			<a href="/#hero" class="font-mono text-sm font-bold tracking-wider text-zinc-300 transition-colors hover:text-primary-400">
				sauvagel.xyz
			</a>

			<div class="hidden items-center gap-1 md:flex">
				{#each linkKeys as link (link.key)}
					<a
						href={link.href}
						class="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-all hover:bg-zinc-800/50 hover:text-primary-400"
					>
						{$t.nav[link.key]}
					</a>
				{/each}

				<button
					onclick={toggleLocale}
					class="ml-2 flex items-center gap-1.5 rounded-lg border border-zinc-700/50 px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:border-primary-500/30 hover:text-primary-400"
					aria-label="Switch language"
				>
					<Globe size={14} />
					{$locale === 'fr' ? 'EN' : 'FR'}
				</button>
			</div>

			<div class="flex items-center gap-2 md:hidden">
				<button
					onclick={toggleLocale}
					class="flex items-center gap-1 rounded-lg border border-zinc-700/50 px-2 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:text-primary-400"
					aria-label="Switch language"
				>
					<Globe size={14} />
					{$locale === 'fr' ? 'EN' : 'FR'}
				</button>
				<button
					class="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-white"
					onclick={() => (mobileOpen = !mobileOpen)}
					aria-label="Menu"
				>
					{#if mobileOpen}
						<X size={20} />
					{:else}
						<Menu size={20} />
					{/if}
				</button>
			</div>
		</div>
	</div>

	{#if mobileOpen}
		<div class="glass border-t border-zinc-800/50 md:hidden">
			<div class="space-y-1 px-6 py-4">
				{#each linkKeys as link (link.key)}
					<a
						href={link.href}
						class="block rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-primary-400"
						onclick={handleClick}
					>
						{$t.nav[link.key]}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
