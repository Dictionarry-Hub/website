<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import DatabaseCard from './components/databaseCard.svelte';
  import VideoPlayer from '@shared/ui/videoPlayer.svelte';
  
  onMount(() => {
    setNavigationItems([
      'Overview',
      'Configuration Databases',
      'The Open Standard',
      'Database Spotlight'
    ], '#/profilarr-setup/linking');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Linking</h1>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">
    Overview
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Linking is how you connect Profilarr to a configuration database. The process is straightforward:
  </p>
  
  <ol class="list-decimal list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>Choose a configuration database from the available options (or create your own)</li>
    <li>Copy the GitHub repository URL</li>
    <li>Paste it into Profilarr's link field</li>
    <li>Click connect</li>
  </ol>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Once linked, Profilarr:
  </p>
  
  <ul class="list-disc list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>Downloads the configuration database from GitHub</li>
    <li>Validates the format and structure</li>
    <li>Makes all custom formats, quality profiles, and settings available for syncing</li>
    <li>Checks for updates periodically to keep your configurations current</li>
  </ul>
  
  <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <p class="text-sm text-blue-900 dark:text-blue-100">
      <strong>Note:</strong> Currently, Profilarr supports linking to one database at a time. If you need to connect to multiple databases, you can run multiple Profilarr instances. Future releases will enable linking multiple databases with layered dependencies, allowing databases to build upon each other and share common configurations.
    </p>
  </div>
  
  <VideoPlayer 
    src="/video/profilarr_setup/link.mp4"
    description="In the video below, we demonstrate linking a Profilarr instance to the Dictionarry database:"
  />
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="configuration-databases">
    Configuration Databases
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Profilarr connects to configuration sources through Profilarr Compliant Databases (PCDs). These <strong class="text-neutral-900 dark:text-white">databases provide a standardized way to share</strong> and maintain Radarr/Sonarr configurations.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Every PCD shares these characteristics:
  </p>
  
  <ul class="list-disc list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>Hosted as Git repositories (typically on GitHub)</li>
    <li>Can be public or private</li>
    <li>Maintained independently by their repository owners (not the Dictionarry team)</li>
    <li>Written in a standardized format that Profilarr understands</li>
    <li>Managed directly through Profilarr after linking</li>
  </ul>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="the-open-standard">
    The Open Standard
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    While Profilarr was initially built to work with the Dictionarry database, it's <strong class="text-neutral-900 dark:text-white">designed as an open platform</strong>. The goal is to establish a configuration standard that <strong class="text-neutral-900 dark:text-white">empowers the community to create and share their own setups</strong>.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    This approach means:
  </p>
  
  <ul class="list-disc list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>No database is pre-configured or preferred</li>
    <li>You choose what works for your setup</li>
    <li>Anyone can create and maintain a PCD</li>
    <li>The community decides what configurations gain traction</li>
  </ul>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    There are <strong class="text-neutral-900 dark:text-white">no restrictions on what you can link</strong>. The platform exists to give database maintainers a standard format and users the <strong class="text-neutral-900 dark:text-white">freedom to choose configurations that match their needs</strong>.
  </p>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="database-spotlight">
    Database Spotlight
  </h2>
  
  <div class="mt-6 space-y-4">
    <DatabaseCard
      name="Dictionarry Database"
      description="The original configuration database maintained by the Dictionarry team. Features comprehensive quality profiles and custom formats."
      githubUrl="https://github.com/Dictionarry-Hub/database"
    />
  </div>
  
  <p class="text-neutral-600 dark:text-neutral-400 mt-8 text-sm">
    Profilarr is in early development, so this list is still growing. Want your database featured? Join us on 
    <a 
      href="https://discord.gg/XGdTJP5G8a" 
      target="_blank" 
      rel="noopener noreferrer"
      class="text-blue-600 dark:text-blue-400 hover:underline"
    >
      Discord
    </a>.
  </p>

  <PageNavigation 
    previous={{path: '/profilarr-setup/101', title: 'Profilarr 101', description: 'Learn the basics'}}
    next={{path: '/profilarr-setup/bridging', title: 'Bridging', description: 'Connect to your Radarr/Sonarr instances'}}
  />
</div>