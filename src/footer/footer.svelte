<script>
  import DiscordStatus from './components/discordStatus.svelte';
  import GithubStatus from './components/githubStatus.svelte';
  import RssButton from './components/rssButton.svelte';
</script>

<footer class="w-full bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-600">
  <div class="universal-padding-x py-2 sm:py-3">
    <div class="flex justify-between items-center">
      <p class="text-xs text-neutral-500 dark:text-neutral-500">
        Free forever, for everyone.
      </p>
      <div class="flex items-center gap-1.5 sm:gap-2">
        <RssButton />
        <GithubStatus />
        <DiscordStatus />
      </div>
    </div>
  </div>
</footer>