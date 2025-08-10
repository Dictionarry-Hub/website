<script>
  import { ArrowUpRight, Hash } from 'lucide-svelte';
  
  export let profile = {};
</script>

<a 
  href="/quality-profile/{profile.slug}"
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
             transition-colors pr-8 mb-2">
    {profile.title}
  </h3>
  
  <!-- Score pill -->
  <div class="inline-flex items-center gap-1.5 px-2 py-0.5 
              bg-green-100 dark:bg-green-900/30 
              text-green-700 dark:text-green-300 
              rounded text-xs font-medium">
    <Hash class="w-3 h-3" />
    <span>{profile.score.toLocaleString()} points</span>
  </div>
</a>