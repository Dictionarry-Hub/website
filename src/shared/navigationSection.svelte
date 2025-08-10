<script>
  import { ChevronDown, ChevronUp } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  
  export let title = '';
  export let href = '';
  export let isActive = false;
  export let isOpen = true;
  export let level = 0;
  
  function toggleSection() {
    isOpen = !isOpen;
  }
</script>

<div class="mb-4">
  <!-- Section Header -->
  <div class="flex items-center rounded-md transition-colors group mb-2 {isActive ? 'bg-neutral-100 dark:bg-neutral-800' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'}">
    <!-- Title Link -->
    {#if href}
      <a 
        {href}
        class="flex-1 px-3 py-2 text-sm font-medium transition-colors {isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-100'}"
        on:click|preventDefault={() => {
          const targetId = href.replace('?section=', '');
          const element = document.getElementById(targetId);
          if (element) {
            // Calculate offset for navbar (64px + some padding)
            const navbarHeight = 80;
            const elementPosition = element.offsetTop - navbarHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
            
            // Update URL with section parameter
            const url = new URL(window.location);
            url.searchParams.set('section', targetId);
            window.history.replaceState(null, '', url.toString());
          }
        }}
      >
        {title}
      </a>
    {:else}
      <span class="flex-1 px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
        {title}
      </span>
    {/if}
    
    <!-- Chevron Button -->
    <button 
      class="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-all duration-200 hover:scale-105"
      on:click={toggleSection}
    >
      {#if isOpen}
        <ChevronUp class="w-4 h-4" />
      {:else}
        <ChevronDown class="w-4 h-4" />
      {/if}
    </button>
  </div>
  
  <!-- Section Content -->
  {#if isOpen}
    <div class="relative ml-4" transition:slide={{ duration: 300 }}>
      <!-- Vertical Line - only for first level -->
      {#if level === 0}
        <div class="absolute left-0 top-0 bottom-0 w-px bg-neutral-300 dark:bg-neutral-600"></div>
      {/if}
      
      <!-- Content -->
      <div class="ml-2">
        <slot />
      </div>
    </div>
  {/if}
</div>