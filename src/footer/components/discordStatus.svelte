<script>
  import { onMount } from 'svelte';
  import { siDiscord } from 'simple-icons';
  
  let totalCount = null;
  let onlineCount = null;
  let isLoading = true;
  
  async function fetchDiscordMembers() {
    try {
      const inviteCode = 'XGdTJP5G8a';
      const response = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`);
      
      if (response.ok) {
        const data = await response.json();
        totalCount = data.approximate_member_count || null;
        onlineCount = data.approximate_presence_count || null;
      }
    } catch (error) {
      console.error('Failed to fetch Discord member count:', error);
      totalCount = null;
      onlineCount = null;
    } finally {
      isLoading = false;
    }
  }
  
  onMount(() => {
    fetchDiscordMembers();
    // Refresh every 5 minutes
    const interval = setInterval(fetchDiscordMembers, 5 * 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

{#if isLoading}
  <span class="inline-flex items-center gap-1 px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 rounded-full">
    <svg class="w-3 h-3 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
      <path d={siDiscord.path} />
    </svg>
    <span class="inline-block w-16 h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></span>
  </span>
{:else if totalCount !== null && onlineCount !== null}
  <a 
    href="https://discord.gg/XGdTJP5G8a" 
    target="_blank" 
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1 px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors group"
    title="Join us on Discord!"
  >
    <svg class="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
      <path d={siDiscord.path} />
    </svg>
    <span class="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400">
      <span class="hidden sm:inline">
        <span class="font-medium">{totalCount.toLocaleString()}</span> builders • 
      </span>
      <span class="text-green-600 dark:text-green-500 font-medium">{onlineCount.toLocaleString()}</span>
      <span class="hidden sm:inline"> building</span>
      <span class="sm:hidden text-green-600 dark:text-green-500">●</span>
    </span>
  </a>
{/if}