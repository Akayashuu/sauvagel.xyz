<script lang="ts">
	import { onMount } from 'svelte';

	let { text, className = '' }: { text: string; className?: string } = $props();
	let displayText = $state('');
	let el: HTMLSpanElement;

	const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	onMount(() => {
		let frame = 0;
		const totalFrames = text.length * 3;
		let animId: number;

		function scramble() {
			const progress = frame / totalFrames;
			const revealedCount = Math.floor(progress * text.length);

			let result = '';
			for (let i = 0; i < text.length; i++) {
				if (text[i] === ' ') {
					result += ' ';
				} else if (i < revealedCount) {
					result += text[i];
				} else if (i < revealedCount + 3) {
					result += chars[Math.floor(Math.random() * chars.length)];
				} else {
					result += chars[Math.floor(Math.random() * chars.length)];
				}
			}

			displayText = result;
			frame++;

			if (frame <= totalFrames + 5) {
				animId = requestAnimationFrame(scramble);
			} else {
				displayText = text;
			}
		}

		const timeout = setTimeout(() => {
			scramble();
		}, 600);

		return () => {
			clearTimeout(timeout);
			cancelAnimationFrame(animId);
		};
	});
</script>

<span bind:this={el} class={className}>{displayText}</span>
