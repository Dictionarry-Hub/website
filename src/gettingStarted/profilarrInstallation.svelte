<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { router } from 'tinro';
  import PageNavigation from '@shared/ui/pageNavigation.svelte';
  import SetupWarning from './components/setupWarning.svelte';
  import { Copy, Check } from 'lucide-svelte';

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
      'Docker Compose',
      'Docker CLI'
    ], '#/profilarr-setup/installation');
  });
  
  onDestroy(() => {
    clearNavigation();
  });

  const dockerComposeCode = [
    { text: 'services', type: 'key' },
    { text: ':', type: 'punctuation' },
    { text: '\n  ', type: 'plain' },
    { text: 'profilarr', type: 'key' },
    { text: ':', type: 'punctuation' },
    { text: '\n    ', type: 'plain' },
    { text: 'image', type: 'key' },
    { text: ': ', type: 'punctuation' },
    { text: 'santiagosayshey/profilarr:latest', type: 'string' },
    { text: ' # or :beta', type: 'comment' },
    { text: '\n    ', type: 'plain' },
    { text: 'container_name', type: 'key' },
    { text: ': ', type: 'punctuation' },
    { text: 'profilarr', type: 'string' },
    { text: '\n    ', type: 'plain' },
    { text: 'ports', type: 'key' },
    { text: ':', type: 'punctuation' },
    { text: '\n      - ', type: 'plain' },
    { text: '6868:6868', type: 'string' },
    { text: '\n    ', type: 'plain' },
    { text: 'volumes', type: 'key' },
    { text: ':', type: 'punctuation' },
    { text: '\n      - ', type: 'plain' },
    { text: '/path/to/your/data:/config', type: 'string' },
    { text: '\n    ', type: 'plain' },
    { text: 'environment', type: 'key' },
    { text: ':', type: 'punctuation' },
    { text: '\n      - ', type: 'plain' },
    { text: 'TZ=UTC', type: 'string' },
    { text: ' # Set your timezone', type: 'comment' },
    { text: '\n    ', type: 'plain' },
    { text: 'env_file', type: 'key' },
    { text: ':', type: 'punctuation' },
    { text: '\n      - ', type: 'plain' },
    { text: '.env', type: 'string' },
    { text: ' # Optional: Only needed if contributing to a database', type: 'comment' },
    { text: '\n    ', type: 'plain' },
    { text: 'restart', type: 'key' },
    { text: ': ', type: 'punctuation' },
    { text: 'unless-stopped', type: 'string' }
  ];

  const dockerCliCode = [
    { text: 'docker run', type: 'command' },
    { text: ' -d ', type: 'plain' },
    { text: '\\', type: 'punctuation' },
    { text: '\n  ', type: 'plain' },
    { text: '--name', type: 'flag' },
    { text: '=', type: 'punctuation' },
    { text: 'profilarr', type: 'string' },
    { text: ' ', type: 'plain' },
    { text: '\\', type: 'punctuation' },
    { text: '\n  ', type: 'plain' },
    { text: '-p', type: 'flag' },
    { text: ' ', type: 'plain' },
    { text: '6868:6868', type: 'string' },
    { text: ' ', type: 'plain' },
    { text: '\\', type: 'punctuation' },
    { text: '\n  ', type: 'plain' },
    { text: '-v', type: 'flag' },
    { text: ' ', type: 'plain' },
    { text: '/path/to/your/data:/config', type: 'string' },
    { text: ' ', type: 'plain' },
    { text: '\\', type: 'punctuation' },
    { text: '\n  ', type: 'plain' },
    { text: '-e', type: 'flag' },
    { text: ' ', type: 'plain' },
    { text: 'TZ=UTC', type: 'string' },
    { text: ' ', type: 'plain' },
    { text: '\\', type: 'punctuation' },
    { text: '\n  ', type: 'plain' },
    { text: '--env-file', type: 'flag' },
    { text: ' ', type: 'plain' },
    { text: '.env', type: 'string' },
    { text: ' ', type: 'plain' },
    { text: '\\', type: 'punctuation' },
    { text: ' # Optional: Only needed if contributing to a database', type: 'comment' },
    { text: '\n  ', type: 'plain' },
    { text: '--restart', type: 'flag' },
    { text: ' ', type: 'plain' },
    { text: 'unless-stopped', type: 'string' },
    { text: ' ', type: 'plain' },
    { text: '\\', type: 'punctuation' },
    { text: '\n  ', type: 'plain' },
    { text: 'santiagosayshey/profilarr:latest', type: 'string' },
    { text: '  # or :beta', type: 'comment' }
  ];

  let copiedCompose = false;
  let copiedCli = false;

  async function copyToClipboard(code, type) {
    try {
      const text = code.map(part => part.text).join('');
      await navigator.clipboard.writeText(text);
      if (type === 'compose') {
        copiedCompose = true;
        setTimeout(() => copiedCompose = false, 2000);
      } else {
        copiedCli = true;
        setTimeout(() => copiedCli = false, 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  function getTokenClass(type) {
    const classes = {
      key: 'text-blue-600 dark:text-blue-400',
      string: 'text-neutral-700 dark:text-neutral-300',
      comment: 'text-neutral-500 dark:text-neutral-500 italic',
      punctuation: 'text-neutral-600 dark:text-neutral-400',
      command: 'text-neutral-700 dark:text-neutral-300',
      flag: 'text-blue-600 dark:text-blue-400',
      plain: 'text-neutral-700 dark:text-neutral-300'
    };
    return classes[type] || classes.plain;
  }
</script>

<div class="p-6 max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Installation</h1>
  
  <SetupWarning />

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="overview">Overview</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Profilarr is currently only available through Docker, with native Windows support planned for the future.
  </p>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="docker-compose">Docker Compose</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    To get started with Docker Compose, create a <code class="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200 font-mono">docker-compose.yml</code> file with the following content:
  </p>
  <div class="relative mt-4">
    <div class="relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <span class="text-xs text-neutral-600 dark:text-neutral-500 font-medium">docker-compose.yml</span>
        <button
          on:click={() => copyToClipboard(dockerComposeCode, 'compose')}
          class="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200"
          aria-label="Copy code"
        >
          {#if copiedCompose}
            <Check class="w-4 h-4 text-green-500" />
          {:else}
            <Copy class="w-4 h-4" />
          {/if}
        </button>
      </div>
      <div class="p-4 overflow-x-auto bg-neutral-100 dark:bg-neutral-900">
        <pre class="text-sm leading-relaxed font-mono"><code>{#each dockerComposeCode as token}<span class={getTokenClass(token.type)}>{token.text}</span>{/each}</code></pre>
      </div>
    </div>
  </div>

  <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mt-8 mb-4" id="docker-cli">Docker CLI</h2>
  <p class="text-neutral-700 dark:text-neutral-300 mt-6">
    Alternatively, you can run Profilarr directly using the Docker CLI:
  </p>
  <div class="relative mt-4">
    <div class="relative bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <span class="text-xs text-neutral-600 dark:text-neutral-500 font-medium">Terminal</span>
        <button
          on:click={() => copyToClipboard(dockerCliCode, 'cli')}
          class="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200"
          aria-label="Copy code"
        >
          {#if copiedCli}
            <Check class="w-4 h-4 text-green-500" />
          {:else}
            <Copy class="w-4 h-4" />
          {/if}
        </button>
      </div>
      <div class="p-4 overflow-x-auto bg-neutral-100 dark:bg-neutral-900">
        <pre class="text-sm leading-relaxed font-mono"><code>{#each dockerCliCode as token}<span class={getTokenClass(token.type)}>{token.text}</span>{/each}</code></pre>
      </div>
    </div>
  </div>

  <PageNavigation next={{path: '/profilarr-setup/101', title: 'Profilarr 101', description: 'Learn the basics'}} />
</div>