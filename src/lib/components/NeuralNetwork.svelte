<script lang="ts">
	import { onMount } from 'svelte';
	import type * as THREE from 'three';

	let container: HTMLDivElement;

	onMount(() => {
		let destroyed = false;
		let animationId: number;
		let isVisible = true;

		const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0 });
		observer.observe(container);

		(async () => {
			const THREE = await import('three');

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
			camera.position.z = 30;

			const isMobile = window.matchMedia('(pointer: coarse)').matches;

			const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'low-power' : 'default' });
			renderer.setSize(container.clientWidth, container.clientHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
			container.appendChild(renderer.domElement);

			const purple = new THREE.Color('oklch(0.68 0.17 280)').convertSRGBToLinear();
			const cyan = new THREE.Color('oklch(0.78 0.15 190)').convertSRGBToLinear();
			const white = new THREE.Color(0xffffff);

			const LAYERS = 5;
			const nodesPerLayer = isMobile ? [5, 10, 14, 10, 5] : [10, 18, 24, 18, 10];
			const layerSpacing = 10;

			interface Node {
				position: THREE.Vector3;
				basePosition: THREE.Vector3;
				layer: number;
				velocity: THREE.Vector3;
			}

			const nodes: Node[] = [];
			const nodeGroup = new THREE.Group();
			scene.add(nodeGroup);

			const sphereGeo = new THREE.SphereGeometry(0.15, isMobile ? 6 : 12, isMobile ? 6 : 12);

			nodesPerLayer.forEach((count, layerIdx) => {
				for (let i = 0; i < count; i++) {
					const x = (layerIdx - (LAYERS - 1) / 2) * layerSpacing;
					const spreadY = 8 + count * 0.3;
					const spreadZ = 5;
					const y = (Math.random() - 0.5) * spreadY;
					const z = (Math.random() - 0.5) * spreadZ;

					const t = layerIdx / (LAYERS - 1);
					const color = purple.clone().lerp(cyan, t);

					const mat = new THREE.MeshBasicMaterial({
						color,
						transparent: true,
						opacity: 0.9,
					});

					const mesh = new THREE.Mesh(sphereGeo, mat);
					mesh.position.set(x, y, z);
					nodeGroup.add(mesh);

					nodes.push({
						position: mesh.position,
						basePosition: new THREE.Vector3(x, y, z),
						layer: layerIdx,
						velocity: new THREE.Vector3(
							(Math.random() - 0.5) * 0.003,
							(Math.random() - 0.5) * 0.003,
							(Math.random() - 0.5) * 0.002,
						),
					});
				}
			});

			const MAX_CONNECTIONS = isMobile ? 100 : 300;
			const connections: { a: number; b: number }[] = [];

			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					if (Math.abs(nodes[i].layer - nodes[j].layer) === 1) {
						const dist = nodes[i].basePosition.distanceTo(nodes[j].basePosition);
						if (dist < layerSpacing * 1.5 && Math.random() < 0.35) {
							connections.push({ a: i, b: j });
						}
					}
				}
				if (connections.length >= MAX_CONNECTIONS) break;
			}

			const linePositions = new Float32Array(connections.length * 6);
			const lineColors = new Float32Array(connections.length * 6);
			const lineGeo = new THREE.BufferGeometry();
			lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
			lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

			const lineMat = new THREE.LineBasicMaterial({
				vertexColors: true,
				transparent: true,
				opacity: 0.25,
				blending: THREE.AdditiveBlending,
			});
			const lines = new THREE.LineSegments(lineGeo, lineMat);
			scene.add(lines);

			const PULSE_COUNT = isMobile ? 8 : 20;
			const pulseGeo = new THREE.SphereGeometry(0.1, isMobile ? 4 : 8, isMobile ? 4 : 8);
			const pulseMat = new THREE.MeshBasicMaterial({
				color: white,
				transparent: true,
				opacity: 0.8,
			});

			interface Pulse {
				mesh: THREE.Mesh;
				connIdx: number;
				progress: number;
				speed: number;
				active: boolean;
			}

			const pulses: Pulse[] = [];
			for (let i = 0; i < PULSE_COUNT; i++) {
				const mesh = new THREE.Mesh(pulseGeo, pulseMat.clone());
				mesh.visible = false;
				scene.add(mesh);
				pulses.push({ mesh, connIdx: 0, progress: 0, speed: 0.008 + Math.random() * 0.012, active: false });
			}

			function activatePulse() {
				const inactive = pulses.find((p) => !p.active);
				if (inactive) {
					inactive.connIdx = Math.floor(Math.random() * connections.length);
					inactive.progress = 0;
					inactive.active = true;
					inactive.mesh.visible = true;
				}
			}

			const mouse = new THREE.Vector2(0, 0);
			const mouseWorld = new THREE.Vector3(0, 0, 0);

			function onMouseMove(e: MouseEvent) {
				const rect = container.getBoundingClientRect();
				mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
				mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
				mouseWorld.set(mouse.x * 20, mouse.y * 15, 0);
			}
			container.addEventListener('mousemove', onMouseMove);

			function onResize() {
				const w = container.clientWidth;
				const h = container.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			}
			window.addEventListener('resize', onResize);

			let frame = 0;
			let lastTime = 0;
			const tmpColor = new THREE.Color();
			const tmpVec = new THREE.Vector3();

			function animate(timestamp: number) {
				if (destroyed) return;
				animationId = requestAnimationFrame(animate);
				if (!isVisible || document.hidden) return;
				if (timestamp - lastTime < 33) return;
				lastTime = timestamp;
				frame++;

				if (frame % 8 === 0) activatePulse();

				for (const node of nodes) {
					node.position.add(node.velocity);

					tmpVec.copy(node.position).sub(node.basePosition);
					if (tmpVec.length() > 2) {
						node.velocity.multiplyScalar(-0.95);
					}

					tmpVec.copy(node.position).sub(mouseWorld);
					const dist = tmpVec.length();
					if (dist < 8) {
						tmpVec.normalize().multiplyScalar(0.02 * (1 - dist / 8));
						node.position.add(tmpVec);
					}
				}

				for (let i = 0; i < connections.length; i++) {
					const { a, b } = connections[i];
					const posA = nodes[a].position;
					const posB = nodes[b].position;
					const idx = i * 6;

					linePositions[idx] = posA.x;
					linePositions[idx + 1] = posA.y;
					linePositions[idx + 2] = posA.z;
					linePositions[idx + 3] = posB.x;
					linePositions[idx + 4] = posB.y;
					linePositions[idx + 5] = posB.z;

					const tA = nodes[a].layer / (LAYERS - 1);
					const tB = nodes[b].layer / (LAYERS - 1);
					tmpColor.copy(purple).lerp(cyan, tA);
					lineColors[idx] = tmpColor.r;
					lineColors[idx + 1] = tmpColor.g;
					lineColors[idx + 2] = tmpColor.b;
					tmpColor.copy(purple).lerp(cyan, tB);
					lineColors[idx + 3] = tmpColor.r;
					lineColors[idx + 4] = tmpColor.g;
					lineColors[idx + 5] = tmpColor.b;
				}
				lineGeo.attributes.position.needsUpdate = true;
				lineGeo.attributes.color.needsUpdate = true;

				for (const pulse of pulses) {
					if (!pulse.active) continue;
					pulse.progress += pulse.speed;
					if (pulse.progress >= 1) {
						pulse.active = false;
						pulse.mesh.visible = false;
						continue;
					}
					const { a, b } = connections[pulse.connIdx];
					pulse.mesh.position.lerpVectors(nodes[a].position, nodes[b].position, pulse.progress);

					const glow = Math.sin(pulse.progress * Math.PI);
					pulse.mesh.scale.setScalar(1 + glow * 1.5);
					(pulse.mesh.material as THREE.MeshBasicMaterial).opacity = 0.3 + glow * 0.7;
				}

				nodeGroup.rotation.y = Math.sin(frame * 0.001) * 0.15;
				nodeGroup.rotation.x = Math.cos(frame * 0.0008) * 0.08;
				lines.rotation.copy(nodeGroup.rotation);

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
