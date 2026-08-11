# Linting

The project uses two linting systems: ESLint for code quality and a custom framework for
project-specific conventions.

## Commands

| Command             | What it runs                           |
| ------------------- | -------------------------------------- |
| `pnpm lint`         | ESLint + all custom rules              |
| `pnpm lint:eslint`  | ESLint only                            |
| `pnpm lint:seo`     | Custom rules in the `seo` category     |
| `pnpm lint:ui`      | Custom rules in the `ui` category      |
| `pnpm lint:exports` | Custom rules in the `exports` category |

`pnpm lint` is what CI runs. It requires a build first because some rules inspect build output.

## ESLint

Standard ESLint setup with `typescript-eslint` and `eslint-plugin-svelte`. Configuration lives in
`eslint.config.js`. Notable rules:

- `@typescript-eslint/no-explicit-any: error` - no `any` types
- `svelte/button-has-type: error` - buttons must specify `type`

## Custom Lint Framework

Project-specific rules that ESLint cannot express. Lives in `tooling/lint/`.

```
tooling/
├── tsconfig.json               # Separate TS config for Node scripts
└── lint/
    ├── index.ts                # Runner: discovers rules, globs files, reports
    ├── types.ts                # LintRule, FileEntry, Violation interfaces
    └── rules/
        ├── require-seo.ts
        └── no-raw-ui.ts
```

### How it works

Each rule declares a name, category, severity, a glob pattern for files, and a `check` function. The
runner globs matching files, reads them, and passes them to the rule. The rule returns violations.

Rules receive all matching files at once (not one at a time) so cross-file checks like "no duplicate
titles" are possible.

The `--category` flag filters to a specific category. Without it, all rules run.

### Rule interface

```ts
interface LintRule {
	name: string;
	description: string;
	category: string;
	severity: 'error' | 'warn';
	files: string; // glob pattern relative to project root
	check(files: FileEntry[]): Violation[];
}
```

### Current rules

#### `require-seo` (category: `seo`)

Every `+page.svelte` must import and render either the `SEO` component directly or the approved
`ListPage` composition, which owns SEO for entity index pages. This ensures all pages have proper
meta tags without rendering duplicates.

#### `no-raw-ui` (category: `ui`)

No raw HTML UI elements (`<button>`, `<input>`, `<select>`, `<textarea>`, `<dialog>`, `<table>`) in
`.svelte` files under `src/routes/` or `src/lib/client/`. Use components from `src/lib/client/ui/`
instead.

Parses the Svelte 5 AST and walks the template tree. Reports exact line and column numbers.

**Exemptions:**

- `src/lib/client/ui/` is excluded (those are the wrapper components).
- `<input type="hidden">` is allowed (SvelteKit form plumbing, not visible UI).

**Escape hatch:**

```svelte
<!-- lint-disable no-raw-ui -->
<table class="w-full">
```

Place the comment immediately before the element. Use sparingly.

#### `no-raw-tokens` (category: `ui`)

No raw Tailwind colors, radii, or shadows in `class` attributes anywhere under `src/`. Use semantic
design tokens instead (see [frontend/ui.md](../frontend/ui.md)).

Parses the Svelte 5 AST and inspects `class` attributes, including string literals inside
expressions (ternaries, logical expressions, template literals). Variant modifiers (`hover:`, `md:`,
`!`) are stripped before checking. Reports exact line and column numbers.

**Flagged:**

- Palette colors (`bg-red-500`, `text-zinc-100/50`), `white`/`black` (`text-white`), and arbitrary
  color values (`bg-[#fff]`, `border-[rgb(0,0,0)]`) on any color-capable prefix (`bg`, `text`,
  `border`, `ring`, `shadow`, `fill`, etc.).
- Raw radii (`rounded`, `rounded-lg`, side variants like `rounded-t-md`, arbitrary values). Semantic
  radii are allowed: `rounded-control-sm`, `rounded-control`, `rounded-card`, `rounded-xl`,
  `rounded-pill`.
- Raw shadows (`shadow`, `shadow-md`, arbitrary values). Semantic shadows are allowed:
  `shadow-card`, `shadow-control`, `shadow-control-active`, `shadow-none`.

Unlike `no-raw-ui`, the `src/lib/client/ui/` components are not exempt: wrappers must use semantic
tokens too.

**Escape hatch:**

```svelte
<!-- lint-disable no-raw-tokens -->
<div class="bg-black/50">
```

Place the comment immediately before the element. Use sparingly.

#### `theme-sync` (category: `ui`)

The theme system's three artifacts must agree: every `src/styles/themes/<id>.css` file has a
registry entry in `src/lib/client/ui/theme/themes.ts` and an `@import` in `src/routes/layout.css`,
and vice versa. Each theme CSS must use the right selector (`:root` for light, `[data-theme='<id>']`
otherwise), declare `color-scheme`, and define the complete token contract, with `light.css` as the
canonical set. Both missing and extra tokens are violations: a missing token silently inherits from
`:root` and produces a subtly wrong theme.

#### `require-md-mirror` (category: `llm`)

Every built page (`build/**/*.html`) must have a sibling `.md` markdown mirror for LLM consumption.
Runs against build output, so it requires `pnpm build` first. Exempt and pending routes are
configured in `tooling/lint/md-mirror.json`. See [backend/llm.md](../backend/llm.md) for the
architecture and the list semantics.

#### `require-yaml-artifact` (category: `exports`)

Every built detail page for a YAML-enabled PCD entity type must have a sibling `.yaml` artifact.
Runs against build output after `pnpm build`. Supported entity route segments are listed in
`tooling/lint/yaml-artifacts.json`; adding a serializer for another entity type requires adding its
route segment to that list. Entity index pages and unsupported entity types are ignored.

### Adding a new rule

1. Create a file in `tooling/lint/rules/`.
2. Export a default `LintRule` object with the rule logic.
3. Import and register it in `tooling/lint/index.ts`.
4. If the rule uses a new category, add a `lint:<category>` script to `package.json`.
