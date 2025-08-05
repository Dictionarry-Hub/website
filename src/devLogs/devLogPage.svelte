<script>
  import { router } from 'tinro';
  import { contentDatabase } from '../generated/contentDatabase';
  import NotFound from '@shared/components/notFound.svelte';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onDestroy } from 'svelte';

  // Get current path for finding the matching entry
  $: currentPath = $router.path;
  $: devLog = contentDatabase.routeMap[currentPath];

  // Update navigation when devLog changes
  $: if (devLog && devLog.navigation) {
    setNavigationItems(devLog.navigation, currentPath);
  } else if (devLog) {
    clearNavigation();
  }

  onDestroy(() => {
    clearNavigation();
  });
</script>

{#if devLog}
  <div >
    <h1 class="text-3xl font-bold text-neutral-900 dark:text-white mb-4">{devLog.title}</h1>
    <div class="markdown-content">
      {@html devLog.html}
    </div>
  </div>
{:else}
  <NotFound />
{/if}

