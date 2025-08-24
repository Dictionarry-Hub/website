<script>
  import Toolbar from './toolbar/toolbar.svelte';
  import Formats from './formats.svelte';
  import { PanelBottomOpen, TrendingUp, CopyPlus, Film, Tv } from 'lucide-svelte';
  
  export let custom_formats = [];
  export let custom_formats_radarr = [];
  export let custom_formats_sonarr = [];
  export let minCustomFormatScore = 0;
  export let upgradeUntilScore = null;
  export let minScoreIncrement = null;
  
  let searchTerm = '';
  let selectedGroups = [];
  let customTags = [];
  let minValue = null;
  let maxValue = null;
  let selectedCategories = ['radarr', 'sonarr']; // Array for multiple selection
  
  // Determine which formats to display based on selection
  $: displayFormats = (() => {
    const hasRadarrFormats = custom_formats_radarr.length > 0;
    const hasSonarrFormats = custom_formats_sonarr.length > 0;
    const hasSharedFormats = custom_formats.length > 0;
    
    let formats = [];
    const processedNames = new Set();
    
    // If both are selected, show all formats
    if (selectedCategories.includes('radarr') && selectedCategories.includes('sonarr')) {
      // First add shared formats (these apply to both)
      if (hasSharedFormats) {
        custom_formats.forEach(f => {
          formats.push({ ...f, source: 'both' });
          processedNames.add(f.name);
        });
      }
      
      // Add app-specific formats
      if (hasRadarrFormats || hasSonarrFormats) {
        const radarrNames = new Set(custom_formats_radarr.map(f => f.name));
        const sonarrNames = new Set(custom_formats_sonarr.map(f => f.name));
        
        // Add Radarr-specific formats (not already in shared)
        custom_formats_radarr.forEach(f => {
          if (!processedNames.has(f.name)) {
            // Check if this format is also in Sonarr
            if (sonarrNames.has(f.name)) {
              formats.push({ ...f, source: 'both' });
            } else {
              formats.push({ ...f, source: 'radarr' });
            }
            processedNames.add(f.name);
          }
        });
        
        // Add Sonarr-only formats (not already processed)
        custom_formats_sonarr.forEach(f => {
          if (!processedNames.has(f.name)) {
            formats.push({ ...f, source: 'sonarr' });
            processedNames.add(f.name);
          }
        });
      }
    } else if (selectedCategories.includes('radarr')) {
      // Show only Radarr formats
      if (hasRadarrFormats) {
        formats = custom_formats_radarr.map(f => ({ ...f, source: 'radarr' }));
      } else if (hasSharedFormats) {
        formats = custom_formats.map(f => ({ ...f, source: 'both' }));
      }
    } else if (selectedCategories.includes('sonarr')) {
      // Show only Sonarr formats
      if (hasSonarrFormats) {
        formats = custom_formats_sonarr.map(f => ({ ...f, source: 'sonarr' }));
      } else if (hasSharedFormats) {
        formats = custom_formats.map(f => ({ ...f, source: 'both' }));
      }
    }
    
    // Sort formats by score (descending) then by name
    formats.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.name.localeCompare(b.name);
    });
    
    return formats;
  })();
  
  // Calculate min and max scores from display formats
  $: scoreRange = (() => {
    if (displayFormats.length === 0) return { min: -100000, max: 100000 };
    const scores = displayFormats.map(f => f.score);
    return {
      min: Math.min(...scores),
      max: Math.max(...scores)
    };
  })();
  
  // Reset min/max values when score range changes (new profile loaded)
  $: {
    minValue = scoreRange.min;
    maxValue = scoreRange.max;
  }
  
  // Calculate unique tag count
  $: uniqueTagCount = (() => {
    const allTags = new Set();
    displayFormats.forEach(format => {
      format.tags.forEach(tag => allTags.add(tag));
    });
    return allTags.size;
  })();
  
  // Tag to group mapping
  const tagToGroupMapping = {
    'Audio': ['Audio', 'Dolby'],
    'HDR': ['HDR', 'Colour Grade'],
    'Release Groups': ['Release Groups', 'UnWanted', 'Release Group'],
    'Streaming Services': ['Streaming Service', 'WEB-DL'],
    'Codecs': ['Codec', 'Bleeding Edge'],
    'Storage': ['Storage', 'Lossless', '2160p'],
    'Release Group Tiers': ['Release Group Tier', 'GPPi'],
    'Resolution': ['Resolution', 'Ultra High Definition', '4K', '1080p', '720p', 'SD'],
    'Source': ['Source'],
    'Indexer Flags': ['Flag']
  };
  
  // Filter custom formats based on search term and score range
  $: filteredFormats = displayFormats.filter(format => {
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch = format.name.toLowerCase().includes(search) ||
                          format.tags.some(tag => tag.toLowerCase().includes(search));
      if (!matchesSearch) return false;
    }
    
    // Filter by score range
    if (format.score < minValue || format.score > maxValue) return false;
    
    return true;
  });
  
  // Group formats based on selected groups
  $: groupedFormats = (() => {
    const groups = {};
    const uncategorized = [];
    
    // If "All Groups" is selected or no groups selected, return ungrouped
    if (selectedGroups.includes('All Groups') || selectedGroups.length === 0) {
      return {};
    }
    
    filteredFormats.forEach(format => {
      let belongsToGroup = false;
      
      // Check each selected group
      selectedGroups.forEach(groupName => {
        const groupTags = tagToGroupMapping[groupName] || [];
        let hasMatchingTag = false;
        
        // Check if it's a custom tag
        if (customTags.includes(groupName)) {
          // For custom tags, do case-insensitive comparison
          hasMatchingTag = format.tags.some(tag => 
            tag.toLowerCase().includes(groupName.toLowerCase())
          );
        } else {
          // For predefined groups, use the existing logic
          hasMatchingTag = format.tags.some(tag => 
            groupTags.some(groupTag => tag.includes(groupTag))
          );
        }
        
        if (hasMatchingTag) {
          belongsToGroup = true;
          if (!groups[groupName]) {
            groups[groupName] = [];
          }
          groups[groupName].push(format);
        }
      });
      
      // If no group matched, add to uncategorized
      if (!belongsToGroup) {
        uncategorized.push(format);
      }
    });
    
    // Add uncategorized if there are any
    if (uncategorized.length > 0) {
      groups['Uncategorized'] = uncategorized;
    }
    
    return groups;
  })();
  
  function handleSearch(event) {
    searchTerm = event.detail;
  }
  
  function handleGroupChange(event) {
    selectedGroups = event.detail.selectedGroups;
    customTags = event.detail.customTags;
  }
  
  function handleValueChange(event) {
    minValue = event.detail.min;
    maxValue = event.detail.max;
  }
