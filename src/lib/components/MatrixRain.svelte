<script lang="ts">
	import { onMount } from 'svelte';

	let { color = '#7c3aed' }: { color?: string } = $props();
	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d', { alpha: false });
		if (!ctx) return;

		const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[];=+-*&@#';
		const charArray = chars.split('');
		const charLen = charArray.length;
		const fontSize = 16;
		const font = `${fontSize}px monospace`;
		let columns: number;
		let drops: number[];

		function hexToRgb(hex: string) {
			const r = Number.parseInt(hex.slice(1, 3), 16);
			const g = Number.parseInt(hex.slice(3, 5), 16);
			const b = Number.parseInt(hex.slice(5, 7), 16);
			return { r, g, b };
		}

		const rgb = hexToRgb(color);
		const fadeStyle = 'rgba(0, 0, 0, 0.06)';
		const headStyle = 'rgba(255, 255, 255, 0.9)';
		const bodyStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
		const tailStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;

		function resize() {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			columns = Math.floor(canvas.width / fontSize);
			drops = Array.from({ length: columns }, () => Math.random() * -50);
		}

		resize();

		let resizeTimer: ReturnType<typeof setTimeout>;
		function debouncedResize() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(resize, 150);
		}
		window.addEventListener('resize', debouncedResize);

		let rafId: number;
		let lastTime = 0;
		const frameInterval = 40;

		function draw(timestamp: number) {
			rafId = requestAnimationFrame(draw);

			if (timestamp - lastTime < frameInterval) return;
			lastTime = timestamp;

			if (document.hidden || !ctx) return;

			const w = canvas.width;
			const h = canvas.height;

			ctx.fillStyle = fadeStyle;
			ctx.fillRect(0, 0, w, h);
			ctx.font = font;

			for (let i = 0; i < drops.length; i++) {
				const y = drops[i] * fontSize;
				const x = i * fontSize;

				ctx.fillStyle = headStyle;
				ctx.fillText(charArray[(Math.random() * charLen) | 0], x, y);

				ctx.fillStyle = bodyStyle;
				ctx.fillText(charArray[(Math.random() * charLen) | 0], x, y - fontSize);

				ctx.fillStyle = tailStyle;
				ctx.fillText(charArray[(Math.random() * charLen) | 0], x, y - fontSize * 2);

				if (y > h && Math.random() > 0.96) {
					drops[i] = 0;
				}
				drops[i] += 0.6;
			}
		}

		rafId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(rafId);
			clearTimeout(resizeTimer);
			window.removeEventListener('resize', debouncedResize);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none absolute inset-0 h-full w-full opacity-25"
></canvas>
