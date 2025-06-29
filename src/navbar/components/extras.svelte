<script>
  import ThemeToggle from '@ui/ThemeToggle.svelte';
  import { siGithub, siDiscord } from 'simple-icons';
</script>


<div class="flex items-center space-x-2">
  <ThemeToggle />
  
  <a href="https://github.com/Dictionarry-Hub" class="social-icon" target="_blank" rel="noopener noreferrer">
    <span class="sr-only">GitHub</span>
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d={siGithub.path} />
    </svg>
  </a>
  
  <a href="https://discord.gg/XGdTJP5G8a" class="social-icon" target="_blank" rel="noopener noreferrer">
    <span class="sr-only">Discord</span>
    <svg class="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
      <path d={siDiscord.path} />
    </svg>
  </a>
</div>