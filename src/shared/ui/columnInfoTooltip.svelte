<script>
  import { fly } from 'svelte/transition';
  import { Info } from 'lucide-svelte';

  export let title = '';
  export let content = '';
  export let position = 'top';
  export let wide = false;

  let visible = false;
</script>

<div
  class="relative inline-block"
  on:mouseenter={() => visible = true}
  on:mouseleave={() => visible = false}
  on:focusin={() => visible = true}
  on:focusout={() => visible = false}
  on:click={() => visible = !visible}
>
  <slot />

  {#if visible && content}
    <div
      class="absolute z-50 {position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0"
      transition:fly={{ y: position === 'top' ? -4 : 4, duration: 150 }}
      role="tooltip"
    >
      <div
        class="overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-2xl {wide ? 'w-96' : 'w-80'}"
      >
        <!-- Header -->
        <div class="flex items-center gap-2 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <Info class="w-4 h-4 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
          <h3 class="text-xs font-semibold text-neutral-700 dark:text-neutral-200">
            {title}
          </h3>
        </div>

        <!-- Content -->
        <div class="p-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {@html content.replace(/\n/g, '<br />')}
        </div>
      </div>
    </div>
  {/if}
</div>