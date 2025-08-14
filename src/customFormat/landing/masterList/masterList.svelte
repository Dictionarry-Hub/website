<script>
  import { contentDatabase } from "@db";
  import Group from "./group.svelte";
  import { Volume2, Monitor, Users, Tv, Code, HardDrive, Tag, Square, Layers, Folder } from "lucide-svelte";

  // Get all custom formats from the database
  $: allFormats = contentDatabase.entries
    .filter((entry) => entry.type === "custom-format")
    .map((entry) => ({
      name: entry.data?.name || entry.title,
      slug: entry.slug,
      tags: entry.data?.tags || [],
      description: entry.data?.description || "",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Tag to group mapping (same as in scoring page)
  const tagToGroupMapping = {
    Audio: ["Audio", "Dolby"],
    "HDR / Color Grade": ["HDR", "Color Grade", "Colour Grade"],
    "Release Groups": ["Release Groups", "UnWanted", "Release Group"],
    "Streaming Services": ["Streaming Service"],
    Codecs: ["Codec", "Bleeding Edge"],
    Storage: ["Storage"],
    "Release Group Tiers": ["Release Group Tier", "GPPi"],
    Resolution: ["Resolution", "Ultra High Definition", "4K", "1080p", "720p", "SD"],
    Source: ["Source"],
    "Indexer Flags": ["Flag"],
    Edition: ["Edition"],
    Enhancements: ["Enhancement", "Enhanced"],
    Languages: ["Language", "Languages", "Audio Language", "Subtitle Language"],
  };

  // Negative matches - exclude these tags from matching certain groups
  const tagExclusions = {
    "Release Groups": ["Release Group Tier"],
  };

  // Group formats by their tags/categories
  $: groupedFormats = allFormats.reduce((groups, format) => {
    let groupName = "Uncategorized";
    let belongsToGroup = false;

    // Check each group mapping
    for (const [group, groupTags] of Object.entries(tagToGroupMapping)) {
      const hasMatchingTag = format.tags?.some((tag) => groupTags.some((groupTag) => tag.includes(groupTag)));

      // Check if we should exclude based on negative matches
      const hasExcludedTag = tagExclusions[group]?.some((excludeTag) =>
        format.tags?.some((tag) => tag.includes(excludeTag)),
      );

      if (hasMatchingTag && !hasExcludedTag) {
        groupName = group;
        belongsToGroup = true;
        break;
      }
    }

    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(format);
    return groups;
  }, {});

  // Define group order and icons
  const groupOrder = [
    "Audio",
    "HDR / Color Grade",
    "Release Groups",
    "Release Group Tiers",
    "Streaming Services",
    "Codecs",
    "Storage",
    "Resolution",
    "Source",
    "Indexer Flags",
    "Edition",
    "Enhancements",
    "Languages",
    "Uncategorized",
  ];

  const groupIcons = {
    Audio: Volume2,
    "HDR / Color Grade": Monitor,
    "Release Groups": Users,
    "Release Group Tiers": Tag,
    "Streaming Services": Tv,
    Codecs: Code,
    Storage: HardDrive,
    Resolution: Square,
    Source: Layers,
    "Indexer Flags": Tag,
    Edition: Tag,
    Enhancements: Tag,
    Languages: Tag,
    Uncategorized: Folder,
  };

  // Sort groups according to predefined order
  $: sortedGroups = groupOrder
    .filter((groupName) => groupedFormats[groupName]?.length > 0)
    .map((groupName) => ({
      name: groupName,
      formats: groupedFormats[groupName],
      icon: groupIcons[groupName] || Tag,
    }));
</script>

<div class="mt-6">
  {#if sortedGroups.length === 0}
    <div
      class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8 text-center"
    >
      <p class="text-neutral-500 dark:text-neutral-400">No custom formats found</p>
    </div>
  {:else}
    {#each sortedGroups as group}
      <Group groupName={group.name} formats={group.formats} icon={group.icon} />
    {/each}
  {/if}
</div>
