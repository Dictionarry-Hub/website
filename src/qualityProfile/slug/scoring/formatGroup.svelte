<script>
  import { Volume2, Monitor, Users, Tv, Code, HardDrive, Tag, Square, Layers, Folder, ChevronDown, ChevronRight, ExternalLink } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  
  export let groupName = '';
  export let formats = [];
  export let icon = null;
  
  let isExpanded = true;
  
  // Map group names to icons
  const groupIcons = {
    'Audio': Volume2,
    'HDR': Monitor,
    'Release Groups': Users,
    'Streaming Services': Tv,
    'Codecs': Code,
    'Storage': HardDrive,
    'Release Group Tiers': Tag,
    'Resolution': Square,
    'Source': Layers,
    'Uncategorized': Folder,
    'Custom Formats': Layers
  };
  
  // Use provided icon or look up based on group name
  $: groupIcon = icon || groupIcons[groupName] || Tag;
  
  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>

<div class="mb-6">
  <!-- Group Header -->
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center gap-2">
      <svelte:component this={groupIcon} class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
      <h3 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{groupName}</h3>
      <span class="text-xs text-neutral-500 dark:text-neutral-400">({formats.length})</span>
    </div>
    
    <button
      on:click={toggleExpanded}
      class="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
      aria-label="{isExpanded ? 'Hide' : 'Show'} {groupName} formats"
    >
      <ChevronDown class="w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 {isExpanded ? '' : '-rotate-90'}" />
    </button>
  </div>
  
  <!-- Formats Table -->
  {#if isExpanded}
    <div transition:slide={{ duration: 200 }} class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-neutral-200 dark:border-neutral-700">
            <th class="text-left px-4 py-3 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Format Name</th>
            <th class="text-right px-4 py-3 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider w-24">Score</th>
          </tr>
        </thead>
        <tbody>
          {#each formats as format, index}
            <tr class="border-b border-neutral-100 dark:border-neutral-800 last:border-b-0 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors cursor-pointer group">
              <td class="px-4 py-3">
                <a 
                  href="/custom-format/{format.slug || format.name.toLowerCase().replace(/\s+/g, '-')}"
                  class="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  {format.name}
                  <ExternalLink class="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              </td>
              <td class="px-4 py-3 text-right">
                <a 
                  href="/custom-format/{format.slug || format.name.toLowerCase().replace(/\s+/g, '-')}"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all {format.score > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/50' : format.score < 0 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-900/50' : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700'}"
                >
                  {format.score > 0 ? '+' : ''}{format.score}
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>