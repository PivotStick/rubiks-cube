<script>
	import '../app.scss';

	let { children } = $props();
</script>

<svelte:head>
	<title>Rubik's Cube</title>
</svelte:head>

<div class="container">
	<nav>
		<a href="/olls">OLLs</a>
	</nav>
	<main>
		{@render children()}
	</main>
</div>

<style>
	.container {
		display: grid;
		height: 100dvh;
		overflow: hidden;

		grid-template-rows: auto 1fr;
	}
</style>
