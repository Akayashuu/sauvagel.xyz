<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { t } from '$lib/i18n';
	import { cities } from '$lib/data/cities';
	import { Maximize2, Minimize2 } from 'lucide-svelte';
	import ScrollReveal from './ScrollReveal.svelte';

	let mapContainer: HTMLDivElement;
	let mapWrapper: HTMLDivElement;
	let expanded = $state(false);
	let mapInstance: import('leaflet').Map | null = null;

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			mapWrapper.requestFullscreen().then(() => {
				expanded = true;
				setTimeout(() => mapInstance?.invalidateSize(), 100);
			});
		} else {
			document.exitFullscreen().then(() => {
				expanded = false;
				setTimeout(() => mapInstance?.invalidateSize(), 100);
			});
		}
	}

	function onFullscreenChange() {
		if (!document.fullscreenElement) {
			expanded = false;
			setTimeout(() => mapInstance?.invalidateSize(), 100);
		}
	}

	const tagColors: Record<string, string> = {
		lived: '#a78bfa',
		studied: '#67e8f9',
		worked: '#c084fc',
		visited: '#94a3b8',
		layover: '#fbbf24',
	};

	const tagIcons: Record<string, string> = {
		lived: '🏠',
		studied: '🎓',
		worked: '💼',
		visited: '📍',
		layover: '✈️',
	};

	// Tag priority for choosing the main marker icon (first match wins)
	const tagPriority: string[] = ['lived', 'worked', 'studied', 'layover', 'visited'];

	function primaryTag(tags: string[]): string {
		return tagPriority.find((t) => tags.includes(t)) ?? 'visited';
	}

	onMount(async () => {
		document.addEventListener('fullscreenchange', onFullscreenChange);

		const L = await import('leaflet');
		await import('leaflet/dist/leaflet.css');

		const bounds = L.latLngBounds(cities.map((c) => [c.lat, c.lng]));

		const map = L.map(mapContainer, {
			zoomControl: false,
			attributionControl: false,
			scrollWheelZoom: true,
		});

		map.fitBounds(bounds, { padding: [40, 40] });

		L.control.zoom({ position: 'bottomright' }).addTo(map);

		L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
			{
				subdomains: 'abcd',
				maxZoom: 19,
			}
		).addTo(map);

		L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
			{
				subdomains: 'abcd',
				maxZoom: 19,
				pane: 'shadowPane',
			}
		).addTo(map);

		for (const city of cities) {
			const main = primaryTag(city.tags);
			const color = tagColors[main];
			const icon = tagIcons[main];

			const marker = L.divIcon({
				className: 'city-marker',
				html: `
					<div class="city-pin" style="--pin-color: ${color}">
						<span class="city-icon">${icon}</span>
						<div class="city-pulse" style="--pin-color: ${color}"></div>
					</div>
				`,
				iconSize: [40, 40],
				iconAnchor: [20, 20],
			});

			const tagsHtml = city.tags
				.map((tag) => `<span class="city-tag" style="color: ${tagColors[tag]}">${$t.travels.tags[tag]}</span>`)
				.join(' ');

			L.marker([city.lat, city.lng], { icon: marker })
				.addTo(map)
				.bindPopup(
					`<div class="city-popup">
						<strong>${city.name}</strong>
						<div class="city-tags">${tagsHtml}</div>
					</div>`,
					{
						className: 'dark-popup',
						closeButton: false,
					}
				);
		}

		mapInstance = map;
	});

	onDestroy(() => {
		document.removeEventListener('fullscreenchange', onFullscreenChange);
		mapInstance?.remove();
	});
</script>

