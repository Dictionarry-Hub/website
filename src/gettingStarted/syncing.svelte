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
      'Overview',
      'Sync Methods',
      'Unique Imports'
    ], '#/profilarr-setup/syncing');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Syncing</h1>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">
    Overview
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    The sync process is straightforward: Profilarr reads your database configurations, translates them into Radarr/Sonarr's required format, and pushes them to your instances.
  </p>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="sync-methods">
    Sync Methods
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Choose from three sync approaches based on your workflow:
  </p>
  
  <div class="space-y-6 mt-6">
    <div>
      <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">1. Manual</h3>
      <p class="text-neutral-700 dark:text-neutral-300">
        Configure your instance for manual syncing to maintain full control. Visit the custom format or profile pages, enable selection mode, choose your items, and select target instances. Nothing syncs without your explicit action.
      </p>
    </div>
    
    <div>
      <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">2. On Pull</h3>
      <p class="text-neutral-700 dark:text-neutral-300">
        Automatically sync when your database receives GitHub updates. Local modifications won't trigger syncs; only changes pulled from the remote repository will.
      </p>
    </div>
    
    <div>
      <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">3. Scheduled</h3>
      <p class="text-neutral-700 dark:text-neutral-300">
        Define sync intervals and let Profilarr handle the timing. Override the schedule anytime through the tasks tab.
      </p>
    </div>
  </div>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Automated methods require profile and format selection in your instance settings. Remember: selecting a profile automatically includes all its associated custom formats.
  </p>
  
  <div class="mt-6">
    <div class="flex items-center justify-between mb-4">
      <p class="text-neutral-700 dark:text-neutral-300">
        The video below demonstrates a manual sync of the 1080p Quality profile:
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
        <source src="/video/profilarr_setup/sync.mp4" type="video/mp4">
      </video>
    </div>
  </div>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="unique-imports">
    Unique Imports
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Adds a "Dictionarry" tag to custom formats and profiles. Use this when running Profilarr alongside Recyclarr or Notifiarr to prevent conflicts.
  </p>

  <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
    <p class="text-neutral-700 dark:text-neutral-300">
      You've completed the basic Profilarr setup. The following sections cover advanced topics including updates, local customizations, and database management.
    </p>
  </div>

  <PageNavigation 
    previous={{path: '/profilarr-setup/bridging', title: 'Bridging', description: 'Connect to your Radarr/Sonarr instances'}}
    next={null}
  />
</div>