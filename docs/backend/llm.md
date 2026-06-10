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

## Dev Log Artifacts

The first mdsvex content layer. The source `.svx` files are already markdown, so the serializers at
`src/lib/shared/utils/llm/devlog.ts` are thin:

| Artifact | URL                   | Content                                                  |
| -------- | --------------------- | -------------------------------------------------------- |
| Index    | `/dev-logs.md`        | One line per log (title, date, blurb), newest first      |
| Dev log  | `/dev-logs/{slug}.md` | Preamble from frontmatter, then the source body verbatim |

The slug is the route directory name, the same derivation the nav uses. The preamble is synthesized
from frontmatter: title as H1, blurb as blockquote, then a context line with author, date, tags, and
the web URL. The body ships nearly verbatim: frontmatter and `<script>` blocks are stripped, but
embedded Svelte components stay intact, the same approach Anthropic's docs use. Components often
carry real content in their props (e.g. `CodeBlock` code), so stripping them would lose information;
models read component tags fine.

Index links point at the `.md` artifacts, so the index doubles as a machine-readable directory of
the dev log layer.

## Copy Buttons and the AI Menu

On `/api/v1`:

- Page header: an `AiMenu` (sparkle icon dropdown) with "Copy page as Markdown" (`/api/v1.md`),
  "View as Markdown", "Open in Claude", and "Open in ChatGPT".
- Each tag heading: a `CopyMarkdown` icon button copying `/api/v1/{tag}.md`.
- Each endpoint heading: a `CopyMarkdown` icon button copying `/api/v1/{tag}/{op}.md`.

The fuller menu exists only at page level, never repeated per section. With several copy affordances
on one page, every icon-only button's tooltip and aria-label state the copy scope ("Copy Databases
as Markdown"), not just the format.

Dev log pages get an `AiMenu` automatically: the `DevLog` layout renders one in its `PageHeader`
actions, deriving the artifact path from the current pathname plus `.md` and using the default
prompt.

### Assistant deep links

"Open in" links carry a short prompt referencing a URL, never content (URL prompt payloads cap
around 14k characters). Claude is pointed at the markdown artifact, ChatGPT at the HTML page, which
its fetcher handles better. The default prompt is the Mintlify pattern
(`Read {url} so I can ask questions about it.`); pages with a clear task override it via the
`prompt` prop (the API reference uses `Read {url} and help me use this API.`).

The URL formats live in `assistantLink` in `src/lib/shared/utils/llm/assistants.ts`. They are owned
by the receiving apps and undocumented, so they can break silently; that file is the one place to
fix them. The links only work against the deployed site, since the assistant has to fetch a public
URL.

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

- **Remaining mdsvex surfaces.** Dev logs are done (see Dev Log Artifacts); the home page and any
  future docs or wiki sections follow the same pattern. Landing each removes its entries from the
  rule's `PENDING` list (see Enforcement).
- **PCD entity mirrors.** The entity browser pages are generated from structured PCD data, so they
  would get an API-style serializer rather than an mdsvex one. Not yet designed.
- **`/llms.txt`.** An index of all artifacts, per the [llms.txt](https://llmstxt.org/) convention.
  Cheap once artifacts exist, but low priority: log studies show almost no organic consumption, and
  copy affordances are what readers actually use.

## Prior Art

- [llmstxt.org](https://llmstxt.org/): the llms.txt convention and the `.md` URL suffix pattern.
- [Mintlify contextual menu](https://www.mintlify.com/docs/ai/contextual-menu): copy page, view as
  markdown, open-in-assistant deep links.
- [Cloudflare docs for agents](https://developers.cloudflare.com/docs-for-agents/): page actions
  bar, per-product llms.txt, token-count response headers.
- [Scalar discussion #6973](https://github.com/scalar/scalar/discussions/6973): requested but
  unshipped multi-granularity copy for API references. Nobody has built the per-tag level yet.
