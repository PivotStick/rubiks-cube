<script>
	import { untrack } from 'svelte';

	/**
	 * @type {{ scramble?: string[]; }}
	 */
	let { scramble } = $props();

	const sides = ['top', 'front', 'left', 'back', 'right', 'bottom'];
	const initial = [
		[
			// top
			['white', 'white', 'white'],
			['white', 'white', 'white'],
			['white', 'white', 'white']
		],
		[
			// front
			['green', 'green', 'green'],
			['green', 'green', 'green'],
			['green', 'green', 'green']
		],
		[
			// left
			['orange', 'orange', 'orange'],
			['orange', 'orange', 'orange'],
			['orange', 'orange', 'orange']
		],
		[
			// back
			['blue', 'blue', 'blue'],
			['blue', 'blue', 'blue'],
			['blue', 'blue', 'blue']
		],
		[
			// right
			['red', 'red', 'red'],
			['red', 'red', 'red'],
			['red', 'red', 'red']
		],
		[
			// bottom
			['yellow', 'yellow', 'yellow'],
			['yellow', 'yellow', 'yellow'],
			['yellow', 'yellow', 'yellow']
		]
	];

	let cube = $state(structuredClone(initial));

	function copy(face = '') {
		const ref = cube[sides.indexOf(face)];

		/** @type {Array<string[]> & { _ref: typeof ref }} */
		const side = JSON.parse(JSON.stringify(ref));

		side._ref = ref;

		return side;
	}

	/**
	 * @param {string} notation
	 */
	function rotate(notation) {
		let { move, reverse, count } = parse(notation);

		if (reverse) {
			count += 2;
		}

		/**
		 * @param {ReturnType<typeof copy>} face
		 */
		function clockwise(face) {
			face._ref[0][0] = face[2][0];
			face._ref[0][1] = face[1][0];
			face._ref[0][2] = face[0][0];

			face._ref[1][0] = face[2][1];
			face._ref[1][1] = face[1][1];
			face._ref[1][2] = face[0][1];

			face._ref[2][0] = face[2][2];
			face._ref[2][1] = face[1][2];
			face._ref[2][2] = face[0][2];
		}

		for (let i = 0; i < count; i++) {
			switch (move) {
				case 'R': {
					const top = copy('top');
					const front = copy('front');
					const bottom = copy('bottom');
					const back = copy('back');
					const right = copy('right');

					top._ref[0][2] = front[0][2];
					top._ref[1][2] = front[1][2];
					top._ref[2][2] = front[2][2];

					front._ref[0][2] = bottom[0][2];
					front._ref[1][2] = bottom[1][2];
					front._ref[2][2] = bottom[2][2];

					back._ref[0][0] = top[2][2];
					back._ref[1][0] = top[1][2];
					back._ref[2][0] = top[0][2];

					bottom._ref[0][2] = back[2][0];
					bottom._ref[1][2] = back[1][0];
					bottom._ref[2][2] = back[0][0];

					clockwise(right);
					break;
				}

				case 'F': {
					const top = copy('top');
					const bottom = copy('bottom');
					const left = copy('left');
					const right = copy('right');

					right._ref[0][0] = top[2][0];
					right._ref[1][0] = top[2][1];
					right._ref[2][0] = top[2][2];

					bottom._ref[0][0] = right[2][0];
					bottom._ref[0][1] = right[1][0];
					bottom._ref[0][2] = right[0][0];

					left._ref[0][2] = bottom[0][0];
					left._ref[1][2] = bottom[0][1];
					left._ref[2][2] = bottom[0][2];

					top._ref[2][0] = left[2][2];
					top._ref[2][1] = left[1][2];
					top._ref[2][2] = left[0][2];

					clockwise(copy('front'));
					break;
				}

				case 'L': {
					const front = copy('front');
					const top = copy('top');
					const bottom = copy('bottom');
					const back = copy('back');

					front._ref[0][0] = top[0][0];
					front._ref[1][0] = top[1][0];
					front._ref[2][0] = top[2][0];

					bottom._ref[0][0] = front[0][0];
					bottom._ref[1][0] = front[1][0];
					bottom._ref[2][0] = front[2][0];

					back._ref[0][2] = bottom[2][0];
					back._ref[1][2] = bottom[1][0];
					back._ref[2][2] = bottom[0][0];

					top._ref[0][0] = back[2][2];
					top._ref[1][0] = back[1][2];
					top._ref[2][0] = back[0][2];

					clockwise(copy('left'));
					break;
				}

				case 'B': {
					const right = copy('right');
					const left = copy('left');
					const top = copy('top');
					const bottom = copy('bottom');

					right._ref[0][2] = bottom[2][2];
					right._ref[1][2] = bottom[2][1];
					right._ref[2][2] = bottom[2][0];

					bottom._ref[2][0] = left[0][0];
					bottom._ref[2][1] = left[1][0];
					bottom._ref[2][2] = left[2][0];

					left._ref[0][0] = top[0][2];
					left._ref[1][0] = top[0][1];
					left._ref[2][0] = top[0][0];

					top._ref[0][0] = right[0][2];
					top._ref[0][1] = right[1][2];
					top._ref[0][2] = right[2][2];

					clockwise(copy('back'));
					break;
				}

				case 'U': {
					const front = copy('front');
					const left = copy('left');
					const right = copy('right');
					const back = copy('back');

					front._ref[0][0] = right[0][0];
					front._ref[0][1] = right[0][1];
					front._ref[0][2] = right[0][2];

					left._ref[0][0] = front[0][0];
					left._ref[0][1] = front[0][1];
					left._ref[0][2] = front[0][2];

					back._ref[0][0] = left[0][0];
					back._ref[0][1] = left[0][1];
					back._ref[0][2] = left[0][2];

					right._ref[0][0] = back[0][0];
					right._ref[0][1] = back[0][1];
					right._ref[0][2] = back[0][2];

					clockwise(copy('top'));
					break;
				}

				case 'D': {
					const left = copy('left');
					const front = copy('front');
					const right = copy('right');
					const back = copy('back');

					left._ref[2][0] = back[2][0];
					left._ref[2][1] = back[2][1];
					left._ref[2][2] = back[2][2];

					front._ref[2][0] = left[2][0];
					front._ref[2][1] = left[2][1];
					front._ref[2][2] = left[2][2];

					right._ref[2][0] = front[2][0];
					right._ref[2][1] = front[2][1];
					right._ref[2][2] = front[2][2];

					back._ref[2][0] = right[2][0];
					back._ref[2][1] = right[2][1];
					back._ref[2][2] = right[2][2];

					clockwise(copy('bottom'));
					break;
				}
			}
		}
	}

	function parse(notation = '') {
		const splitted = notation.split('');
		let move;
		let count = 1;
		let reverse = false;

		if (splitted.length >= 1) {
			move = splitted[0];
		}

		if (splitted.length == 2) {
			if (splitted[1] === "'") {
				reverse = true;
			} else if (splitted[1] === '2') {
				count = 2;
			}
		}

		if (splitted.length == 3) {
			if (splitted[1] === '2') {
				count = 2;
			}

			if (splitted[2] === "'") {
				reverse = true;
			}
		}

		return { move, count, reverse };
	}

	export function reset() {
		cube = structuredClone(initial);
	}

	/**
	 * @param {string[]} scramble
	 */
	export function apply(scramble) {
		reset();
		for (const move of scramble) {
			rotate(move);
		}
	}

	$effect(() => {
		if (scramble?.length) {
			untrack(() => {
				apply(scramble);
			});
		}
	});
</script>

<div class="view">
	<div class="cube">
		{#each cube as face, i}
			<div class="face {sides[i]}" style:--area={sides[i]}>
				{#each face as rows}
					{#each rows as col}
						<div class="cell {col}" style:--color={col}></div>
					{/each}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.cube {
		width: max-content;
		display: grid;
		grid-template-areas:
			'.    top    .     .'
			'left front  right back'
			'.    bottom .     .';

		.face {
			$size: 1rem;
			--color: black;

			display: grid;
			grid-template-columns: repeat(3, $size);
			grid-area: var(--area);

			$b: 1px solid #1f1f1f;

			outline: $b;

			.cell {
				aspect-ratio: 1;
				background-color: var(--color);
				border: $b;
			}
		}
	}
</style>
