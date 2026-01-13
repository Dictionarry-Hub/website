<script>
  import { navigationItems } from '@shared/stores/navigation';
  import HeaderNavItem from './headerNavItem.svelte';
  import HoverInfo from '@ui/hoverInfo.svelte';
    import { onMount, onDestroy } from 'svelte';

  let activeSection = '';

  function sanitizeForAnchor(text) {
    return text
      .replace(/[^\w\s-]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  // Flatten navigation items into a list with level info
  function flattenItems(items, level = 0) {
    let result = [];
    items.forEach((item, index) => {
      if (typeof item === 'string') {
        result.push({ title: item, id: sanitizeForAnchor(item), level });
      } else if (item.title) {
        result.push({ title: item.title, id: sanitizeForAnchor(item.title), level });
        if (item.children) {
          result = result.concat(flattenItems(item.children, level + 1));
        }
      }
    });
    return result;
  }

  $: flatItems = flattenItems($navigationItems.items);

  // Calculate Y positions with extra space for multi-level jumps
  const baseHeight = 32;
  const extraSpacing = 12;

  function calculatePositions(items) {
    const positions = [0];
    for (let i = 1; i < items.length; i++) {
      const levelDiff = Math.abs(items[i].level - items[i - 1].level);
      const extra = levelDiff > 1 ? extraSpacing : 0;
      positions.push(positions[i - 1] + baseHeight + extra);
    }
    return positions;
  }

  $: itemPositions = calculatePositions(flatItems);
  $: totalHeight = (itemPositions[flatItems.length - 1] ?? 0) + baseHeight;

  // Find active index
  $: activeIndex = flatItems.findIndex(item => item.id === activeSection);

  function updateActiveSection() {
    const hash = window.location.hash;
    if (hash.includes('section=')) {
      const sectionMatch = hash.match(/section=([^&]+)/);
      if (sectionMatch) {
        activeSection = sectionMatch[1];
        return;
      }
    }

    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const sections = document.querySelectorAll('[id]');
    let current = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const mainRect = mainContent.getBoundingClientRect();
      if (rect.top <= mainRect.top + 120) {
        current = section.id;
      }
    });

    activeSection = current;
  }

  onMount(() => {
    updateActiveSection();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.addEventListener('scroll', updateActiveSection);
    }
    window.addEventListener('hashchange', updateActiveSection);
  });

  onDestroy(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.removeEventListener('scroll', updateActiveSection);
    }
    window.removeEventListener('hashchange', updateActiveSection);
  });

  // Get line segment type for each item
  function getSegmentType(index) {
    if (index >= flatItems.length) return null;

    const current = flatItems[index];
    const next = flatItems[index + 1];
    const prev = flatItems[index - 1];

    const currentLevel = current.level;
    const nextLevel = next?.level ?? currentLevel;
    const prevLevel = prev?.level ?? currentLevel;

    return {
      fromPrev: prevLevel < currentLevel ? 'diagonal-right' : prevLevel > currentLevel ? 'diagonal-left' : 'straight',
      toNext: nextLevel > currentLevel ? 'diagonal-right' : nextLevel < currentLevel ? 'diagonal-left' : 'straight'
    };
  }
</script>

