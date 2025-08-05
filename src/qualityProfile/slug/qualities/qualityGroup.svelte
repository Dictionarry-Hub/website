<script>
  import { Target, ChevronDown } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  
  export let group = {};
  export let rank = 1;
  export let isUpgradeTarget = false;
  export let totalGroups = 1;
  
  // Determine if this is a single quality or a group
  $: isSingleQuality = !group.qualities || group.qualities.length === 1;
  $: displayName = group.name || 'Unknown Quality';
  $: description = group.description || '';
  $: qualitiesList = group.qualities || [];
  
  // Start expanded only for single qualities
  let isExpanded = !group.qualities || group.qualities.length === 1;
  
  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>

<div class="mb-6">
  <!-- Group Header -->
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center gap-2">
      <div class="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800">
        <span class="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{rank}</span>
      </div>
      <h3 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{displayName}</h3>
    </div>
    
    <div class="flex items-center gap-2">
      {#if isUpgradeTarget}
        <div class="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <Target class="w-3 h-3 text-blue-600 dark:text-blue-400" />
          <span class="text-xs font-medium text-blue-700 dark:text-blue-300">Upgrade Until</span>
        </div>
      {/if}
      
      {#if !isSingleQuality}
        <button
          on:click={toggleExpanded}
          class="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          aria-label="{isExpanded ? 'Hide' : 'Show'} {displayName} qualities"
        >
          <ChevronDown class="w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 {isExpanded ? '' : '-rotate-90'}" />
        </button>
      {/if}
    </div>
  </div>
  
  <!-- Quality Table and Description -->
  {#if isExpanded}
    <div transition:slide={{ duration: 200 }}>
      <!-- Description (if exists and not single quality) -->
      {#if description && !isSingleQuality}
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{description}</p>
      {/if}
      
      <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <table class="w-full">
      <thead>
        <tr class="border-b border-neutral-200 dark:border-neutral-700">
          <th class="text-left px-4 py-3 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Quality Name</th>
        </tr>
      </thead>
      <tbody>
        {#if isSingleQuality}
          <tr class="border-b border-neutral-100 dark:border-neutral-800 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            <td class="px-4 py-3">
              <span class="text-sm text-neutral-900 dark:text-neutral-100">{displayName}</span>
            </td>
          </tr>
        {:else}
          {#each qualitiesList as quality}
            <tr class="border-b border-neutral-100 dark:border-neutral-800 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
              <td class="px-4 py-3">
                <span class="text-sm text-neutral-900 dark:text-neutral-100">{quality.name}</span>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
      </div>
    </div>
  {/if}
</div>