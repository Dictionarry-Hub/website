<script>
  import { scale } from 'svelte/transition';
  export let isOpen = false;
</script>

{#if isOpen}
  <div 
    transition:scale={{ duration: 150, start: 0.95 }}
    class="absolute right-0 z-10 top-full w-56 origin-top-right rounded-md bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-600"
  >
    <slot />
  </div>
{/if}