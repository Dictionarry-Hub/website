<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { router } from 'tinro';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import SetupWarning from './components/setupWarning.svelte';
  import CodeBlock from '@shared/ui/codeBlock.svelte';

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
      'Installation'
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
      language: 'yaml'
    },
    {
      title: 'Docker CLI',
      code: dockerCliCode,
      language: 'bash'
    }
  ];
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Installation</h1>
  
  <SetupWarning />

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">Overview</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Profilarr is currently only available through Docker, with native Windows support planned for the future.
  </p>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="installation">Installation</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    To get started with Profilarr, you can use either Docker Compose or the Docker CLI. Choose the method that best fits your setup:
  </p>
  
  <div class="mt-4">
    <CodeBlock items={codeItems} />
  </div>

  <PageNavigation next={{path: '/profilarr-setup/101', title: 'Profilarr 101', description: 'Learn the basics'}} />
</div>