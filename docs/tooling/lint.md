# Linting

The project uses two linting systems: ESLint for code quality and a custom framework for
project-specific conventions.

## Commands

| Command         | What it runs                          |
| --------------- | ------------------------------------- |
| `pnpm lint`     | ESLint + all custom rules             |
| `pnpm lint:eslint` | ESLint only                        |
| `pnpm lint:seo` | Custom rules in the `seo` category    |
| `pnpm lint:ui`  | Custom rules in the `ui` category     |

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
        ├── seo-component-required.ts
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
  files: string;              // glob pattern relative to project root
  check(files: FileEntry[]): Violation[];
}
```

### Current rules

#### `seo-component-required` (category: `seo`)

Every `+page.svelte` must import and use the `SEO` component from `$lib/client/ui/utils/SEO.svelte`.
This ensures all pages have proper meta tags.

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

### Adding a new rule

1. Create a file in `tooling/lint/rules/`.
2. Export a default `LintRule` object with the rule logic.
3. Import and register it in `tooling/lint/index.ts`.
4. If the rule uses a new category, add a `lint:<category>` script to `package.json`.
