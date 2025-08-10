<script>
  import { ArrowUpRight } from 'lucide-svelte';
  
  export let format = {};
</script>

<a 
  href="/custom-format/{format.slug}"
  class="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 
         bg-white dark:bg-neutral-900
         hover:border-blue-500 dark:hover:border-blue-500 
         hover:bg-neutral-50 dark:hover:bg-neutral-800/50 
         transition-all duration-200 group relative"
>
  <!-- Arrow icon in top right -->
  <ArrowUpRight class="absolute top-3 right-3 w-4 h-4 text-neutral-400 
                      group-hover:text-blue-600 dark:group-hover:text-blue-400 
                      transition-all" />
  
  <!-- Title -->
  <h3 class="text-sm font-medium text-neutral-900 dark:text-white 
             group-hover:text-blue-600 dark:group-hover:text-blue-400 
             transition-colors pr-8">
    {format.title}
  </h3>
  
  <!-- Description -->
  {#if format.description}
    <p class="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-2">
      {format.description}
    </p>
  {/if}
</a>