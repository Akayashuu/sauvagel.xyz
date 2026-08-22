<script lang="ts">
	import { ArrowLeftRight } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import type { Diagram } from '$lib/data/profile';

	let { diagram, caption }: { diagram: Diagram; caption: string } = $props();

	let arrowId = $derived.by(() => {
		const key = diagram.columns.map((c) => c.title).join('|') + caption;
		let hash = 2166136261;
		for (let i = 0; i < key.length; i++) {
			hash ^= key.charCodeAt(i);
			hash = Math.imul(hash, 16777619);
		}
		return `arrow-${(hash >>> 0).toString(36)}`;
	});

	const COL_W = 188;
	const COL_GAP = 114;
	const NODE_H = 58;
	const NODE_GAP = 16;
	const HEAD_H = 38;
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

	<div class="surface relative overflow-x-auto p-5 sm:p-7">
		<svg
			viewBox="0 0 {layout.width} {layout.height}"
			class="h-auto w-full min-w-140"
			preserveAspectRatio="xMinYMin meet"
			role="img"
			aria-label={caption}
		>
			<defs>
				<marker
					id={arrowId}
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
					marker-end="url(#{arrowId})"
					class="text-zinc-600"
				/>
				{#if edge.label}
					<text
						x={edge.lx}
						y={edge.ly - 6}
						text-anchor={edge.anchor}
						class="fill-zinc-500 font-mono"
						font-size="10"
						stroke="var(--color-zinc-950)"
						stroke-width="3.5"
						paint-order="stroke"
					>
						{edge.label}
					</text>
				{/if}
			{/each}

			{#each layout.columns as col, ci (ci)}
				<text x={col.x} y="12" class="fill-zinc-500 font-mono" font-size="10.5" letter-spacing="1.2">
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
						y={node.note ? node.y + 24 : node.y + 34}
						class="fill-zinc-100 font-mono"
						font-size="14"
					>
						{node.label}
					</text>
					{#if node.note}
						<text x={node.x + 14} y={node.y + 42} class="fill-zinc-500" font-size="11.5">
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
