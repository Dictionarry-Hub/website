<script>
  import { router } from 'tinro';
  import { routes } from '../generated/routes';
  import NotFound from '@shared/components/notFound.svelte';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onDestroy } from 'svelte';

  // Get current path for finding the matching route
  $: currentPath = $router.path;
  $: devLog = routes.find(r => r.path === currentPath);

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
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-neutral-900 dark:text-white mb-4">{devLog.frontmatter.title}</h1>
    <div class="markdown-content">
      {@html devLog.html}
    </div>
  </div>
{:else}
  <NotFound />
{/if}

