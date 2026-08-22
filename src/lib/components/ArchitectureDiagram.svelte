<script lang="ts">
	import { ArrowLeftRight } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import type { Diagram } from '$lib/data/profile';

	let { diagram, caption }: { diagram: Diagram; caption: string } = $props();

	// Le schéma est déclaré en données (colonnes, noeuds, flux) et sa géométrie
	// calculée ici : un SVG écrit à la main par projet aurait vieilli à chaque
	// changement d'archi, et une lib de graphes pèserait plus que la page.
	const COL_W = 190;
	const COL_GAP = 116;
	const NODE_H = 54;
	const NODE_GAP = 16;
	const HEAD_H = 34;
	const PAD = 12;

	let layout = $derived.by(() => {
		const cols = diagram.columns;
		const bodyH = Math.max(
			...cols.map((c) => c.nodes.length * NODE_H + (c.nodes.length - 1) * NODE_GAP)
		);
		const height = HEAD_H + bodyH + PAD * 2;
		const width = cols.length * COL_W + (cols.length - 1) * COL_GAP;

		const boxes = new Map<string, { x: number; y: number }>();
		const columns = cols.map((col, ci) => {
			const x = ci * (COL_W + COL_GAP);
			const colH = col.nodes.length * NODE_H + (col.nodes.length - 1) * NODE_GAP;
			const top = HEAD_H + PAD + (bodyH - colH) / 2;
			const nodes = col.nodes.map((node, ni) => {
				const y = top + ni * (NODE_H + NODE_GAP);
				boxes.set(node.id, { x, y });
				return { ...node, x, y };
			});
			return { title: col.title, x, nodes };
		});

		const edges = diagram.edges.map((edge) => {
			const from = boxes.get(edge.from)!;
			const to = boxes.get(edge.to)!;

			// Deux noeuds de la même colonne se suivent verticalement : tirée
			// d'un bord droit à l'autre, la flèche sortait de la colonne et
			// repassait par-dessus le texte du noeud d'à côté.
			if (from.x === to.x) {
				const x = from.x + COL_W / 2;
				const y1 = from.y + NODE_H;
				const y2 = to.y;
				return {
					...edge,
					d: `M ${x} ${y1} L ${x} ${y2}`,
					lx: x + 8,
					ly: (y1 + y2) / 2 + 9,
					anchor: 'start'
				};
			}

			const x1 = from.x + COL_W;
			const y1 = from.y + NODE_H / 2;
			const x2 = to.x;
			const y2 = to.y + NODE_H / 2;
			const mid = (x1 + x2) / 2;
			return {
				...edge,
				d: `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`,
				lx: mid,
				ly: (y1 + y2) / 2,
				anchor: 'middle'
			};
		});

		return { width, height, columns, edges };
	});
</script>

<figure class="m-0">
	<!-- Le schéma garde une largeur minimale pour rester lisible : sur téléphone
	     il se parcourt donc à l'horizontale, ce qui doit se voir. -->
	<div class="surface relative overflow-x-auto p-5 sm:p-7">
		<svg
			viewBox="0 0 {layout.width} {layout.height}"
			class="h-auto w-full min-w-160"
			preserveAspectRatio="xMinYMin meet"
			role="img"
			aria-label={caption}
		>
			<defs>
				<marker
					id="arrow"
					viewBox="0 0 8 8"
					refX="7"
					refY="4"
					markerWidth="6"
					markerHeight="6"
					orient="auto-start-reverse"
				>
					<path d="M 0 1 L 7 4 L 0 7" fill="none" stroke="currentColor" stroke-width="1.2" />
				</marker>
			</defs>

			{#each layout.edges as edge, ei (ei)}
				<path
					d={edge.d}
					fill="none"
					stroke="var(--color-zinc-700)"
					stroke-width="1"
					marker-end="url(#arrow)"
					class="text-zinc-600"
				/>
				{#if edge.label}
					<text
						x={edge.lx}
						y={edge.ly - 6}
						text-anchor={edge.anchor}
						class="fill-zinc-500 font-mono"
						font-size="8.5"
					>
						{edge.label}
					</text>
				{/if}
			{/each}

			{#each layout.columns as col, ci (ci)}
				<text x={col.x} y="12" class="fill-zinc-500 font-mono" font-size="9" letter-spacing="1.2">
					{col.title.toUpperCase()}
				</text>
				<line
					x1={col.x}
					y1="20"
					x2={col.x + COL_W}
					y2="20"
					stroke="var(--color-zinc-800)"
					stroke-width="1"
				/>

				{#each col.nodes as node (node.id)}
					<rect
						x={node.x}
						y={node.y}
						width={COL_W}
						height={NODE_H}
						rx="4"
						fill="var(--color-zinc-900)"
						stroke={node.accent ? 'var(--color-primary-500)' : 'var(--color-zinc-800)'}
						stroke-width="1"
					/>
					<text
						x={node.x + 14}
						y={node.note ? node.y + 22 : node.y + 31}
						class="fill-zinc-100 font-mono"
						font-size="12"
					>
						{node.label}
					</text>
					{#if node.note}
						<text x={node.x + 14} y={node.y + 38} class="fill-zinc-500" font-size="10">
							{node.note}
						</text>
					{/if}
				{/each}
			{/each}
		</svg>
	</div>
	<p class="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-zinc-600 sm:hidden">
		<ArrowLeftRight size={12} />
		{$t.ui.scrollHint}
	</p>
	<figcaption class="mt-3 font-mono text-xs text-zinc-600">{caption}</figcaption>
</figure>
