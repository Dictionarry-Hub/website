<script>
  import { User, Calendar } from 'lucide-svelte';
  export let route;

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<article class="relative pb-2 group">
  <!-- Timeline dot -->
  <div class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white dark:border-neutral-900 -translate-x-1/2 transition-transform duration-150 group-hover:scale-125"></div>
  
  <!-- Content -->
  <div class="ml-12 bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700/50 p-4 hover:shadow-lg transition-shadow duration-200">
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
      <h2 class="text-lg font-semibold text-neutral-800 dark:text-white mb-2 sm:mb-0">
        <a href="#{route.path}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {route.frontmatter?.title || route.slug}
        </a>
      </h2>
      <div class="flex flex-col items-start sm:items-end text-xs text-neutral-500 dark:text-neutral-400 space-y-1 flex-shrink-0 sm:pl-4">
        <div class="flex items-center">
          <Calendar class="w-3.5 h-3.5 mr-1.5" />
          <time datetime={route.frontmatter?.created}>
            {formatDate(route.frontmatter?.created)}
          </time>
        </div>
        {#if route.frontmatter?.author}
          <div class="flex items-center">
            <User class="w-3.5 h-3.5 mr-1.5" />
            <span>{route.frontmatter.author}</span>
          </div>
        {/if}
      </div>
    </div>

    {#if route.html}
      <div 
        class="markdown-content max-w-none text-neutral-600 dark:text-neutral-300 overflow-hidden line-clamp-3 mb-4"
      >
        {@html route.html}
      </div>
    {/if}
    
    {#if route.frontmatter?.tags && route.frontmatter.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-3">
        {#each route.frontmatter.tags as tag}
          <span class="px-2.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs rounded-full font-medium">
            {tag}
          </span>
        {/each}
      </div>
    {/if}
    
    <div class="flex items-center justify-between">
      <a 
        href="#{route.path}" 
        class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
      >
        Read more
      </a>
    </div>
  </div>
</article>
