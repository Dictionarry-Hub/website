<script>
  import { scale, fade } from 'svelte/transition';
  import { clickOutside } from '@shared/utils/clickOutside.js';
  
  export let isOpen = false;
  export let width = 'max-w-md';
  export let height = 'auto';
  export let header = '';
  export let footer = '';
  export let onClose = () => {};
  
  function handleClose() {
    isOpen = false;
    onClose();
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 z-40 flex items-center justify-center p-4"
    style="backdrop-filter: brightness(0.4);"
    transition:fade={{ duration: 200 }}
    on:click={handleClose}
  >
    <!-- Modal -->
    <div 
      class="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-600 w-full {width} {height === 'auto' ? '' : height} flex flex-col overflow-hidden"
      transition:scale={{ duration: 200, start: 0.95 }}
      use:clickOutside={handleClose}
      on:click|stopPropagation
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-600">
        <slot name="header">
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">{header}</h2>
        </slot>
      </div>
      
      <!-- Body -->
      <div class="flex-1 overflow-y-auto flex flex-col">
        <slot />
      </div>
      
      <!-- Footer (optional) -->
      {#if footer}
        <div class="px-6 py-4 border-t border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 rounded-b-lg">
          <slot name="footer">
            <div class="text-sm text-neutral-600 dark:text-neutral-400">{footer}</div>
          </slot>
        </div>
      {/if}
    </div>
  </div>
{/if}