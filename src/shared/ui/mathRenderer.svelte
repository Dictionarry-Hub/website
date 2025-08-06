<script>
  import katex from 'katex';
  import { onMount } from 'svelte';
  
  export let content = '';
  export let display = false;
  
  let mathElement;
  let error = null;
  
  $: renderMath(content);
  
  function renderMath(tex) {
    if (!mathElement) return;
    
    try {
      katex.render(tex, mathElement, {
        displayMode: display,
        throwOnError: false,
        errorColor: '#ef4444',
        strict: false
      });
      error = null;
    } catch (e) {
      error = e.message;
      // Fallback to showing raw LaTeX
      mathElement.textContent = display ? `$$${tex}$$` : `$${tex}$`;
    }
  }
  
  onMount(() => {
    renderMath(content);
  });
</script>

<!-- Import KaTeX CSS -->
<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
</svelte:head>

{#if display}
  <div class="my-6 overflow-x-auto">
    <div bind:this={mathElement} class="katex-display text-center"></div>
    {#if error}
      <div class="text-red-500 text-sm mt-2">Math error: {error}</div>
    {/if}
  </div>
{:else}
  <span bind:this={mathElement} class="katex-inline"></span>
  {#if error}
    <span class="text-red-500 text-xs ml-1">[math error]</span>
  {/if}
{/if}

<style>
  /* Display math block */
  :global(.katex-display) {
    padding: 1.5rem 0;
    background: transparent;
    margin: 1.5rem 0;
  }
  
  :global(.dark .katex-display) {
    background: transparent;
  }
  
  :global(.katex-display .katex) {
    font-size: 1.125rem;
    color: rgb(23 23 23);
  }
  
  :global(.dark .katex-display .katex) {
    color: rgb(229 229 229);
  }
  
  /* Inline math */
  :global(.katex-inline .katex) {
    font-size: 0.95em;
    color: rgb(64 64 64);
    background: rgb(250 250 250);
    padding: 0 0.25rem;
    border-radius: 0.25rem;
  }
  
  :global(.dark .katex-inline .katex) {
    color: rgb(212 212 212);
    background: rgba(64, 64, 64, 0.3);
  }
  
  /* KaTeX specific element colors */
  :global(.katex .mord),
  :global(.katex .mop),
  :global(.katex .mbin),
  :global(.katex .mrel),
  :global(.katex .minner),
  :global(.katex .msupsub) {
    color: inherit !important;
  }
  
  /* Fractions and special constructs */
  :global(.katex .frac-line) {
    background-color: currentColor;
  }
  
  :global(.katex .delimsizing.mult .vlist-t),
  :global(.katex .mord.rule) {
    border-color: currentColor;
  }
</style>