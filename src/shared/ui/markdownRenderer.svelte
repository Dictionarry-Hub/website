<script>
  import CodeBlock from './codeBlock.svelte';
  import Table from './table.svelte';
  import MathRenderer from './mathRenderer.svelte';
  import ListRenderer from './listRenderer.svelte';
  import MarkdownVideoPlayer from './markdownVideoPlayer.svelte';

  export let blocks = [];
  
  // Process paragraph content to handle inline math
  function processParagraphContent(content) {
    // Split by <math-inline> tags
    const parts = content.split(/(<math-inline>.*?<\/math-inline>)/);
    return parts.map(part => {
      if (part.startsWith('<math-inline>') && part.endsWith('</math-inline>')) {
        // Extract math content
        const mathContent = part.slice(13, -14); // Remove tags
        return { type: 'math', content: mathContent };
      } else {
        // Regular HTML content
        return { type: 'html', content: part };
      }
    });
  }
  
  // Collect all footnotes from blocks
  $: footnotes = blocks.filter(block => block.type === 'footnote');
  
  function sanitizeKey(text) {
    return text
      .toLowerCase()
      .replace(/[^\w]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  }
  
  function createTableHeaders(headers) {
    return headers.map(h => ({
      key: sanitizeKey(h),
      label: h,
      type: 'string',
      // Use render function to display HTML content in cells
      render: (row) => row[sanitizeKey(h)] || ''
    }));
  }
  
  function createTableData(headers, rows) {
    return rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[sanitizeKey(header)] = row[index] || '';
      });
      return obj;
    });
  }
</script>

