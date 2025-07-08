<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let text = '';
  export let position = 'top'; // top, bottom, left, right
  
  let showTooltip = false;
  let tooltipElement;
  let triggerElement;
  
  function handleMouseEnter() {
    showTooltip = true;
  }
  
  function handleMouseLeave() {
    showTooltip = false;
  }
  
  function getPositionClasses(position) {
    const baseClasses = 'absolute z-50 px-2 py-1 text-xs text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded shadow-lg whitespace-nowrap pointer-events-none';
    
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case 'left':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-2`;
      case 'right':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-2`;
      default:
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
    }
  }
</script>

<div 
  class="relative inline-block"
  bind:this={triggerElement}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <slot />
  
  {#if showTooltip && text}
    <div 
      bind:this={tooltipElement}
      class={getPositionClasses(position)}
      style="opacity: {showTooltip ? 1 : 0}; transition: opacity 0.2s;"
    >
      {text}
      
      <!-- Arrow -->
      <div class="absolute {
        position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2' :
        position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2' :
        position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2' :
        position === 'right' ? 'right-full top-1/2 transform -translate-y-1/2' :
        'top-full left-1/2 transform -translate-x-1/2'
      }">
        <div class="w-0 h-0 {
          position === 'top' ? 'border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100' :
          position === 'bottom' ? 'border-l-4 border-r-4 border-b-4 border-transparent border-b-neutral-900 dark:border-b-neutral-100' :
          position === 'left' ? 'border-t-4 border-b-4 border-l-4 border-transparent border-l-neutral-900 dark:border-l-neutral-100' :
          position === 'right' ? 'border-t-4 border-b-4 border-r-4 border-transparent border-r-neutral-900 dark:border-r-neutral-100' :
          'border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100'
        }"></div>
      </div>
    </div>
  {/if}
</div>