<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		let animId: number;
		let lastFrame = 0;
		const FPS_INTERVAL = 1000 / 24;

		interface P { x: number; y: number; vx: number; vy: number; r: number; o: number }
		let particles: P[] = [];
		let W = 0, H = 0;

		function resize() {
			W = canvas.width = window.innerWidth;
			H = canvas.height = window.innerHeight;
			init();
		}

		function init() {
			const count = Math.min(Math.floor((W * H) / 25000), 60);
			particles = [];
			for (let i = 0; i < count; i++) {
				particles.push({
					x: Math.random() * W,
					y: Math.random() * H,
					vx: (Math.random() - 0.5) * 0.3,
					vy: (Math.random() - 0.5) * 0.3,
					r: Math.random() + 0.5,
					o: Math.random() * 0.3 + 0.1,
				});
			}
		}

		resize();
		window.addEventListener('resize', resize);

		function draw(ts: number) {
			animId = requestAnimationFrame(draw);
			if (ts - lastFrame < FPS_INTERVAL) return;
			lastFrame = ts;

			ctx.clearRect(0, 0, W, H);

			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				p.x += p.vx; p.y += p.vy;
				if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
				if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, 6.283);
				ctx.fillStyle = `rgba(168,130,255,${p.o})`;
				ctx.fill();

				for (let j = i + 1; j < particles.length; j++) {
					const q = particles[j];
					const dx = p.x - q.x, dy = p.y - q.y;
					const d2 = dx * dx + dy * dy;
					if (d2 < 14400) {
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(q.x, q.y);
						ctx.strokeStyle = `rgba(168,130,255,${0.06 * (1 - d2 / 14400)})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				}
			}
		}

		animId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas bind:this={canvas} class="pointer-events-none absolute inset-0 z-0" aria-hidden="true"></canvas>
