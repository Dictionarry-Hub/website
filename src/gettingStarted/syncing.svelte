<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import VideoPlayer from '@shared/ui/videoPlayer.svelte';
  
  onMount(() => {
    setNavigationItems([
      'Overview',
      'Sync Methods',
      'Unique Imports'
    ], '/profilarr-setup/syncing');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div >
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
  
  <VideoPlayer 
    src="/video/profilarr_setup/sync.mp4"
    description="The video below demonstrates a manual sync of the 1080p Quality profile:"
  />
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="unique-imports">
    Unique Imports
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Adds a "Dictionarry" tag to custom formats and profiles. Use this when running Profilarr alongside Recyclarr or Notifiarr to prevent conflicts.
  </p>

  <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
    <p class="text-neutral-700 dark:text-neutral-300">
      This completes the basic setup. You've seen how Profilarr addresses the first part of the <a href="/" class="text-blue-600 dark:text-blue-400 hover:underline">tooling challenge</a>: getting configurations from a database into your Radarr/Sonarr instances. The next sections cover the remaining aspects: handling updates, preserving customizations, and managing databases.
    </p>
  </div>

  <PageNavigation 
    previous={{path: '/profilarr-setup/bridging', title: 'Bridging', description: 'Connect to your Radarr/Sonarr instances'}}
    next={{path: '/profilarr-setup/updates', title: 'Updates', description: 'Handle database updates and changes'}}
  />
</div>