<script>
  import Seo from '@shared/ui/seo.svelte';
  import { router } from 'tinro';
  import { getSeoData } from '@shared/constants/seoData';
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { ExternalLink } from 'lucide-svelte';

  const seo = getSeoData($router.path);

  onMount(() => {
    setNavigationItems([
      'Overview',
      'What Can Be Matched',
      'Reusability'
    ], '/regex-pattern');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<Seo
  title={seo.title}
  description={seo.description}
  image={seo.image}
  url={$router.path}
/>

<div>
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Regex Patterns</h1>
  
  <div class="space-y-6 text-neutral-700 dark:text-neutral-300">
    <div id="overview">
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Overview</h2>
      <p>
        Regular expressions (regex) are patterns that describe sets of strings. They work like advanced wildcards, letting you match complex text patterns rather than exact phrases.
      </p>
    </div>
    
    <div id="what-can-be-matched">
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-3">What Can Be Matched</h2>
      <p class="mb-3">
        In the Arr stack, regex patterns can match:
      </p>
      <ul class="list-disc list-inside space-y-1 text-sm ml-2">
        <li>Release groups (e.g., FLUX, NTb, CMRG)</li>
        <li>Video qualities (e.g., 1080p, 4K, BluRay)</li>
        <li>Audio codecs (e.g., DTS-HD, Atmos, FLAC)</li>
        <li>Source types (e.g., WEB-DL, Remux, HDTV)</li>
        <li>Special editions (e.g., Director's Cut, Extended)</li>
        <li>Any other text pattern in file names</li>
      </ul>
    </div>
    
    <div id="reusability">
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Reusability</h2>
      <p>
        Instead of embedding patterns directly in custom formats, Profilarr stores them separately as reusable components. This means:
      </p>
      <ul class="list-disc list-inside space-y-1 text-sm ml-2 mt-3">
        <li>Write a pattern once, reference it anywhere</li>
        <li>Updates to a pattern propagate to all formats using it</li>
        <li>No duplicate patterns across multiple formats</li>
        <li>Easier maintenance and consistency</li>
      </ul>
    </div>
  </div>

  <!-- Learn More -->
  <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-blue-900 dark:text-blue-100">
          Learn More About Regex
        </p>
        <p class="text-xs text-blue-700 dark:text-blue-300 mt-1">
          Test and experiment with regex patterns online
        </p>
      </div>
      <a 
        href="https://regex101.com" 
        target="_blank" 
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium
               text-blue-700 dark:text-blue-300
               bg-blue-100 dark:bg-blue-900/50
               hover:bg-blue-200 dark:hover:bg-blue-900/70
               border border-blue-300 dark:border-blue-700
               rounded-lg transition-colors"
      >
        Open regex101
        <ExternalLink class="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
</div>