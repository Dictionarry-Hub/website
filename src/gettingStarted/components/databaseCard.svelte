<script>
  import { onMount } from 'svelte';
  import { Star, GitCommit, GitFork, ExternalLink } from 'lucide-svelte';
  
  export let name;
  export let description;
  export let githubUrl;
  
  let stats = {
    stars: '-',
    lastCommit: '-',
    forks: '-'
  };
  
  let loading = true;
  
  onMount(async () => {
    try {
      // Extract owner and repo from GitHub URL
      const urlParts = githubUrl.replace('https://github.com/', '').split('/');
      const owner = urlParts[0];
      const repo = urlParts[1];
      
      // Fetch repository data
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (response.ok) {
        const data = await response.json();
        
        // Get last commit date
        const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);
        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
          if (commits.length > 0) {
            const lastCommitDate = new Date(commits[0].commit.committer.date);
            const daysAgo = Math.floor((new Date() - lastCommitDate) / (1000 * 60 * 60 * 24));
            
            if (daysAgo === 0) {
              stats.lastCommit = 'today';
            } else if (daysAgo === 1) {
              stats.lastCommit = 'yesterday';
            } else if (daysAgo < 30) {
              stats.lastCommit = `${daysAgo}d ago`;
            } else if (daysAgo < 365) {
              const months = Math.floor(daysAgo / 30);
              stats.lastCommit = `${months}mo ago`;
            } else {
              const years = Math.floor(daysAgo / 365);
              stats.lastCommit = `${years}y ago`;
            }
          }
        }
        
        stats.stars = data.stargazers_count.toLocaleString();
        stats.forks = data.forks_count.toLocaleString();
      }
    } catch (error) {
      console.error('Failed to fetch GitHub stats:', error);
    } finally {
      loading = false;
    }
  });
</script>

<div class="group relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200">
  <div>
    <div class="flex items-center justify-between">
      <h3 class="font-semibold text-neutral-900 dark:text-white">{name}</h3>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-1 text-xs text-neutral-600 dark:text-neutral-400">
          <Star class="w-3.5 h-3.5" />
          <span class={loading ? 'opacity-50' : ''}>{stats.stars}</span>
        </div>
        <div class="flex items-center space-x-1 text-xs text-neutral-600 dark:text-neutral-400">
          <GitFork class="w-3.5 h-3.5" />
          <span class={loading ? 'opacity-50' : ''}>{stats.forks}</span>
        </div>
        <div class="flex items-center space-x-1 text-xs text-neutral-600 dark:text-neutral-400">
          <GitCommit class="w-3.5 h-3.5" />
          <span class={loading ? 'opacity-50' : ''}>{stats.lastCommit}</span>
        </div>
      </div>
    </div>
    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
      {description}
    </p>
    <a 
      href={githubUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      class="inline-flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-3"
    >
      <span>{githubUrl.replace('https://github.com/', '')}</span>
      <ExternalLink class="w-3 h-3" />
    </a>
  </div>
</div>