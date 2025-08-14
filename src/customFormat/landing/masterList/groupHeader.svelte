<script>
  import { ChevronDown } from 'lucide-svelte';
  
  export let groupName = '';
  export let formatCount = 0;
  export let icon = null;
  export let isExpanded = true;
  export let onToggle = () => {};
  
  // Map group names to icon colors
  const groupColors = {
    'Audio': 'text-purple-600 dark:text-purple-400',
    'HDR / Color Grade': 'text-yellow-600 dark:text-yellow-400',
    'HDR': 'text-yellow-600 dark:text-yellow-400',
    'Release Groups': 'text-blue-600 dark:text-blue-400',
    'Release Group Tiers': 'text-indigo-600 dark:text-indigo-400',
    'Streaming Services': 'text-cyan-600 dark:text-cyan-400',
    'Codecs': 'text-green-600 dark:text-green-400',
    'Storage': 'text-orange-600 dark:text-orange-400',
    'Resolution': 'text-pink-600 dark:text-pink-400',
    'Source': 'text-teal-600 dark:text-teal-400',
    'Indexer Flags': 'text-red-600 dark:text-red-400',
    'Edition': 'text-violet-600 dark:text-violet-400',
    'Enhancements': 'text-emerald-600 dark:text-emerald-400',
    'Languages': 'text-sky-600 dark:text-sky-400',
    'Uncategorized': 'text-neutral-600 dark:text-neutral-400'
  };
  
  $: iconColor = groupColors[groupName] || 'text-neutral-600 dark:text-neutral-400';
</script>

<div class="flex items-center justify-between mb-3">
  <div class="flex items-center gap-2">
    {#if icon}
      <svelte:component this={icon} class="w-4 h-4 {iconColor}" />
    {/if}
    <h3 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{groupName}</h3>
    <span class="text-xs text-neutral-500 dark:text-neutral-400">({formatCount})</span>
  </div>
  
  <button
    on:click={onToggle}
    class="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
    aria-label="{isExpanded ? 'Hide' : 'Show'} {groupName} formats"
  >
    <ChevronDown class="w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 {isExpanded ? '' : '-rotate-90'}" />
  </button>
</div>