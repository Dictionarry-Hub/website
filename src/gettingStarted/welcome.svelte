<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    setNavigationItems([
      { title: '👋 Hey!', children: ['The Configuration Landscape', 'What Dictionarry Does', 'The Tooling Challenge', 'Bridges, Not Moats', 'Getting Started'] }
    ], '#/');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 id="hey" class="text-3xl font-bold text-neutral-900 dark:text-white mb-6">💡 Motivation</h1>
  
  <p class="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
    Configuration management in media automation has evolved into a peculiar form of oral tradition. Knowledge passes through Reddit posts and Discord conversations-each person reconstructing solutions from fragments of community wisdom. The result? Hundreds of hours collectively spent solving identical problems.
  </p>

  <section id="the-configuration-landscape" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">The Configuration Landscape</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      When someone asks "how do I grab high-quality 4K content?" they're really asking several interconnected questions about codecs, release groups, source types, and quality thresholds. The typical answer involves creating dozens of custom formats, each targeting specific patterns in release names.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Custom formats are means to an end, not ends in themselves. They're pattern-matching utilities that help identify what you want, but the real value lies in how they work together to achieve your goals. The real challenge lies in orchestrating these tools into coherent quality profiles that balance quality, storage, availability, and personal preference. This orchestration knowledge exists, but it's largely implicit, buried in individual setups that took weeks to perfect.
    </p>
  </section>

  <section id="what-dictionarry-does" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">What Dictionarry Does</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      We maintain a database of complete, tested configurations for common use cases. Each configuration represents a particular philosophy about media collection:
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

    <p class="text-neutral-700 dark:text-neutral-300">
      These aren't universal truths about media collection. They're opinionated starting points that encode specific trade-offs and priorities.
    </p>
  </section>

  <section id="the-tooling-challenge" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">The Tooling Challenge</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Even with perfect configuration databases, a critical gap remains: how do you actually apply these configurations to your setup? How do you handle updates without losing your customizations? How do you track what changed and why?
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Profilarr addresses these questions. It provides the synchronization layer between configuration sources and Radarr/Sonarr instances.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Key architectural decisions:
    </p>

    <ul class="list-disc list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li><strong class="text-neutral-900 dark:text-white">Database Agnostic</strong> - The protocol works with any git-based configuration repository</li>
      <li><strong class="text-neutral-900 dark:text-white">Local Modifications Persist</strong> - Your changes aren't obliterated by upstream updates</li>
      <li><strong class="text-neutral-900 dark:text-white">Conflict Resolution is Transparent</strong> - You see what changed and why before accepting updates</li>
      <li><strong class="text-neutral-900 dark:text-white">Version Control Throughout</strong> - Every configuration change is tracked and reversible</li>
    </ul>
  </section>

  <section id="bridges-not-moats" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Bridges, Not Moats</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      The goal isn't to centralize media automation configuration-it's to democratize it. Multiple configuration databases should emerge, each reflecting different philosophies and use cases:

    </p>

    <ul class="list-disc list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li><strong class="text-neutral-900 dark:text-white">Anime-focused configurations</strong> - Handling fansub group hierarchies, dual audio preferences, and seasonal naming conventions</li>
      <li><strong class="text-neutral-900 dark:text-white">Language-specific databases</strong> - French VOSTFR priorities, German DL requirements, Spanish dub preferences</li>
      <li><strong class="text-neutral-900 dark:text-white">Hardware-constrained setups</strong> - Optimized for transcoding limitations, bandwidth restrictions, or storage constraints</li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      By making configurations shareable as complete, tested units-and providing the infrastructure to manage them, Profilarr lowers the barrier for anyone to contribute their expertise. The ecosystem improves when we build bridges between our knowledge, not moats around it.
    </p>
  </section>

  <section id="getting-started" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Getting Started</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      <strong class="text-neutral-900 dark:text-white">Profilarr 1.0.0</strong> is in open beta. The setup process takes about 5 minutes for a basic installation.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      <a href="https://dictionarry.dev/wiki/profilarr-setup" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">-> Profilarr Setup Guide</a>
    </p>
  </section>
</div>