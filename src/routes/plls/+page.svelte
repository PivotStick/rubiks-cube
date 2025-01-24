<script>
	import VideoLoops from '$lib/components/VideoLoops.svelte';

	import src from './video.mp4';
	import list from './list.json';
</script>

<VideoLoops {list} {src} />
