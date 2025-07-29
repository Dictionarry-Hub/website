<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import { Play, Pause, RotateCcw } from 'lucide-svelte';
  
  let videoElement;
  let isPlaying = true;
  
  function toggleVideo() {
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
  
  function restartVideo() {
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play();
      isPlaying = true;
    }
  }
  
  onMount(() => {
    setNavigationItems([
      'Overview'
    ], '#/profilarr-setup/bridging');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Bridging</h1>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">Overview</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Bridging connects Profilarr to your Radarr and Sonarr instances, enabling it to sync custom formats and quality profiles from your linked database.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    The process is straightforward; similar to adding instances in tools like Prowlarr:
  </p>
  
  <ol class="list-decimal list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>Enter your Radarr or Sonarr URL</li>
    <li>Provide the API key</li>
    <li>Define your sync parameters</li>
  </ol>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    After bridging, you can sync configurations from your linked database to your instances.
  </p>
  
  <div class="mt-6">
    <div class="flex items-center justify-between mb-4">
      <p class="text-neutral-700 dark:text-neutral-300">
        The video below shows adding a Radarr instance to Profilarr:
      </p>
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
    </div>
    
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
        <source src="/video/profilarr_setup/bridge.mp4" type="video/mp4">
      </video>
    </div>
  </div>

  <PageNavigation 
    previous={{path: '/profilarr-setup/linking', title: 'Linking', description: 'Connect to configuration sources'}}
    next={{path: '/profilarr-setup/syncing', title: 'Syncing', description: 'Push configurations to your instances'}}
  />
</div>