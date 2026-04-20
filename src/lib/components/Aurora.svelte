<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
	<div class="aurora-layer aurora-1"></div>
	<div class="aurora-layer aurora-2"></div>
</div>

<style>
	.aurora-layer {
		position: absolute;
		inset: 0;
		opacity: 0.4;
		will-change: transform;
	}
	.aurora-1 {
		background: radial-gradient(ellipse 80% 50% at 40% 40%, rgba(139, 92, 246, 0.08), transparent 70%);
		animation: drift1 12s ease-in-out infinite alternate;
	}
	.aurora-2 {
		background: radial-gradient(ellipse 60% 40% at 65% 55%, rgba(99, 102, 241, 0.06), transparent 70%);
		animation: drift2 15s ease-in-out infinite alternate;
	}
	@keyframes drift1 {
		from { transform: translate3d(-5%, -3%, 0) scale(1); }
		to   { transform: translate3d(5%, 3%, 0) scale(1.05); }
	}
	@keyframes drift2 {
		from { transform: translate3d(3%, 2%, 0) scale(1.05); }
		to   { transform: translate3d(-3%, -2%, 0) scale(1); }
	}
</style>
