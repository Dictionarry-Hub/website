<script>
  import { siRss } from 'simple-icons';

  let open = false;

  const feeds = [
    { label: 'All', href: '/rss/all.xml' },
    { label: 'Wiki', href: '/rss/wiki.xml' },
    { label: 'Devlogs', href: '/rss/devlogs.xml' },
  ];
</script>

<div class="relative">
  <button
    onclick={() => open = !open}
    class="inline-flex items-center gap-1 px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors cursor-pointer"
    title="Subscribe via RSS"
  >
    <svg class="w-2.5 sm:w-3 h-2.5 sm:h-3 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
      <path d={siRss.path} />
    </svg>
    <span class="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 hidden sm:inline">RSS</span>
  </button>

  {#if open}
    <div
      class="absolute bottom-full right-0 mb-1 py-1 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg min-w-20"
      role="menu"
    >
      {#each feeds as feed}
        <a
          href={feed.href}
          target="_blank"
          rel="noopener noreferrer"
          class="block px-3 py-1 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          onclick={() => open = false}
        >
          {feed.label}
        </a>
      {/each}
    </div>
  {/if}
</div>

<svelte:window onclick={(e) => { if (open && !e.target.closest('.relative')) open = false; }} />
