<script>
  import Seo from "@shared/ui/seo.svelte";
  import { router } from "tinro";
  import { getSeoData } from "@shared/constants/seoData";
  import { setNavigationItems, clearNavigation } from "@shared/stores/navigation";
  import { onMount, onDestroy } from "svelte";
  import PageNavigation from "@shared/ui/pageNavigation.svelte";
  import CodeBlock from "@shared/ui/codeBlock.svelte";
  import DockerIcon from "@shared/icons/dockerIcon.svelte";
  import { Terminal } from "lucide-svelte";

  const seo = getSeoData($router.path);

  onMount(() => {
    setNavigationItems(
      [
        "Overview",
        { title: "Setup", children: ["Step 1: Generate PAT", "Step 2: Create .env File", "Step 3: Update Docker"] },
        { title: "Development Workflow", children: ["Effective Commits", "General Tips"] },
      ],
      "/profilarr-setup/development",
    );
  });

  onDestroy(() => {
    clearNavigation();
  });

  const envCode = `GIT_USER_NAME=your_github_username
GIT_USER_EMAIL=your_email_associated_with_github
PROFILARR_PAT=your_github_pat_from_step_1`;

  const dockerComposeCode = `services:
    profilarr:
      image: santiagosayshey/profilarr:latest # or :beta
      container_name: profilarr
      ports:
        - "6868:6868"
      volumes:
        - /path/to/your/data:/config
      environment:
        - PUID=1000 # Set to your user ID
        - PGID=1000 # Set to your group ID
        - UMASK=022 # Optional, defaults to 022
        - TZ=UTC # Set your timezone
      env_file:
        - .env # This line securely loads your credentials
      restart: unless-stopped`;

  const dockerCliCode = `docker run -d \\
    --name=profilarr \\
    -p 6868:6868 \\
    -v /path/to/your/data:/config \\
    -e PUID=1000 \\
    -e PGID=1000 \\
    -e UMASK=022 \\
    -e TZ=UTC \\
    --env-file .env \\
    --restart unless-stopped \\
    santiagosayshey/profilarr:latest`;

  const envItems = [
    {
      title: ".env",
      code: envCode,
      language: "bash",
    },
  ];

  const dockerItems = [
    {
      title: "Docker Compose",
      code: dockerComposeCode,
      language: "yaml",
      icon: DockerIcon,
    },
    {
      title: "Docker CLI",
      code: dockerCliCode,
      language: "bash",
      icon: Terminal,
    },
  ];
</script>

<Seo title={seo.title} description={seo.description} image={seo.image} url={$router.path} />

