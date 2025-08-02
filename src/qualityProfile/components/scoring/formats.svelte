<script>
  import FormatGroup from './formatGroup.svelte';
  import { Layers } from 'lucide-svelte';
  
  export let filteredFormats = [];
  export let selectedGroups = [];
  export let groupedFormats = {};
  
  // Prepare format groups for display
  $: formatGroups = (() => {
    // If "All Groups" is selected or no groups selected, show all formats in one group
    if (selectedGroups.includes('All Groups') || selectedGroups.length === 0) {
      if (filteredFormats.length === 0) return [];
      return [{
        name: 'Custom Formats',
        formats: filteredFormats,
        icon: Layers
      }];
    }
    
    // Otherwise, show grouped formats
    return Object.entries(groupedFormats).map(([groupName, formats]) => ({
      name: groupName,
      formats: formats
    }));
  })();
  
  // Calculate total shown formats
  $: totalShownFormats = formatGroups.reduce((sum, group) => sum + group.formats.length, 0);
</script>

<div class="mt-6">
  {#if formatGroups.length === 0}
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8 text-center">
      <p class="text-neutral-500 dark:text-neutral-400">No formats match your current filters</p>
    </div>
  {:else}
    {#each formatGroups as group}
      <FormatGroup 
        groupName={group.name} 
        formats={group.formats}
        icon={group.icon}
      />
    {/each}
  {/if}
</div>