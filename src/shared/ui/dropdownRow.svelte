<script>
  export let showBorder = true;
  export let onclick = undefined;
</script>

<div 
  class="flex items-center justify-between px-4 py-3 {showBorder ? 'border-b border-neutral-200 dark:border-neutral-600' : ''} {onclick ? 'hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer transition-colors' : ''}"
  on:click={onclick}
  role={onclick ? 'button' : undefined}
  tabindex={onclick ? 0 : undefined}
>
  <slot />
</div>