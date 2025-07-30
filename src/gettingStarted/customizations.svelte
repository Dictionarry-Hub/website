<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import VideoPlayer from '@shared/ui/videoPlayer.svelte';
  
  onMount(() => {
    setNavigationItems([
      'Scenario',
      'Overview',
      'Workflow',
      'Merge Conflicts'
    ], '#/profilarr-setup/customizations');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
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
    Making changes in Profilarr works exactly like Radarr and Sonarr. You navigate to your configuration page, click on the profile or format you want to modify, and change it. Different interface, same workflow. But there's one crucial difference at the end: you need to create a "commit".
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Recall again that databases are Git repositories; they track changes over time. This tracking works in both directions - The database maintainer's updates get tracked, and so do YOUR changes, with YOUR commits.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    A commit is a saved snapshot of your changes. Think of it as a checkpoint in a video game. It records the exact state of your configuration at that moment, along with a description of what you changed and why.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    This commit system is what enables the <a href="#/profilarr-setup/updates" class="text-blue-600 dark:text-blue-400 hover:underline">updates</a> we discussed earlier. Database maintainers create commits when they add new formats or adjust scores. You create commits when you customize your profiles. Git keeps these separate, which is why you can receive updates without losing your customizations.
  </p>
  
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Why require this extra step? Why not auto-commit? The answer is reversion. Consider this: you're adjusting release group rankings in your quality profile. After several changes, your downloads are worse than before. You can't remember the original scores for each group. With commits, you can instantly revert to your previous working configuration. Without them, you'd be stuck trying to recall what the values were.
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
    Consider this scenario: You've committed your Dolby Vision score change (setting it to 0). Meanwhile, the database maintainer updates the same score to -150, intending to downrank these files without blocking them entirely. When you try to pull the latest updates, both you and the maintainer have modified the exact same value.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    This creates a merge conflict. Git cannot automatically decide which value to keep because both changes are valid from their respective perspectives. Should it use your 0 or the maintainer's -150? The system has no way to determine your intent.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    A merge conflict occurs when the same part of a file gets changed in different ways. It's Git's way of saying "I need human judgment here." Profilarr detects these conflicts and prompts you to resolve them before proceeding.
  </p>

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

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Attempting to pull this change makes Profilarr enter conflict resolution mode. The system prevents any modifications or additional pulls until conflicts are resolved. You'll see both values presented side by side - your local 0 and the maintainer's incoming -150. For each conflict, you decide which value to keep. In this case, the video shows keeping the local 0 score.
  </p>

  <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <p class="text-sm text-blue-900 dark:text-blue-100">
      <strong>Note:</strong> The abort option exits conflict resolution but blocks all future updates. Conflicts must be resolved to continue receiving database changes.
    </p>
  </div>

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Clicking the green checkmark confirms your choice - the Dolby Vision score remains at 0, rejecting the maintainer's -150. But you haven't lost the other updates. The system intelligently merges everything else from the maintainer while preserving your specific override. This happens through a three-way merge: Git examines the original state, your changes, and the maintainer's changes to understand who modified what. After resolution, your local database is no longer "behind" or "ahead" - it's synchronized with the maintainer's version except for your deliberate customizations. Future updates will continue to flow normally, and Git will only flag conflicts when you and the maintainer touch the same values again.
  </p>

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