<div class="prose prose-neutral dark:prose-invert max-w-none 
            prose-headings:font-semibold prose-headings:text-neutral-800 dark:prose-headings:text-neutral-100
            prose-p:text-neutral-700 dark:prose-p:text-neutral-300
            prose-p:leading-relaxed prose-p:mb-4
            prose-h1:text-2xl prose-h1:mt-8 prose-h1:mb-4
            prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
            prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
            prose-h4:text-base prose-h4:mt-4 prose-h4:mb-2
            prose-strong:font-semibold prose-strong:text-neutral-800 dark:prose-strong:text-neutral-200
            prose-em:text-neutral-700 dark:prose-em:text-neutral-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-ul:my-4 prose-ol:my-4 prose-li:my-1
            prose-blockquote:border-l-4 prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-600
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4">
  {#each blocks as block}
    {#if block.type === 'paragraph'}
      <p class="mb-4 text-neutral-700 dark:text-neutral-300">
        {#each processParagraphContent(block.content) as part}
          {#if part.type === 'math'}
            <MathRenderer content={part.content} display={false} />
          {:else}
            {@html part.content}
          {/if}
        {/each}
      </p>
      
    {:else if block.type === 'header'}
      {#if block.level === 1}
        <h1 id={block.id} class="text-2xl font-semibold mt-8 mb-4 text-neutral-900 dark:text-neutral-100">{block.text}</h1>
      {:else if block.level === 2}
        <h2 id={block.id} class="text-xl font-semibold mt-6 mb-3 text-neutral-900 dark:text-neutral-100">{block.text}</h2>
      {:else if block.level === 3}
        <h3 id={block.id} class="text-lg font-semibold mt-5 mb-2 text-neutral-900 dark:text-neutral-100">{block.text}</h3>
      {:else if block.level === 4}
        <h4 id={block.id} class="text-base font-semibold mt-4 mb-2 text-neutral-900 dark:text-neutral-100">{block.text}</h4>
      {:else if block.level === 5}
        <h5 id={block.id} class="text-sm font-semibold mt-3 mb-2 text-neutral-900 dark:text-neutral-100">{block.text}</h5>
      {:else}
        <h6 id={block.id} class="text-xs font-semibold mt-3 mb-2 text-neutral-900 dark:text-neutral-100">{block.text}</h6>
      {/if}
      
    {:else if block.type === 'code'}
      <div class="my-4">
        <CodeBlock 
          items={[{
            title: block.language,
            code: block.code,
            language: block.language
          }]}
        />
      </div>
      
    {:else if block.type === 'table'}
      <div class="my-4">
        <Table 
          headers={createTableHeaders(block.headers)}
          data={createTableData(block.headers, block.rows)}
        />
      </div>
      
    {:else if block.type === 'math'}
      <MathRenderer content={block.content} display={block.display} />
      
    {:else if block.type === 'list'}
      <div class="my-4">
        <ListRenderer items={block.items} ordered={block.ordered} />
      </div>
      
    {:else if block.type === 'blockquote'}
      <blockquote class="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 my-4 italic text-neutral-600 dark:text-neutral-400">
        {@html block.content}
      </blockquote>

    {:else if block.type === 'quote'}
      <figure class="my-8 mx-6 lg:mx-12">
        <blockquote class="quote-text text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {@html block.content}
        </blockquote>
        {#if block.author || block.year}
          <figcaption class="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            {#if block.author}
              <span class="font-medium text-neutral-700 dark:text-neutral-300">{block.author}</span>
            {/if}
            {#if block.author && block.year}
              <span class="mx-1">&middot;</span>
            {/if}
            {#if block.year}
              <span>{block.year}</span>
            {/if}
          </figcaption>
        {/if}
      </figure>

    {:else if block.type === 'tabs'}
      <div class="my-4">
        <CodeBlock items={block.items} />
      </div>

    {:else if block.type === 'admonition'}
      {@const styles = {
        warning: 'border-amber-500 bg-amber-50 dark:bg-amber-950/30',
        note: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30',
        tip: 'border-green-500 bg-green-50 dark:bg-green-950/30',
        danger: 'border-red-500 bg-red-50 dark:bg-red-950/30'
      }}
      {@const icons = {
        warning: '⚠️',
        note: '📝',
        tip: '💡',
        danger: '🚨'
      }}
      {@const titles = {
        warning: 'Warning',
        note: 'Note',
        tip: 'Tip',
        danger: 'Danger'
      }}
      <div class="my-6 border-l-4 {styles[block.variant]} rounded-r-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span>{icons[block.variant]}</span>
          <span class="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{titles[block.variant]}</span>
        </div>
        <div class="text-sm text-neutral-700 dark:text-neutral-200">
          {@html block.content}
        </div>
      </div>

    {:else if block.type === 'image'}
      <div class="my-6">
        {#if block.variants}
          <!-- Image with light/dark variants -->
          {@const isSvg = (block.variants.light || block.variants.dark || block.src)?.endsWith('.svg')}
          <img
            src={block.variants.light || block.variants.dark || block.src}
            alt={block.alt || ''}
            class="w-full dark:hidden {isSvg ? '' : 'rounded-lg'}"
          />
          <img
            src={block.variants.dark || block.variants.light || block.src}
            alt={block.alt || ''}
            class="w-full hidden dark:block {isSvg ? '' : 'rounded-lg'}"
          />
        {:else}
          <!-- Standard image -->
          {@const isSvg = block.src?.endsWith('.svg')}
          <img
            src={block.src}
            alt={block.alt || ''}
            class="w-full {isSvg ? '' : 'rounded-lg'}"
          />
        {/if}
      </div>

    {:else if block.type === 'video'}
      <MarkdownVideoPlayer
        src={block.src}
        description={block.description || ''}
      />

    {:else if block.type === 'horizontal-rule'}
      <hr class="my-8 border-t border-neutral-300 dark:border-neutral-700" />
      
    {:else if block.type === 'footnote'}
      <!-- Footnotes are rendered at the bottom, skip here -->
    {/if}
  {/each}
  
  {#if footnotes.length > 0}
    <div class="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700">
      <h3 class="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-4">References</h3>
      <ol class="space-y-2">
        {#each footnotes as footnote}
          <li id="fn-{footnote.id}" class="text-sm text-neutral-600 dark:text-neutral-400">
            <span class="font-medium text-neutral-700 dark:text-neutral-300">[{footnote.id}]</span>
            <span class="ml-2">
              {#each processParagraphContent(footnote.content) as part}
                {#if part.type === 'math'}
                  <MathRenderer content={part.content} display={false} />
                {:else}
                  {@html part.content}
                {/if}
              {/each}
            </span>
          </li>
        {/each}
      </ol>
    </div>
  {/if}
</div>

<style>
  /* Quote directive font */
  .quote-text {
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
  }

  /* Bold text - including in tables */
  :global(.prose strong),
  :global(.prose b),
  :global(td strong),
  :global(td b) {
    font-weight: 600 !important;
    color: rgb(23 23 23);
  }
  
  :global(.dark .prose strong),
  :global(.dark .prose b),
  :global(.dark td strong),
  :global(.dark td b) {
    font-weight: 600 !important;
    color: rgb(229 229 229) !important;
  }
  
  /* Italic text - including in tables */
  :global(.prose em),
  :global(.prose i),
  :global(td em),
  :global(td i) {
    font-style: italic !important;
  }
  
  /* Links - including in tables */
  :global(.prose a:not([class*="text-neutral"]):not([class*="text-blue"]):not([class*="bg-"]):not([class*="hover:"]):not([class*="no-underline"])),
  :global(td a:not([class*="text-neutral"]):not([class*="text-blue"]):not([class*="bg-"]):not([class*="hover:"]):not([class*="no-underline"])) {
    color: rgb(37 99 235) !important;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  :global(.prose a:not([class*="text-neutral"]):not([class*="text-blue"]):not([class*="bg-"]):not([class*="hover:"]):not([class*="no-underline"]):hover),
  :global(td a:not([class*="text-neutral"]):not([class*="text-blue"]):not([class*="bg-"]):not([class*="hover:"]):not([class*="no-underline"]):hover) {
    text-decoration: underline;
    color: rgb(29 78 216) !important;
  }
  
  :global(.dark .prose a:not([class*="text-neutral"]):not([class*="text-blue"]):not([class*="bg-"]):not([class*="hover:"]):not([class*="no-underline"])),
  :global(.dark td a:not([class*="text-neutral"]):not([class*="text-blue"]):not([class*="bg-"]):not([class*="hover:"]):not([class*="no-underline"])) {
    color: rgb(96 165 250) !important;
  }
  
  :global(.dark .prose a:not([class*="text-neutral"]):not([class*="text-blue"]):not([class*="bg-"]):not([class*="hover:"]):not([class*="no-underline"]):hover),
  :global(.dark td a:not([class*="text-neutral"]):not([class*="text-blue"]):not([class*="bg-"]):not([class*="hover:"]):not([class*="no-underline"]):hover) {
    color: rgb(147 197 253) !important;
  }
  
  /* Table cell text color - only for tables within prose content */
  :global(.prose td) {
    color: rgb(55 65 81);
  }
  
  :global(.dark .prose td) {
    color: rgb(209 213 219) !important;
  }
  
  /* Code inline */
  :global(.prose code:not(pre code)) {
    background-color: rgba(110, 118, 129, 0.1);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-weight: 400;
  }
  
  :global(.dark .prose code:not(pre code)) {
    background-color: rgba(110, 118, 129, 0.3);
    color: rgb(248 250 252) !important;
  }
  
  /* Footnote references */
  :global(.footnote-ref) {
    color: rgb(59 130 246);
    text-decoration: none;
    font-size: 0.875em;
  }
  
  :global(.footnote-ref:hover) {
    text-decoration: underline;
  }
  
  :global(.dark .footnote-ref) {
    color: rgb(147 197 253);
  }
  
  :global(sup) {
    line-height: 0;
  }
</style>