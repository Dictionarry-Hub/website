<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';

  onMount(() => {
    setNavigationItems([
      'Overview',
      'Thanks'
    ], '#/custom-format');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div>
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Custom Formats</h1>
  
  <div class="space-y-6 text-neutral-700 dark:text-neutral-300">
    <div id="overview">
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Overview</h2>
      <p>
        Custom formats are rules that identify specific characteristics in release names. They combine one or more conditions to match releases, allowing you to score and prioritize them based on your preferences.
      </p>
    </div>
    
    <div id="thanks">
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Thanks</h2>
      <p>
        These custom formats build on the excellent work done by <a href="https://trash-guides.info" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">TRaSH Guides</a>, adapted and expanded for Profilarr workflows. Full credit for their work goes entirely to them.
      </p>
    </div>
  </div>
</div>