<script>
  import Header from './components/header.svelte';
  import Search from './components/search.svelte';
  import Extras from './components/extras.svelte';
  import SearchModal from '../searchModal/searchModal.svelte';
  import { Menu, X } from 'lucide-svelte';
  import { isMobileSidebarOpen, toggleMobileSidebar } from '@shared/stores/mobileSidebar';
  
  let isSearchModalOpen = false;
  
  function openSearchModal() {
    isSearchModalOpen = true;
  }
</script>

<nav class="sticky top-0 z-50 w-full bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-600">
  <div class="w-full universal-padding-x">
    <!-- Mobile layout -->
    <div class="xl:hidden flex items-center justify-between h-16">
      <div class="flex items-center gap-2">
        <Header />
        <button
          class="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
          on:click={toggleMobileSidebar}
          aria-label={$isMobileSidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {#if $isMobileSidebarOpen}
            <X class="w-5 h-5" />
          {:else}
            <Menu class="w-5 h-5" />
          {/if}
        </button>
      </div>
      
      <div class="flex items-center space-x-2">
        <Search {openSearchModal} />
        <Extras />
      </div>
    </div>
    
    <!-- Desktop layout -->
    <div class="hidden xl:grid grid-cols-3 items-center h-16">
      <div class="col-span-1">
        <Header />
      </div>
      <div class="col-span-1 flex justify-center">
        <Search {openSearchModal} />
      </div>
      <div class="col-span-1 flex justify-end">
        <Extras />
      </div>
    </div>
  </div>
</nav>

<SearchModal bind:isOpen={isSearchModalOpen} />