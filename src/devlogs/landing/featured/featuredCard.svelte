<script>
  import { User, Calendar, Tag, Clock } from 'lucide-svelte';
  
  export let entry;
  
  const tags = entry.frontmatter?.tags || [];
  const author = entry.frontmatter?.author || 'Unknown';
  const date = entry.frontmatter?.created;
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }) : 'No date';
</script>

<div class="border border-neutral-200 dark:border-neutral-700 rounded-xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800 hover:shadow-xl transition-all duration-300">
  <a href={entry.path} class="block p-8 lg:p-12 group">
    <div class="max-w-4xl">
      <!-- Tags -->
      {#if tags.length > 0}
        <div class="flex flex-wrap items-center gap-2 mb-4">
          {#each tags.slice(0, 3) as tag}
            <span class="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
              <Tag size={12} />
              {tag}
            </span>
          {/each}
          {#if tags.length > 3}
            <span class="px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              +{tags.length - 3} more
            </span>
          {/if}
        </div>
      {/if}
      
      <!-- Title -->
      <h3 class="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-4">
        {entry.title}
      </h3>
      
      <!-- Description -->
      {#if entry.frontmatter?.blurb}
        <p class="text-base lg:text-lg text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3">
          {entry.frontmatter.blurb}
        </p>
      {/if}
      
      <!-- Meta Info -->
      <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <div class="flex items-center gap-1.5">
          <User size={16} />
          <span>{author}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Calendar size={16} />
          <time datetime={date}>{formattedDate}</time>
        </div>
        {#if entry.readingTime}
          <div class="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{entry.readingTime}</span>
          </div>
        {/if}
      </div>
      
      <!-- Read more indicator -->
      <div class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
        <span>Read entry</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </a>
</div>