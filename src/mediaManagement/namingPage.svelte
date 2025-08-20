<script>
  import Seo from '@shared/ui/seo.svelte';
  import { router } from 'tinro';
  import { getSeoData } from '@shared/constants/seoData';
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { Film, Tv, FolderOpen, FileText, Hash, Calendar, ToggleLeft } from 'lucide-svelte';
  import CodeBlock from '@shared/ui/codeBlock.svelte';
  import Changelog from '@shared/ui/changelog.svelte';
  import Utterances from '@shared/ui/utterances.svelte';

  const seo = getSeoData($router.path);

  // Find the naming entry
  $: namingEntry = contentDatabase.entries.find(e => e.slug === 'naming' && e.type === 'media-management');
  $: namingData = namingEntry?.data;

  onMount(() => {
    setNavigationItems([
      'Radarr',
      'Sonarr',
      'Changelog',
      'Discussion'
    ], '/media-management/naming');
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
      'multiEpisodeStyle': 'Multi-Episode Style',
      'replaceIllegalCharacters': 'Replace Illegal Characters',
      'customColonReplacementFormat': 'Custom Colon Replacement'
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

  // Mapping functions for Sonarr numeric values
  function mapColonReplacement(value, isRadarr = false) {
    if (isRadarr) {
      // Radarr uses string values
      const radarrMap = {
        'delete': 'Delete',
        'dash': 'Replace with Dash',
        'spaceDash': 'Replace with Space Dash',
        'spaceDashSpace': 'Replace with Space Dash Space',
        'smart': 'Smart Replace'
      };
      return radarrMap[value] || value;
    } else {
      // Sonarr uses numeric values
      const sonarrMap = {
        0: 'Delete',
        1: 'Replace with Dash',
        2: 'Replace with Space Dash',
        3: 'Replace with Space Dash Space',
        4: 'Smart Replace',
        5: 'Custom'
      };
      return sonarrMap[value] || value;
    }
  }

  function mapMultiEpisodeStyle(value) {
    const styleMap = {
      0: 'Extend',
      1: 'Duplicate',
      2: 'Repeat',
      3: 'Scene',
      4: 'Range',
      5: 'Prefixed Range'
    };
    return styleMap[value] || value;
  }

  // Format the value for display
  function formatValue(key, value, service) {
    if (typeof value === 'boolean') {
      return value ? 'Enabled' : 'Disabled';
    }
    
    // Handle colon replacement mapping
    if (key === 'colonReplacementFormat') {
      return mapColonReplacement(value, service === 'radarr');
    }
    
    // Handle multi-episode style mapping (Sonarr only)
    if (key === 'multiEpisodeStyle' && service === 'sonarr') {
      return mapMultiEpisodeStyle(value);
    }
    
    return value;
  }
</script>

<Seo
  title={seo.title}
  description={seo.description}
  image={null}
  url={$router.path}
/>

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
                {#if !((key === 'colonReplacementFormat' || key === 'customColonReplacementFormat') && config.replaceIllegalCharacters === false)}
                  <CodeBlock 
                    items={[{
                      title: formatFieldName(key),
                      code: formatValue(key, value, service.toLowerCase()),
                      language: 'text',
                      icon: getFieldIcon(key)
                    }]}
                    overflow="wrap"
                  />
                {/if}
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
  
  <!-- Changelog -->
  <section id="changelog" class="mb-12">
    <Changelog commitLog={namingEntry?.commitLog} />
  </section>
  
  <!-- Discussion -->
  {#if namingEntry?.title}
    <section id="discussion" class="mb-12 pb-12">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Discussion</h2>
      {#key namingEntry.title}
        <Utterances issueTerm={`⚙️ Media Management: ${namingEntry.title}`} />
      {/key}
    </section>
  {/if}
</div>