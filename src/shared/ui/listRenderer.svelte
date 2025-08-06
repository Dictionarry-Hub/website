<script>
  import MathRenderer from './mathRenderer.svelte';
  
  export let items = [];
  export let ordered = false;
  
  // Process paragraph content to handle inline math
  function processParagraphContent(content) {
    const parts = content.split(/(<math-inline>.*?<\/math-inline>)/);
    return parts.map(part => {
      if (part.startsWith('<math-inline>') && part.endsWith('</math-inline>')) {
        const mathContent = part.slice(13, -14);
        return { type: 'math', content: mathContent };
      } else {
        return { type: 'html', content: part };
      }
    });
  }
</script>

{#if ordered}
  <ol class="list-decimal list-inside space-y-2">
    {#each items as item}
      <li class="text-neutral-700 dark:text-neutral-300">
        {#each processParagraphContent(item.content) as part}
          {#if part.type === 'math'}
            <MathRenderer content={part.content} display={false} />
          {:else}
            {@html part.content}
          {/if}
        {/each}
        {#if item.children && item.children.length > 0}
          <div class="ml-6 mt-2">
            <svelte:self items={item.children} ordered={ordered} />
          </div>
        {/if}
      </li>
    {/each}
  </ol>
{:else}
  <ul class="list-disc list-inside space-y-2">
    {#each items as item}
      <li class="text-neutral-700 dark:text-neutral-300">
        {#each processParagraphContent(item.content) as part}
          {#if part.type === 'math'}
            <MathRenderer content={part.content} display={false} />
          {:else}
            {@html part.content}
          {/if}
        {/each}
        {#if item.children && item.children.length > 0}
          <div class="ml-6 mt-2">
            <svelte:self items={item.children} ordered={false} />
          </div>
        {/if}
      </li>
    {/each}
  </ul>
{/if}