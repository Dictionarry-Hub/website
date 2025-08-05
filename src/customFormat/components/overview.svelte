<script>
  import { parseMarkdown } from '@shared/utils/markdown';
  import { Tag } from 'lucide-svelte';

  export let name = '';
  export let description = '';
  export let tags = [];
</script>

<div class="mb-12">
      
      <!-- Header: Name and Tags -->
      <div class="flex flex-col md:flex-row md:items-start gap-4">
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/2">
          {name}
        </h1>
        
        <div class="flex flex-wrap gap-2 md:w-1/2 md:justify-end">
          {#if tags && tags.length > 0}
            {#each tags as tag}
              <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                           border border-neutral-300/70 dark:border-neutral-700/50 
                           text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-medium flex items-center gap-1.5">
                <Tag class="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>{tag}</span>
              </span>
            {/each}
          {/if}
        </div>
      </div>

      <!-- Description -->
      {#if description}
        <div class="mt-6 border-t border-neutral-200 dark:border-neutral-700/60 pt-6">
          <div class="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {@html parseMarkdown(description)}
          </div>
        </div>
      {/if}
</div>