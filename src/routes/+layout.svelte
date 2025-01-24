<script>
	import { page } from '$app/state';
	import '../app.scss';
	import 'iconify-icon/dist/iconify-icon.js';

	let { children } = $props();

	const links = [
		{
			href: '/',
			text: '',
			icon: 'house'
		},
		{
			href: '/olls',
			text: 'OLLs'
		},
		{
			href: '/plls',
			text: 'PLLs'
		}
	];
</script>

<svelte:head>
	<title>Rubik's Cube</title>
</svelte:head>

<div class="container">
	<nav>
		{#each links as link}
			<a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : null}>
				{#if link.icon}
					<iconify-icon icon="fa6-solid:{link.icon}"></iconify-icon>
				{/if}
				{link.text}
			</a>
		{/each}
	</nav>
	<main>
		{@render children()}
	</main>
</div>

<style lang="scss">
	.container {
		display: grid;
		height: 100dvh;
		overflow: hidden;

		grid-template-rows: auto 1fr;
	}

	nav {
		display: flex;
		align-items: stretch;
		gap: 0.5rem;
		padding: 0.75rem;

		a {
			display: flex;
			align-items: center;
			gap: 0.75rem;

			padding: 0.25rem 0.75rem;
			background-color: #eee;
			text-decoration: none;
			color: black;
			border-radius: 0.5rem;
			opacity: 0.85;

			&:hover {
				opacity: 1;
			}

			&:active {
				opacity: 0.5;
			}

			&[aria-current='page'] {
				pointer-events: none;
				background-color: black;
				color: white;
			}
		}
	}
</style>
