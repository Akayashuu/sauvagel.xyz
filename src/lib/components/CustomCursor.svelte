<script lang="ts">
	import { onMount } from 'svelte';

	let cursor: HTMLDivElement;
	let cursorDot: HTMLDivElement;
	let trail: HTMLCanvasElement;

	onMount(() => {
		if (window.matchMedia('(pointer: coarse)').matches) return;

		const ctx = trail.getContext('2d')!;
		let mouse = { x: -100, y: -100 };
		let pos = { x: -100, y: -100 };
		let points: { x: number; y: number; age: number }[] = [];
		let isHovering = false;
		let animId: number;
		let lastTrailDraw = 0;
		const TRAIL_FPS = 30;
		const TRAIL_INTERVAL = 1000 / TRAIL_FPS;

		function resize() {
			trail.width = window.innerWidth;
			trail.height = window.innerHeight;
		}
		resize();
		window.addEventListener('resize', resize);

		function handleMove(e: MouseEvent) {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			points.push({ x: e.clientX, y: e.clientY, age: 0 });
			if (points.length > 40) points.shift();
		}

		window.addEventListener('mousemove', handleMove, { passive: true });

		document.addEventListener('mouseenter', (e) => {
			if ((e.target as HTMLElement).closest('a, button, [data-magnetic]')) {
				isHovering = true;
				cursor.style.width = '48px';
				cursor.style.height = '48px';
				cursor.style.opacity = '0.4';
				cursor.style.borderColor = 'rgba(168, 130, 255, 0.8)';
			}
		}, true);

		document.addEventListener('mouseleave', (e) => {
			if ((e.target as HTMLElement).closest('a, button, [data-magnetic]')) {
				isHovering = false;
				cursor.style.width = '32px';
				cursor.style.height = '32px';
				cursor.style.opacity = '1';
				cursor.style.borderColor = 'rgba(168, 130, 255, 0.5)';
			}
		}, true);

		function loop(ts: number) {
			pos.x += (mouse.x - pos.x) * 0.12;
			pos.y += (mouse.y - pos.y) * 0.12;
			const hw = isHovering ? 24 : 16;
			cursor.style.transform = `translate3d(${pos.x - hw}px, ${pos.y - hw}px, 0)`;

			cursorDot.style.transform = `translate3d(${mouse.x - 3}px, ${mouse.y - 3}px, 0)`;

			if (ts - lastTrailDraw >= TRAIL_INTERVAL) {
				lastTrailDraw = ts;

				ctx.clearRect(0, 0, trail.width, trail.height);
				points.forEach((p) => p.age++);
				points = points.filter((p) => p.age < 25);

				if (points.length > 2) {
					ctx.beginPath();
					ctx.moveTo(points[0].x, points[0].y);

					for (let i = 1; i < points.length - 1; i++) {
						const xc = (points[i].x + points[i + 1].x) / 2;
						const yc = (points[i].y + points[i + 1].y) / 2;
						ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
					}

					const gradient = ctx.createLinearGradient(
						points[0].x, points[0].y,
						points[points.length - 1].x, points[points.length - 1].y
					);
					gradient.addColorStop(0, 'rgba(168, 130, 255, 0)');
					gradient.addColorStop(0.5, 'rgba(168, 130, 255, 0.15)');
					gradient.addColorStop(1, 'rgba(103, 232, 249, 0.3)');

					ctx.strokeStyle = gradient;
					ctx.lineWidth = 2;
					ctx.lineCap = 'round';
					ctx.stroke();
				}
			}

			animId = requestAnimationFrame(loop);
		}

		animId = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', handleMove);
		};
	});
</script>

<canvas bind:this={trail} class="pointer-events-none fixed inset-0 z-9998 hidden md:block" aria-hidden="true"></canvas>
<div
	bind:this={cursor}
	class="pointer-events-none fixed top-0 left-0 z-9999 hidden h-8 w-8 rounded-full border border-primary-400/50 md:block"
	style="transition: width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s; will-change: transform;"
	aria-hidden="true"
></div>
<div
	bind:this={cursorDot}
	class="pointer-events-none fixed top-0 left-0 z-9999 hidden h-1.5 w-1.5 rounded-full bg-primary-400 md:block"
	style="will-change: transform;"
	aria-hidden="true"
></div>
