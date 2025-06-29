<script>
  import ThemeToggle from '@ui/themeToggle.svelte';
  import Dropdown from '@ui/dropdown.svelte';
  import DropdownRow from '@ui/dropdownRow.svelte';
  import { siGithub, siDiscord } from 'simple-icons';
  import { MoreHorizontal } from 'lucide-svelte';
  import { clickOutside } from '@shared/utils/clickOutside.js';
  
  let isDropdownOpen = false;
</script>


<!-- Desktop view -->
<div class="hidden lg:flex items-center space-x-2">
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

<!-- Mobile view -->
<div 
  class="lg:hidden relative"
  role="button"
  tabindex="0"
  on:mouseenter={() => isDropdownOpen = true}
  on:mouseleave={() => isDropdownOpen = false}
  use:clickOutside={() => isDropdownOpen = false}
>
  <button 
    class="social-icon"
    on:click={() => isDropdownOpen = !isDropdownOpen}
  >
    <span class="sr-only">Menu</span>
    <MoreHorizontal class="w-5 h-5 transition-all duration-200 {isDropdownOpen ? 'scale-110' : ''}" />
  </button>
  
  <Dropdown bind:isOpen={isDropdownOpen} position="right">
    <!-- Appearance row -->
    <DropdownRow>
      <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Appearance</span>
      <ThemeToggle />
    </DropdownRow>
    
    <!-- Links row -->
    <DropdownRow showBorder={false}>
      <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Links</span>
      <div class="flex items-center space-x-2">
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
    </DropdownRow>
  </Dropdown>
</div>