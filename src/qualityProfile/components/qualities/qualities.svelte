<script>
  import QualityGroup from './qualityGroup.svelte';
  import { Trophy, CheckCircle, XCircle } from 'lucide-svelte';
  
  export let qualities = [];
  export let upgrade_until = null;
  export let upgradesAllowed = false;
  
  // Qualities are ranked by preference (first = most preferred)
  $: rankedQualities = qualities || [];
</script>

<div>
  <!-- Header Section -->
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Qualities</h2>
    
    <div class="flex items-center gap-2">
      <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
        {#if upgradesAllowed}
          <CheckCircle class="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span class="text-neutral-700 dark:text-neutral-300">Upgrades Allowed</span>
        {:else}
          <XCircle class="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
          <span class="text-neutral-700 dark:text-neutral-300">No Upgrades</span>
        {/if}
      </span>
      
      <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
        <Trophy class="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
        <span class="text-neutral-700 dark:text-neutral-300">{rankedQualities.length} Group{rankedQualities.length === 1 ? '' : 's'}</span>
      </span>
    </div>
  </div>
  
  <!-- Divider -->
  <div class="border-t border-neutral-200 dark:border-neutral-700 mb-6"></div>
  
  
  <!-- Quality Groups -->
  <div class="space-y-4">
    {#each rankedQualities as qualityGroup, index}
      <QualityGroup 
        group={qualityGroup} 
        rank={index + 1}
        isUpgradeTarget={upgrade_until && upgrade_until.id === qualityGroup.id}
        totalGroups={rankedQualities.length}
      />
    {/each}
  </div>
</div>