# UI

Notes on the component library, semantic token system, and theming.

## Component Library

All components are built from scratch. No headless libraries, no third-party UI kits. Full control
over markup, accessibility, and styling.

Components live in `src/lib/client/ui/` organized by purpose. Each component gets its own directory
(e.g., `button/Button.svelte`).

## Components

### Utils

#### `SEO`

`src/lib/client/ui/utils/SEO.svelte`

Renders `<title>`, Open Graph, Twitter Card, description, and theme-color meta tags via
`<svelte:head>`. Every page must use this component.

| Prop          | Type     | Required | Default                      |
| ------------- | -------- | -------- | ---------------------------- |
| `title`       | `string` | yes      |                              |
| `description` | `string` | no       | Site-wide default            |
| `image`       | `string` | no       | GitHub-hosted `icon.png` URL |

```svelte
<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
</script>

<SEO
	title="Installation"
	description="How to install Profilarr." />
```

### Button

#### `Button`

`src/lib/client/ui/button/Button.svelte`

Standard button component. Extends `HTMLButtonAttributes` so all native button props are supported.

| Prop      | Type                                      | Required | Default   |
| --------- | ----------------------------------------- | -------- | --------- |
| `variant` | `'accent' \| 'default' \| 'danger' \| 'outline' \| 'ghost'` | no | `'default'` |
| `size`    | `'sm' \| 'md' \| 'lg'`                    | no       | `'md'`    |
| `icon`    | `Component`                               | no       |           |
| `iconPosition` | `'left' \| 'right'`                 | no       | `'left'`  |
| `iconClass` | `string`                                | no       | `''`      |
| `type`    | `'button' \| 'submit' \| 'reset'`         | yes      |           |

Variant mapping:

- **accent**: accent background, white text
- **default**: surface background, border, standard text (default)
- **danger**: destructive action, red background
- **outline**: transparent with visible border, standard text
- **ghost**: no border, no background, subtle hover

```svelte
<script lang="ts">
	import Button from '$lib/client/ui/button/Button.svelte';
</script>

<Button type="button" variant="accent">Save</Button>
<Button type="button" variant="danger" size="sm">Delete</Button>
```

### Tooltip

#### `Tooltip`

`src/lib/client/ui/tooltip/Tooltip.svelte`

Wraps any element to show a tooltip on hover. Portals to `<body>` and clamps to the viewport.

| Prop       | Type                                    | Required | Default    |
| ---------- | --------------------------------------- | -------- | ---------- |
| `text`     | `string`                                | no       | `''`       |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | no     | `'bottom'` |
| `align`    | `'left' \| 'middle' \| 'right'`         | no       | `'middle'` |

```svelte
<script lang="ts">
	import Tooltip from '$lib/client/ui/tooltip/Tooltip.svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
</script>

<Tooltip text="Save changes" position="top">
	<Button type="button">Save</Button>
</Tooltip>
```

## Semantic Tokens

All tokens use the `--theme-*` prefix. Components never use raw color values. Tailwind utilities are
available via the `@theme inline` bridge in `layout.css` (e.g., `bg-bg`, `text-text-soft`,
`border-border`, `rounded-control`).

### Surface

| Token                          | Role                   |
| ------------------------------ | ---------------------- |
| `--theme-bg`                   | Page background        |
| `--theme-surface`              | Card / panel fill      |
| `--theme-surface-muted`        | Subdued surface        |
| `--theme-surface-hover`        | Surface hover state    |
| `--theme-surface-hover-muted`  | Subdued hover state    |

### Text

| Token                | Role                   |
| -------------------- | ---------------------- |
| `--theme-text`       | Primary body text      |
| `--theme-text-soft`  | Secondary text         |
| `--theme-text-muted` | Tertiary / placeholder |
| `--theme-text-subtle`| Disabled / decorative  |

### Border

| Token                   | Role            |
| ----------------------- | --------------- |
| `--theme-border`        | Default borders |
| `--theme-border-muted`  | Soft dividers   |
| `--theme-border-subtle` | Faint dividers  |

### Accent

| Token                        | Role               |
| ---------------------------- | ------------------ |
| `--theme-accent-solid`       | Primary action     |
| `--theme-accent-solid-hover` | Primary hover      |
| `--theme-on-accent`          | Text on accent     |
| `--theme-danger-solid`       | Destructive action |
| `--theme-danger-solid-hover` | Destructive hover  |
| `--theme-on-danger`          | Text on danger     |

### Status

Each status (success, warning, danger, info) has four tokens:

| Suffix    | Role                    |
| --------- | ----------------------- |
| `-bg`     | Background fill         |
| `-text`   | Text color              |
| `-border` | Border color            |
| `-icon`   | Icon color              |

Example: `--theme-success-bg`, `--theme-warning-text`, `--theme-danger-border`.

### Component Variants

| Token                      | Role                       |
| -------------------------- | -------------------------- |
| `--theme-flush-bg`         | Flush button background    |
| `--theme-flush-hover`      | Flush button hover         |
| `--theme-ghost-bg`         | Ghost button background    |
| `--theme-ghost-border`     | Ghost button border        |
| `--theme-ghost-label-bg`   | Ghost label background     |
| `--theme-ghost-label-text` | Ghost label text           |

### Typography

| Token              | Role         |
| ------------------ | ------------ |
| `--theme-font-sans`| Sans-serif   |
| `--theme-font-mono`| Monospace    |
| `--theme-link-text`| Link color   |

### Shape

| Token                       | Role                   |
| --------------------------- | ---------------------- |
| `--theme-radius-control-sm` | Small controls         |
| `--theme-radius-control`    | Standard controls      |
| `--theme-radius-card`       | Cards, panels          |
| `--theme-radius-pill`       | Pills, fully rounded   |

### Shadows

| Token                          | Role                |
| ------------------------------ | ------------------- |
| `--theme-shadow-card`          | Card elevation       |
| `--theme-shadow-control`       | Control resting      |
| `--theme-shadow-control-active`| Control pressed      |

## Theming

Three themes, each defining the complete token set. No base+override layering. Theme files live in
`src/styles/themes/`.

```
src/styles/themes/
├── light.css    # :root selector (default)
├── dark.css     # [data-theme="dark"]
└── retro.css    # [data-theme="retro"]
```

### Switching

The active theme is set via `data-theme` on `<html>`. Light is the default (no attribute needed).

- **Persistence**: `localStorage` key `theme`.
- **Flash prevention**: an inline script in `app.html` reads localStorage and sets `data-theme`
  before first paint.
- **Store**: `src/lib/client/ui/theme/theme.svelte.ts` provides reactive state and a `set()` method
  for runtime switching.

### Tailwind Bridge

`layout.css` contains a `@theme inline` block that maps `--theme-*` variables to Tailwind's
namespace. This produces utility classes like `bg-bg`, `text-text-soft`, `border-border`,
`rounded-control`, `shadow-card`, etc. Components use these utilities instead of
`bg-[var(--theme-bg)]`.

### Dev Showcase

`/dev/ui` renders every component with all variants and a theme switcher. Not linked from
navigation. Use it to verify components across themes.
