<script>
  import { Play, Pause, RotateCcw } from 'lucide-svelte';
  
  export let src;
  export let description = '';
  export let showControls = true;
  
  let videoElement;
  let isPlaying = true;
  
  export function toggleVideo() {
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        isPlaying = true;
      } else {
        videoElement.pause();
        isPlaying = false;
      }
    }
  }
  
  export function restartVideo() {
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play();
      isPlaying = true;
    }
  }
</script>

<div class="mt-6">
  {#if $$slots.header}
    <div class="flex items-center justify-between mb-4">
      <slot name="header" />
      {#if showControls}
        <div class="flex space-x-2">
          <button
            on:click={toggleVideo}
            class="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {#if isPlaying}
              <Pause class="w-4 h-4" />
            {:else}
              <Play class="w-4 h-4" />
            {/if}
          </button>
          <button
            on:click={restartVideo}
            class="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200"
            aria-label="Restart video"
          >
            <RotateCcw class="w-4 h-4" />
          </button>
        </div>
      {/if}
    </div>
  {:else if description}
    <div class="flex items-center justify-between mb-4">
      <p class="text-neutral-700 dark:text-neutral-300">
        {description}
      </p>
      {#if showControls}
        <div class="flex space-x-2">
          <button
            on:click={toggleVideo}
            class="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {#if isPlaying}
              <Pause class="w-4 h-4" />
            {:else}
              <Play class="w-4 h-4" />
            {/if}
          </button>
          <button
            on:click={restartVideo}
            class="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200"
            aria-label="Restart video"
          >
            <RotateCcw class="w-4 h-4" />
          </button>
        </div>
      {/if}
    </div>
  {/if}
  
  <div class="rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
    <video
      bind:this={videoElement}
      on:click={toggleVideo}
      autoplay
      muted
      loop
      playsinline
      class="w-full cursor-pointer"
    >
      <source src={src} type="video/mp4">
    </video>
  </div>
</div>