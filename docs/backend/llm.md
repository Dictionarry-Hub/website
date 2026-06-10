# LLM Consumption

How the site makes its content consumable by LLMs and AI agents. Humans write everything on this
site (see the AI policy in [CONTRIBUTING.md](../CONTRIBUTING.md)); this module makes it easy for
readers to hand that content to a model. Human-written, AI-consumable.

## Philosophy

People increasingly read documentation through an AI assistant. The site treats this as a
first-class reading mode. Every meaningful unit of content gets a canonical markdown artifact at a
stable URL. The same artifact serves two consumers:

1. **Humans**, via copy buttons that fetch the artifact and put it on the clipboard.
2. **Agents**, by fetching the URL directly.

This mirrors the pattern Anthropic, Mintlify, and Cloudflare converged on: copy buttons never
serialize the page client-side, they fetch a canonical `.md` URL. The artifact is the contract.

## Design Principles

- **One artifact, two consumers.** Copy buttons and agents read the same URL. No drift between what
  a button copies and what an agent fetches.
- **Build time only.** Artifacts are prerendered `+server.ts` endpoints. adapter-static writes them
  out as plain `.md` files served by GitHub Pages. No runtime, consistent with the rest of the site.
- **Self-contained at every granularity.** Every artifact begins with a preamble carrying the
  context needed to act on it (base URL, auth, placeholder conventions). A single endpoint pasted
  into a chat is enough for the model to write working code.
