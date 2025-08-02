<script>
  import { 
    FileText, 
    Users, 
    BookOpen, 
    Globe, 
    Flag, 
    Database, 
    Monitor, 
    Settings, 
    HardDrive, 
    Package, 
    Calendar,
    Check,
    X,
    AlertCircle,
    Code2
  } from 'lucide-svelte';

  export let conditions = [];

  // Icon mapping for condition types
  const conditionIcons = {
    release_title: FileText,
    release_group: Users,
    edition: BookOpen,
    language: Globe,
    indexer_flag: Flag,
    source: Database,
    resolution: Monitor,
    quality_modifier: Settings,
    size: HardDrive,
    release_type: Package,
    year: Calendar
  };

  // Type labels for better display
  const typeLabels = {
    release_title: 'Release Title',
    release_group: 'Release Group',
    edition: 'Edition',
    language: 'Language',
    indexer_flag: 'Indexer Flag',
    source: 'Source',
    resolution: 'Resolution',
    quality_modifier: 'Quality Modifier',
    size: 'Size',
    release_type: 'Release Type',
    year: 'Year'
  };

  // Regex condition types that should link to regex patterns
  const regexConditionTypes = ['release_title', 'release_group', 'edition'];

  // Format condition value for display
  function formatConditionValue(condition) {
    switch (condition.type) {
      case 'release_title':
      case 'release_group':
      case 'edition':
        return condition.pattern || '';
      case 'language':
        return condition.language || '';
      case 'indexer_flag':
        return condition.flag || '';
      case 'source':
        return condition.source?.replace('_', ' ').toUpperCase() || '';
      case 'resolution':
        return condition.resolution || '';
      case 'quality_modifier':
        return condition.qualityModifier || '';
      case 'size':
        const min = condition.minSize ? `${condition.minSize} ${condition.minSizeUnit || 'GB'}` : '';
        const max = condition.maxSize ? `${condition.maxSize} ${condition.maxSizeUnit || 'GB'}` : '';
        if (min && max) return `${min} - ${max}`;
        if (min) return `≥ ${min}`;
        if (max) return `≤ ${max}`;
        return '';
      case 'release_type':
        return condition.releaseType?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
      case 'year':
        const minYear = condition.minYear || '';
        const maxYear = condition.maxYear || '';
        if (minYear && maxYear) return `${minYear} - ${maxYear}`;
        if (minYear) return `≥ ${minYear}`;
        if (maxYear) return `≤ ${maxYear}`;
        return '';
      default:
        return '';
    }
  }

  // Create regex pattern URL
  function createRegexUrl(pattern) {
    if (!pattern) return '';
    // Encode the pattern for URL
    const encodedPattern = encodeURIComponent(pattern);
    return `/regex-pattern?search=${encodedPattern}`;
  }
</script>

<div>
  <!-- Header Section -->
  <div class="flex flex-col md:flex-row md:items-start gap-4 mb-6">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/2">Conditions</h2>
    
    <div class="flex flex-wrap gap-2 md:w-1/2 md:justify-end">
      <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
        <AlertCircle class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span class="text-neutral-700 dark:text-neutral-300">{conditions.length} Condition{conditions.length === 1 ? '' : 's'}</span>
      </span>
    </div>
  </div>

  <!-- Divider -->
  <div class="border-t border-neutral-200 dark:border-neutral-700 mb-6"></div>

  <!-- Conditions List -->
  {#if conditions.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {#each conditions as condition, index}
        <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 relative">
          <!-- Required/Negate/Regex badges in top right -->
          {#if condition.required || condition.negate || (regexConditionTypes.includes(condition.type) && condition.pattern)}
            <div class="absolute top-2 right-2 flex items-center gap-1">
              {#if condition.required}
                <span class="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center" title="Required">
                  <Check class="w-3 h-3 text-green-600 dark:text-green-400" />
                </span>
              {/if}
              {#if condition.negate}
                <span class="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center" title="Negate">
                  <X class="w-3 h-3 text-red-600 dark:text-red-400" />
                </span>
              {/if}
              {#if regexConditionTypes.includes(condition.type) && condition.pattern}
                <a 
                  href={createRegexUrl(condition.pattern)}
                  class="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors" 
                  title="View regex pattern"
                >
                  <Code2 class="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </a>
              {/if}
            </div>
          {/if}

          <!-- Content -->
          <div>
            <!-- Name with icon -->
            <div class="flex items-start gap-2">
              <svelte:component 
                this={conditionIcons[condition.type] || AlertCircle} 
                class="w-4 h-4 text-neutral-500 dark:text-neutral-400 mt-0.5 flex-shrink-0" 
              />
              <h3 class="text-sm font-medium text-neutral-900 dark:text-white pr-8 flex-1">
                {condition.name || typeLabels[condition.type] || 'Unknown'}
              </h3>
            </div>

            <!-- Type as pill below, not indented -->
            <div class="mt-1">
              <span class="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-400 inline-block">
                {typeLabels[condition.type] || condition.type}
              </span>
            </div>

            <!-- Special case for except language - make it very compact -->
            {#if condition.type === 'language' && condition.exceptLanguage}
              <p class="text-xs text-amber-600 dark:text-amber-400 mt-1">
                Except mode
              </p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-8 text-neutral-500 dark:text-neutral-400">
      <AlertCircle class="w-12 h-12 mx-auto mb-3 opacity-50" />
      <p>No conditions defined for this custom format</p>
    </div>
  {/if}
</div>