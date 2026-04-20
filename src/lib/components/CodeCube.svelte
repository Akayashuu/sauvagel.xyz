<script lang="ts">
	import { onMount } from 'svelte';
	import type * as THREE from 'three';

	let container: HTMLDivElement;

	const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*(){}[]<>/=+';

	const CODE_SNIPPETS = [
		'const server = express()',
		'fn main() -> Result<()>',
		'SELECT * FROM users',
		'git push origin main',
		'docker compose up -d',
		'async function deploy()',
		'impl Iterator for Node',
		'export default config',
		'pipe(filter, map, reduce)',
		'return Response.json(data)',
		'class NeuralNetwork:',
		'kubectl apply -f pod.yml',
		'ssh deploy@production',
		'interface Props<T>',
		'await prisma.user.create',
		'def train(self, epochs):',
	];

	onMount(() => {
		let destroyed = false;
		let animationId: number;
		let isVisible = true;

		const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0 });
		observer.observe(container);

		(async () => {
			const THREE = await import('three');
			if (destroyed) return;

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
			camera.position.set(0, 0, 8);

			const isMobile = window.matchMedia('(pointer: coarse)').matches;

			const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
			renderer.setSize(container.clientWidth, container.clientHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
			container.appendChild(renderer.domElement);

			const matrixGreen = new THREE.Color(0x00ff41);
			const matrixBright = new THREE.Color(0xccffcc);

			const RAIN_COLS = isMobile ? 15 : 40;
			const CHARS_PER_COL = isMobile ? 10 : 20;
			const TOTAL_DROPS = RAIN_COLS * CHARS_PER_COL;

			const ATLAS_COLS = 16;
			const ATLAS_ROWS = Math.ceil(MATRIX_CHARS.length / ATLAS_COLS);
			const CELL = 64;
			const atlasCanvas = document.createElement('canvas');
			atlasCanvas.width = ATLAS_COLS * CELL;
			atlasCanvas.height = ATLAS_ROWS * CELL;
			const atlasCtx = atlasCanvas.getContext('2d')!;
			atlasCtx.font = '48px "JetBrains Mono", monospace';
			atlasCtx.textAlign = 'center';
			atlasCtx.textBaseline = 'middle';
			atlasCtx.fillStyle = '#00ff41';
			atlasCtx.shadowColor = '#00ff41';
			atlasCtx.shadowBlur = 6;
			for (let i = 0; i < MATRIX_CHARS.length; i++) {
				const ac = i % ATLAS_COLS;
				const ar = Math.floor(i / ATLAS_COLS);
				atlasCtx.fillText(MATRIX_CHARS[i], ac * CELL + CELL / 2, ar * CELL + CELL / 2);
			}
			const atlasTexture = new THREE.CanvasTexture(atlasCanvas);
			atlasTexture.minFilter = THREE.LinearFilter;

			const rainMat = new THREE.ShaderMaterial({
				uniforms: {
					atlas: { value: atlasTexture },
					atlasSize: { value: new THREE.Vector2(ATLAS_COLS, ATLAS_ROWS) },
				},
				vertexShader: `
					attribute float charIndex;
					attribute float charOpacity;
					attribute float charBright;
					uniform vec2 atlasSize;
					varying vec2 vUV;
					varying float vOpacity;
					varying float vBright;
					void main() {
						float ac = mod(charIndex, atlasSize.x);
						float ar = floor(charIndex / atlasSize.x);
						vUV = (vec2(ac, ar) + uv) / atlasSize;
						vOpacity = charOpacity;
						vBright = charBright;
						gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: `
					uniform sampler2D atlas;
					varying vec2 vUV;
					varying float vOpacity;
					varying float vBright;
					void main() {
						vec4 tex = texture2D(atlas, vUV);
						vec3 color = mix(tex.rgb, vec3(1.0), vBright * 0.8);
						float a = tex.a * vOpacity;
						if (a < 0.01) discard;
						gl_FragColor = vec4(color, a);
					}
				`,
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
				side: THREE.DoubleSide,
			});

			const rainGeo = new THREE.PlaneGeometry(0.35, 0.35);
			const charIndices = new Float32Array(TOTAL_DROPS);
			const charOpacities = new Float32Array(TOTAL_DROPS);
			const charBrights = new Float32Array(TOTAL_DROPS);
			rainGeo.setAttribute('charIndex', new THREE.InstancedBufferAttribute(charIndices, 1));
			rainGeo.setAttribute('charOpacity', new THREE.InstancedBufferAttribute(charOpacities, 1));
			rainGeo.setAttribute('charBright', new THREE.InstancedBufferAttribute(charBrights, 1));

			const rainMesh = new THREE.InstancedMesh(rainGeo, rainMat, TOTAL_DROPS);
			scene.add(rainMesh);

			interface ColData {
				speed: number;
				x: number;
				z: number;
				headY: number;
				baseIdx: number;
			}
			const columns: ColData[] = [];
			const matrixCharsLen = MATRIX_CHARS.length;

			const matArr = rainMesh.instanceMatrix.array as Float32Array;
			for (let i = 0; i < TOTAL_DROPS; i++) {
				const o = i * 16;
				matArr[o] = 1; matArr[o + 5] = 1; matArr[o + 10] = 1; matArr[o + 15] = 1;
			}

			for (let col = 0; col < RAIN_COLS; col++) {
				const x = (col / RAIN_COLS - 0.5) * 28 + (Math.random() - 0.5) * 0.5;
				const z = -3 - Math.random() * 8;
				const speed = 0.02 + Math.random() * 0.04;
				const startY = Math.random() * 20;
				const baseIdx = col * CHARS_PER_COL;

				columns.push({ speed, x, z, headY: startY, baseIdx });

				for (let row = 0; row < CHARS_PER_COL; row++) {
					const idx = baseIdx + row;
					const isHead = row === 0;
					charIndices[idx] = Math.floor(Math.random() * matrixCharsLen);
					charOpacities[idx] = isHead ? 1.0 : Math.max(0.05, 1 - row / CHARS_PER_COL);
					charBrights[idx] = isHead ? 1.0 : 0.0;
					const o = idx * 16;
					matArr[o + 12] = x;
					matArr[o + 13] = startY - row * 0.4;
					matArr[o + 14] = z;
				}
			}
			rainMesh.instanceMatrix.needsUpdate = true;

			const cubeSize = 1.8;
			const cubeGroup = new THREE.Group();
			scene.add(cubeGroup);

			const edgesGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
			const edgesMat = new THREE.LineBasicMaterial({ color: matrixGreen, transparent: true, opacity: 0.7 });
			const cubeEdges = new THREE.LineSegments(new THREE.EdgesGeometry(edgesGeo), edgesMat);
			cubeGroup.add(cubeEdges);

			cubeGroup.add(new THREE.Mesh(
				new THREE.BoxGeometry(cubeSize * 0.98, cubeSize * 0.98, cubeSize * 0.98),
				new THREE.MeshBasicMaterial({ color: matrixGreen, transparent: true, opacity: 0.04, side: THREE.BackSide, blending: THREE.AdditiveBlending }),
			));

			const glowGeo = new THREE.SphereGeometry(0.08, 8, 8);
			const glowMat = new THREE.MeshBasicMaterial({ color: matrixBright, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
			for (const [cx, cy, cz] of [[-1,-1,-1],[-1,-1,1],[-1,1,-1],[-1,1,1],[1,-1,-1],[1,-1,1],[1,1,-1],[1,1,1]]) {
				const glow = new THREE.Mesh(glowGeo, glowMat);
				glow.position.set(cx * cubeSize * 0.5, cy * cubeSize * 0.5, cz * cubeSize * 0.5);
				cubeEdges.add(glow);
			}

			const cubeCodeLines: { mesh: THREE.Mesh; speed: number; phase: number }[] = [];
			for (let i = 0; i < 10; i++) {
				const c = document.createElement('canvas');
				c.width = 512; c.height = 32;
				const ctx = c.getContext('2d')!;
				ctx.font = '16px "JetBrains Mono", monospace';
				ctx.fillStyle = '#00ff41';
				ctx.shadowColor = '#00ff41';
				ctx.shadowBlur = 10;
				ctx.fillText(CODE_SNIPPETS[i % CODE_SNIPPETS.length], 8, 22);
				const texture = new THREE.CanvasTexture(c);
				texture.minFilter = THREE.LinearFilter;
				const mesh = new THREE.Mesh(
					new THREE.PlaneGeometry(1.4, 0.09),
					new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
				);
				mesh.position.set((Math.random() - 0.5) * 0.8, -0.8 + (i / 9) * 1.6, (Math.random() - 0.5) * 0.6);
				cubeGroup.add(mesh);
				cubeCodeLines.push({ mesh, speed: 0.003 + Math.random() * 0.004, phase: Math.random() * Math.PI * 2 });
			}

			const scanMat = new THREE.MeshBasicMaterial({ color: matrixGreen, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false });
			const scanLine = new THREE.Mesh(new THREE.PlaneGeometry(30, 0.04), scanMat);
			scanLine.position.z = -1;
			scene.add(scanLine);

			const mouse = { x: 0, y: 0 };
			function onMouseMove(e: MouseEvent) {
				const rect = container.getBoundingClientRect();
				mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
				mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
			}
			container.addEventListener('mousemove', onMouseMove);

			function onResize() {
				camera.aspect = container.clientWidth / container.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(container.clientWidth, container.clientHeight);
			}
			window.addEventListener('resize', onResize);

			let frame = 0;
			let lastTime = 0;
			const charIndexAttr = rainGeo.getAttribute('charIndex') as THREE.InstancedBufferAttribute;

			function animate(timestamp: number) {
				if (destroyed) return;
				animationId = requestAnimationFrame(animate);
				if (!isVisible || document.hidden) return;
				if (timestamp - lastTime < 33) return;
				lastTime = timestamp;
				frame++;

				const time = frame * 0.01;
				let charsChanged = false;

				for (let c = 0; c < columns.length; c++) {
					const col = columns[c];
					col.headY -= col.speed;

					if (col.headY < -12) {
						col.headY = 12 + Math.random() * 5;
						for (let row = 0; row < CHARS_PER_COL; row++) {
							if (Math.random() < 0.3) {
								charIndices[col.baseIdx + row] = Math.floor(Math.random() * matrixCharsLen);
								charsChanged = true;
							}
						}
					}

					if (frame % 4 === 0 && Math.random() < 0.05) {
						const row = Math.floor(Math.random() * CHARS_PER_COL);
						charIndices[col.baseIdx + row] = Math.floor(Math.random() * matrixCharsLen);
						charsChanged = true;
					}

					for (let row = 0; row < CHARS_PER_COL; row++) {
						const o = (col.baseIdx + row) * 16;
						matArr[o + 13] = col.headY - row * 0.4;
					}
				}

				rainMesh.instanceMatrix.needsUpdate = true;
				if (charsChanged) charIndexAttr.needsUpdate = true;

				cubeGroup.rotation.y += (mouse.x * 0.5 + time * 0.12 - cubeGroup.rotation.y) * 0.03;
				cubeGroup.rotation.x += (mouse.y * 0.3 + Math.sin(time * 0.25) * 0.1 - cubeGroup.rotation.x) * 0.03;
				edgesMat.opacity = 0.5 + Math.sin(time * 1.2) * 0.2;

				for (const line of cubeCodeLines) {
					line.mesh.position.y += line.speed;
					line.mesh.position.x += Math.sin(time + line.phase) * 0.001;
					(line.mesh.material as THREE.MeshBasicMaterial).opacity = Math.sin(((line.mesh.position.y + 0.9) / 1.8) * Math.PI) * 0.6;
					if (line.mesh.position.y > 0.9) {
						line.mesh.position.y = -0.9;
						line.mesh.position.x = (Math.random() - 0.5) * 0.8;
					}
				}

				scanLine.position.y = Math.sin(time * 0.5) * 6;
				scanMat.opacity = 0.08 + Math.sin(time * 2) * 0.04;

				renderer.render(scene, camera);
			}

			animationId = requestAnimationFrame(animate);
		})();

		return () => {
			destroyed = true;
			observer.disconnect();
			if (animationId) cancelAnimationFrame(animationId);
			while (container.firstChild) container.removeChild(container.firstChild);
		};
	});
</script>

<div bind:this={container} class="h-full w-full"></div>

<style>
	div {
		background: repeating-linear-gradient(
			to bottom,
			transparent 0px,
			transparent 2px,
			rgba(0, 255, 65, 0.015) 2px,
			rgba(0, 255, 65, 0.015) 4px
		);
	}
</style>
