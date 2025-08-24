<script>
  import Dropdown from '@ui/dropdown.svelte';
  import DropdownRow from '@ui/dropdownRow.svelte';
  import { clickOutside } from '@shared/utils/clickOutside.js';
  import { Film, Tv, Filter, Check } from 'lucide-svelte';
  
  export let hasRadarr = false;
  export let hasSonarr = false;
  export let selectedCategories = ['radarr', 'sonarr']; // Array for multiple selection
  
  let categoryOpen = false;
  
  const categories = [
    { value: 'radarr', label: 'Radarr', icon: Film, color: 'yellow' },
    { value: 'sonarr', label: 'Sonarr', icon: Tv, color: 'blue' }
  ];
  
  function toggleCategory(value) {
    if (selectedCategories.includes(value)) {
      // Don't allow deselecting if it's the only one selected
      if (selectedCategories.length > 1) {
        selectedCategories = selectedCategories.filter(c => c !== value);
      }
    } else {
      selectedCategories = [...selectedCategories, value];
    }
  }
  
  $: availableCategories = categories.filter(c => {
    if (c.value === 'radarr') return hasRadarr;
    if (c.value === 'sonarr') return hasSonarr;
    return false;
  });
</script>

<div 
  class="relative"
  role="button"
  tabindex="0"
  on:mouseenter={() => categoryOpen = true}
  on:mouseleave={() => categoryOpen = false}
  use:clickOutside={() => categoryOpen = false}
>
  <button 
    class="flex items-center justify-center px-3 h-10 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 border-l-0 rounded-r-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
    on:click={() => categoryOpen = !categoryOpen}
  >
    <span class="sr-only">Category Filter</span>
    <Filter class="w-4 h-4 transition-all duration-200 {categoryOpen ? 'scale-110' : ''}" />
  </button>
  
  <!-- Category Dropdown -->
  <Dropdown bind:isOpen={categoryOpen} position="right" width="w-48">
    {#each availableCategories as category, index}
      <DropdownRow 
        showBorder={index < availableCategories.length - 1}
        onclick={() => toggleCategory(category.value)}
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2">
            <svelte:component 
              this={category.icon} 
              class="w-3.5 h-3.5 {category.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-600 dark:text-blue-400'}" 
            />
            <span class="text-sm text-neutral-700 dark:text-neutral-300">{category.label}</span>
          </div>
          {#if selectedCategories.includes(category.value)}
            <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <Check class="w-2.5 h-2.5 text-white" />
            </div>
          {/if}
        </div>
      </DropdownRow>
    {/each}
  </Dropdown>
</div>