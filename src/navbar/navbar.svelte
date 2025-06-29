<script>
  import Header from './components/header.svelte';
  import Search from './components/search.svelte';
  import Extras from './components/extras.svelte';
  import SearchModal from '../searchModal/searchModal.svelte';
  
  let isSearchModalOpen = false;
  
  function openSearchModal() {
    isSearchModalOpen = true;
  }
</script>

<nav class="w-full bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-600">
  <div class="w-full px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-3 items-center h-16">
      <div class="col-span-1">
        <Header />
      </div>
      <div class="col-span-1 flex justify-center">
        <!-- Desktop: Full search bar in center -->
        <div class="hidden lg:block">
          <Search {openSearchModal} />
        </div>
      </div>
      <div class="col-span-1 flex justify-end">
        <!-- Mobile: Search + Extras side by side -->
        <div class="lg:hidden flex items-center space-x-2">
          <Search {openSearchModal} />
          <Extras />
        </div>
        <!-- Desktop: Just Extras -->
        <div class="hidden lg:block">
          <Extras />
        </div>
      </div>
    </div>
  </div>
</nav>

<SearchModal bind:isOpen={isSearchModalOpen} />