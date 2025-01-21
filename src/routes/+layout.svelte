<script>
	import '../app.scss';

	let { children } = $props();
</script>

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
