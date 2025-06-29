<script>
  import Dropdown from '@ui/dropdown.svelte';
  import DropdownRow from '@ui/dropdownRow.svelte';
  import { Filter, Search, Check } from 'lucide-svelte';
  import { clickOutside } from '@shared/utils/clickOutside.js';
  import { filterStore, filterOptions } from '@shared/stores/filter';
  
  export let openSearchModal = () => {};
  
  let filterOpen = false;
  let searchInput;
  
  // Calculate active filter count (excluding "All Types")
  $: activeFilterCount = $filterStore.searchFilters.filter(filter => filter !== 'All Types').length;
  
  // Handle Ctrl+K shortcut
  function handleKeydown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      openSearchModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Desktop view -->
<div class="hidden lg:flex relative items-center">
  <!-- Filter Button + Search Input Combined -->
  <div class="relative flex items-center">
    <!-- Filter Button (Left side) -->
    <div 
      class="relative"
      role="button"
      tabindex="0"
      on:mouseenter={() => filterOpen = true}
      on:mouseleave={() => filterOpen = false}
      use:clickOutside={() => filterOpen = false}
    >
      <button 
        class="flex items-center justify-center px-3 h-10 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-l-md border-r-0 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        on:click={() => filterOpen = !filterOpen}
      >
        <span class="sr-only">Filter</span>
        <Filter class="w-4 h-4 transition-all duration-200 {filterOpen ? 'scale-110' : ''}" />
      </button>
      
      <!-- Filter Count Indicator -->
      {#if activeFilterCount > 0}
        <div class="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <span class="text-[10px] font-medium text-white leading-none">{activeFilterCount}</span>
        </div>
      {/if}
      
      <!-- Filter Dropdown -->
      <Dropdown bind:isOpen={filterOpen} position="center">
        {#each filterOptions as filter, index}
          <DropdownRow 
            showBorder={index < filterOptions.length - 1} 
            onclick={() => filterStore.toggleSearchFilter(filter)}
          >
            <div class="flex items-center justify-between w-full">
              <span class="text-sm text-neutral-700 dark:text-neutral-300">{filter}</span>
              {#if $filterStore.searchFilters.includes(filter)}
                <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check class="w-2.5 h-2.5 text-white" />
                </div>
              {/if}
            </div>
          </DropdownRow>
        {/each}
      </Dropdown>
    </div>
    
    <!-- Search Input (Middle) -->
    <input
      bind:this={searchInput}
      type="text"
      placeholder="Search..."
      readonly
      class="w-64 px-4 h-10 border border-neutral-300 dark:border-neutral-600 rounded-r-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none cursor-pointer"
      on:click={openSearchModal}
    />
    
    <!-- Ctrl+K Pill (Right side) -->
    <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
      <div class="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs text-neutral-600 dark:text-neutral-300 font-mono">
        Ctrl+K
      </div>
    </div>
  </div>
</div>

<!-- Mobile view -->
<div class="lg:hidden">
  <button class="p-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 rounded-md transition-all duration-200 hover:scale-105" on:click={openSearchModal}>
    <span class="sr-only">Search</span>
    <Search class="w-5 h-5" />
  </button>
</div>