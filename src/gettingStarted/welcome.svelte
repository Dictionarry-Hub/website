<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    setNavigationItems([
      { title: '👋 Welcome!', children: ['💡 Motivation', '⚙️ Profilarr', '🔨 Development Notice'] }
    ], '#/');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 id="welcome" class="text-3xl font-bold text-neutral-900 dark:text-white mb-6">👋 Welcome!</h1>
  
  <p class="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
    Welcome to Dictionarry! This project aims to wiki-fy and simplify media automation in Radarr / Sonarr through extensive, data driven documentation, custom formats and quality profiles.
  </p>

  <section id="motivation" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">💡 Motivation</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Navigating the world of media automation and coming across quality terms like "Remux", or "HEVC" or "Dolby Vision" can be quite daunting when all you want to do is setup a media server to watch some content. It often feels like you need a masters in audio / video just to grab the latest blockbuster. Dictionarry aims not to explain these concepts in detail, but abstract them into more approachable ideas that don't require extensive knowledge or experience.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Dictionarry leverages two key features of Radarr and Sonarr to simplify media automation:
    </p>

    <ul class="space-y-4 mb-6">
      <li class="text-neutral-700 dark:text-neutral-300">
        <strong class="text-neutral-900 dark:text-white">Custom Formats</strong> - Think of these as smart filters that scan release titles for specific patterns. They help identify important characteristics of your media, such as:
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Video quality (4K, HDR, Dolby Vision)</li>
          <li>Audio formats (Atmos, DTS, TrueHD)</li>
          <li>Source types (Remux, Web-DL, Blu-ray)</li>
          <li>Potential issues (upscaled content, poor encodes)</li>
        </ul>
      </li>
      
      <li class="text-neutral-700 dark:text-neutral-300">
        <strong class="text-neutral-900 dark:text-white">Quality Profiles</strong> - These act like a scoring system that ranks releases based on their Custom Format matches. You can:
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Prioritize what matters most to you</li>
          <li>Automatically upgrade to better versions</li>
          <li>Avoid problematic releases</li>
        </ul>
      </li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Think of Dictionarry as your personal car-buying expert: Instead of researching every technical specification and test-driving dozens of vehicles, you get access to a curated showroom of pre-vetted options that match what you're looking for. Whether you want:
    </p>

    <ul class="list-disc list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li><strong class="text-neutral-900 dark:text-white">2160p Remux</strong> - Maximum Quality 4K HDR remuxes with lossless audio and Dolby Vision</li>
      <li><strong class="text-neutral-900 dark:text-white">2160p Quality</strong> - Transparent 4K HDR encodes selected using the Encode Efficiency Index</li>
      <li><strong class="text-neutral-900 dark:text-white">1080p Quality</strong> - Transparent 1080p encodes optimized using the Golden Popcorn Performance Index</li>
      <li><strong class="text-neutral-900 dark:text-white">1080p Efficient</strong> - Efficient x265 1080p Encodes optimized to save space using the Encode Efficiency Index</li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      <strong class="text-neutral-900 dark:text-white">Profile Preview</strong>
    </p>

    <p class="text-neutral-700 dark:text-neutral-300">
      Dictionarry's database of tested profiles and formats handles the technical decisions for you.
    </p>
  </section>

  <section id="profilarr" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">⚙️ Profilarr</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      The database by itself does nothing. Custom Formats and Quality Profiles need to be imported and configured in your individual arr installations. Rather than leaving you to manually create everything yourself based on our guides, we've created Profilarr to automate this process.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Profilarr is a configuration management tool for Radarr and Sonarr that can interface with ANY remote configuration database (not just Dictionarry's!). It automatically:
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Pulls new updates from your chosen database</li>
      <li>Compiles the database format into specific arr formats</li>
      <li>Imports them to your arr installations</li>
      <li>Manages version control of your configurations</li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Built on top of git, Profilarr treats your configurations like code, allowing you to:
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Track changes over time</li>
      <li>Maintain your own customizations while still receiving database updates</li>
      <li>Resolve conflicts between local / remote changes when they arise</li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      The architecture was specifically built like this to put user choice first. We believe that:
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Your media setup should reflect your needs, not our opinions</li>
      <li>Updates should enhance your configuration, not override it</li>
      <li>Different users have different requirements (storage constraints, hardware capabilities, quality preferences)</li>
      <li>The ability to customize should never be sacrificed for convenience</li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300">
      Profilarr empowers you to use Dictionarry's database (or anyone elses!) as a foundation while maintaining the freedom to adapt it to your specific needs.
    </p>
  </section>

  <section id="development-notice">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">🔨 Development Notice</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300">
      Profilarr 1.0.0 is out now in open beta! <a href="https://dictionarry.dev/wiki/profilarr-setup" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://dictionarry.dev/wiki/profilarr-setup</a>
    </p>
  </section>
</div>