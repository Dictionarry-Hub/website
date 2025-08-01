<script>
  import { parseMarkdown } from '@shared/utils/markdown';

  export let name = '';
  export let description = '';
  export let tags = [];
</script>

<div class="py-12">
  <div class="max-w-4xl mx-auto px-6">
    <div>
      
      <!-- Header: Name and Tags -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white flex-1">
          {name}
        </h1>
        
        {#if tags && tags.length > 0}
          <div class="flex flex-wrap gap-2 shrink-0 md:pt-1">
            {#each tags as tag}
              <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                           border border-neutral-300/70 dark:border-neutral-700/50 
                           text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-medium">
                {tag}
              </span>
            {/each}
          </div>
        {/if}
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
  </div>
</div>