<section id="travels" class="relative py-32 2xl:py-40">
	<div class="mx-auto max-w-5xl px-6 2xl:max-w-6xl">
		<ScrollReveal>
			<div class="mb-16 text-center">
				<span class="mb-4 inline-block font-mono text-sm tracking-widest text-primary-400 uppercase 2xl:text-base">
					{$t.travels.label}
				</span>
				<h2 class="text-4xl font-bold sm:text-5xl 2xl:text-6xl">
					<span class="bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
						{$t.travels.title}
					</span>
				</h2>
			</div>
		</ScrollReveal>

		<ScrollReveal delay={0.15}>
			<div
				bind:this={mapWrapper}
				class="glass overflow-hidden rounded-2xl transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5"
			>
				<div class="relative">
					<div bind:this={mapContainer} class="h-[450px] w-full sm:h-[500px] 2xl:h-[550px]"></div>

					<button
						onclick={toggleFullscreen}
						class="absolute top-3 right-3 z-[1000] flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/50 bg-zinc-900/80 text-zinc-400 backdrop-blur-sm transition-all hover:border-primary-500/30 hover:text-primary-400"
						aria-label={expanded ? 'Exit fullscreen' : 'Fullscreen'}
					>
						{#if expanded}
							<Minimize2 size={16} />
						{:else}
							<Maximize2 size={16} />
						{/if}
					</button>
				</div>

				<div class="flex flex-wrap items-center justify-center gap-4 border-t border-zinc-800/50 px-6 py-4">
					{#each Object.entries(tagIcons) as [tag, icon] (tag)}
						<div class="flex items-center gap-2 text-sm text-zinc-400">
							<span>{icon}</span>
							<span>{$t.travels.tags[tag]}</span>
						</div>
					{/each}
					<div class="ml-auto font-mono text-xs text-zinc-500">
						{cities.length} {$t.travels.cities}
					</div>
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>

<style>
	:global(.city-marker) {
		background: transparent !important;
		border: none !important;
	}

	:global(.city-pin) {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(24, 24, 27, 0.8);
		border: 2px solid var(--pin-color);
		box-shadow: 0 0 12px color-mix(in oklch, var(--pin-color) 40%, transparent);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	:global(.city-pin:hover) {
		transform: scale(1.2);
		box-shadow: 0 0 20px color-mix(in oklch, var(--pin-color) 60%, transparent);
	}

	:global(.city-icon) {
		font-size: 16px;
		line-height: 1;
	}

	:global(.city-pulse) {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		border: 1px solid var(--pin-color);
		opacity: 0;
		animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes ping {
		0% {
			transform: scale(1);
			opacity: 0.5;
		}
		75%,
		100% {
			transform: scale(1.6);
			opacity: 0;
		}
	}

	:global(.dark-popup .leaflet-popup-content-wrapper) {
		background: rgba(24, 24, 27, 0.9);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(63, 63, 70, 0.4);
		border-radius: 12px;
		color: #e4e4e7;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	:global(.dark-popup .leaflet-popup-tip) {
		background: rgba(24, 24, 27, 0.9);
		border: 1px solid rgba(63, 63, 70, 0.4);
		border-top: none;
		border-left: none;
	}

	:global(.city-popup) {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 4px 2px;
		font-family: 'Space Grotesk', sans-serif;
	}

	:global(.city-popup strong) {
		font-size: 14px;
		color: #f4f4f5;
	}

	:global(.city-tags) {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	:global(.city-tag) {
		font-size: 11px;
		font-family: 'JetBrains Mono', monospace;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	:global(.leaflet-control-zoom a) {
		background: rgba(24, 24, 27, 0.8) !important;
		backdrop-filter: blur(8px);
		color: #a1a1aa !important;
		border-color: rgba(63, 63, 70, 0.4) !important;
		transition: all 0.2s ease;
	}

	:global(.leaflet-control-zoom a:hover) {
		background: rgba(39, 39, 42, 0.9) !important;
		color: #e4e4e7 !important;
	}

	div:fullscreen {
		background: rgb(24, 24, 27);
		border-radius: 0;
		border: none;
	}

	div:fullscreen .relative {
		height: 100%;
	}

	:global(div:fullscreen .leaflet-container) {
		height: 100% !important;
	}
</style>
