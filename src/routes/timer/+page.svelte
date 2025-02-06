<script>
	import { generateScramble } from '$lib/generateScramble';

	const key = '___rubiks_cube___';

	const session = JSON.parse(localStorage.getItem(key) ?? `{}`);

	let scramble = $state(session.scramble ?? generateScramble());
	let disableScramble = $state(false);

	let timer = $state(session.timer ?? 0);

	const [s, ms] = $derived(timer.toFixed(3).split('.'));

	/**
	 * @type {{
	 *  time: number;
	 *  scramble: string[];
	 * }[]}
	 */
	const history = $state(session.history ?? []);

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
		if (!disableScramble) {
			history.push({
				time: timer,
				scramble
			});
			scramble = generateScramble();
		}
		mode = 'idle';
	}

	$effect(() => {
		localStorage.setItem(
			key,
			JSON.stringify({
				timer,
				scramble,
				history
			})
		);
	});

	const ao5 = $derived.by(() => {
		if (history.length < 5) return null;

		const total = history.slice(-5).reduce((a, c) => a + c.time, 0);

		return total / 5;
	});
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'h') {
			if (mode === 'idle') {
				disableScramble = !disableScramble;
			}
		}

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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main>
	{#if !disableScramble}
		<div class="scramble">
			{#each scramble as n}
				<span>{n}</span>
			{/each}
		</div>
	{/if}
	<div class="timer {mode}">
		{s}<span class="ms">.{ms}</span>
	</div>
</main>

<div class="session">
	<button
		onclick={() => {
			history.length = 0;
			scramble = generateScramble();
			timer = 0;
		}}
	>
		supprimer session
		<iconify-icon icon="fa6-solid:xmark"></iconify-icon>
	</button>
	<div class="table">
		<p>actuel</p>
		<p>{(history.at(-1)?.time ?? timer).toFixed(3)}s</p>

		<p>ao5</p>
		<p>{!ao5 ? `${history.length} / 5` : `${ao5.toFixed(3)}s`}</p>
	</div>
</div>

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
			display: grid;
			gap: 1rem 1.5rem;
			grid-template-columns: repeat(10, 1fr);

			font-size: 2rem;
			font-weight: 600;

			span {
				text-align: center;
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

	.session {
		position: fixed;
		bottom: 2rem;
		left: 2rem;

		background-color: white;
		padding: 1rem;
		border-radius: 0.75rem;
		box-shadow: 0 1rem 2rem -0.75rem rgba(0 0 0 / 50%);

		.table {
			margin-top: 1rem;
			display: grid;
			gap: 0.5rem 1.5rem;
			grid-template-columns: auto 1fr;
		}
	}
</style>