<div>
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Development</h1>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">Overview</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    A core concept in Profilarr is that database updates are powered by the very same process users follow for <a
      href="/profilarr-setup/customizations"
      class="text-blue-600 dark:text-blue-400 hover:underline">customization</a
    >. While end users make local changes that remain private to their setup, developers follow an identical workflow to
    create the updates everyone receives.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    The key difference is that developers publish, or push, their changes to GitHub. This action transforms their local
    customizations into official updates for the entire community. In essence, when a developer commits and pushes their
    changes, those modifications appear as <a
      href="/profilarr-setup/updates"
      class="text-blue-600 dark:text-blue-400 hover:underline">"Incoming Changes"</a
    > for any user linked to that database.
  </p>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="setup">Setup</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    To contribute changes to a Profilarr configuration database, you must authorize your local instance to push commits
    to its GitHub repository. This guide walks you through the required setup using a GitHub Personal Access Token (PAT)
    and Docker.
  </p>

  <h3 class="font-semibold text-neutral-900 dark:text-white mt-6" id="step-1-generate-pat">
    Step 1: Generate a GitHub Personal Access Token (PAT)
  </h3>
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    A PAT is a secure key that grants Profilarr permission to interact with your GitHub repository on your behalf.
  </p>

  <ol class="list-decimal list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>Sign in to your GitHub account.</li>
    <li>
      Navigate to <strong>Settings</strong> → <strong>Developer settings</strong> →
      <strong>Personal access tokens</strong>
      → <strong>Fine-grained tokens</strong>.
    </li>
    <li>Click <strong>Generate new token</strong>.</li>
    <li>
      Configure the token with the following settings:
      <ul class="list-disc list-inside ml-6 mt-2 space-y-1">
        <li><strong>Token name:</strong> Give it a descriptive name (e.g., "Profilarr Contributions").</li>
        <li>
          <strong>Repository access:</strong> Select <strong>Only select repositories</strong> and choose your configuration
          database repository.
        </li>
        <li>
          <strong>Permissions:</strong> In the
          <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">Repository permissions</code>
          section, find <strong>Contents</strong> and set its value to <strong>Read and write</strong>.
        </li>
      </ul>
    </li>
    <li>Click <strong>Generate token</strong>.</li>
    <li>
      Copy the generated token immediately and store it somewhere safe. <strong
        >For security reasons, you will not be able to see this token again.</strong
      >
    </li>
  </ol>

  <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
    <h3 class="font-semibold text-neutral-900 dark:text-white" id="step-2-create-env-file">
      Step 2: Create a .env Environment File
    </h3>
  </div>
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Next, you need to provide these credentials to your Profilarr container. The most secure way is to create a file
    named <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">.env</code> in the same directory
    where you will run your Docker commands.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Create the <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">.env</code> file with the following
    content, substituting your own details:
  </p>

  <div class="mt-4">
    <CodeBlock items={envItems} />
  </div>

  <ul class="list-disc list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>
      <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">GIT_USER_NAME</code>: Your GitHub
      username. This will be the author of the commits.
    </li>
    <li>
      <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">GIT_USER_EMAIL</code>: The email
      address associated with your GitHub account.
    </li>
    <li>
      <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">PROFILARR_PAT</code>: The Personal
      Access Token you generated in Step 1.
    </li>
  </ul>

  <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
    <h3 class="font-semibold text-neutral-900 dark:text-white" id="step-3-update-docker">
      Step 3: Update Your Docker Configuration
    </h3>
  </div>
  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Finally, modify your Docker setup to load the credentials from the <code
      class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">.env</code
    > file.
  </p>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Add the <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">env_file</code> directive to your
    Docker configuration:
  </p>

  <div class="mt-4">
    <CodeBlock items={dockerItems} />
  </div>

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Once you restart your container with these settings, Profilarr will be authenticated and ready to push your
    committed changes to the linked GitHub repository.
  </p>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-12 mb-4" id="development-workflow">
    Development Workflow
  </h2>

  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    To contribute to a database, you'll use the same editing and committing process detailed in the <a
      href="/profilarr-setup/customizations"
      class="text-blue-600 dark:text-blue-400 hover:underline">Customizations</a
    > section. This guide focuses on the best practices to follow when creating those contributions.
  </p>

  <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
    <p class="text-sm text-green-900 dark:text-green-100">
      <strong>⚠️ Editing Best Practices</strong>
    </p>
    <p class="text-sm text-green-900 dark:text-green-100 mt-2">
      Always edit database files directly within the Profilarr UI to ensure they are properly validated. Editing files
      externally bypasses crucial safeguards and can lead to corrupted data or sync errors. If you absolutely must make
      direct edits, it is critical to test your changes in a local instance of Profilarr before pushing them to the
      repository.
    </p>
  </div>

  <h3 class="font-semibold text-neutral-900 dark:text-white mt-8" id="effective-commits">
    Writing Effective Commit Messages
  </h3>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    Clear and consistent commit messages are essential for maintaining a readable project history. They allow other
    users to quickly understand the purpose of each update. Profilarr enforces the following commit message format:
  </p>

  <div class="mt-4">
    <CodeBlock
      items={[
        {
          title: "Commit Format",
          code: "type(component): A short description of the change",
          language: "bash",
        },
      ]}
    />
  </div>

  <p class="text-neutral-700 dark:text-neutral-300 mt-4">
    While Profilarr validates the structure, your responsibility is to choose the correct <code
      class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">type</code
    >
    and <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">component</code> from the options below.
  </p>

  <h4 class="font-semibold text-neutral-800 dark:text-neutral-200 mt-6">Change Types</h4>

  <div class="mt-4 overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <th class="text-left py-2 px-4 text-neutral-900 dark:text-white">Type</th>
          <th class="text-left py-2 px-4 text-neutral-900 dark:text-white">Purpose</th>
          <th class="text-left py-2 px-4 text-neutral-900 dark:text-white">Example</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <td class="py-2 px-4"
            ><code
              class="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >create</code
            ></td
          >
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300">Building entirely new components or systems</td>
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300"
            ><code
              class="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >create(profile): 2160p Remux quality profile</code
            ></td
          >
        </tr>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <td class="py-2 px-4"
            ><code
              class="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >add</code
            ></td
          >
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300">Adding new entries to existing systems</td>
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300"
            ><code
              class="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >add(format): de[42] as Tier 4 GPPi group</code
            ></td
          >
        </tr>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <td class="py-2 px-4"
            ><code
              class="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >tweak</code
            ></td
          >
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300">Fine-tuning existing components</td>
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300"
            ><code
              class="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >tweak(format): Better h265 parsing for 1080p WEB</code
            ></td
          >
        </tr>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <td class="py-2 px-4"
            ><code
              class="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >fix</code
            ></td
          >
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300">Corrections and bug fixes</td>
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300"
            ><code
              class="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >fix(regex): Required negation for remux pattern</code
            ></td
          >
        </tr>
      </tbody>
    </table>
  </div>

  <h4 class="font-semibold text-neutral-800 dark:text-neutral-200 mt-6">Components</h4>

  <div class="mt-4 overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <th class="text-left py-2 px-4 text-neutral-900 dark:text-white">Component</th>
          <th class="text-left py-2 px-4 text-neutral-900 dark:text-white">Purpose & Includes</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <td class="py-2 px-4"
            ><code
              class="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >format</code
            ></td
          >
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300"
            >Changes to Custom Formats, scores, and release groups.</td
          >
        </tr>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <td class="py-2 px-4"
            ><code
              class="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >regex</code
            ></td
          >
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300"
            >Changes to regex patterns and detection logic.</td
          >
        </tr>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <td class="py-2 px-4"
            ><code
              class="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1 py-0.5 rounded"
              >profile</code
            ></td
          >
          <td class="py-2 px-4 text-neutral-700 dark:text-neutral-300"
            >Changes to Quality Profiles, settings, and defaults.</td
          >
        </tr>
      </tbody>
    </table>
  </div>

  <h3 class="font-semibold text-neutral-900 dark:text-white mt-8" id="general-tips">General Tips for Contributing</h3>

  <ul class="list-disc list-inside space-y-2 mt-4 text-neutral-700 dark:text-neutral-300">
    <li>
      <strong>Make Small, Atomic Commits:</strong> Each commit should represent a single logical change. For example, if
      you are adding a new release group and fixing a regex pattern, create two separate commits. This makes the history
      easier to read and allows for changes to be reverted cleanly if needed.
    </li>
    <li>
      <strong>Write Clear Descriptions:</strong> The description part of your commit message is vital. Avoid vague
      messages like "updated formats." Instead, be specific:
      <code class="text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded"
        >tweak(format): Increase HDR10+ score to prioritize over standard HDR</code
      >.
    </li>
    <li>
      <strong>Test Your Changes Locally:</strong> Before you push your commits, always perform a sync with a local Radarr
      or Sonarr instance. Verify that your changes have the intended effect and do not cause unexpected behavior.
    </li>
  </ul>

  <PageNavigation
    previous={{
      path: "/profilarr-setup/customizations",
      title: "Customizations",
      description: "Preserve your local changes",
    }}
    next={null}
  />
</div>
