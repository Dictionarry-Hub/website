<script>
  import { Play, Pause, RotateCcw } from 'lucide-svelte';
  
  export let number;
  export let title;
  export let subtitle;
  export let showControls = false;
  export let isPlaying = true;
  export let onToggle = () => {};
  export let onRestart = () => {};
</script>

<div class="flex items-center justify-between">
  <div class="flex space-x-3 items-center">
    <div class="flex-shrink-0 w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
      <span class="text-neutral-900 dark:text-white font-bold text-sm">{number}</span>
    </div>
    <div>
      <h3 class="font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <p class="text-neutral-700 dark:text-neutral-300">
        {@html subtitle}
      </p>
    </div>
  </div>
  {#if showControls}
    <div class="flex space-x-2">
      <button
        on:click={onToggle}
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
        on:click={onRestart}
        class="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200"
        aria-label="Restart video"
      >
        <RotateCcw class="w-4 h-4" />
      </button>
    </div>
  {/if}
</div>