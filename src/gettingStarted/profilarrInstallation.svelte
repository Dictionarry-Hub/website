<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { router } from 'tinro';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import SetupWarning from './components/setupWarning.svelte';
  import CodeBlock from '@shared/ui/codeBlock.svelte';
  import DockerIcon from '@shared/icons/dockerIcon.svelte';
  import { Terminal } from 'lucide-svelte';

  const pages = [
    {
      path: '/profilarr-setup/installation',
      title: 'Installation'
    },
    {
      path: '/profilarr-setup/101',
      title: 'Profilarr 101'
    }
  ];
  
  onMount(() => {
    setNavigationItems([
      'Overview',
      'Docker',
      'Unraid',
      'CasaOS'
    ], '#/profilarr-setup/installation');
  });
  
  onDestroy(() => {
    clearNavigation();
  });

  const dockerComposeCode = `services:
  profilarr:
    image: santiagosayshey/profilarr:latest # or :beta
    container_name: profilarr
    ports:
      - "6868:6868"
    volumes:
      - /path/to/your/data:/config
    environment:
      - TZ=UTC # Set your timezone
    restart: unless-stopped`;

  const dockerCliCode = `docker run -d \\
  --name=profilarr \\
  -p 6868:6868 \\
  -v /path/to/your/data:/config \\
  -e TZ=UTC \\
  --restart unless-stopped \\
  santiagosayshey/profilarr:latest  # or :beta`;

  const codeItems = [
    {
      title: 'Docker Compose',
      code: dockerComposeCode,
      language: 'yaml',
      icon: DockerIcon
    },
    {
      title: 'Docker CLI',
      code: dockerCliCode,
      language: 'bash',
      icon: Terminal
    }
  ];
</script>

<div>
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Installation</h1>
  
  <SetupWarning />

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">Overview</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Profilarr is currently only available through Docker, with native Windows support planned for the future.
  </p>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="docker">Docker</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    To get started with Profilarr, you can use either Docker Compose or the Docker CLI. Choose the method that best fits your setup:
  </p>
  
  <div class="mt-4">
    <CodeBlock items={codeItems} />
  </div>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="unraid">Unraid</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    The easiest way to install Profilarr on Unraid is through the <strong>Community Applications</strong> plugin. Simply search for "Profilarr" and install the container.
  </p>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="casaos">CasaOS</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Profilarr can be installed in CasaOS as a custom app. A detailed guide is available in our wiki, thanks to a contribution from <a href="https://github.com/lawgics" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">lawgics</a>.
  </p>
  <p class="text-neutral-700 dark:text-neutral-300 mt-2">
    <a href="#/wiki/profilarr-casaos" class="text-blue-600 dark:text-blue-400 hover:underline">Click here to view the CasaOS installation guide.</a>
  </p>

  <PageNavigation next={{path: '/profilarr-setup/101', title: 'Profilarr 101', description: 'Learn the basics'}} />
</div>