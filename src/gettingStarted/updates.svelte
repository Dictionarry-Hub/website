<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  
  onMount(() => {
    setNavigationItems([
      'Overview'
    ], '#/profilarr-setup/updates');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Updates</h1>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">
    Overview
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Content coming soon.
  </p>

  <PageNavigation 
    previous={{path: '/profilarr-setup/syncing', title: 'Syncing', description: 'Push configurations to your instances'}}
    next={null}
  />
</div>