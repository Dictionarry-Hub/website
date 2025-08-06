<script>
  import { contentDatabase } from '@db';

  // Filter and sort dev log entries by date (newest first)
  const devLogEntries = contentDatabase.entries
    .filter(entry => entry.category === 'dev-logs' && entry.type !== 'static')
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter?.created || '1970-01-01');
      const dateB = new Date(b.frontmatter?.created || '1970-01-01');
      return dateB.getTime() - dateA.getTime();
    });

  function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
</script>

<div class="hidden lg:block w-80 h-full bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto p-4 pt-6">
  <div class="relative">
    <!-- Vertical line with fade-out at the bottom -->
    <div 
      class="absolute left-2.5 top-2 w-0.5 h-full bg-neutral-300 dark:bg-neutral-600"
      style="mask-image: linear-gradient(to bottom, black calc(100% - 2rem), transparent); -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 2rem), transparent);"
      aria-hidden="true"
    ></div>

    <div class="space-y-6">
      {#each devLogEntries as entry}
        <div class="relative pl-8 group">
          <!-- Dot on the timeline -->
          <div class="absolute left-2.5 top-1 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 border-2 border-white dark:border-neutral-900 transition-transform duration-150 group-hover:scale-125"></div>

          <!-- Content -->
          <a href="#{entry.path}" class="block">
            <div class="p-2.5 rounded-md bg-transparent group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800/50 transition-colors duration-150">
              <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-0.5">
                {formatDate(entry.frontmatter?.created)}
              </p>
              <h4 class="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight transition-colors font-medium">
                {entry.title}
              </h4>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>