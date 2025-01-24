<script>
	const shortcuts = [
		{
			key: '➡',
			description: 'Sélectionne la boucle suivante'
		},
		{
			key: '←',
			description: 'Sélectionne la boucle précédente'
		},
		{
			key: 'r',
			description: 'Relance la boucle en cours'
		},
		{
			key: 'f',
			description: 'Change le mode entre "fast"/"slow"'
		},
		{
			key: '↑',
			description: 'Accélère la vitesse de la vidéo'
		},
		{
			key: '↓',
			description: 'Décélère la vitesse de la vidéo'
		}
	];
</script>

<main>
	<div class="grid">
		{#each shortcuts as s}
			<div class="cell key">
				<span>{s.key}</span>
			</div>
			<div class="cell">{s.description}</div>
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		padding: 1rem;
		display: grid;
		gap: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: auto 1fr;

		.cell {
			display: flex;
			align-items: center;

			padding: 0.5rem;
			border-bottom: 1px solid #eee;

			&.key {
				span {
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;

					font-family: monospace;
					background-color: #eee;
					width: 2rem;
					height: 2rem;
					font-size: 1.25rem;
					border-radius: 0.25rem;
					border: 1px solid #bbb;
					color: #666;
				}
			}
		}
	}
</style>
