<script>
	import videoSrc from './video.mp4';
	import list from './list.json';

	list.sort((a, b) => a.id - b.id);

	let currentIndex = $state(0);
	let currentTime = $state(0);
	let paused = $state(true);
	let playbackRate = $state(2);

	const current = $derived(list[currentIndex]);

	$effect(() => {
		if (current) {
			currentTime = current.slow[0];
		}
	});

	$effect(() => {
		if (current && currentTime > current.slow[1]) {
			currentTime = current.slow[0];
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (current) {
			switch (e.key) {
				case 'r': {
					currentTime = current.slow[0];
					break;
				}

				case ' ': {
					paused = !paused;
					break;
				}

				case 'ArrowUp': {
					playbackRate = Math.min(3, playbackRate + 0.1);
					break;
				}

				case '0': {
					playbackRate = 1;
					break;
				}

				case 'ArrowDown': {
					playbackRate = Math.max(0, playbackRate - 0.1);
					break;
				}

				case 'ArrowLeft': {
					paused = true;
					currentIndex--;
					if (currentIndex < 0) {
						currentIndex = list.length - 1;
					}
					break;
				}

				case 'ArrowRight': {
					paused = true;
					currentIndex = (currentIndex + 1) % list.length;
					break;
				}

				case 'c': {
					navigator.clipboard.writeText(currentTime.toString());
					console.log(currentTime, 'copied');
					break;
				}

				default: {
					//console.log(e.key);
					break;
				}
			}
		}
	}}
/>

{#if current}
	<video preload="" src={videoSrc} bind:currentTime bind:paused bind:playbackRate>
		<track kind="captions" />
	</video>
{/if}

<style>
	video {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 0;
		min-width: 0;
		object-fit: contain;
		background-color: black;
	}
</style>
