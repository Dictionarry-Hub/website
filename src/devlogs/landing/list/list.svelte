<script>
  import Table from '@ui/table.svelte';
  import { User, Calendar } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  export let entries = [];
  
  let isMobile = false;
  
  onMount(() => {
    isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth < 768;
    });
  });
  
  const desktopHeaders = [
    {
      key: 'title',
      label: 'Title',
      type: 'string',
      link: 'path'
    },
    {
      key: 'frontmatter.author',
      label: 'Author',
      type: 'string',
      render: (row) => {
        const author = row.frontmatter?.author || 'Unknown';
        return `<div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>${author}</span>
        </div>`;
      }
    },
    {
      key: 'frontmatter.created',
      label: 'Date',
      type: 'date',
      render: (row) => {
        const date = row.frontmatter?.created;
        if (!date) return '<span class="text-neutral-500 dark:text-neutral-400">No date</span>';
        const formatted = new Date(date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        return `<div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <time datetime="${date}">${formatted}</time>
        </div>`;
      }
    }
  ];
  
  const mobileHeaders = [
    {
      key: 'title',
      label: 'Entry',
      type: 'string',
      render: (row) => {
        const author = row.frontmatter?.author || 'Unknown';
        const date = row.frontmatter?.created;
        const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        }) : 'No date';
        
        return `<a href="${row.path}" class="block">
          <div class="font-medium text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-1">
            ${row.title}
          </div>
          <div class="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>${author}</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time datetime="${date}">${formattedDate}</time>
            </div>
          </div>
        </a>`;
      }
    }
  ];
  
  $: headers = isMobile ? mobileHeaders : desktopHeaders;
</script>

<Table 
  {headers}
  data={entries}
  defaultSort="frontmatter.created"
  defaultDirection="desc"
/>