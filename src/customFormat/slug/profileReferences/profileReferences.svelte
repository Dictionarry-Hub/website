<script>
  import ProfileReferenceCard from './profileReferenceCard.svelte';
  import { Users } from 'lucide-svelte';
  
  export let referencedBy = [];
</script>

<div>
  <div class="flex flex-col md:flex-row md:items-start gap-4 mb-6">
    <h2 class="text-xl font-semibold text-neutral-900 dark:text-white md:w-1/4">
      Used In Profiles
    </h2>
    
    <!-- Metadata Pills -->
    <div class="flex flex-wrap gap-2 md:w-3/4 md:justify-end">
      <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                   border border-neutral-300/70 dark:border-neutral-700/50 
                   rounded-full text-xs font-medium flex items-center gap-1.5">
        <Users class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span class="text-neutral-700 dark:text-neutral-300">
          {referencedBy.length} {referencedBy.length === 1 ? 'quality profile' : 'quality profiles'}
        </span>
      </span>
    </div>
  </div>
  
  {#if referencedBy.length > 0}
    <!-- References Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
      {#each referencedBy as profile}
        <ProfileReferenceCard {profile} />
      {/each}
    </div>
  {:else}
    <div class="p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
      <p class="text-neutral-600 dark:text-neutral-400">
        This custom format is not currently used in any quality profiles.
      </p>
    </div>
  {/if}
</div>