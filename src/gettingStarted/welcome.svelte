<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { showHoverInfo, hideHoverInfo } from '@shared/stores/hoverInfo';
  import { onMount, onDestroy } from 'svelte';
  
  // Define hover definitions for this page
  const hoverDefinitions = {
    'custom formats': {
      term: 'Custom Formats',
      description: 'Pattern-matching rules that identify specific qualities, codecs, or release characteristics in media file names.'
    },
    'quality profiles': {
      term: 'Quality Profiles', 
      description: 'Collections of custom formats with assigned scores that determine which releases to prefer or reject.'
    }
  };
  
  function handleHover(key) {
    const def = hoverDefinitions[key];
    if (def) {
      showHoverInfo(def.term, def.description);
    }
  }
  
  onMount(() => {
    setNavigationItems([
      { title: 'Motivation', children: ['The Configuration Landscape', 'A Potential Solution', 'The Tooling Challenge', 'Getting Started'] }
    ], '#/');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h2 id="motivation" class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">💡 Motivation</h2>

  <p class="text-neutral-700 dark:text-neutral-300 mb-8">
    Every media automation setup starts the same way: hours of digging through forum posts and guides, trying to piece together how everything actually works. The result? Hundreds of hours collectively spent solving identical problems.
  </p>

  <section id="the-configuration-landscape" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">🌍 The Configuration Landscape</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      When someone asks "how do I grab high-quality 4K content?" they're really asking several interconnected questions about codecs, release groups, source types, and quality thresholds. The typical answer involves creating dozens of <span class="hidden lg:inline underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400" on:mouseenter={() => handleHover('custom formats')} on:mouseleave={hideHoverInfo}>custom formats</span><span class="lg:hidden">custom formats</span>, each targeting specific patterns in release names.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Custom formats solve individual problems: identifying 4K releases, filtering out low-quality sources, prioritizing certain encoders. But they create a new problem: how do you make 20+ individual rules work together without conflicts? The real challenge lies in orchestrating these tools into coherent <span class="hidden lg:inline underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400" on:mouseenter={() => handleHover('quality profiles')} on:mouseleave={hideHoverInfo}>quality profiles</span><span class="lg:hidden">quality profiles</span> that balance quality, storage, availability, and personal preference. This orchestration knowledge exists, but it's largely implicit, buried in individual setups that took weeks to perfect.
    </p>
  </section>

  <section id="a-potential-solution" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">✨ A Potential Solution</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Instead of everyone rebuilding the same configurations from scratch, what if we shared complete, battle-tested profiles? Each one designed around a specific approach to media collection:
    </p>

    <ul class="list-disc list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li class="text-neutral-700 dark:text-neutral-300">
        <strong class="text-neutral-900 dark:text-white">2160p Remux</strong> - Archival approach prioritizing perfect source preservation with lossless audio and HDR/Dolby Vision
      </li>
      <li class="text-neutral-700 dark:text-neutral-300">
        <strong class="text-neutral-900 dark:text-white">2160p Quality</strong> - Perceptual transparency via efficiency metrics, accepting high-quality encodes that are visually identical to source
      </li>
      <li class="text-neutral-700 dark:text-neutral-300">
        <strong class="text-neutral-900 dark:text-white">1080p Quality</strong> - Performance-indexed selection using Golden Popcorn metrics for transparent results
      </li>
      <li class="text-neutral-700 dark:text-neutral-300">
        <strong class="text-neutral-900 dark:text-white">1080p Efficient</strong> - Space-conscious x265 optimization based on encode efficiency calculations
      </li>
      <li class="text-neutral-700 dark:text-neutral-300">
        <strong class="text-neutral-900 dark:text-white">And More</strong> - Additional profiles for specific use cases and requirements
      </li>
    </ul>
  </section>

  <section id="the-tooling-challenge" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">🔧 The Tooling Challenge</h2>
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Even with perfect configuration databases, a critical gap remains: how do you actually apply these configurations to your setup? How do you handle updates without losing your customizations? How do you track what changed and why?
    </p>
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Profilarr solves these problems. It's a management tool that sits between configuration databases and your Radarr/Sonarr installations, automatically pulling updates, converting formats, and syncing everything while preserving your local changes.
    </p>
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      The process is simple:
    </p>
    <ul class="list-disc list-inside space-y-2 mb-4 text-neutral-700 dark:text-neutral-300">
      <li>You link a configuration database</li>
      <li>You connect your Radarr/Sonarr instances</li>
      <li>You press sync</li>
    </ul>
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Behind the scenes, Profilarr:
    </p>
    <ul class="list-disc list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Automatically compiles configurations for different arr formats</li>
      <li>Preserves your local modifications</li>
      <li>Pulls in new updates from the database</li>
      <li>Handles merge conflicts transparently</li>
      <li>Tracks every change with version control</li>
    </ul>
  </section>

  <section id="getting-started" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">🚀 Getting Started</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      <strong class="text-neutral-900 dark:text-white">Profilarr 1.0.0</strong> is in open beta.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      <a href="#/profilarr-setup" class="text-blue-600 dark:text-blue-400 hover:underline">-> Profilarr Setup Guide</a>
    </p>
  </section>
</div>