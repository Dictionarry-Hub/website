<script>
  import { theme } from '@shared/stores/theme';
  import { Sun, Moon } from 'lucide-svelte';
  
  // Subscribe to theme store
  $: isDark = $theme;
  $: console.log('Theme store value:', $theme, 'isDark:', isDark);
</script>

<style>
  .dark-bg {
    background-color: #2f2f2f;
    border-color: #474747;
  }
  .dark-bg:hover {
    border-color: #7a7a7a;
  }
</style>

<button
  on:click={theme.toggle}
  class="relative inline-flex h-6 w-10 items-center rounded-2xl bg-neutral-200 border border-neutral-300 hover:border-neutral-500 transition-colors duration-200 ease-in-out focus:outline-none"
  class:dark-bg={isDark}
  aria-label="Toggle dark mode"
>
  <span
    class="flex h-4.5 w-4.5 transform rounded-2xl bg-white dark:bg-neutral-900 transition-transform duration-200 ease-in-out items-center justify-center {isDark ? 'translate-x-4.5' : 'translate-x-0.5'}"
  >
    {#if isDark}
      <Moon class="h-3 w-3 text-neutral-100" />
    {:else}
      <Sun class="h-3 w-3 text-neutral-600" />
    {/if}
  </span>
</button>