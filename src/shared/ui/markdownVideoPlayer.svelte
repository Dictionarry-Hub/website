<script>
  import { onMount, onDestroy } from 'svelte';
  import Plyr from 'plyr';
  import 'plyr/dist/plyr.css';
  import { theme } from '../stores/theme';

  export let src = '';
  export let description = '';

  let videoElement;
  let player;

  onMount(() => {
    if (videoElement) {
      player = new Plyr(videoElement, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time'
        ],
        invertTime: false,
        toggleInvert: false
      });
    }
  });

  onDestroy(() => {
    if (player) {
      player.destroy();
    }
  });
</script>

<div class="my-6" class:dark={$theme}>
  {#if description}
    <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
      {description}
    </p>
  {/if}

  <div class="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
    <video bind:this={videoElement} playsinline controls>
      <source {src} type="video/mp4" />
      Your browser doesn't support video playback.
    </video>
  </div>
</div>

<style>
  /* Light mode colors */
  :global(.plyr) {
    --plyr-color-main: rgb(255 255 255);
    --plyr-video-background: rgb(250 250 250);
    --plyr-video-control-color: rgb(255 255 255);
    --plyr-video-control-color-hover: rgb(255 255 255);
    --plyr-video-control-background-hover: rgba(255, 255, 255, 0.1);
  }

  :global(.plyr__controls) {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
  }

  /* Dark mode colors */
  :global(.dark .plyr) {
    --plyr-color-main: rgb(255 255 255);
    --plyr-video-background: rgb(23 23 23);
    --plyr-video-control-color: rgb(255 255 255);
    --plyr-video-control-color-hover: rgb(255 255 255);
  }

  :global(.plyr--video) {
    border-radius: 0;
  }

  /* Video wrapper background */
  :global(.plyr__video-wrapper) {
    background: rgb(250 250 250);
  }

  :global(.dark .plyr__video-wrapper) {
    background: rgb(23 23 23);
  }

  /* Large play button background and icon */
  :global(.plyr__control--overlaid) {
    background: rgba(0, 0, 0, 0.5) !important;
  }

  :global(.plyr__control--overlaid svg) {
    fill: rgb(255 255 255) !important;
  }
</style>
