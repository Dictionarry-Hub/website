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
	<div class="video-wrapper">
		<video
			bind:this={videoEl}
			playsinline
			controls>
			<source
				{src}
				type="video/mp4" />
		</video>
	</div>
	{#if title}
		<figcaption class="mt-2 text-center text-sm text-text-muted">{title}</figcaption>
	{/if}
</figure>

<style>
	.video-wrapper {
		border-radius: var(--theme-radius-card);
		overflow: hidden;

		--plyr-color-main: var(--theme-accent-solid);
		--plyr-video-control-color: #fff;
		--plyr-video-control-color-hover: #fff;
		--plyr-range-thumb-background: #fff;
		--plyr-control-radius: var(--theme-radius-control-sm);
		--plyr-font-family: var(--theme-font-sans);
	}
</style>
