<script lang="ts">
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
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--color-zinc-100);
		text-wrap: balance;
	}
	.post-body :global(p) {
		max-width: 68ch;
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--color-zinc-400);
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
