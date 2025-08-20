<script>
  import { Menu, X } from 'lucide-svelte';
  import { isMobileSidebarOpen, toggleMobileSidebar } from '@shared/stores/mobileSidebar';
</script>

<button
  class="lg:hidden p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
  on:click={toggleMobileSidebar}
  aria-label={$isMobileSidebarOpen ? 'Close menu' : 'Open menu'}
>
  {#if $isMobileSidebarOpen}
    <X class="w-5 h-5" />
  {:else}
    <Menu class="w-5 h-5" />
  {/if}
</button>