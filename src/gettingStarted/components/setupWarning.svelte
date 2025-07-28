<script>
  import { AlertTriangle } from 'lucide-svelte';
</script>

<div class="flex items-start p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60">
  <AlertTriangle class="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
  <div class="ml-2">
    <h3 class="text-sm font-medium text-neutral-800 dark:text-neutral-200">Profilarr is Beta Software</h3>
    <p class="text-xs text-neutral-700 dark:text-neutral-300 mt-1">
      Profilarr is currently in beta, meaning you may encounter unexpected issues. Your feedback and bug reports are highly valued and help us improve. Please report any issues or share your feedback on
      <a href="https://github.com/Dictionarry-Hub/profilarr/issues" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
        GitHub
      </a>.
    </p>
  </div>
</div>
