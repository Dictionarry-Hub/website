<script>
  import { User, Calendar, Tag } from 'lucide-svelte';
  
  export let entry;
  export let isMobile = false;
</script>

<a 
  href={entry.path} 
  class="block p-6 md:p-8 lg:p-12 group"
>
  <div class="max-w-3xl mx-auto md:px-8 lg:px-12">
    <!-- Tags for both mobile and desktop -->
    {#if entry.frontmatter?.tags && entry.frontmatter.tags.length > 0}
      <div class="flex flex-wrap items-center gap-1.5 mb-3 md:mb-4">
        {#each entry.frontmatter.tags.slice(0, isMobile ? 2 : 3) as tag}
          <span class="inline-flex items-center gap-1 px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
            {#if !isMobile}
              <Tag size={10} />
            {/if}
            {tag}
          </span>
        {/each}
      </div>
    {/if}
    
    <!-- Title -->
    <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 md:mb-6 line-clamp-2">
      {entry.title}
    </h2>
    
    <!-- Meta info -->
    <div class="flex flex-wrap items-center gap-3 md:gap-4 text-[11px] sm:text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
      {#if entry.frontmatter?.author}
        <div class="flex items-center gap-1 md:gap-1.5">
          <User size={isMobile ? 12 : 14} class="flex-shrink-0" />
          <span class="truncate max-w-[100px] sm:max-w-none">{entry.frontmatter.author}</span>
        </div>
      {/if}
      
      {#if entry.frontmatter?.created}
        <div class="flex items-center gap-1 md:gap-1.5">
          <Calendar size={isMobile ? 12 : 14} class="flex-shrink-0" />
          <time datetime={entry.frontmatter.created}>
            {new Date(entry.frontmatter.created).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </time>
        </div>
      {/if}
    </div>
  </div>
</a>