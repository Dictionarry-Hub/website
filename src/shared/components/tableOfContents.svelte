<script>
  import { ChevronRight } from 'lucide-svelte';
  
  export let items = [];
  
  function handleClick(item) {
    const id = typeof item === 'string' ? sanitizeForAnchor(item) : sanitizeForAnchor(item.title);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  function sanitizeForAnchor(text) {
    return text
      .replace(/[^\w\s-]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
  }
  
  function renderItems(items, depth = 0) {
    return items;
  }
</script>

{#if items && items.length > 0}
  <nav class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
    <h3 class="text-sm font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">
      On this page
    </h3>
    
    <ul class="space-y-2 text-sm">
      {#each items as item}
        {#if typeof item === 'string'}
          <!-- Simple string item -->
          <li>
            <button
              on:click={() => handleClick(item)}
              class="text-left w-full text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
            >
              {item}
            </button>
          </li>
        {:else}
          <!-- Nested item with children -->
          <li>
            <button
              on:click={() => handleClick(item)}
              class="text-left w-full text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
            >
              {item.title}
            </button>
            
            {#if item.children && item.children.length > 0}
              <ul class="ml-4 mt-2 space-y-1">
                {#each item.children as child}
                  <li>
                    <button
                      on:click={() => handleClick(child)}
                      class="text-left w-full text-neutral-500 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-0.5 text-xs flex items-start gap-1"
                    >
                      <ChevronRight size={12} class="mt-0.5 flex-shrink-0" />
                      <span>{typeof child === 'string' ? child : child.title}</span>
                    </button>
                  </li>
                {/each}
              </ul>
            {/if}
          </li>
        {/if}
      {/each}
    </ul>
  </nav>
{/if}