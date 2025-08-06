<script>
  import { contentDatabase } from '@db';
  import { onMount } from 'svelte';
  import { clearNavigation } from '@shared/stores/navigation';
  import VerticalTimeline from './verticalTimeline.svelte';
  import DevLogEntry from './devLogEntry.svelte';

  // Filter and sort dev log entries by date (newest first)
  const devLogEntries = contentDatabase.entries
    .filter(entry => entry.category === 'dev-logs' && entry.type !== 'static')
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

<div class="flex h-full overflow-hidden -m-8 md:-m-12 lg:-m-16 xl:-m-24 2xl:-m-32">
  <div class="flex-1 overflow-y-auto">
    <div class="universal-padding">
      

      <div class="text-left">
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Development Log</h1>
        <p class="text-neutral-600 dark:text-neutral-400 mb-8">
          A chronological timeline of development updates, features, and progress.
        </p>
      </div>

      <div class="space-y-6">
        {#each devLogEntries as entry}
          <DevLogEntry {entry} />
        {/each}
      </div>

      {#if devLogEntries.length === 0}
        <div class="text-center py-12">
          <p class="text-neutral-500 dark:text-neutral-400">No development logs found.</p>
        </div>
      {/if}
    </div>
  </div>
  
  <VerticalTimeline />
</div>
