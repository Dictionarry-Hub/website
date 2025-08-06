<script>
  import { parseMarkdown } from '@shared/utils/markdown';

  export let name = '';
  export let description = '';
  export let tags = [];
</script>

<div class="mb-12">
      
      <!-- Header: Name and Tags -->
      <div class="flex flex-col md:flex-row md:items-start gap-4">
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/4">
          {name}
        </h1>
        
        <div class="flex flex-wrap gap-2 md:w-3/4 md:justify-end">
          {#if tags && tags.length > 0}
            {#each tags as tag}
              <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                           border border-neutral-300/70 dark:border-neutral-700/50 
                           text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-medium">
                {tag}
              </span>
            {/each}
          {/if}
        </div>
      </div>

      <!-- Description -->
      <div class="mt-6 border-t border-neutral-200 dark:border-neutral-700/60 pt-6">
        {#if description}
          <div class="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {@html parseMarkdown(description)}
          </div>
        {:else}
          <div class="text-neutral-500 dark:text-neutral-400 italic">
            No description available
          </div>
        {/if}
      </div>
</div>