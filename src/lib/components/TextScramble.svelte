<script lang="ts">
	import { onMount } from 'svelte';

	let { text, className = '' }: { text: string; className?: string } = $props();
	let scrambled = $state<string | null>(null);
	let displayText = $derived(scrambled ?? text);

	const chars =
		'!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const target = text;
		const totalFrames = target.length * 3;
		let frame = 0;
		let animId = 0;

		function scramble() {
			const revealed = Math.floor((frame / totalFrames) * target.length);

			let result = '';
			for (let i = 0; i < target.length; i++) {
				if (target[i] === ' ') result += ' ';
				else if (i < revealed) result += target[i];
				else result += randomChar();
			}

			scrambled = result;
			frame++;

			if (frame <= totalFrames + 5) animId = requestAnimationFrame(scramble);
			else scrambled = target;
		}

		const timeout = setTimeout(scramble, 600);

		return () => {
			clearTimeout(timeout);
			cancelAnimationFrame(animId);
		};
	});
</script>

<span class={className}>{displayText}</span>
