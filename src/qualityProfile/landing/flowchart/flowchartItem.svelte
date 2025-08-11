<script>
  import * as icons from 'lucide-svelte';
  
  export let label = '';
  export let icon = '';
  export let isSelected = false;
  export let isPortrait = false;
  export let onClick = () => {};
  export let isEnabled = true;
  
  $: Icon = icon && icons[icon] ? icons[icon] : null;
</script>

<button
  class="relative flex items-center justify-center {isPortrait ? 'gap-1' : 'gap-2'} {isPortrait ? 'h-7 text-[10px]' : 'min-w-[100px] text-[11px]'} {isPortrait ? 'px-2' : 'px-3 py-1.5'} {isPortrait ? 'rounded border' : 'rounded-md border-2'} transition-all z-10 font-mono
    {isSelected 
      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 shadow-md' 
      : isEnabled
        ? 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer'
        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-neutral-200 dark:border-neutral-700 cursor-not-allowed opacity-50'}"
  on:click={onClick}
  disabled={!isEnabled}
>
  {#if Icon}
    <svelte:component this={Icon} class="{isPortrait ? 'w-3 h-3' : 'w-4 h-4'} flex-shrink-0 {isSelected ? 'text-white dark:text-neutral-900' : 'text-neutral-500 dark:text-neutral-400'}" />
  {/if}
  <span class="font-semibold {isPortrait ? 'mt-0.5' : ''}">{label}</span>
</button>