</script>

<div>
  <!-- Header Section -->
  <div class="flex flex-col md:flex-row md:items-start gap-4 mb-4">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white md:w-1/4">Custom Formats</h2>
    
    <div class="flex flex-wrap gap-2 md:w-3/4 md:justify-end">
      <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
        <PanelBottomOpen class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span class="text-neutral-700 dark:text-neutral-300">Min: {minCustomFormatScore}</span>
      </span>
      
      {#if upgradeUntilScore !== null}
        <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
          <TrendingUp class="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span class="text-neutral-700 dark:text-neutral-300">Until: {upgradeUntilScore}</span>
        </span>
      {/if}
      
      {#if minScoreIncrement !== null}
        <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
          <CopyPlus class="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span class="text-neutral-700 dark:text-neutral-300">Increment: {minScoreIncrement}</span>
        </span>
      {/if}
      
      <!-- Format count pills -->
      {#if custom_formats_radarr.length > 0 || custom_formats.length > 0}
        <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
          <Film class="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
          <span class="text-neutral-700 dark:text-neutral-300">Radarr: {custom_formats_radarr.length + custom_formats.length}</span>
        </span>
      {/if}
      
      {#if custom_formats_sonarr.length > 0 || custom_formats.length > 0}
        <span class="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/50 rounded-full text-xs font-medium flex items-center gap-1.5">
          <Tv class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span class="text-neutral-700 dark:text-neutral-300">Sonarr: {custom_formats_sonarr.length + custom_formats.length}</span>
        </span>
      {/if}
    </div>
  </div>
  
  <Toolbar 
    on:search={handleSearch} 
    on:groupChange={handleGroupChange}
    on:valueChange={handleValueChange}
    rangeMin={scoreRange.min}
    rangeMax={scoreRange.max}
    {minValue}
    {maxValue}
    hasRadarr={custom_formats_radarr.length > 0 || custom_formats.length > 0}
    hasSonarr={custom_formats_sonarr.length > 0 || custom_formats.length > 0}
    bind:selectedCategories
  />
  
  <Formats 
    {filteredFormats}
    {selectedGroups}
    {groupedFormats}
  />
</div>