<script>
  import Modal from '@ui/modal.svelte';
  import Dropdown from '@ui/dropdown.svelte';
  import DropdownRow from '@ui/dropdownRow.svelte';
  import SearchResult from './searchResult.svelte';
  import { Filter } from 'lucide-svelte';
  import { testSearchData, searchFilters } from '@shared/constants/testData';
  import { funnySearchMessages } from '@shared/constants/funnySearchMessages';
  import { clickOutside } from '@shared/utils/clickOutside.js';
  
  export let isOpen = false;
  
  let searchInput;
  let searchTerm = '';
  let selectedFilter = 'All Types';
  let filterOpen = false;
  let highlightedIndex = 0;
  let resultsContainer;
  let keyboardMode = false;
  let randomMessage = funnySearchMessages[Math.floor(Math.random() * funnySearchMessages.length)];
  
  // Filter and search results
  $: filteredResults = !searchTerm ? [] : testSearchData.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'All Types' || 
      (selectedFilter === 'Wiki Articles' && entry.type === 'wiki') ||
      (selectedFilter === 'Development Logs' && entry.type === 'dev_log') ||
      (selectedFilter === 'Regex Patterns' && entry.type === 'regex_pattern') ||
      (selectedFilter === 'Custom Formats' && entry.type === 'custom_format') ||
      (selectedFilter === 'Quality Profiles' && entry.type === 'profile');
    
    return matchesSearch && matchesFilter;
  });
  
  // Reset highlight when results change
  $: if (filteredResults) {
    highlightedIndex = 0;
  }
  
  // Focus search input when modal opens
  $: if (isOpen && searchInput) {
    setTimeout(() => searchInput.focus(), 100);
  }
  
  // Handle keyboard navigation
  function handleKeydown(event) {
    if (!isOpen) return;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        keyboardMode = true;
        highlightedIndex = Math.min(highlightedIndex + 1, filteredResults.length - 1);
        scrollToHighlighted();
        break;
      case 'ArrowUp':
        event.preventDefault();
        keyboardMode = true;
        highlightedIndex = Math.max(highlightedIndex - 1, 0);
        scrollToHighlighted();
        break;
      case 'Enter':
        event.preventDefault();
        if (filteredResults[highlightedIndex]) {
          selectResult(filteredResults[highlightedIndex]);
        }
        break;
      case 'Escape':
        closeModal();
        break;
    }
  }
  
  function scrollToHighlighted() {
    if (!resultsContainer) return;
    
    const highlightedElement = resultsContainer.querySelector(`[data-index="${highlightedIndex}"]`);
    if (highlightedElement) {
      highlightedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }
  
  function selectResult(entry) {
    console.log('Selected:', entry);
    // TODO: Implement result selection logic
    closeModal();
  }
  
  function closeModal() {
    isOpen = false;
    searchTerm = '';
    highlightedIndex = 0;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<Modal bind:isOpen width="max-w-4xl" height="h-[32rem] max-h-[calc(100vh-8rem)]" footer="true" onClose={closeModal}>
  <!-- Custom header with search -->
  <div slot="header" class="w-full">
    <div class="flex items-center space-x-0">
      <!-- Filter Button -->
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
        
        <Dropdown bind:isOpen={filterOpen} position="left">
          {#each searchFilters as filter, index}
            <DropdownRow 
              showBorder={index < searchFilters.length - 1} 
              onclick={() => selectedFilter = filter}
            >
              <span class="text-sm text-neutral-700 dark:text-neutral-300">{filter}</span>
            </DropdownRow>
          {/each}
        </Dropdown>
      </div>
      
      <!-- Search Input -->
      <input
        bind:this={searchInput}
        bind:value={searchTerm}
        type="text"
        placeholder="Search dictionarry..."
        class="flex-1 px-4 h-10 border border-neutral-300 dark:border-neutral-600 rounded-r-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none"
      />
    </div>
  </div>
  
  <!-- Results body -->
  <div bind:this={resultsContainer} class="flex-1 flex flex-col">
    {#if searchTerm && filteredResults.length === 0}
      <div class="text-center py-8 text-neutral-500 dark:text-neutral-400">
        <p>No results found for "{searchTerm}"</p>
        <p class="text-sm mt-1">Try a different search term or filter</p>
      </div>
    {:else if filteredResults.length > 0}
      {#each filteredResults as entry, index}
        <div 
          data-index={index}
          on:mouseenter={() => highlightedIndex = index}
        >
          <SearchResult 
            {entry} 
            {searchTerm}
            isHighlighted={index === highlightedIndex}
            on:click={() => selectResult(entry)}
          />
        </div>
      {/each}
    {:else}
      <div class="flex-1 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
        <p>{randomMessage}</p>
      </div>
    {/if}
  </div>
  
  <!-- Footer with keyboard shortcuts -->
  <div slot="footer" class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-1">
        <kbd class="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">↑</kbd>
        <kbd class="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">↓</kbd>
        <span>navigate</span>
      </div>
      <div class="flex items-center space-x-1">
        <kbd class="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">↵</kbd>
        <span>select</span>
      </div>
      <div class="flex items-center space-x-1">
        <kbd class="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">esc</kbd>
        <span>close</span>
      </div>
    </div>
    <div class="text-neutral-400 dark:text-neutral-500">
      {filteredResults.length} result{filteredResults.length === 1 ? '' : 's'}
    </div>
  </div>
</Modal>