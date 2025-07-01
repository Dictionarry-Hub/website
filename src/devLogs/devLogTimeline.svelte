<script>
  import { routes } from '../generated/routes';
  import { onMount } from 'svelte';
  import { clearNavigation } from '@shared/stores/navigation';
  import VerticalTimeline from './verticalTimeline.svelte';
  import DevLogEntry from './devLogEntry.svelte';

  // Filter and sort dev log routes by date (newest first)
  const devLogRoutes = routes
    .filter(route => route.category === 'dev-logs')
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter?.created || '1970-01-01');
      const dateB = new Date(b.frontmatter?.created || '1970-01-01');
      return dateB.getTime() - dateA.getTime();
    });

  onMount(() => {
    // Clear navigation for this page since we're using custom timeline
    clearNavigation();
  });
</script>

<div class="flex h-full overflow-hidden">
  <div class="flex-1 overflow-y-auto">
    <div class="p-6 max-w-4xl mx-auto">
      

      <div class="text-center">
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Development Log</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mb-8">
          A chronological timeline of development updates, features, and progress.
        </p>
      </div>

      <div class="relative">
        <!-- Main vertical timeline line -->
        <div
          class="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700"
          style="mask-image: linear-gradient(to bottom, transparent, black 2rem, black calc(100% - 2rem), transparent); -webkit-mask-image: linear-gradient(to bottom, transparent, black 2rem, black calc(100% - 2rem), transparent);"
          aria-hidden="true"
        ></div>

        <div class="space-y-6">
          {#each devLogRoutes as route}
            <DevLogEntry {route} />
          {/each}
        </div>
      </div>

      {#if devLogRoutes.length === 0}
        <div class="text-center py-12">
          <p class="text-neutral-500 dark:text-neutral-400">No development logs found.</p>
        </div>
      {/if}
    </div>
  </div>
  
  <VerticalTimeline />
</div>
