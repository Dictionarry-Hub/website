<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import VideoPlayer from '@shared/ui/videoPlayer.svelte';
  
  onMount(() => {
    setNavigationItems([
      'Scenario',
      'Overview',
      'Workflow'
    ], '#/profilarr-setup/updates');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Updates</h1>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="scenario">
    Scenario
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    You've linked a configuration database and synced your desired profiles. Two weeks pass. The database maintainer adds support for new HDR10+ releases and improves anime detection patterns. How do you get these updates?
  </p>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">
    Overview
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Recall from <a href="#/profilarr-setup/linking" class="text-blue-600 dark:text-blue-400 hover:underline">linking</a> that PCDs are Git repositories. Git is a system that tracks changes to files over time. Every change gets a unique identifier, and the complete history of changes is preserved.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    When you link a database, Profilarr clones the entire repository. This gives you:
  </p>
  
  <ul class="list-disc list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>A local copy of all configuration files</li>
    <li>The complete history of every change</li>
    <li>The ability to see what's different between your copy and the original</li>
  </ul>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Here's the key: your local copy and the remote repository can diverge. When the maintainer adds new custom formats or adjusts scores, those changes exist on the remote but not in your local copy. Git can precisely identify these differences.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    This is how Profilarr knows when updates are available. It compares your local repository state with the remote state. When they differ, you have updates to review and apply.
  </p>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="workflow">
    Workflow
  </h2>

  <VideoPlayer 
    src="/video/profilarr_setup/outofdate.mp4"
    description="The following video demonstrates what happens when updates become available:"
  />

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    The workflow begins with checking for updates through a repository sync task. When updates are found, the database page displays incoming changes with details about which profiles are affected.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Two approaches exist for managing these updates:
  </p>

  <div class="space-y-4 mt-4">
    <div>
      <h3 class="font-semibold text-neutral-900 dark:text-white">Automatic Updates</h3>
      <p class="text-neutral-700 dark:text-neutral-300 mt-2">
        The Auto Sync toggle applies incoming changes immediately. Updates flow directly from the remote database to your local copy without manual intervention.
      </p>
    </div>
    
    <div>
      <h3 class="font-semibold text-neutral-900 dark:text-white">Manual Review</h3>
      <p class="text-neutral-700 dark:text-neutral-300 mt-2">
        With Auto Sync disabled, updates queue for review. You can examine what changed, read the maintainer's notes, and decide whether to apply them.
      </p>
    </div>
  </div>

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Each update consists of a commit: a recorded set of changes with a unique identifier and descriptive message. The commit message explains what the maintainer modified and their reasoning.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    The pull operation retrieves these commits from the remote repository and integrates them into your local database. This Git command (git pull) ensures your configuration stays synchronized with the maintainer's latest work. Once pulled, the changes appear immediately in the affected profiles.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    For users with "On Pull" synchronization enabled, these database updates trigger an automatic sync to your Radarr and Sonarr instances.
  </p>

  <PageNavigation 
    previous={{path: '/profilarr-setup/syncing', title: 'Syncing', description: 'Push configurations to your instances'}}
    next={null}
  />
</div>