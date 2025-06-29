<script>
  export let isOpen = false;
  export let buttonText = "Dropdown";
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
</script>

<div class="relative inline-block text-left">
  <button
    on:click={toggleDropdown}
    class="inline-flex items-center justify-center w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500"
  >
    {buttonText}
    <svg class="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </button>

  {#if isOpen}
    <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-neutral-900 ring-opacity-5">
      <div class="py-1">
        <slot />
      </div>
    </div>
  {/if}
</div>