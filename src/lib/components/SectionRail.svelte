<script lang="ts">
	import GenerativeGrid from './GenerativeGrid.svelte';

	let { seed = 'rail' }: { seed?: string } = $props();
</script>

<div class="relative mx-auto h-20 max-w-7xl overflow-hidden px-6 2xl:max-w-400" aria-hidden="true">
	<GenerativeGrid mode="rail" {seed} step={16} />
</div>
