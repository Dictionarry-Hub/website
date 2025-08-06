<script>
  import { onMount } from 'svelte';
  import Prism from 'prismjs';
  import { Copy, Check } from 'lucide-svelte';
  
  // Import Prism languages
  import 'prismjs/components/prism-yaml';
  import 'prismjs/components/prism-bash';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/components/prism-json';
  import 'prismjs/components/prism-typescript';
  import 'prismjs/components/prism-jsx';
  import 'prismjs/components/prism-tsx';
  
  // Import Prism themes
  import 'prismjs/themes/prism-tomorrow.css';
  
  export let items = [];
  // Each item should have: { title: string, code: string, language: string, icon?: Component }
  
  let activeTab = 0;
  let copied = {};
  let codeElement;
  
  $: activeItem = items[activeTab] || items[0];
  
  onMount(() => {
    // Initialize Prism on mount
    if (codeElement) {
      Prism.highlightElement(codeElement);
    }
  });
  
  // Re-highlight when active tab changes
  $: if (codeElement && activeItem) {
    // Use a tick to ensure DOM has updated
    setTimeout(() => {
      if (codeElement) {
        Prism.highlightElement(codeElement);
      }
    }, 0);
  }
  
  async function copyToClipboard(code, index) {
    try {
      await navigator.clipboard.writeText(code);
      copied[index] = true;
      setTimeout(() => {
        copied[index] = false;
        copied = {...copied};
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

<div class="relative">
  <div class="relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
    {#if items.length > 1}
      <!-- Tab navigation for multiple items -->
      <div class="flex border-b border-neutral-200 dark:border-neutral-800">
        {#each items as item, index}
          <button
            on:click={() => activeTab = index}
            class="px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2
                   {activeTab === index 
                     ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border-b-2 border-blue-500' 
                     : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'}"
          >
            {#if item.icon}
              <svelte:component this={item.icon} class="w-4 h-4" />
            {/if}
            {item.title}
          </button>
        {/each}
      </div>
    {:else if items.length === 1}
      <!-- Single item header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-500 font-medium">
          {#if items[0].icon}
            <svelte:component this={items[0].icon} class="w-3.5 h-3.5" />
          {/if}
          <span>{items[0].title}</span>
        </div>
      </div>
    {/if}
    
    {#if activeItem}
      {#key activeTab}
        <!-- Code content area -->
        <div class="relative">
          <!-- Copy button -->
          <button
            on:click={() => copyToClipboard(activeItem.code, activeTab)}
            class="absolute top-3 right-3 p-1.5 text-neutral-600 dark:text-neutral-400 
                   hover:text-neutral-900 dark:hover:text-white 
                   bg-neutral-100 dark:bg-neutral-800 
                   hover:bg-neutral-200 dark:hover:bg-neutral-700 
                   rounded-lg transition-all duration-200 z-10"
            aria-label="Copy code"
          >
            {#if copied[activeTab]}
              <Check class="w-4 h-4 text-green-500" />
            {:else}
              <Copy class="w-4 h-4" />
            {/if}
          </button>
          
          <!-- Code display -->
          <div class="p-4 overflow-x-auto bg-neutral-100 dark:bg-neutral-900">
            <pre class="text-xs leading-normal font-mono !bg-transparent !p-0 !m-0"><code bind:this={codeElement} class="language-{activeItem.language} !bg-transparent">{activeItem.code}</code></pre>
          </div>
        </div>
      {/key}
    {/if}
  </div>
</div>

<style>
  /* Base text color for better readability */
  :global(pre[class*="language-"]),
  :global(code[class*="language-"]) {
    color: #1f2937;
    background: transparent;
    font-size: 0.8125rem !important; /* 13px */
    line-height: 1.375rem !important; /* 22px */
  }
  
  :global(.dark pre[class*="language-"]),
  :global(.dark code[class*="language-"]) {
    color: #e5e7eb;
    background: transparent;
  }
  
  /* Comments - subtle gray */
  :global(.token.comment),
  :global(.token.prolog),
  :global(.token.doctype),
  :global(.token.cdata) {
    color: #6b7280;
    font-style: italic;
  }
  
  :global(.dark .token.comment),
  :global(.dark .token.prolog),
  :global(.dark .token.doctype),
  :global(.dark .token.cdata) {
    color: #9ca3af;
  }
  
  /* Punctuation - medium gray */
  :global(.token.punctuation) {
    color: #6b7280;
  }
  
  :global(.dark .token.punctuation) {
    color: #9ca3af;
  }
  
  /* Keywords and properties - subtle blue */
  :global(.token.property),
  :global(.token.tag),
  :global(.token.boolean),
  :global(.token.number),
  :global(.token.constant),
  :global(.token.symbol),
  :global(.token.deleted),
  :global(.token.keyword),
  :global(.token.atrule),
  :global(.token.attr-value) {
    color: #3b82f6;
  }
  
  :global(.dark .token.property),
  :global(.dark .token.tag),
  :global(.dark .token.boolean),
  :global(.dark .token.number),
  :global(.dark .token.constant),
  :global(.dark .token.symbol),
  :global(.dark .token.deleted),
  :global(.dark .token.keyword),
  :global(.dark .token.atrule),
  :global(.dark .token.attr-value) {
    color: #60a5fa;
  }
  
  /* Strings - darker blue/teal */
  :global(.token.selector),
  :global(.token.attr-name),
  :global(.token.string),
  :global(.token.char),
  :global(.token.builtin),
  :global(.token.inserted) {
    color: #0891b2;
  }
  
  :global(.dark .token.selector),
  :global(.dark .token.attr-name),
  :global(.dark .token.string),
  :global(.dark .token.char),
  :global(.dark .token.builtin),
  :global(.dark .token.inserted) {
    color: #22d3ee;
  }
  
  /* Operators and entities - dark gray */
  :global(.token.operator),
  :global(.token.entity),
  :global(.token.url),
  :global(.language-css .token.string),
  :global(.style .token.string) {
    color: #374151;
  }
  
  :global(.dark .token.operator),
  :global(.dark .token.entity),
  :global(.dark .token.url),
  :global(.dark .language-css .token.string),
  :global(.dark .style .token.string) {
    color: #d1d5db;
  }
  
  /* Functions - indigo */
  :global(.token.function),
  :global(.token.class-name) {
    color: #6366f1;
  }
  
  :global(.dark .token.function),
  :global(.dark .token.class-name) {
    color: #818cf8;
  }
  
  /* Variables and regex - slightly different blue */
  :global(.token.regex),
  :global(.token.important),
  :global(.token.variable) {
    color: #1e40af;
  }
  
  :global(.dark .token.regex),
  :global(.dark .token.important),
  :global(.dark .token.variable) {
    color: #93bbfb;
  }
</style>