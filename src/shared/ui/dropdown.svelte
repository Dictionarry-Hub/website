<script>
  import { scale } from 'svelte/transition';
  export let isOpen = false;
  export let position = 'right'; // 'left', 'center', 'right'
  
  $: positionClasses = {
    left: 'left-0 origin-top-left',
    center: 'left-1/2 transform -translate-x-1/2 origin-top',
    right: 'right-0 origin-top-right'
  }[position];
</script>

{#if isOpen}
  <!-- Invisible bridge to prevent mouseleave -->
  <div class="absolute z-10 top-full w-full h-2"></div>
  <div 
    transition:scale={{ duration: 150, start: 0.95 }}
    class="absolute z-10 top-full mt-2 w-56 rounded-md bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-600 {positionClasses}"
  >
    <slot />
  </div>
{/if}