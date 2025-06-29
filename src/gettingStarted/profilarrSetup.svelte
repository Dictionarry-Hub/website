<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    setNavigationItems([
      { 
        title: 'Profilarr Setup', 
        children: [
          'Installation',
          { title: 'Usage', children: [
            'Credentials Setup',
            'Configuration Workflows',
            'Connecting to a Database',
            'Getting Updates',
            'Making Changes',
            'Handling Merge Conflicts',
            'Profilarr Quirks',
            'Git Gud'
          ]},
          { title: 'Importing', children: [
            'Type / Server',
            'Sync Settings',
            'External App Setup'
          ]}
        ]
      }
    ], '');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 id="profilarr-setup" class="text-3xl font-bold text-neutral-900 dark:text-white mb-6">Profilarr Setup</h1>
  
  <p class="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
    Profilarr is a <strong>custom format / quality profile management tool</strong> that acts as a middleman between a configuration database and your radarr/sonarr installations. It automatically:
  </p>

  <ul class="list-disc list-inside space-y-2 mb-8 text-neutral-700 dark:text-neutral-300">
    <li><strong>Pulls</strong> new updates from your chosen database</li>
    <li><strong>Compiles</strong> the database format into specific arr formats</li>
    <li><strong>Imports</strong> them to your arr installations</li>
    <li>Manages <strong>version control</strong> of your configurations</li>
  </ul>

  <section id="installation" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Installation</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Profilarr follows the GitFlow workflow for development:
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>New features are first merged into the <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">develop</code> branch for testing</li>
      <li>Once stable, these features move to the <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">main</code> branch</li>
      <li>For early access to new features, use <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">santiagosayshey/profilarr:beta</code></li>
      <li>For stable use, use <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">santiagosayshey/profilarr:latest</code></li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      Once installed, you can visit the web UI at <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">http://[address]:6868</code> and begin the setup process.
    </p>

    <h3 class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Docker</h3>

    <h4 class="text-lg font-medium text-neutral-900 dark:text-white mb-3">Docker Compose (recommended)</h4>
    
    <pre class="bg-neutral-900 text-neutral-100 p-4 rounded-lg mb-6 overflow-x-auto"><code>services:
  profilarr:
    image: santiagosayshey/profilarr:latest # or :beta
    container_name: profilarr
    ports:
      - 6868:6868
    volumes:
      - /path/to/your/data:/config
    environment:
      - TZ=UTC # Set your timezone
    env_file:
      - .env # Optional: Only needed if contributing to a database
    restart: unless-stopped</code></pre>

    <h4 class="text-lg font-medium text-neutral-900 dark:text-white mb-3">Docker CLI</h4>
    
    <pre class="bg-neutral-900 text-neutral-100 p-4 rounded-lg mb-6 overflow-x-auto"><code>docker run -d \
  --name=profilarr \
  -p 6868:6868 \
  -v /path/to/your/data:/config \
  -e TZ=UTC \
  --env-file .env \ # Optional: Only needed if contributing to a database
  --restart unless-stopped \
  santiagosayshey/profilarr:latest  # or :beta</code></pre>

    <h4 class="text-lg font-medium text-neutral-900 dark:text-white mb-3">Volumes</h4>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      When configuring the volume mount (<code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">/path/to/your/data:/config</code>):
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Replace <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">/path/to/your/data</code> with the actual path on your host system</li>
      <li><strong>Windows users:</strong> The database is case-sensitive. Use a docker volume or the WSL file system directly to avoid issues</li>
      <li class="ml-4">Docker volume example: <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">profilarr_data:/config</code></li>
      <li class="ml-4">WSL filesystem example: <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">/home/username/docker/profilarr:/config</code></li>
    </ul>

    <h3 class="text-xl font-medium text-neutral-900 dark:text-white mb-4">CasaOS</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      View lawgics' CasaOS setup guide <a href="https://dictionarry.dev/wiki/profilarr-casaos" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">here</a>
    </p>

    <h3 class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Development</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      In addition to being a 'sync' tool for end users, Profilarr also acts as a development platform for people to work on, and contribute to, a remote database. Read <a href="https://dictionarry.dev/wiki/development-setup" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">here</a> to learn more on how to setup Profilarr for development.
    </p>
  </section>

  <section id="usage" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Usage</h2>
    
    <h3 id="credentials-setup" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Credentials Setup</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      The first time you visit the web UI at <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">http://[address]:6868</code>, you'll be prompted to setup login credentials.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      Make sure you keep note of these credentials, as you won't be able to reset the password if you forget it later on (unless you have access to the filesystem and can interact with the docker container.)
    </p>

    <h3 id="configuration-workflows" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Configuration Workflows</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Once you've setup your user credentials you can start working on your media configurations. You have the choice to either:
    </p>

    <ol class="list-decimal list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Connect to an external database, make changes, receive updates and handle change conflicts.
        <ul class="list-disc list-inside ml-4 mt-1 space-y-1">
          <li>This is what most people will be using if they don't want to build configurations from scratch.</li>
        </ul>
      </li>
      <li>Use Profilarr completely locally, without a database.
        <ul class="list-disc list-inside ml-4 mt-1 space-y-1">
          <li>This option is left for people who want the advantages of Profilarr's compilation system (single definition profiles, tweaks, better management, etc), but don't want to be tied to any one database. Skip ahead to <a href="#section=making-changes" class="text-blue-600 dark:text-blue-400 hover:underline">Making Changes</a></li>
        </ul>
      </li>
    </ol>

    <h3 id="connecting-to-a-database" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Connecting to a Database</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Profilarr leverages Git to create an open-source configuration sharing system. To get started, navigate to <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">Settings -> Database</code>, and link a repository.
    </p>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <thead class="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">#</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Feature</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Description</th>
          </tr>
        </thead>
        <tbody class="text-neutral-700 dark:text-neutral-300">
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">1</td>
            <td class="px-4 py-2 font-medium">Database information</td>
            <td class="px-4 py-2">Contains basic information about the database - Name, Owner, Stars/Issues/PRs</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">2</td>
            <td class="px-4 py-2 font-medium">Status Container</td>
            <td class="px-4 py-2">- View outgoing changes (any local changes you've made to the database)<br>- View incoming changes (any changes pushed to a remote database that haven't been applied to your local one)<br>- View merge conflicts (when you've made changes to a file that also has incoming changes)</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">3</td>
            <td class="px-4 py-2 font-medium">Commit / Change Log</td>
            <td class="px-4 py-2">- View logs of all prior changes applied to your database<br>- If your HEAD is out of date with the remote, it will only show commits after the commit diversion</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">4</td>
            <td class="px-4 py-2 font-medium">Unlink Repo</td>
            <td class="px-4 py-2">- Remove the currently linked repo<br>- Choose to either keep the current files and stop receiving updates<br>- Or remove all files and sync to a completely different database instead</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">5</td>
            <td class="px-4 py-2 font-medium">Current Branch</td>
            <td class="px-4 py-2">- Databases may choose to maintain stable / beta versions of their configurations via branches<br>- You would choose your preferred configuration path here (most will just use stable)</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">6</td>
            <td class="px-4 py-2 font-medium">Auto Sync</td>
            <td class="px-4 py-2">- Option to let Profilarr automatically pull in new updates without consulting you first.<br>- Useful if you want to connect to a database, receive updates and forget about it after<br>- If a pull causes a merge conflict, Profilarr will pause mid merge and let your resolve the conflicts manually before continuing</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
      <p class="text-yellow-800 dark:text-yellow-200">
        <strong>NOTE:</strong> The database must adhere to the Profilarr standard format to work correctly with Profilarr (ie configurations must be made / edited inside profilarr and not externally).
      </p>
      <p class="text-yellow-800 dark:text-yellow-200 mt-2">
        Profilarr does not ensure that every public database will adhere to this format, nor work properly with them (only our own - the Dictionarry database).
      </p>
    </div>

    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      The following sections will use the <a href="https://github.com/Dictionarry-Hub/database" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Dictionarry Database</a> for demonstration purposes.
    </p>

    <h3 id="getting-updates" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Getting Updates</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Databases are likely to change overtime; they might receive new features such as edition formats, or new quality profiles targeting anime releases. They might fix bugs with regex patterns, or improve descriptions and tags. Since Profilarr connects to a Git repository, it can take advantage of Git's version control capabilities to show when your local database is out of sync with the remote database.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      When updates are available, Profilarr will display them in the Status Container section of the Database page (provided you don't have auto pull enabled):
    </p>

    <ol class="list-decimal list-inside space-y-4 mb-6 text-neutral-700 dark:text-neutral-300">
      <li><strong>Incoming Changes:</strong> Shows all changes that have been pushed to the remote database but haven't yet been applied to your local installation
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Each change will show a single file each</li>
          <li>Changes will usually be marked as tweaks, additions, removals, renames, etc.</li>
          <li>You can click the 'View Changes' button, which will open a modal that shows the associated commit + message, and the exact fields that have changed</li>
        </ul>
      </li>
      <li><strong>Update Process:</strong>
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Click the "Pull Changes" button to apply all incoming changes to your local database</li>
          <li>Profilarr will automatically merge these changes with your local setup</li>
          <li>If you've enabled Auto Sync in settings, these updates will be applied automatically</li>
          <li>Once pulled, your database will go back to being in sync</li>
          <li>It is currently not possible to pick and choose updates yet, but this feature will be looked at in future</li>
        </ul>
      </li>
      <li><strong>Update History:</strong>
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>All successfully applied updates are logged in the Commit/Change Log section</li>
          <li>This provides a complete history of changes applied to your database</li>
          <li>You can use this log to track when specific features were added or modified</li>
          <li>While technically feasible, Profilarr does NOT allow you to go back to a certain commit for interoperability reasons.</li>
        </ul>
      </li>
    </ol>

    <h3 id="making-changes" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Making Changes</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Databases are meant to act as 'starting points' for your setup:
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Some may be broad and have a variety of profiles to use</li>
      <li>Others might be incredibly niche and focus on small but important philosophies.</li>
      <li>Even Dictionarry's database, that aims to be both broad and niche at the same time is also just a starting point.</li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      You have the power to make changes to <em>whatever</em> you want, and still receive updates from a database. To make changes, you simply interact with the configs you want to change and save them - just as you would in Radarr / Sonarr.
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>You can change file names, regex patterns, descriptions, format scores, quality groups - whatever you want.</li>
      <li>You can view these changes in the database tab just as you would see incoming changes.</li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      From this point, you have a few choices. You can either:
    </p>

    <ul class="list-disc list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li><strong>Revert changes.</strong> Have you ever made changes to your quality profiles and wanted to change it back but couldn't because you couldn't remember what it used to be? Well since we operate within Git, you can revert a file back to it's previous 'stable' state using <code class="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">git revert</code>. It's as simple as pressing a button now.</li>
      <li><strong>Commit Changes.</strong> When you're satisfied with your modifications and want to preserve them, you need to stage and commit them to your local Git repository. This creates a permanent record of your customizations that Profilarr can reference when pulling updates from the remote database.</li>
    </ul>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <thead class="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">#</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Action</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Description</th>
          </tr>
        </thead>
        <tbody class="text-neutral-700 dark:text-neutral-300">
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">1</td>
            <td class="px-4 py-2 font-medium">Stage</td>
            <td class="px-4 py-2">- Marks modified files to be included in your next commit<br>- This is the preparation step before saving changes permanently<br>- You can select which specific files to stage, allowing you to group related changes together<br>- Staged files appear in a separate section in the interface<br>- Files must be staged before they can be committed (Git's two-phase commit process ensures you review changes before finalizing them)</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">2</td>
            <td class="px-4 py-2 font-medium">Unstage</td>
            <td class="px-4 py-2">- Removes files from the staging area that you previously staged<br>- Useful when you accidentally stage files or decide not to include certain changes in your commit<br>- The file remains modified in your working directory, but won't be included in the next commit<br>- You can only select and unstage files that are currently in the staging area</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">3</td>
            <td class="px-4 py-2 font-medium">Commit</td>
            <td class="px-4 py-2">- Permanently saves all staged changes to your local Git repository<br>- Requires a commit message that describes what changes were made and why<br>- Creates a checkpoint you can revert to later if needed<br>- <strong>Important:</strong> All staged files will be committed, not just selected ones<br>- After committing, these changes become part of your local configuration history<br>- This is the crucial step that allows Profilarr to track your customizations separately from the original database</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">4</td>
            <td class="px-4 py-2 font-medium">Revert</td>
            <td class="px-4 py-2">- Returns a file to its previous state before your modifications<br>- Especially useful when you've made changes you no longer want to keep<br>- You can only revert non committed changes<br>- This preserves the history of changes while effectively canceling out unwanted modifications</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">5</td>
            <td class="px-4 py-2 font-medium">Push</td>
            <td class="px-4 py-2">- Sends your local commits to the remote database<br>- <strong>Only relevant for database contributors and developers</strong><br>- Requires appropriate permissions to the remote repository<br>- Regular users don't need to worry about this action</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="text-lg font-medium text-neutral-900 dark:text-white mb-3">Why Commits?</h4>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      You might wonder: "Why do I need to manually stage and commit changes? Why doesn't Profilarr just save them automatically?" The answer lies in Profilarr's core philosophy of balancing customization with ongoing updates:
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      <strong>Breaking the "All or Nothing" Model:</strong> Traditional tools force you to choose - either use their configurations exactly as provided, or be cut off from future updates once you make changes. When you commit in Profilarr, you're creating clear markers that tell the system "these parts are my customizations." This allows Profilarr to know exactly which parts to preserve when new updates arrive and which parts can be safely updated.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Technically, Git is creating snapshots of your configurations at specific points in time. When you commit changes, Git records the exact differences between the original file and your modified version. Later, when pulling updates, Git analyzes these differences alongside the incoming changes and intelligently determines how to combine both sets of modifications without losing either. Without these explicit commit markers, there would be no reliable way to perform this merge operation.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      While Profilarr could theoretically automate the staging and committing process, we've deliberately kept it manual. This is because Profilarr also serves as a development platform, and developers need precise control over when and how their changes are saved. Automatic commits would be frustrating for database contributors who are testing various configurations and don't want every experimental change permanently recorded. This manual approach gives both end users and developers the flexibility they need without compromising functionality.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      While the extra step might seem clunky at first, it's the mechanism that enables Profilarr's unique ability to let you personalize configurations while still receiving ongoing improvements. The alternative would be returning to the "use our configs exactly as provided or you're on your own" approach of other tools.
    </p>

    <h3 id="handling-merge-conflicts" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Handling Merge Conflicts</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      Even with Git's intelligent merging, sometimes you'll encounter situations where both you and the remote database have modified the same parts of the same files. When this happens, Profilarr needs your help to determine which changes to keep.
    </p>

    <h4 class="text-lg font-medium text-neutral-900 dark:text-white mb-3">When Conflicts Occur</h4>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Merge conflicts might arise in such scenarios like this:
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>You've customized a quality profile to allow AV1 encodes</li>
      <li>Meanwhile, the remote database has updated the same profile to allow AV1 encodes, but at a reduced score pushed up by other formats</li>
      <li>Both changes affect the same file.</li>
    </ul>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      When incoming changes affect files you've modified, Profilarr will mark them with a "Potential Conflict" label in the Status Container's incoming changes.
    </p>

    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      When you attempt to pull these changes, the database will enter a "Merge Conflict" state.
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>At any point, you can choose to abort the merge and go back to your previous database state.</li>
      <li>You will not however, be able to pull in any new updates until the merge conflict has been resolved.</li>
    </ul>

    <h4 class="text-lg font-medium text-neutral-900 dark:text-white mb-3">Resolving Conflicts</h4>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      In the Merge Conflict state:
    </p>

    <ol class="list-decimal list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Profilarr prevents you from making changes to other files until all conflicts are resolved</li>
      <li>The interface displays each conflicting field side-by-side, showing "Yours" (your version) and "Theirs" (remote version)</li>
      <li>You must resolve conflicts field-by-field, file-by-file</li>
      <li>For each field, you choose whether to keep your version or adopt the remote changes</li>
      <li>After resolving a conflict (but before completing the merge), you can edit your choices in case you change your mind</li>
    </ol>

    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Here, the user has chosen to:
    </p>

    <ul class="list-disc list-inside space-y-1 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Accept the incoming changes for two custom formats (360p and 2160p Quality Tier 5)</li>
      <li>Keep their local score change for AV1</li>
    </ul>

    <h4 class="text-lg font-medium text-neutral-900 dark:text-white mb-3">After Resolution</h4>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      Once you've resolved all conflicts for all files, you can commit the merge changes:
    </p>

    <ol class="list-decimal list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
      <li>Non-conflicting files that were part of the pull are automatically merged</li>
      <li>Your resolved files maintain the exact choices you made during conflict resolution</li>
      <li>Your local database returns to a "in sync" state with the remote</li>
      <li>Normal operations can resume until the next update or change</li>
    </ol>

    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      This process ensures you get the best of both worlds - keeping your important customizations while still benefiting from improvements in the remote database. While it may seem complex at first, this approach gives you complete control over how updates are integrated with your personalized setup.
    </p>

    <h3 id="profilarr-quirks" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Profilarr Quirks</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      Profilarr has made some changes to the way custom formats and quality profiles are built. Here's a basic overview of the biggest differences compared to standard Radarr/Sonarr configurations:
    </p>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <thead class="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Feature</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Description</th>
          </tr>
        </thead>
        <tbody class="text-neutral-700 dark:text-neutral-300">
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Reusable Regex Patterns</td>
            <td class="px-4 py-2">- Regex patterns are now separate from custom formats and referenced by name<br>- This allows reusing the same pattern in multiple places<br>- Changes to a pattern automatically apply everywhere it's used<br>- At compile time, pattern names are resolved to their actual regex expressions for the *arr apps</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Conditional Format Import</td>
            <td class="px-4 py-2">- Custom formats with a score of 0 are not included in profiles (unless specifically added in selective mode)<br>- This helps keep your profiles cleaner by excluding unused formats</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Enhanced Sorting</td>
            <td class="px-4 py-2">- Additional methods for sorting, scoring, and searching files</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Language Handling</td>
            <td class="px-4 py-2">- Complete overhaul of language management<br>- All profiles set language to "Any" and use language custom formats based on preferences<br>- Options include:<br> • "Any" - No language filtering<br> • "Must Include" - Ensures releases contain at least your preferred language<br> • "Must Only Be" - Ensures releases contain ONLY your preferred language</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Documentation-Focused</td>
            <td class="px-4 py-2">- Tags and descriptions are stored in Profilarr but removed during compilation<br>- These elements are purely for documentation and organization</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Integrated Testing</td>
            <td class="px-4 py-2">- Regex patterns and custom formats include testing functionality<br>- Used in continuous integration to ensure changes don't break existing functionality<br>- Helps maintain compatibility as configurations evolve</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Single Definition</td>
            <td class="px-4 py-2">- Profiles and custom formats are defined once in Profilarr<br>- Automatically converted to appropriate Radarr/Sonarr syntax at compile time<br>- Eliminates need to maintain separate definitions unless different logic is required</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 id="git-gud" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Git Gud</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      Profilarr attempts to make Git accessible to all users. However, there are some aspects of it that can't be completely simplified or safeguarded against. Understanding these key concepts will help you avoid common pitfalls and get the most out of the system, even if you've never used Git before.
    </p>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <thead class="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Topic</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Guidance</th>
          </tr>
        </thead>
        <tbody class="text-neutral-700 dark:text-neutral-300">
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Commit Messages</td>
            <td class="px-4 py-2">- Write clear, descriptive commit messages that explain what you changed and why<br>- Good messages help you track your history and understand changes months later<br>- Examples: "Adjusted AV1 score to prioritize quality over filesize", "Added support for anime dual-audio formats"</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Avoiding File Deletion</td>
            <td class="px-4 py-2">- Deleting files should be a last resort, not a go-to solution<br>- When you delete a file that exists in the remote database, it will cause merge conflicts when that file receives updates<br>- Instead of deleting, consider:<br> • Disabling formats you don't want to import<br> • Renaming files to indicate they're not in use<br> • Using comments to note why you're not using certain configurations</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Commit Size</td>
            <td class="px-4 py-2">- Smaller commits that focus on specific changes are easier to manage<br>- They make conflict resolution simpler when conflicts occur<br>- Example: Commit changes to anime profiles separately from changes to movie profiles</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Reviewing Changes</td>
            <td class="px-4 py-2">- Always review what you're about to stage using the "View Changes" feature<br>- Make sure each change is intentional and correct<br>- This helps prevent accidental modifications from being committed</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Backups</td>
            <td class="px-4 py-2">- Before making significant changes, consider exporting your configurations<br>- This provides a fallback if something goes wrong<br>- Most issues can be resolved, but having a backup gives peace of mind</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Abandoned Changes</td>
            <td class="px-4 py-2">- If you have unstaged changes you no longer want, use the "Revert" option<br>- Don't leave unwanted changes hanging around - they'll complicate future operations</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="importing" class="mb-8">
    <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Importing</h2>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      Once you've setup your media configuration workflow you can setup external apps which Profilarr will attempt to sync with.
    </p>

    <h3 id="type--server" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Type / Server</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-6">
      There can sometimes be API changes that break Profilarr's import functionality, so version limits on the apps it can import to are enforced - these are often rare and are usually fixed quickly.
    </p>

    <h3 id="sync-settings" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">Sync Settings</h3>
    
    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <thead class="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Sync Method</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Description</th>
          </tr>
        </thead>
        <tbody class="text-neutral-700 dark:text-neutral-300">
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Manual</td>
            <td class="px-4 py-2">Go to the format/profile page and enter select mode (button in top right toolbar or Ctrl+A). Select specific files you want to import and where you want to import them. Gives you full control over what configurations are synced to which applications. Best for users who want to carefully manage what gets imported.</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">On Pull</td>
            <td class="px-4 py-2">Automatically syncs selected files whenever the database receives an update. When combined with Auto Pull, allows Profilarr to work completely autonomously.</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">On Schedule</td>
            <td class="px-4 py-2">Similar to On Pull, but runs on a schedule of your choosing. Set specific times/intervals for Profilarr to check for changes and import them. Useful for controlling when system resources are used for synchronization.</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Import as Unique</td>
            <td class="px-4 py-2">Works with any of the sync choices above. Appends a unique identifier to imported files. Allows you to use your Profilarr database alongside different tools/configs. Prevents name conflicts when using multiple configuration sources.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 id="external-app-setup" class="text-xl font-medium text-neutral-900 dark:text-white mb-4">External App Setup</h3>
    
    <p class="text-neutral-700 dark:text-neutral-300 mb-4">
      In future updates (hopefully soon), Profilarr will handle a quick setup sync (changing media management, quality slider settings, etc), but for now you need to change these things manually.
    </p>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <thead class="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Setting</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Recommendation</th>
            <th class="px-4 py-2 text-left text-neutral-900 dark:text-white font-medium">Explanation</th>
          </tr>
        </thead>
        <tbody class="text-neutral-700 dark:text-neutral-300">
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Propers and Repacks</td>
            <td class="px-4 py-2">Set to "Do Not Prefer"</td>
            <td class="px-4 py-2">Other options will override custom formats and make Radarr/Sonarr grab things we don't want</td>
          </tr>
          <tr class="border-t border-neutral-200 dark:border-neutral-700">
            <td class="px-4 py-2 font-medium">Quality Sliders</td>
            <td class="px-4 py-2">Set min/max for everything</td>
            <td class="px-4 py-2">Custom formats will do 99% of the ranking and using any other settings just gets in the way usually</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>