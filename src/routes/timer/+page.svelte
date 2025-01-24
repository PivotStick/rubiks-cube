<script>
	import { generateScramble } from '$lib/generateScramble';

	let scramble = $state(generateScramble());

	let timer = $state(0);

	const [s, ms] = $derived(timer.toFixed(3).split('.'));

	/**
	 * @type {number | undefined}
	 */
	let raf;

	function start() {
		timer = 0;
		const from = Date.now();

		const callback = () => {
			timer = (Date.now() - from) / 1000;
			raf = requestAnimationFrame(callback);
		};

		raf = requestAnimationFrame(callback);
	}

	function stop() {
		if (raf !== undefined) cancelAnimationFrame(raf);
		raf = undefined;
		scramble = generateScramble();
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.repeat) return;

		if (e.key === ' ') {
			if (raf === undefined) {
				start();
			} else {
				stop();
			}
		}
	}}
/>

<main>
	<div class="scramble">
		{#each scramble as n}
			<span>{n}</span>
		{/each}
	</div>
	<div class="timer">
		{s}<span class="ms">.{ms}</span>
	</div>
</main>

<style lang="scss">
	main {
		padding: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		gap: 6rem;

		.scramble {
			display: flex;
			gap: 1rem;
			font-size: 2rem;
			font-weight: 600;

			span {
				border-bottom: 1px solid #aaa;
			}
		}

		.timer {
			font-size: 9rem;
			font-weight: 600;
			font-family: monospace;

			.ms {
				font-size: 0.35em;
				font-weight: 700;
			}
		}
	}
</style>
