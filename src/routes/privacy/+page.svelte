<script lang="ts">
	import { t } from '$lib/i18n';
	import { profile } from '$lib/data/profile';
</script>

<svelte:head>
	<title>{$t.privacy.metaTitle} | Léo Sauvage</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-3xl px-6 py-24 2xl:py-32">
	<a
		href="/"
		class="text-sm text-zinc-500 transition-colors hover:text-primary-400"
	>
		&larr; {$t.privacy.back}
	</a>

	<h1 class="mt-6 text-3xl font-bold text-zinc-100 2xl:text-4xl">{$t.privacy.title}</h1>
	<p class="mt-2 text-sm text-zinc-600">{$t.privacy.updated}</p>

	<p class="mt-8 text-zinc-400 leading-relaxed">{$t.privacy.intro}</p>

	<h2 class="mt-10 text-xl font-semibold text-zinc-200">{$t.privacy.cookiesTitle}</h2>
	<p class="mt-3 text-zinc-400 leading-relaxed">{$t.privacy.cookies}</p>

	<h2 class="mt-10 text-xl font-semibold text-zinc-200">{$t.privacy.analyticsTitle}</h2>
	<!-- eslint-disable-next-line svelte/no-at-html-tags — contenu i18n statique, pas d'entrée utilisateur -->
	<p class="mt-3 text-zinc-400 leading-relaxed">{@html $t.privacy.analytics}</p>
	<p class="mt-3 text-zinc-400 leading-relaxed">{$t.privacy.ip}</p>

	<h2 class="mt-10 text-xl font-semibold text-zinc-200">{$t.privacy.rightsTitle}</h2>
	<p class="mt-3 text-zinc-400 leading-relaxed">
		{$t.privacy.rights}
		<a
			href="mailto:{profile.email}"
			class="text-primary-400 underline underline-offset-4 hover:text-primary-300"
		>
			{profile.email}
		</a>.
	</p>
</section>
