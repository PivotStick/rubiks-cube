<script>
	import videoSrc from './video.mp4';
	import list from './list.json';

	const url = new URL(location.href);

	let currentIndex = $state(Number(url.searchParams.get('i') ?? '0'));
	let currentTime = $state(0);
	let paused = $state(true);
	let playbackRate = $state(1);
	let mode = $state(url.searchParams.get('m') === 'slow' ? 'slow' : 'fast');

	const current = $derived(list[currentIndex]);

	$effect(() => {
		url.searchParams.set('i', currentIndex.toString());
		url.searchParams.set('m', mode);

		window.history.replaceState(null, '', url);
	});

	$effect(() => {
		if (current) {
			currentTime = mode === 'slow' ? current.slow[0] : (current.fast ?? current.slow)[0];
		}
	});

	$effect(() => {
		if (current && mode === 'slow' && currentTime > current.slow[1]) {
			currentTime = current.slow[0];
		}
	});

	$effect(() => {
		if (current && mode === 'fast' && current.fast && currentTime > current.fast[1]) {
			currentTime = current.fast[0];
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (current) {
			switch (e.key) {
				case 'r': {
					currentTime = mode === 'slow' ? current.slow[0] : (current.fast ?? current.slow)[0];
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

				case 'f': {
					mode = mode === 'slow' ? 'fast' : 'slow';
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
