<script>
	import { generateScramble } from '$lib/generateScramble';

	let scramble = $state(generateScramble());

	let timer = $state(0);

	const [s, ms] = $derived(timer.toFixed(3).split('.'));

	/**
	 * @type {number | undefined}
	 */
	let raf;

	/**
	 * @type {"idle" | "pressing" | "ready" | "playing"}
	 */
	let mode = $state('idle');

	/**
	 * @type {ReturnType<typeof setTimeout>}
	 */
	let timeout;

	function start() {
		mode = 'playing';
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
		mode = 'idle';
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.repeat || e.key !== ' ') return;

		switch (mode) {
			case 'idle':
				mode = 'pressing';
				timeout = setTimeout(() => (mode = 'ready'), 500);
				break;

			case 'playing':
				stop();
				break;
		}
	}}
	on:keyup={(e) => {
		if (e.repeat || e.key !== ' ') return;

		switch (mode) {
			case 'pressing':
				mode = 'idle';
				clearTimeout(timeout);
				break;

			case 'ready':
				start();
				break;
		}
	}}
/>

<main>
	<div class="scramble">
		{#each scramble as n}
			<span>{n}</span>
		{/each}
	</div>
	<div class="timer {mode}">
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
		height: 80%;
		gap: 4rem;

		.scramble {
			display: flex;
			gap: 1rem;

			justify-content: center;
			flex-wrap: wrap;
			font-size: 2rem;
			font-weight: 600;

			width: calc(3rem * 10);

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

			&.pressing {
				color: red;
			}

			&.ready {
				color: green;
			}
		}
	}
</style>
