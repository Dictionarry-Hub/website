<script>
  import { hoverInfoStore } from '@shared/stores/hoverInfo';
  import { Info } from 'lucide-svelte';
  
  $: isVisible = $hoverInfoStore.isVisible;
  $: content = $hoverInfoStore.content;
</script>

{#if isVisible && content}
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mb-4 border border-neutral-200 dark:border-neutral-700 relative">
    <Info class="w-4 h-4 text-blue-500 absolute top-3 right-3" />
    <h4 class="font-medium text-neutral-900 dark:text-neutral-100 text-sm mb-1 pr-6">{content.term}</h4>
    <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{content.description}</p>
  </div>
{/if}