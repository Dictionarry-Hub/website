<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { showHoverInfo, hideHoverInfo } from '@shared/stores/hoverInfo';
  import { onMount, onDestroy } from 'svelte';
  import { WandSparkles, Download, Code, FlaskConical, BookOpen, SlidersHorizontal } from 'lucide-svelte';
  
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

<div >
  <h2 id="motivation" class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">🔥 Motivation</h2>

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
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">💡 A Potential Solution</h2>
    
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
      Even with perfect configuration databases, a critical gap remains: how do you actually apply these configurations to your setup? How do you handle updates without losing your customizations? How do you track what changed and why? For developers, without proper tooling, you're stuck with no version control and manual API interactions.
    </p>
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Profilarr solves all these problems. It's a management tool that sits between configuration databases and your Radarr/Sonarr installations, automatically pulling updates, converting formats, and syncing everything while preserving your local changes. For developers, it provides a proper workflow with version control, easy testing, and seamless sharing.
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
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">🚀 Getting Started</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Installation Card -->
      <a href="#/profilarr-setup/installation" class="group block p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-green-500 dark:hover:border-green-400 transition-all duration-200 hover:shadow-lg">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-green-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mr-3">
            <Download class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">Installation</h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Step-by-step guide to set up Profilarr in your environment</p>
      </a>

      <!-- Profile Wizard Card -->
      <a href="#/quality-profile#section=profile-wizard" class="group block p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 hover:shadow-lg">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-blue-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mr-3">
            <WandSparkles class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Profile Wizard</h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Get recommended quality profiles based on your preferences and setup</p>
      </a>

      <!-- Development Card -->
      <a href="#/development" class="group block p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-200 hover:shadow-lg">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-indigo-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mr-3">
            <Code class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Development</h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Develop your own Profilarr Database!</p>
      </a>

      <!-- Devlog Card -->
      <a href="#/devlogs" class="group block p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-200 hover:shadow-lg">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-orange-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mr-3">
            <FlaskConical class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">Dev Log</h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Follow the development journey and latest updates</p>
      </a>

      <!-- Wiki Card -->
      <a href="#/wiki" class="group block p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-200 hover:shadow-lg">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-purple-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mr-3">
            <BookOpen class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">Wiki</h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Deep dives into media automation concepts and best practices</p>
      </a>

      <!-- Media Management Card -->
      <a href="#/media-management" class="group block p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-200 hover:shadow-lg">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 bg-teal-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mr-3">
            <SlidersHorizontal class="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">Media Management</h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Configure naming, quality definitions, and misc settings</p>
      </a>
    </div>
  </section>
</div>