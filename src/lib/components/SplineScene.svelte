<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let loading = $state(true);

	onMount(() => {
		let app: InstanceType<typeof import('@splinetool/runtime').Application> | undefined;

		import('@splinetool/runtime').then(async ({ Application }) => {
			app = new Application(canvas);
			await app.load('https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode');
			loading = false;
		});

		return () => {
			app?.dispose();
		};
	});
</script>

<div class="relative h-full w-full">
	{#if loading}
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="h-8 w-8 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-400"></div>
		</div>
	{/if}
	<canvas
		bind:this={canvas}
		class="h-full w-full transition-opacity duration-1000"
		style="opacity: {loading ? 0 : 1}"
	></canvas>
</div>
