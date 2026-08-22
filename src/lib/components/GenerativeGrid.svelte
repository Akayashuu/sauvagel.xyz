<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * La grille déréglée : socle graphique unique du site.
	 *
	 * - `hero`  : plein écran, désordre croissant vers le bas, apaisée par le pointeur
	 * - `rail`  : bande de séparation, désordre croissant vers les bords
	 * - `thumb` : vignette de projet, désordre croissant vers la droite, figée
	 *
	 * `hero` est le seul mode animé, et uniquement après une vraie interaction :
	 * au chargement la page reste statique, donc le LCP ne paie rien.
	 */
	type Mode = 'hero' | 'rail' | 'thumb';

	let {
		mode = 'thumb',
		seed = 'sauvagel',
		step = 26,
		interactive = false,
		class: className = ''
	}: {
		mode?: Mode;
		seed?: string;
		step?: number;
		interactive?: boolean;
		class?: string;
	} = $props();

	const VIOLET = '155, 125, 250';
	const TURQUOISE = '64, 214, 200';

	let canvas: HTMLCanvasElement;
	let host: HTMLDivElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const animated = interactive && !reduced;

		let width = 0;
		let height = 0;
		let pointerX = -9999;
		let pointerY = -9999;
		let tick = 0;
		let frame = 0;
		let awake = false;

		function measure() {
			const rect = canvas.getBoundingClientRect();
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.max(1, Math.round(width * ratio));
			canvas.height = Math.max(1, Math.round(height * ratio));
			ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
		}

		// Bruit déterministe : même graine, même dessin d'une visite à l'autre.
		let hashState = 2166136261;
		for (let i = 0; i < seed.length; i++) {
			hashState ^= seed.charCodeAt(i);
			hashState = Math.imul(hashState, 16777619);
		}
		const base = hashState >>> 0;

		function noise(i: number, j: number) {
			const n = Math.sin(i * 12.9898 + j * 78.233 + (base % 1000) * 0.017) * 43758.5453;
			return n - Math.floor(n);
		}

		function draw() {
			ctx!.clearRect(0, 0, width, height);
			const cols = Math.ceil(width / step);
			const rows = Math.ceil(height / step);

			for (let j = 0; j < rows; j++) {
				for (let i = 0; i < cols; i++) {
					const x = i * step + step / 2;
					const y = j * step + step / 2;

					let ordered: number;
					if (mode === 'hero') ordered = Math.pow(j / rows, 1.35);
					else if (mode === 'thumb') ordered = Math.pow(i / cols, 1.5);
					else ordered = Math.abs(x / width - 0.5) * 2;

					const calm =
						animated && pointerX > -9998
							? Math.max(0, 1 - Math.hypot(x - pointerX, y - pointerY) / 200)
							: 0;

					const chaos = ordered * 1.6 * (1 - calm);
					const n = noise(i, j);
					const wobble = animated ? Math.sin(tick * 0.006 + i * 0.35 + j * 0.5) : 0;
					const size = step * 0.46 * (1 + (n - 0.5) * chaos * 0.8);

					ctx!.save();
					ctx!.translate(x, y);
					ctx!.rotate((n - 0.5) * chaos * 1.2 + wobble * chaos * 0.16);

					const highlight = calm > 0.02 || n > 0.965;
					ctx!.strokeStyle = highlight
						? `rgba(${TURQUOISE}, ${calm > 0.02 ? 0.14 + calm * 0.6 : 0.5})`
						: `rgba(${VIOLET}, ${0.08 + ordered * 0.24})`;
					ctx!.lineWidth = 1;
					ctx!.strokeRect(-size / 2, -size / 2, size, size);
					ctx!.restore();
				}
			}
		}

		function loop() {
			tick++;
			draw();
			// Mise en veille dès que le pointeur a quitté la zone : plus de pointeur,
			// plus rien à animer, donc on rend la main au navigateur.
			if (pointerX < -9998) {
				awake = false;
				frame = 0;
				return;
			}
			frame = requestAnimationFrame(loop);
		}

		function wake() {
			if (awake || document.hidden) return;
			awake = true;
			frame = requestAnimationFrame(loop);
		}

		measure();
		draw();

		const onResize = () => {
			measure();
			draw();
		};
		window.addEventListener('resize', onResize, { passive: true });

		function onPointerMove(event: PointerEvent) {
			const rect = canvas.getBoundingClientRect();
			pointerX = event.clientX - rect.left;
			pointerY = event.clientY - rect.top;
			wake();
		}
		function onPointerLeave() {
			pointerX = -9999;
			pointerY = -9999;
		}

		if (animated) {
			host.addEventListener('pointermove', onPointerMove, { passive: true });
			host.addEventListener('pointerleave', onPointerLeave, { passive: true });
		}

		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('resize', onResize);
			if (animated) {
				host.removeEventListener('pointermove', onPointerMove);
				host.removeEventListener('pointerleave', onPointerLeave);
			}
		};
	});
</script>

<div bind:this={host} class="absolute inset-0 {className}" aria-hidden="true">
	<canvas bind:this={canvas} class="h-full w-full"></canvas>
</div>
