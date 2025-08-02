<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Dropdown from '@ui/dropdown.svelte';
  import DropdownRow from '@ui/dropdownRow.svelte';
  import { clickOutside } from '@shared/utils/clickOutside.js';
  import { Check, Layers, Volume2, Monitor, Users, Code, HardDrive, Tag, Square, Tv } from 'lucide-svelte';
  
  const dispatch = createEventDispatcher();
  
  let groupOpen = false;
  let selectedGroups = [];
  
  const groupOptions = [
    { name: 'Audio', icon: Volume2 },
    { name: 'HDR', icon: Monitor },
    { name: 'Release Groups', icon: Users },
    { name: 'Streaming Services', icon: Tv },
    { name: 'Codecs', icon: Code },
    { name: 'Storage', icon: HardDrive },
    { name: 'Release Group Tiers', icon: Tag },
    { name: 'Resolution', icon: Square },
    { name: 'Source', icon: Layers }
  ];
  
  // Load from localStorage on mount
  onMount(() => {
    const savedGroups = localStorage.getItem('scoringGroupFilters');
    if (savedGroups) {
      selectedGroups = JSON.parse(savedGroups);
    } else {
      // Default to all enabled
      selectedGroups = groupOptions.map(g => g.name);
    }
    dispatchGroupChange();
  });
  
  function toggleGroup(groupName) {
    if (selectedGroups.includes(groupName)) {
      selectedGroups = selectedGroups.filter(g => g !== groupName);
    } else {
      selectedGroups = [...selectedGroups, groupName];
    }
    
    // Save to localStorage
    localStorage.setItem('scoringGroupFilters', JSON.stringify(selectedGroups));
    
    dispatchGroupChange();
  }
  
  function dispatchGroupChange() {
    dispatch('groupChange', selectedGroups);
  }
  
  // Calculate active group count
  $: activeGroupCount = groupOptions.length - selectedGroups.length;
</script>

<div 
  class="relative"
  role="button"
  tabindex="0"
  on:mouseenter={() => groupOpen = true}
  on:mouseleave={() => groupOpen = false}
  use:clickOutside={() => groupOpen = false}
>
  <button 
    class="flex items-center justify-center px-3 h-10 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 border-l-0 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
    on:click={() => groupOpen = !groupOpen}
  >
    <span class="sr-only">Group</span>
    <Layers class="w-4 h-4 transition-all duration-200 {groupOpen ? 'scale-110' : ''}" />
  </button>
  
  <!-- Active Group Indicator -->
  {#if activeGroupCount > 0}
    <div class="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
      <span class="text-[10px] font-medium text-white leading-none">{activeGroupCount}</span>
    </div>
  {/if}
  
  <!-- Group Dropdown -->
  <Dropdown bind:isOpen={groupOpen} position="right">
    {#each groupOptions as group, index}
      <DropdownRow 
        showBorder={index < groupOptions.length - 1} 
        onclick={() => toggleGroup(group.name)}
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2">
            <svelte:component this={group.icon} class="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
            <span class="text-sm text-neutral-700 dark:text-neutral-300">{group.name}</span>
          </div>
          {#if selectedGroups.includes(group.name)}
            <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <Check class="w-2.5 h-2.5 text-white" />
            </div>
          {/if}
        </div>
      </DropdownRow>
    {/each}
  </Dropdown>
</div>