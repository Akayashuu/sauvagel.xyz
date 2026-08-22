<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Takt } from '@vskstudio/takt-svelte';
	import { t, locale } from '$lib/i18n';
	let { children } = $props();

	$effect(() => {
		document.documentElement.lang = $locale;
	});
</script>

<svelte:head>
	<title>Léo Sauvage | {$t.profile.title}</title>
	<meta name="description" content="{$locale === 'fr' ? 'Léo Sauvage — Développeur Full Stack spécialisé TypeScript, Node.js, Svelte et systèmes distribués.' : 'Léo Sauvage — Full Stack Developer specializing in TypeScript, Node.js, Svelte and distributed systems.'}" />
</svelte:head>

<Takt domain="sauvagel.xyz" endpoint="/_takt/api/event" outbound files />

<Navbar />
<main>
	{@render children()}
</main>
