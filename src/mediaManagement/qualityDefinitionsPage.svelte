<script>
  import Seo from '@shared/components/seo.svelte';
  import { router } from 'tinro';
  import { getSeoData } from '@shared/constants/seoData';
  import { contentDatabase } from '@db';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { Film, Tv } from 'lucide-svelte';
  import Table from '@shared/ui/table.svelte';
  import Changelog from '@shared/ui/changelog.svelte';
  import Utterances from '@shared/ui/utterances.svelte';

  const seo = getSeoData($router.path);

  // Find the quality definitions entry
  $: qualityDefinitionsEntry = contentDatabase.entries.find(e => e.slug === 'qualitydefinitions' && e.type === 'media-management');
  $: qualityDefinitionsData = qualityDefinitionsEntry?.data;

  onMount(() => {
    setNavigationItems([
      'Radarr',
      'Sonarr',
      'Changelog',
      'Discussion'
    ], '/media-management/qualitydefinitions');
  });

  onDestroy(() => {
    clearNavigation();
  });

  function formatFileSize(mb) {
    if (mb >= 1000) {
      return `${(mb / 1000).toFixed(1)} GB`;
    }
    return `${mb} MB`;
  }

  function prepareTableData(qualities) {
    return Object.entries(qualities).map(([quality, values]) => ({
      quality,
      min: values.min,
      preferred: values.preferred,
      max: values.max
    }));
  }

  const tableHeaders = [
    {
      key: 'quality',
      label: 'Quality',
      sortable: true
    },
    {
      key: 'min',
      label: 'Minimum',
      type: 'number',
      sortable: true,
      render: (row) => `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">${formatFileSize(row.min)}</span>`
    },
    {
      key: 'preferred',
      label: 'Preferred',
      type: 'number',
      sortable: true,
      render: (row) => `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">${formatFileSize(row.preferred)}</span>`
    },
    {
      key: 'max',
      label: 'Maximum',
      type: 'number',
      sortable: true,
      render: (row) => `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">${formatFileSize(row.max)}</span>`
    }
  ];
</script>

<Seo
  title={seo.title}
  description={seo.description}
  image={null}
  url={$router.path}
/>

<div>
  <div class="mb-12">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Quality Definitions</h1>
    
    {#if qualityDefinitionsData?.qualityDefinitions}
      {#each Object.entries(qualityDefinitionsData.qualityDefinitions) as [service, qualities]}
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
                  <span class="text-neutral-700 dark:text-neutral-300">Episodes</span>
                {/if}
              </span>
            </div>
          </div>

          <Table 
            headers={tableHeaders}
            data={prepareTableData(qualities)}
            defaultSort="quality"
            defaultDirection="asc"
          />
        </section>
      {/each}
    {:else}
      <div class="text-center py-12">
        <p class="text-neutral-500 dark:text-neutral-400">Quality definitions not found.</p>
      </div>
    {/if}
  </div>
  
  <!-- Changelog -->
  <section id="changelog" class="mb-12">
    <Changelog commitLog={qualityDefinitionsEntry?.commitLog} />
  </section>
  
  <!-- Discussion -->
  {#if qualityDefinitionsEntry?.title}
    <section id="discussion" class="mb-12 pb-12">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Discussion</h2>
      {#key qualityDefinitionsEntry.title}
        <Utterances issueTerm={`⚙️ Media Management: ${qualityDefinitionsEntry.title}`} />
      {/key}
    </section>
  {/if}
</div>