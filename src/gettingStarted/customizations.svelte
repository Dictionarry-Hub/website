<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import VideoPlayer from '@shared/ui/videoPlayer.svelte';
  
  onMount(() => {
    setNavigationItems([
      'Scenario',
      { title: 'Overview', children: ["What's a Commit?", 'How It Works', 'Why Manual Commits?'] },
      'Workflow',
      { title: 'Merge Conflicts', children: ['The Scenario', "What's Happening?", 'Resolution Process', 'After Resolution'] }
    ], '#/profilarr-setup/customizations');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div >
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Customizations</h1>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="scenario">
    Scenario
  </h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    You're using the 2160p Remux profile and notice it rejects Dolby Vision Only WEB-DL releases. Your Shield Pro plays these files without issue, so you want to allow them.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Traditionally, you'd modify the profile directly. But this breaks your connection to future database updates. When the maintainer adjusts scores or adds new custom formats, your modified profile won't receive these improvements. Profilarr solves this: make your customizations while staying connected to upstream updates.
  </p>
  
  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">
    Overview
  </h2>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Making changes in Profilarr follows the same workflow as Radarr/Sonarr, with one key addition: commits.
  </p>

  <div class="mt-4" id="whats-a-commit">
    <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">What's a Commit?</h3>
    <ul class="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
      <li>A saved snapshot of your changes</li>
      <li>Like a checkpoint in a video game</li>
      <li>Includes a description of what and why you changed</li>
    </ul>
  </div>

  <div class="mt-6" id="how-it-works">
    <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">How It Works</h3>
    <p class="text-neutral-700 dark:text-neutral-300 mb-2">
      Databases are Git repositories tracking changes in both directions:
    </p>
    <ul class="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
      <li><strong>Maintainer commits:</strong> New formats, adjusted scores, profile updates</li>
      <li><strong>Your commits:</strong> Custom tweaks, personal preferences, local overrides</li>
    </ul>
  </div>

  <div class="mt-6" id="why-manual-commits">
    <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">Why Manual Commits?</h3>
    <p class="text-neutral-700 dark:text-neutral-300 mb-2">
      Example: You adjust release group rankings. Downloads get worse. What were the original values?
    </p>
    <ul class="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
      <li><strong>With commits:</strong> Revert instantly to previous working state</li>
      <li><strong>Without commits:</strong> Manual recovery, lost values, no history</li>
    </ul>
  </div>

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    This separation enables the <a href="#/profilarr-setup/updates" class="text-blue-600 dark:text-blue-400 hover:underline">update system</a>. Git keeps your changes and maintainer updates separate, merging them intelligently.
  </p>

  <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <p class="text-sm text-blue-900 dark:text-blue-100">
      <strong>Note:</strong> Creating a commit saves your changes locally but doesn't sync them to Radarr/Sonarr. To apply your customizations, you'll need to trigger a sync manually, wait for a scheduled sync, or rely on "On Pull" syncing as described in <a href="#/profilarr-setup/syncing" class="text-blue-600 dark:text-blue-400 hover:underline">syncing</a>.
    </p>
  </div>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="workflow">
    Workflow
  </h2>

  <VideoPlayer 
    src="/video/profilarr_setup/commit.mp4"
    description="The video below walks through adjusting the Dolby Vision score from the <a href='profilarr-setup/customizations#section=scenario' class='text-blue-600 dark:text-blue-400 hover:underline'>scenario</a> above."
  />

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    The workflow begins in the quality profile where you adjust the Dolby Vision score to 0. Setting it to 0 effectively disables this format's rejection criteria. After saving your change with the double-click confirmation, navigate to Settings > Database.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    The database page now shows "Outgoing Changes" - your local modifications waiting to be committed. These mirror the <a href="#/profilarr-setup/updates" class="text-blue-600 dark:text-blue-400 hover:underline">Incoming Changes</a> from before, but represent your changes instead of the maintainer's.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    To make a commit you:
  </p>
  
  <ol class="list-decimal list-inside space-y-2 mt-2 text-neutral-700 dark:text-neutral-300">
    <li>Select the changed file</li>
    <li>Click the + button to stage it</li>
    <li>Select the staged file again</li>
    <li>Write a commit message describing what you changed (required - can't commit without it)</li>
    <li>Click the commit button</li>
  </ol>

  <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <p class="text-sm text-blue-900 dark:text-blue-100">
      <strong>Note:</strong> The commit interface currently requires manual staging and selection. We're working on streamlining this process. Tips: Hold Shift to select multiple files at once. All staged files are included in the commit, regardless of current selection.
    </p>
  </div>

  <div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
    <p class="text-sm text-green-900 dark:text-green-100">
      <strong>Note:</strong> The video concludes with a "Ready to Push" screen. This feature allows database maintainers to publish their changes back to GitHub. As an end user customizing your local setup, your commits remain local and this step doesn't apply to your workflow.
    </p>
  </div>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="merge-conflicts">
    Merge Conflicts
  </h2>

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Sometimes your changes and the maintainer's updates collide on the same field.
  </p>

  <div class="mt-4" id="the-scenario">
    <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">The Scenario</h3>
    <ul class="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
      <li><strong>Your change:</strong> Dolby Vision score = 0 (allow all)</li>
      <li><strong>Maintainer's update:</strong> Dolby Vision score = -150 (downrank, not block)</li>
      <li><strong>Result:</strong> Same field, different values = conflict</li>
    </ul>
  </div>

  <div class="mt-6" id="whats-happening">
    <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">What's Happening?</h3>
    <p class="text-neutral-700 dark:text-neutral-300">
      Git sees two valid changes to the same value and can't determine which one you want. Should Dolby Vision files be fully allowed (your 0) or just downranked (their -150)? Only you know your intent, so Profilarr asks you to decide.
    </p>
  </div>

  <VideoPlayer 
    src="/video/profilarr_setup/resolve.mp4"
    description="The video below demonstrates resolving a merge conflict between your Dolby Vision score (0) and the maintainer's update (-150):"
    class="mt-6"
  />

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    The video shows what happens when your changes conflict with the maintainer's updates. Notice the yellow warning on the Incoming Changes table indicating potential merge conflicts.
  </p>

  <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <p class="text-sm text-blue-900 dark:text-blue-100">
      <strong>Note:</strong> Those yellow markers flag potential conflicts, but most won't actually clash. Real conflicts need both parties editing the exact same value.
    </p>
  </div>

  <div class="mt-6" id="resolution-process">
    <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">Resolution Process</h3>
    <ul class="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
      <li>Pull attempt triggers conflict resolution mode</li>
      <li>System locks - no edits or pulls allowed</li>
      <li>Values shown side by side: your 0 vs their -150</li>
      <li>You choose which to keep</li>
    </ul>
  </div>

  <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <p class="text-sm text-blue-900 dark:text-blue-100">
      <strong>Note:</strong> The abort option exits conflict resolution but blocks all future updates. Conflicts must be resolved to continue receiving database changes.
    </p>
  </div>

  <div class="mt-6" id="after-resolution">
    <h3 class="font-semibold text-neutral-900 dark:text-white mb-2">After Resolution</h3>
    <p class="text-neutral-700 dark:text-neutral-300 mb-2">
      When you click the green checkmark to complete the merge, something important happens behind the scenes. While your Dolby Vision score remains at 0 as you chose, all the maintainer's other updates still get applied to your database.
    </p>
    
    <div class="mt-4">
      <p class="text-neutral-700 dark:text-neutral-300 font-semibold mb-1">The merge gives you:</p>
      <ul class="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
        <li>Your Dolby Vision preference preserved at 0</li>
        <li>Any new custom formats the maintainer added</li>
        <li>Score adjustments for other formats you haven't touched</li>
        <li>A fully updated database that respects your customizations</li>
      </ul>
    </div>
    
    <p class="text-neutral-700 dark:text-neutral-300 mt-4">
      Going forward, the system tracks which settings you've customized. Updates continue flowing normally, and you'll only see conflicts when both you and the maintainer modify the same specific value.
    </p>
  </div>

  <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
    <p class="text-sm text-green-900 dark:text-green-100">
      <strong>Note:</strong> The conflict resolution system handles small changes well, but we're still improving how it deals with larger-scale modifications. If you're planning extensive database changes, it's better to fork the repository on GitHub for now. The built-in resolution works great for tweaking individual scores and making minor adjustments.
    </p>
  </div>

  <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
    <p class="text-neutral-700 dark:text-neutral-300">
      The <a href="#/" class="text-blue-600 dark:text-blue-400 hover:underline">tooling challenge</a> asked: how do you apply configurations? How do you get updates without losing changes? How do you know what changed? Profilarr's answer: Git repositories. Link, Bridge, Sync, Update and Customize. This isn't a new workflow - it's the same version control process software engineers use every day, now applied to media server configurations.
    </p>
    <p class="text-neutral-700 dark:text-neutral-300 mt-4">
      The next section covers database development - how to create, test, and share configuration databases with the community.
    </p>
  </div>
  
  <PageNavigation 
    previous={{path: '/profilarr-setup/updates', title: 'Updates', description: 'Stay current with database changes'}}
    next={{path: '/development', title: 'Development', description: 'Create and maintain configuration databases'}}
  />
</div>