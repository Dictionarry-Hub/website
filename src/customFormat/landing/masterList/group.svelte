<script>
  import { slide } from "svelte/transition";
  import GroupHeader from "./groupHeader.svelte";

  export let groupName = "";
  export let formats = [];
  export let icon = null;

  let isExpanded = true;

  function toggleExpanded() {
    isExpanded = !isExpanded;
  }

  // Generate slug from format name if not provided
  function getFormatSlug(format) {
    return (
      format.slug ||
      format.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );
  }
</script>

<div class="mb-6">
  <GroupHeader {groupName} formatCount={formats.length} {icon} {isExpanded} onToggle={toggleExpanded} />

  {#if isExpanded}
    <div
      transition:slide={{ duration: 200 }}
      class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b border-neutral-200 dark:border-neutral-700">
            <th
              class="text-left px-4 py-3 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider w-1/5"
              >Format Name</th
            >
            <th
              class="text-left px-4 py-3 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider w-4/5"
              >Description</th
            >
          </tr>
        </thead>
        <tbody>
          {#each formats as format, index}
            <tr
              class="border-b border-neutral-100 dark:border-neutral-800 last:border-b-0 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors cursor-pointer group"
            >
              <td class="p-0">
                <a
                  href="/custom-format/{getFormatSlug(format)}"
                  class="block px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline transition-colors font-medium"
                >
                  {format.name}
                </a>
              </td>
              <td class="px-4 py-3">
                <a
                  href="/custom-format/{getFormatSlug(format)}"
                  class="block text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  {format.description || "No description available"}
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
