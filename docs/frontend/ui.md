# UI

Notes on the component library, semantic token system, and theming.

## Component Library

All components are built from scratch. No headless libraries, no third-party UI kits. Full control
over markup, accessibility, and styling.

Components live in `src/lib/client/ui/` organized by purpose.

## Components

_Components will be documented here as they are built._

## Semantic Tokens

Components use semantic CSS custom properties, never raw color values. Tokens are organized by role:

### Surface

| Token                    | Role                          |
| ------------------------ | ----------------------------- |
| `--color-surface-page`   | Page background               |
| `--color-surface-card`   | Card / panel background       |
| `--color-surface-raised` | Elevated elements (dropdowns) |
| `--color-surface-sunken` | Inset / recessed areas        |

### Text

| Token                    | Role                   |
| ------------------------ | ---------------------- |
| `--color-text`           | Primary body text      |
| `--color-text-secondary` | Supporting text        |
| `--color-text-muted`     | Disabled / placeholder |

### Border

| Token                   | Role               |
| ----------------------- | ------------------ |
| `--color-border`        | Default borders    |
| `--color-border-subtle` | Subtle dividers    |
| `--color-border-strong` | Emphasized borders |

### Brand

| Token                    | Role                  |
| ------------------------ | --------------------- |
| `--color-primary`        | Primary brand color   |
| `--color-primary-hover`  | Primary hover state   |
| `--color-primary-active` | Primary active state  |
| `--color-accent`         | Secondary brand color |

### Semantic

| Token             | Role           |
| ----------------- | -------------- |
| `--color-success` | Positive state |
| `--color-warning` | Caution state  |
| `--color-error`   | Negative state |
| `--color-info`    | Informational  |

### Code

| Token               | Role                       |
| ------------------- | -------------------------- |
| `--color-code-bg`   | Code block background      |
| `--color-code-text` | Code block default text    |
| `--color-code-*`    | Syntax highlighting colors |

This list is a starting point. Tokens will be added as components are built.

## Shape

| Token           | Role                           |
| --------------- | ------------------------------ |
| `--radius-sm`   | Small elements (badges, chips) |
| `--radius-md`   | Inputs, buttons                |
| `--radius-lg`   | Cards, panels                  |
| `--radius-xl`   | Modals, hero sections          |
| `--radius-full` | Circular (avatars, dots)       |

## Shadows

| Token            | Role                      |
| ---------------- | ------------------------- |
| `--shadow-sm`    | Subtle lift               |
| `--shadow-md`    | Cards, dropdowns          |
| `--shadow-lg`    | Modals, floating elements |
| `--shadow-inset` | Pressed / recessed state  |

A modern theme might set `--radius-lg: 1rem` and `--shadow-md` to a soft drop shadow. A retro theme
sets all radii to `0`, drops the soft shadows, and uses `--shadow-inset` to create that pushed-in
button look.

## Theming

Two-tier system: base modes provide defaults, themes override selectively.

### Base Modes

`src/styles/modes/dark.css` and `src/styles/modes/light.css` define the full token set with sensible
defaults. Every token must be defined in both base modes.

### Themes

`src/styles/themes/<name>.css` inherits from a base mode and overrides only what it needs. A theme
picks dark or light as its base, then changes brand colors, accents, or whatever else it wants.
Themes stay small because they don't need to redefine every surface and text color.

### Switching

Theme selection is stored client-side. The active theme's CSS file is applied via a class or data
attribute on the root element. Base mode + theme overrides are both loaded; the theme's specificity
wins for any token it redefines.
