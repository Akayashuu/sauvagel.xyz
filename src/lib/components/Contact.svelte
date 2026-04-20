<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import { Mail, MapPin, Phone, ArrowUpRight, Heart } from 'lucide-svelte';
	import GithubIcon from './GithubIcon.svelte';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section id="contact" class="relative py-20 sm:py-32 2xl:py-40">
	<div class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-primary-500/2 to-transparent"></div>

	<div class="relative mx-auto max-w-4xl px-6 2xl:max-w-5xl">
		<ScrollReveal>
			<div class="mb-16 text-center">
				<span class="mb-4 inline-block font-mono text-sm tracking-widest text-primary-400 uppercase 2xl:text-base">{$t.contact.label}</span>
				<h2 class="text-4xl font-bold sm:text-5xl 2xl:text-6xl">
					<span class="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
						{$t.contact.title}
					</span>
				</h2>
				<p class="mx-auto mt-4 max-w-lg text-zinc-400 2xl:text-lg">
					{$t.contact.subtitle}
				</p>
			</div>
		</ScrollReveal>

		<ScrollReveal delay={0.2}>
			<div class="glass mx-auto max-w-2xl rounded-2xl p-4 sm:p-8 2xl:max-w-3xl 2xl:p-10">
				<div class="grid gap-3 sm:grid-cols-2 sm:gap-4">
					<a
						href="mailto:{profile.email}"
						class="group flex items-center gap-4 rounded-xl border border-zinc-800/50 p-4 transition-all hover:border-primary-500/30 hover:bg-primary-500/5 2xl:p-5"
					>
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-400 transition-all group-hover:bg-primary-500/20 2xl:h-12 2xl:w-12">
							<Mail size={18} />
						</div>
						<div class="min-w-0 flex-1">
							<p class="text-xs text-zinc-500 2xl:text-sm">{$t.contact.email}</p>
							<p class="truncate text-sm font-medium text-zinc-300 2xl:text-base">{profile.email}</p>
						</div>
						<ArrowUpRight size={16} class="shrink-0 text-zinc-600 transition-all group-hover:text-primary-400" />
					</a>

					<a
						href="tel:{profile.phone.replace(/\s/g, '')}"
						class="group flex items-center gap-4 rounded-xl border border-zinc-800/50 p-4 transition-all hover:border-primary-500/30 hover:bg-primary-500/5 2xl:p-5"
					>
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-400 transition-all group-hover:bg-primary-500/20 2xl:h-12 2xl:w-12">
							<Phone size={18} />
						</div>
						<div class="min-w-0 flex-1">
							<p class="text-xs text-zinc-500 2xl:text-sm">{$t.contact.phone}</p>
							<p class="truncate text-sm font-medium text-zinc-300 2xl:text-base">{profile.phone}</p>
						</div>
						<ArrowUpRight size={16} class="shrink-0 text-zinc-600 transition-all group-hover:text-primary-400" />
					</a>

					<a
						href={profile.github}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-4 rounded-xl border border-zinc-800/50 p-4 transition-all hover:border-primary-500/30 hover:bg-primary-500/5 2xl:p-5"
					>
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-400 transition-all group-hover:bg-primary-500/20 2xl:h-12 2xl:w-12">
							<GithubIcon size={18} />
						</div>
						<div class="min-w-0 flex-1">
							<p class="text-xs text-zinc-500 2xl:text-sm">{$t.contact.github}</p>
							<p class="truncate text-sm font-medium text-zinc-300 2xl:text-base">{profile.githubUsername}</p>
						</div>
						<ArrowUpRight size={16} class="shrink-0 text-zinc-600 transition-all group-hover:text-primary-400" />
					</a>

					<div class="group flex items-center gap-4 rounded-xl border border-zinc-800/50 p-4 2xl:p-5">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-400 2xl:h-12 2xl:w-12">
							<MapPin size={18} />
						</div>
						<div class="min-w-0 flex-1">
							<p class="text-xs text-zinc-500 2xl:text-sm">{$t.contact.location}</p>
							<p class="truncate text-sm font-medium text-zinc-300 2xl:text-base">{profile.location}</p>
						</div>
					</div>
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>

<footer class="border-t border-zinc-800/50 py-8 2xl:py-12">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<p class="flex items-center gap-1 text-sm text-zinc-500 2xl:text-base">
				&copy; {new Date().getFullYear()} Léo Sauvage
			</p>
			<p class="flex items-center gap-1 text-sm text-zinc-600 2xl:text-base">
				{$t.footer.madeWith} <Heart size={14} class="text-primary-500" /> {$t.footer.and}
			</p>
		</div>
	</div>
</footer>
