<script>
	const sides = ['top', 'front', 'left', 'back', 'right', 'bottom'];

	let cube = [
		[
			// top
			['yellow', 'yellow', 'yellow'],
			['yellow', 'yellow', 'yellow'],
			['yellow', 'yellow', 'yellow']
		],
		[
			// front
			['red', 'red', 'red'],
			['red', 'red', 'red'],
			['red', 'red', 'red']
		],
		[
			// left
			['blue', 'blue', 'blue'],
			['blue', 'blue', 'blue'],
			['blue', 'blue', 'blue']
		],
		[
			// back
			['orange', 'orange', 'orange'],
			['orange', 'orange', 'orange'],
			['orange', 'orange', 'orange']
		],
		[
			// right
			['green', 'green', 'green'],
			['green', 'green', 'green'],
			['green', 'green', 'green']
		],
		[
			// bottom
			['white', 'white', 'white'],
			['white', 'white', 'white'],
			['white', 'white', 'white']
		]
	];
</script>

<div class="view">
	<div class="cube">
		{#each cube as face, i}
			<div class="face {sides[i]}">
				{#each face as rows}
					{#each rows as col}
						<div class="cell {col}"></div>
					{/each}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.view {
		width: max-content;
	}

	.cube {
		margin: 10rem;

		width: max-content;
		position: relative;

		transition: all ease 600ms;

		transform: perspective(800px) rotate3d(1, 1, 0, 100deg);
		transform-style: preserve-3d;

		.face {
			position: absolute;
			top: 0;
			left: 0;

			display: grid;
			grid-template-columns: repeat(3, max-content);

			transition: inherit;

			.cell {
				width: 2rem;
				height: 2rem;

				display: flex;
				align-items: center;
				justify-content: center;

				border: 1px solid black;

				&.red {
					background-color: red;
				}

				&.green {
					background-color: green;
				}

				&.yellow {
					background-color: yellow;
				}

				&.white {
					background-color: white;
				}

				&.orange {
					background-color: orange;
				}

				&.blue {
					background-color: blue;
				}
			}

			&.top {
				transform: translate3d(0, -50%, 0) rotateX(90deg);
			}

			&.right {
				transform: translate3d(50%, 0, 0) rotateY(90deg);
			}

			&.left {
				transform: translate3d(-50%, 0, 0) rotateY(90deg);
			}

			&.bottom {
				transform: translate3d(0, 50%, 0) rotateX(-90deg);
			}

			&.back {
				transform: translateZ(-3rem);
			}

			&.front {
				transform: translateZ(3rem);
			}
		}
	}
</style>
