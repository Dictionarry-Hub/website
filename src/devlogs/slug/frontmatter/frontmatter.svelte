<script>
  export let entry;
  
  const tags = entry.frontmatter?.tags || [];
  const author = entry.frontmatter?.author || 'Unknown';
  const date = entry.frontmatter?.created;
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'No date';
</script>

<div class="mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-700">
  <!-- Title -->
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
    {entry.title}
  </h1>
  
  <!-- Blurb/Description -->
  {#if entry.frontmatter?.blurb}
    <p class="text-base text-neutral-600 dark:text-neutral-400 mb-4">
      {entry.frontmatter.blurb}
    </p>
  {/if}
  
  <!-- Meta Info -->
  <div class="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
    <div class="flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span>{author}</span>
    </div>
    <div class="flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <time datetime={date}>{formattedDate}</time>
    </div>
    {#if entry.readingTime}
      <div class="flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{entry.readingTime}</span>
      </div>
    {/if}
  </div>
  
  <!-- Tags -->
  {#if tags.length > 0}
    <div class="flex flex-wrap gap-2 mt-4">
      {#each tags as tag}
        <span class="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded">
          {tag}
        </span>
      {/each}
    </div>
  {/if}
</div>