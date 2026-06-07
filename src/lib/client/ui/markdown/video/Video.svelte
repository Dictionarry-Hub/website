<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src: string;
		title?: string;
		class?: string;
	}

	let { src, title, class: className }: Props = $props();

	let videoEl: HTMLVideoElement | undefined = $state();

	onMount(async () => {
		const Plyr = (await import('plyr')).default;
		await import('plyr/dist/plyr.css');
		if (videoEl) new Plyr(videoEl);
	});
</script>

<figure class="mb-6 {className ?? ''}">
	<video bind:this={videoEl} playsinline controls>
		<source {src} type="video/mp4" />
	</video>
	{#if title}
		<figcaption class="mt-2 text-center text-sm text-text-muted">{title}</figcaption>
	{/if}
</figure>
