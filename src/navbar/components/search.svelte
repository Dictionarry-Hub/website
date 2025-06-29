<script>
  import Dropdown from '@ui/dropdown.svelte';
  
  let filterOpen = false;
</script>

<div class="flex items-center space-x-3">
  <Dropdown bind:isOpen={filterOpen} buttonText="Filter">
    <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Filter option 1</a>
    <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Filter option 2</a>
    <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Filter option 3</a>
  </Dropdown>
  
  <div class="relative">
    <input
      type="text"
      placeholder="Search..."
      class="w-64 px-4 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500"
    />
    <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
      <span class="sr-only">Search</span>
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>