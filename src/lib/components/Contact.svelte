<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { t } from '$lib/i18n';
	import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-svelte';
	import GithubIcon from './GithubIcon.svelte';
	import ScrollReveal from './ScrollReveal.svelte';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section id="contact" class="relative py-28 2xl:py-36">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<SectionHeader label={$t.contact.label} title={$t.contact.title} />

		<ScrollReveal delay={0.1}>
			<p class="mb-10 max-w-lg text-zinc-400 2xl:text-lg">{$t.contact.subtitle}</p>
		</ScrollReveal>

		<ScrollReveal delay={0.15}>
			<div class="grid max-w-4xl gap-3 sm:grid-cols-2">
				<a
					href="mailto:{profile.email}"
					class="surface surface-hover group flex items-center gap-4 p-4 2xl:p-5"
				>
					<Mail size={18} class="shrink-0 text-primary-400" />
					<div class="min-w-0 flex-1">
						<p class="font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
							{$t.contact.email}
						</p>
						<p class="truncate text-sm font-medium text-zinc-200 2xl:text-base">{profile.email}</p>
					</div>
					<ArrowUpRight
						size={16}
						class="shrink-0 text-zinc-600 transition-colors group-hover:text-accent-400"
					/>
				</a>

				<a
					href="tel:{profile.phone.replace(/\s/g, '')}"
					class="surface surface-hover group flex items-center gap-4 p-4 2xl:p-5"
				>
					<Phone size={18} class="shrink-0 text-primary-400" />
					<div class="min-w-0 flex-1">
						<p class="font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
							{$t.contact.phone}
						</p>
						<p class="truncate text-sm font-medium text-zinc-200 2xl:text-base">{profile.phone}</p>
					</div>
					<ArrowUpRight
						size={16}
						class="shrink-0 text-zinc-600 transition-colors group-hover:text-accent-400"
					/>
				</a>

				<a
					href={profile.github}
					target="_blank"
					rel="noopener noreferrer"
					class="surface surface-hover group flex items-center gap-4 p-4 2xl:p-5"
				>
					<GithubIcon size={18} />
					<div class="min-w-0 flex-1">
						<p class="font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
							{$t.contact.github}
						</p>
						<p class="truncate text-sm font-medium text-zinc-200 2xl:text-base">
							{profile.githubUsername}
						</p>
					</div>
					<ArrowUpRight
						size={16}
						class="shrink-0 text-zinc-600 transition-colors group-hover:text-accent-400"
					/>
				</a>

				<div class="surface flex items-center gap-4 p-4 2xl:p-5">
					<MapPin size={18} class="shrink-0 text-primary-400" />
					<div class="min-w-0 flex-1">
						<p class="font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
							{$t.contact.location}
						</p>
						<p class="truncate text-sm font-medium text-zinc-200 2xl:text-base">{profile.location}</p>
					</div>
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>

<footer class="border-t border-zinc-800 py-8 2xl:py-12">
	<div class="mx-auto max-w-7xl px-6 2xl:max-w-400">
		<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<a href="/#hero" class="flex items-center gap-2.5 text-sm text-zinc-500">
				<img src="/logo.svg" alt="" width="20" height="20" />
				<span class="font-mono">&copy; {new Date().getFullYear()} Léo Sauvage</span>
			</a>
			<a
				href="/privacy"
				class="text-sm text-zinc-500 transition-colors hover:text-accent-400 2xl:text-base"
			>
				{$t.footer.privacy}
			</a>
		</div>
	</div>
</footer>