- **Plain markdown.** Headings, tables, fenced code. No prompt scaffolding ("You are a helpful
  assistant..."), no HTML. Users paste artifacts into their own conversations with their own
  context.
- **Content-agnostic UI.** The copy component takes a URL and nothing else. It knows nothing about
  OpenAPI, dev logs, or wiki articles.

## Module Layout

```
src/lib/shared/utils/llm/         # serializers: typed content -> markdown strings
src/routes/**/<artifact>.md/      # prerendered +server.ts artifact routes
src/lib/client/ui/copy-markdown/  # copy button component
```

### Serializers

Pure functions, one module per content layer, that turn typed data into markdown strings. They run
inside prerendered server routes at build time. Formatting decisions live here and nowhere else: if
an artifact looks wrong, the fix is in the serializer.

### Artifact routes

Each granularity gets a real URL via a prerendered `+server.ts` GET endpoint returning
`text/markdown; charset=utf-8`. Dynamic segments enumerate their pages through an `EntryGenerator`
so adapter-static knows every artifact at build time. Sub-page granularities (e.g. a single
endpoint) get URLs even though they have no HTML page of their own.

### Copy component

One component, `CopyMarkdown`, in `src/lib/client/ui/copy-markdown/`. Required prop: the artifact
URL. It fetches the URL and writes the response text to the clipboard, with the same
copy-to-checkmark feedback as `CodeBlock`. Placed next to the heading of whatever it copies.

## API Reference Artifacts

The first implemented layer. Serializers consume the parsed `ApiSpec` from
`src/lib/shared/utils/openapi/`, the same data the `/api/v1` page renders.

| Granularity | URL                     | Example                             | Serializer           |
| ----------- | ----------------------- | ----------------------------------- | -------------------- |
| Whole API   | `/api/v1.md`            | `/api/v1.md`                        | `specToMarkdown`     |
| Tag         | `/api/v1/{tag}.md`      | `/api/v1/databases.md`              | `tagToMarkdown`      |
| Endpoint    | `/api/v1/{tag}/{op}.md` | `/api/v1/databases/get-database.md` | `endpointToMarkdown` |

Slugs: the tag slug comes from the parser (`ApiTag.slug`). The operation slug is the kebab-cased
`operationId` (`getDatabase` becomes `get-database`). Every operation in the spec has a unique
`operationId`; the parser should fail the build if one is missing rather than invent a fallback.

### Artifact shape

Every artifact is `preamble + body`. The preamble appears exactly once, at the top, regardless of
granularity:

```markdown
# Profilarr API v1: Databases

> Part of the Profilarr API reference. Full reference: https://dictionarry.dev/api/v1.md

All requests use the base URL `${PROFILARR_URL}/api/v1` and authenticate with an `X-Api-Key` header.
`${PROFILARR_URL}` and `${API_KEY}` are placeholders for the user's own instance URL and API key.
```

Bodies compose downward by concatenation, so heading depths are fixed across all granularities: tags
are `##`, endpoints are `###`, endpoint subsections are `####`. The whole-API body is the tag bodies
concatenated, a tag body is its endpoint bodies under a `##` tag heading, and an endpoint body is:

```markdown
### GET /databases/{id}

Get a database by ID.

(description, if present)

#### Parameters

| Name | In   | Type    | Required | Description  |
| ---- | ---- | ------- | -------- | ------------ |
| id   | path | integer | yes      | Database ID. |

#### Request Body

(content type plus fenced JSON example, if present)

#### Responses

(bold status line with description, fenced JSON example per response)

#### Example

(fenced curl snippet)
```

### Format decisions

- **Markdown, not raw OpenAPI JSON.** Rendered markdown resolves `$ref`s, drops spec boilerplate,
  and is meaningfully more token-efficient. The raw spec stays available for type-level accuracy and
  is linked from the whole-API artifact.
- **curl snippets only.** The page renders four languages; artifacts include just curl. It is the
  most universal expression of a request and models translate it to any language trivially.
  Including all four would triple artifact size for no information gain.
- **Markdown descriptions, not HTML.** Serializers use the raw `description` fields from the parser,
  never the `descriptionHtml` variants.

## Copy Button Placement

On `/api/v1`:

- Page header: copies `/api/v1.md`.
- Each tag heading: copies `/api/v1/{tag}.md`.
- Each endpoint heading: copies `/api/v1/{tag}/{op}.md`.

Plain copy buttons at every level. A fuller page-level menu (view as markdown, open in Claude) is a
possible later addition and would only ever exist at page level, never repeated per section.

## Enforcement

A custom lint rule, `require-md-mirror` (category: `llm`), guards the failure mode of adding a page
and forgetting its markdown mirror. See [tooling/lint.md](../tooling/lint.md) for the framework.

- **Checks build output, not source.** The rule globs `build/**/*.{html,md}` and asserts every HTML
  page has a sibling `.md` artifact. Entry generators are dynamic, so source analysis cannot know
  what pages exist; the build output is ground truth. This works because `pnpm lint` already runs
  after `pnpm build`.
- **Path mapping.** adapter-static emits flat pages (`api/v1.html`, `dev-logs/donuts.html`), so the
  mirror of `X.html` is `X.md`, and the root `index.html` maps to `index.md`.
- **Blacklist, not whitelist, in two lists.** Every page requires a mirror by default. The lists
  live in `tooling/lint/md-mirror.json` so they can be edited without touching code. `exempt` holds
  pages that will never have a mirror (the `/dev/ui` showcase, redirect stubs); `pending` holds
  route groups whose mirror layer has not been built yet, which is debt, not policy, and shrinks to
  empty as layers land. Every entry is `{ "route", "reason" }`, where the route is either exact
  (`/dev/ui`) or ends in `/*` to match everything beneath it (`/pcd/*`). Adding to either list is a
  visible, reviewable act.
- **Page-level mirrors are the minimum guarantee.** The rule enforces one `.md` per built page.
  Sub-page granularities (API tags and endpoints) are extra surface on top, guaranteed by their own
  build instead: artifact routes derive from the same parsed data the page renders, and a throwing
  prerender endpoint fails the build.

## Future Layers

Planned but not yet built. Each reuses the same three pieces (serializer, artifact route, copy
component):

- **mdsvex page mirrors.** A `.md` artifact per docs page, dev log, and wiki article. The source is
  already markdown, so the serializer reduces to stripping frontmatter and Svelte components.
  Landing it removes the corresponding entries from the rule's `PENDING` list (see Enforcement).
- **`/llms.txt`.** An index of all artifacts, per the [llms.txt](https://llmstxt.org/) convention.
  Cheap once artifacts exist, but low priority: log studies show almost no organic consumption, and
  copy affordances are what readers actually use.
- **Assistant deep links.** "Open in Claude" style links carrying a short prompt that references the
  artifact URL (the Mintlify pattern: `Read from {url} so I can ask questions about it.`).

## Prior Art

- [llmstxt.org](https://llmstxt.org/): the llms.txt convention and the `.md` URL suffix pattern.
- [Mintlify contextual menu](https://www.mintlify.com/docs/ai/contextual-menu): copy page, view as
  markdown, open-in-assistant deep links.
- [Cloudflare docs for agents](https://developers.cloudflare.com/docs-for-agents/): page actions
  bar, per-product llms.txt, token-count response headers.
- [Scalar discussion #6973](https://github.com/scalar/scalar/discussions/6973): requested but
  unshipped multi-granularity copy for API references. Nobody has built the per-tag level yet.
