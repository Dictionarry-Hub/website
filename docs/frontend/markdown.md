# Markdown

Notes on how authored content is processed through mdsvex.

## mdsvex

mdsvex is a markdown preprocessor for Svelte. It compiles `.md` files into Svelte components at
build time. This means:

- Markdown files can be used as SvelteKit page components directly.
- Svelte components can be imported and used inside markdown.
- All rendering happens at build time, so SEO is unaffected.

## Component Remapping

Default HTML elements (headings, code blocks, links, etc.) can be remapped to custom Svelte
components via an mdsvex layout. Content authors write standard markdown. The presentation logic
lives in the components.

This was chosen over writing a custom markdown parser. Full control over every element's rendering
without maintaining a parser.

## Layouts

Named mdsvex layouts are registered in `svelte.config.js`. Articles select one via the `layout`
frontmatter key:

| Key        | Component                        | Used by       |
| ---------- | -------------------------------- | ------------- |
| `dev-logs` | `src/lib/layouts/Article.svelte` | Dev logs      |
| `wiki`     | `src/lib/layouts/Article.svelte` | Wiki articles |

Both article layers share `Article.svelte`: same frontmatter, same page header, and AI menu. There
is no fallback layout; all `.svx` files live under `dev-logs/` or `wiki/`. The table of contents is
not part of the layout: the root layout mounts it globally beside any page that renders an
`<article>` (see [ui.md](./ui.md)).

## Plugins

mdsvex bundles an older remark, so remark plugins are pinned to the last majors that target its
tree. Newer versions expect a micromark-based pipeline and fail silently or loudly.

| Plugin                | Version pin | Purpose                                           |
| --------------------- | ----------- | ------------------------------------------------- |
| `remark-math`         | `3.x`       | Parses `$...$` and `$$...$$` math syntax          |
| `rehype-katex-svelte` | current     | Renders math to KaTeX HTML escaped for Svelte     |
| `rehype-slug`         | current     | Heading ids for the table of contents and anchors |

KaTeX rendering happens at build time; the KaTeX stylesheet is imported per-article in the
`<script>` block of articles that use math, so non-math pages don't ship it.

## Frontmatter

Markdown files use YAML frontmatter for metadata. Frontmatter values are used for SEO meta tags,
search indexing, and content listing/sorting.

The article frontmatter shared by dev logs and wiki articles is documented in
[backend/content.md](../backend/content.md).
