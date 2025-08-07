<script>
  import { onMount } from 'svelte';
  import { Star } from 'lucide-svelte';
  
  let starCount = null;
  let isLoading = true;
  
  async function fetchGitHubStars() {
    try {
      // Fetch all repos from the organization
      const response = await fetch('https://api.github.com/orgs/Dictionarry-Hub/repos?per_page=100');
      
      if (response.ok) {
        const repos = await response.json();
        // Sum up all stars across all repos
        starCount = repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
      }
    } catch (error) {
      console.error('Failed to fetch GitHub stars:', error);
      starCount = null;
    } finally {
      isLoading = false;
    }
  }
  
  onMount(() => {
    fetchGitHubStars();
    // Refresh every 10 minutes
    const interval = setInterval(fetchGitHubStars, 10 * 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

{#if isLoading}
  <span class="inline-flex items-center gap-1 px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 rounded-full">
    <Star class="w-3 h-3 text-neutral-400" />
    <span class="inline-block w-10 h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></span>
  </span>
{:else if starCount !== null}
  <a 
    href="https://github.com/Dictionarry-Hub" 
    target="_blank" 
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1 px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors group"
    title="Visit our GitHub organization!"
  >
    <Star class="w-2.5 sm:w-3 h-2.5 sm:h-3 text-yellow-500" />
    <span class="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400">
      <span class="font-medium">{starCount.toLocaleString()}</span>
      <span class="hidden sm:inline"> stars</span>
    </span>
  </a>
{/if}