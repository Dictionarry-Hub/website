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

## Frontmatter

Markdown files use YAML frontmatter for metadata. Frontmatter values are used for SEO meta tags,
search indexing, and content listing/sorting.

Required fields and structure to be defined during implementation.
