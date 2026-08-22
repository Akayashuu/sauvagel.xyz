<script lang="ts">
	import ArchitectureDiagram from '$lib/components/ArchitectureDiagram.svelte';
	import type { Block } from '$lib/data/posts';

	let { body }: { body: Block[] } = $props();
</script>

<div class="post-body">
	{#each body as block, bi (bi)}
		{#if block.t === 'p'}
			<p>{block.text}</p>
		{:else if block.t === 'h'}
			<h2>{block.text}</h2>
		{:else if block.t === 'list'}
			<ul>
				{#each block.items as item, ii (ii)}
					<li>{item}</li>
				{/each}
			</ul>
		{:else if block.t === 'stats'}
			<!-- Les chiffres relevés en production sortent du fil du texte : ce sont
			     eux qu'on revient chercher, pas la phrase qui les entoure. -->
			<div class="not-prose grid gap-3 sm:grid-cols-3">
				{#each block.items as stat (stat.label)}
					<div class="surface p-5">
						<div class="font-mono text-2xl font-bold text-primary-300 tabular-nums">
							{stat.value}
						</div>
						<div class="mt-1 text-sm text-zinc-300">{stat.label}</div>
						{#if stat.note}
							<div class="mt-0.5 font-mono text-xs text-zinc-500">{stat.note}</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else if block.t === 'table'}
			<div class="surface not-prose overflow-x-auto">
				<table class="w-full border-collapse text-left text-sm">
					<thead>
						<tr class="border-b border-zinc-800">
							{#each block.head as cell (cell)}
								<th class="px-5 py-3 font-mono text-xs tracking-wide text-zinc-500 uppercase">
									{cell}
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each block.rows as row, ri (ri)}
							<tr class="border-b border-zinc-800/60 last:border-0">
								{#each row as cell, ci (ci)}
									<td
										data-label={block.head[ci]}
										class="px-5 py-3 {ci === 0
											? 'font-mono text-xs text-zinc-300'
											: 'text-zinc-400 tabular-nums'}"
									>
										{cell}
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else if block.t === 'people'}
			<!-- L'attribution est une carte par personne plutôt qu'une phrase dans le
			     texte : qui a fait quoi doit se lire sans relire le paragraphe. -->
			<div class="not-prose grid gap-3 sm:grid-cols-2">
				{#each block.items as person (person.handle)}
					<a
						href={person.url}
						target="_blank"
						rel="noopener noreferrer"
						class="surface surface-hover group block p-5"
					>
						<div class="flex items-center gap-3.5">
							<img
								src={person.avatar}
								alt=""
								width="48"
								height="48"
								loading="lazy"
								decoding="async"
								class="h-12 w-12 shrink-0 rounded-full border border-zinc-700 object-cover"
							/>
							<div class="min-w-0">
								<div class="truncate text-base font-semibold text-zinc-100">{person.name}</div>
								<div
									class="truncate font-mono text-xs text-zinc-500 transition-colors group-hover:text-accent-400"
								>
									{person.handle}
								</div>
							</div>
						</div>
						<div class="mt-4 font-mono text-[11px] tracking-wide text-primary-300 uppercase">
							{person.role}
						</div>
						<p class="mt-2 text-sm leading-relaxed text-zinc-400">{person.scope}</p>
					</a>
				{/each}
			</div>
		{:else if block.t === 'diagram'}
			<div class="not-prose">
				<ArchitectureDiagram diagram={block.diagram} caption={block.caption} />
			</div>
		{:else if block.t === 'timeline'}
			<!-- Une chronologie plutôt qu'un paragraphe de dates : la bascule, son
			     retour arrière et la suppression se lisent d'un coup d'oeil. -->
			<ol class="not-prose relative flex flex-col gap-6 border-l border-zinc-800 pl-6">
				{#each block.items as step, si (si)}
					<li class="relative">
						<span
							class="absolute top-1.5 -left-[1.9rem] h-2.5 w-2.5 rounded-full border-2 border-zinc-950 {step.tone ===
							'revert'
								? 'bg-zinc-500'
								: step.tone === 'ship'
									? 'bg-accent-400'
									: 'bg-primary-500'}"
							aria-hidden="true"
						></span>
						<div class="font-mono text-xs text-zinc-500">{step.date}</div>
						<div class="mt-0.5 font-semibold text-zinc-200">{step.title}</div>
						<p class="mt-1 text-sm leading-relaxed text-zinc-400">{step.text}</p>
					</li>
				{/each}
			</ol>
		{:else if block.t === 'bars'}
			{@const max = Math.max(...block.items.map((i) => i.value))}
			<div class="not-prose surface flex flex-col gap-4 p-5 sm:p-6">
				{#each block.items as bar (bar.label)}
					<div>
						<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
							<span class="font-mono text-xs break-all text-zinc-300">{bar.label}</span>
							<span class="font-mono text-sm text-primary-300 tabular-nums">{bar.display}</span>
						</div>
						<div class="mt-2 h-1.5 w-full overflow-hidden bg-zinc-800">
							<div
								class="h-full bg-primary-500"
								style="width: {Math.max(2, (bar.value / max) * 100)}%"
							></div>
						</div>
						{#if bar.note}
							<div class="mt-1.5 text-xs text-zinc-500">{bar.note}</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else if block.t === 'note'}
			<aside class="not-prose border-l-2 border-accent-500/60 bg-zinc-900/40 py-4 pr-5 pl-5">
				<p class="text-sm leading-relaxed text-zinc-300">{block.text}</p>
			</aside>
		{:else if block.t === 'code'}
			<div class="surface not-prose overflow-x-auto p-5">
				<pre class="font-mono text-xs leading-relaxed text-zinc-300"><code>{block.text}</code></pre>
			</div>
		{/if}
	{/each}
</div>

<style>
	/* La mise en forme du corps vit ici plutôt qu'en classes sur chaque bloc :
	   un article ne doit pas pouvoir dériver du suivant. */
	.post-body {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.post-body :global(h2) {
		margin-top: 1.75rem;
		font-size: 1.3rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--color-zinc-100);
		text-wrap: balance;
	}
	@media (min-width: 640px) {
		.post-body :global(h2) {
			font-size: 1.5rem;
		}
	}
	.post-body :global(p) {
		max-width: 68ch;
		font-size: 1rem;
		line-height: 1.75;
		color: var(--color-zinc-400);
	}
	@media (min-width: 640px) {
		.post-body :global(p) {
			font-size: 1.0625rem;
			line-height: 1.8;
		}
	}
	.post-body :global(ul) {
		display: flex;
		max-width: 68ch;
		flex-direction: column;
		gap: 0.75rem;
		padding-left: 0;
		list-style: none;
	}
	.post-body :global(li) {
		position: relative;
		padding-left: 1.4rem;
		line-height: 1.75;
		color: var(--color-zinc-400);
	}
	.post-body :global(li::before) {
		position: absolute;
		left: 0;
		top: 0.68em;
		width: 6px;
		height: 6px;
		background: var(--color-primary-500);
		content: '';
	}
</style>
