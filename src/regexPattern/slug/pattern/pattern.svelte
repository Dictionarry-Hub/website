<script>
  import { Code2 } from 'lucide-svelte';
  import CodeBlock from '@shared/ui/codeBlock.svelte';
  
  export let pattern = '';
</script>

<div>
  <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
    Pattern
  </h2>
  
  {#if pattern}
    <div class="space-y-4">
      <!-- Pattern display using CodeBlock component -->
      {#key pattern}
        <CodeBlock 
          items={[{
            title: 'Regular Expression',
            code: pattern,
            language: 'regex',
            icon: Code2
          }]}
        />
      {/key}
    </div>
  {:else}
    <!-- Empty state -->
    <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-8 text-center">
      <Code2 class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
      <p class="text-neutral-600 dark:text-neutral-400">
        No pattern available
      </p>
    </div>
  {/if}
</div>