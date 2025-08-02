<script>
  import { createEventDispatcher } from 'svelte';
  
  export let searchTerm = '';
  
  const dispatch = createEventDispatcher();
  
  let searchInput;
  
  // Handle Ctrl+Shift+K shortcut
  function handleKeydown(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'K') {
      event.preventDefault();
      if (searchInput) {
        searchInput.focus();
      }
    }
  }
  
  // Handle search input changes
  function handleSearchInput() {
    dispatch('search', searchTerm);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="relative flex-1">
  <input
    bind:this={searchInput}
    bind:value={searchTerm}
    on:input={handleSearchInput}
    type="text"
    placeholder="Search custom formats..."
    class="w-full px-4 pr-24 h-10 border border-neutral-300 dark:border-neutral-600 rounded-l-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors duration-150"
  />
  <!-- Ctrl+Shift+K Pill -->
  <div class="absolute right-2 top-1/2 transform -translate-y-1/2">
    <div class="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs text-neutral-600 dark:text-neutral-300 font-mono">
      Ctrl+Shift+K
    </div>
  </div>
</div>