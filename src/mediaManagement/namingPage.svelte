<script>
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { Film, Tv, FolderOpen, FileText, Hash, Calendar, ToggleLeft } from 'lucide-svelte';
  import CodeBlock from '@shared/ui/codeBlock.svelte';

  // Find the naming data
  $: namingData = contentDatabase.entries.find(e => e.slug === 'naming' && e.type === 'media-management')?.data;

  onMount(() => {
    setNavigationItems([
      'Radarr',
      'Sonarr'
    ], '#/media-management/naming');
  });

  onDestroy(() => {
    clearNavigation();
  });

  function formatFieldName(key) {
    const fieldNames = {
      'rename': 'Automatic Rename',
      'standardMovieFormat': 'Movie Format',
      'movieFolderFormat': 'Movie Folder',
      'colonReplacementFormat': 'Colon Replacement',
      'standardEpisodeFormat': 'Episode Format',
      'seriesFolderFormat': 'Series Folder',
      'seasonFolderFormat': 'Season Folder',
      'dailyEpisodeFormat': 'Daily Episode',
      'animeEpisodeFormat': 'Anime Episode',
      'multiEpisodeStyle': 'Multi-Episode Style'
    };
    return fieldNames[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  function getFieldIcon(key) {
    if (key === 'rename') return ToggleLeft;
    if (key.includes('Folder')) return FolderOpen;
    if (key.includes('Episode')) return Hash;
    if (key.includes('daily')) return Calendar;
    return FileText;
  }
</script>

<div>
  <div class="mb-12">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Naming Configuration</h1>
    
    {#if namingData}
      {#each Object.entries(namingData) as [service, config]}
        <section id={service.toLowerCase()} class="mb-8">
          <div class="flex flex-col md:flex-row md:items-start gap-4 mb-6">
            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/4">
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </h2>
            
            <div class="flex flex-wrap gap-2 md:w-3/4 md:justify-end">
              <span class="px-3 py-1 bg-white dark:bg-neutral-900 
                           border border-neutral-300/70 dark:border-neutral-700/50 
                           rounded-full text-xs font-medium flex items-center gap-1.5">
                {#if service.toLowerCase() === 'radarr'}
                  <Film class="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
                  <span class="text-neutral-700 dark:text-neutral-300">Movies</span>
                {:else}
                  <Tv class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span class="text-neutral-700 dark:text-neutral-300">Series</span>
                {/if}
              </span>
            </div>
          </div>

          <div class="space-y-4">
            {#each Object.entries(config) as [key, value]}
              {#if value !== '' && value !== null && value !== undefined}
                <CodeBlock 
                  items={[{
                    title: formatFieldName(key),
                    code: typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value,
                    language: 'text',
                    icon: getFieldIcon(key)
                  }]}
                  overflow="wrap"
                />
              {/if}
            {/each}
          </div>
        </section>
      {/each}
    {:else}
      <div class="text-center py-12">
        <p class="text-neutral-500 dark:text-neutral-400">Naming configuration not found.</p>
      </div>
    {/if}
  </div>
</div>