{#if $navigationItems.items.length > 0}
<aside class="xl:sticky xl:top-16 w-full xl:w-80 h-full xl:h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900 xl:border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto">
  <div class="p-6">
    <div class="mb-1">
      <div class="flex items-center gap-2">
        <span class="text-sm">📌</span>
        <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">
          On This Page
        </span>
      </div>
    </div>
    <div class="relative">
      <!-- Zigzag line SVG - one continuous path -->
      <svg class="absolute left-0 top-0 h-full w-12 pointer-events-none overflow-visible">
        {#each flatItems as item, index}
          {@const padding = 5}
          {@const levelIndent = 12}
          {@const x = 3 + item.level * levelIndent}
          {@const nextItem = flatItems[index + 1]}
          {@const nextX = nextItem ? 3 + nextItem.level * levelIndent : x}
          {@const levelDiff = Math.abs(nextX - x)}
          {@const diagonalHeight = levelDiff}
          {@const yStart = itemPositions[index]}
          {@const topY = yStart + padding}
          {@const bottomY = yStart + baseHeight - padding}
          {@const nextYStart = itemPositions[index + 1] ?? yStart + baseHeight}
          {@const nextTopY = nextYStart + padding}
          {@const isActive = index === activeIndex}
          {@const isNextActive = index + 1 === activeIndex}

          <!-- Vertical line within this item (top to bottom) -->
          <line
            x1={x}
            y1={topY}
            x2={x}
            y2={bottomY}
            stroke-width="2"
            class="{isActive ? 'stroke-blue-500' : 'stroke-neutral-300 dark:stroke-neutral-700'}" stroke-opacity="0.5"
          />

          <!-- Connecting line to next item -->
          {#if index < flatItems.length - 1}
            {#if x === nextX}
              <!-- Same level: straight vertical line -->
              <line
                x1={x}
                y1={bottomY}
                x2={nextX}
                y2={nextTopY}
                stroke-width="2"
                class="stroke-neutral-300 dark:stroke-neutral-700" stroke-opacity="0.5"
              />
            {:else}
              <!-- Level change -->
              {@const gap = nextTopY - bottomY}
              {#if diagonalHeight <= gap}
                <!-- Single level: vertical then diagonal (45°) then vertical -->
                {@const midY = bottomY + (gap - diagonalHeight) / 2}
                {@const diagStartY = midY}
                {@const diagEndY = midY + diagonalHeight}
                {@const diagMidX = (x + nextX) / 2}
                {@const diagMidY = (diagStartY + diagEndY) / 2}
                <line
                  x1={x}
                  y1={bottomY}
                  x2={x}
                  y2={diagStartY}
                  stroke-width="2"
                  class="stroke-neutral-300 dark:stroke-neutral-700" stroke-opacity="0.5"
                />
                <!-- First half of diagonal (from current item) -->
                <line
                  x1={x}
                  y1={diagStartY}
                  x2={diagMidX}
                  y2={diagMidY}
                  stroke-width="2"
                  class="{isActive ? 'stroke-blue-500' : 'stroke-neutral-300 dark:stroke-neutral-700'}" stroke-opacity="0.5"
                />
                <!-- Second half of diagonal (to next item) -->
                <line
                  x1={diagMidX}
                  y1={diagMidY}
                  x2={nextX}
                  y2={diagEndY}
                  stroke-width="2"
                  class="{isNextActive ? 'stroke-blue-500' : 'stroke-neutral-300 dark:stroke-neutral-700'}" stroke-opacity="0.5"
                />
                <line
                  x1={nextX}
                  y1={diagEndY}
                  x2={nextX}
                  y2={nextTopY}
                  stroke-width="2"
                  class="stroke-neutral-300 dark:stroke-neutral-700" stroke-opacity="0.5"
                />
              {:else}
                <!-- Multi-level jump: direct diagonal split in half -->
                {@const diagMidX = (x + nextX) / 2}
                {@const diagMidY = (bottomY + nextTopY) / 2}
                <line
                  x1={x}
                  y1={bottomY}
                  x2={diagMidX}
                  y2={diagMidY}
                  stroke-width="2"
                  class="{isActive ? 'stroke-blue-500' : 'stroke-neutral-300 dark:stroke-neutral-700'}" stroke-opacity="0.5"
                />
                <line
                  x1={diagMidX}
                  y1={diagMidY}
                  x2={nextX}
                  y2={nextTopY}
                  stroke-width="2"
                  class="{isNextActive ? 'stroke-blue-500' : 'stroke-neutral-300 dark:stroke-neutral-700'}" stroke-opacity="0.5"
                />
              {/if}
            {/if}
          {/if}
        {/each}
      </svg>

      <!-- Navigation items -->
      <div class="relative" style="height: {totalHeight}px;">
        {#each flatItems as item, index}
          {@const isActive = item.id === activeSection}
          {@const yPos = itemPositions[index]}
          <div
            class="absolute flex items-center w-full"
            style="padding-left: {14 + item.level * 12}px; height: {baseHeight}px; top: {yPos}px;"
          >
            <HeaderNavItem
              href="?section={item.id}"
              label={item.title}
              isActive={isActive}
              level={item.level}
            />
          </div>
        {/each}
      </div>
    </div>
    <HoverInfo />
  </div>
</aside>
{/if}