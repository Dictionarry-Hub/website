<script>
  import { GitCommit, Calendar, User, Hash } from 'lucide-svelte';
  
  export let commitLog = null;
  
  // Show all commits by default, but allow limiting for performance
  let showAll = false;
  const initialCommitLimit = 10;
  
  $: displayedCommits = showAll || !commitLog?.commits 
    ? commitLog?.commits || []
    : commitLog.commits.slice(0, initialCommitLimit);
  
  // Format date to relative time
  function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }
  
  // Format full date
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

{#if commitLog && commitLog.commits && commitLog.commits.length > 0}
  <div class="mb-12">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-start gap-4 mb-6">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/4">
        Changelog
      </h2>
      
      <!-- Metadata Pills -->
      <div class="flex flex-wrap gap-2 md:w-3/4 md:justify-end">
        <!-- Last Commit -->
        {#if commitLog.lastCommit}
          <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                       border border-neutral-300/70 dark:border-neutral-700/50 
                       rounded-full text-xs font-medium flex items-center gap-1.5">
            <Calendar class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span class="text-neutral-700 dark:text-neutral-300">
              Last: {formatRelativeTime(commitLog.lastCommit.date)}
            </span>
          </span>
        {/if}
        
        <!-- Total Commits -->
        <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                     border border-neutral-300/70 dark:border-neutral-700/50 
                     rounded-full text-xs font-medium flex items-center gap-1.5">
          <GitCommit class="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span class="text-neutral-700 dark:text-neutral-300">
            {commitLog.totalCommits} {commitLog.totalCommits === 1 ? 'commit' : 'commits'}
          </span>
        </span>
        
        <!-- Showing Count if Limited -->
        {#if !showAll && commitLog.commits.length > initialCommitLimit}
          <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                       border border-neutral-300/70 dark:border-neutral-700/50 
                       rounded-full text-xs font-medium flex items-center gap-1.5">
            <Hash class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span class="text-neutral-700 dark:text-neutral-300">
              Showing {initialCommitLimit} of {commitLog.commits.length}
            </span>
          </span>
        {/if}
      </div>
    </div>
    
    <!-- Commits List -->
    <div class="border border-neutral-200 dark:border-neutral-700/60 rounded-lg overflow-hidden 
                {!showAll && commitLog.commits.length > 20 ? 'max-h-[600px] overflow-y-auto' : ''}">
      {#each displayedCommits as commit, index}
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 
                    {index !== displayedCommits.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-700/60' : ''}
                    hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
          
          <!-- Commit Hash -->
          {#if commitLog.repoUrl}
            <a href="{commitLog.repoUrl}/commit/{commit.hash}" 
               target="_blank"
               rel="noopener noreferrer"
               class="inline-flex items-center gap-1.5 text-xs font-mono 
                      text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 
                      transition-colors">
              <Hash class="w-3 h-3" />
              {commit.hash.substring(0, 7)}
            </a>
          {:else}
            <span class="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <Hash class="w-3 h-3" />
              {commit.hash.substring(0, 7)}
            </span>
          {/if}
          
          <!-- Message -->
          <div class="flex-1 text-sm text-neutral-700 dark:text-neutral-300">
            {commit.message}
          </div>
          
          <!-- Author and Date -->
          <div class="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span class="flex items-center gap-1">
              <User class="w-3 h-3" />
              {commit.author}
            </span>
            <span title={formatDate(commit.date)}>
              {formatRelativeTime(commit.date)}
            </span>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Show More/Less Button and View on GitHub -->
    <div class="mt-3 flex items-center justify-between">
      {#if commitLog.commits.length > initialCommitLimit}
        <button 
          on:click={() => showAll = !showAll}
          class="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 
                 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          {showAll ? 'Show Less' : `Show All ${commitLog.commits.length} Commits`}
        </button>
      {/if}
      
      {#if commitLog.repoUrl && commitLog.filePath}
        <a href="{commitLog.repoUrl}/commits/{commitLog.branch || 'main'}/{commitLog.filePath}"
           target="_blank"
           rel="noopener noreferrer"
           class="ml-auto px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 
                  hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
          View on GitHub →
        </a>
      {/if}
    </div>
  </div>
{/if}