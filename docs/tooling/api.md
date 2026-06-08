# API Pipeline

Build-time pipeline that fetches the Profilarr OpenAPI spec from GitHub and outputs it as JSON for
the website to consume.

## Source

```
tooling/api/
├── index.ts        # Entry point, fetches and validates the spec
└── config.json     # Source repository, branch, and file path
```

## Config

`tooling/api/config.json` defines where to fetch the OpenAPI spec from.

```json
{
	"repo": "Dictionarry-Hub/profilarr",
	"branch": "develop",
	"file": "src/lib/api/v1.openapi.json"
}
```

## Running

```bash
pnpm compile:api
```

Fetches the spec from the GitHub raw URL and writes it to `src/lib/data/api/v1.json`. This file is
gitignored.

## Output

A single JSON file at `src/lib/data/api/v1.json` containing the raw OpenAPI 3.1.0 spec. The
`+page.server.ts` load function at `src/routes/api/v1/` imports this file and parses it into a
structured format for rendering.

## Data Flow

```
pnpm compile:api
    -> tooling/api/index.ts
    -> fetch raw JSON from GitHub
    -> validate (must have "openapi" and "paths" keys)
    -> write to src/lib/data/api/v1.json

pnpm build
    -> src/routes/api/v1/+page.server.ts
    -> import $lib/data/api/v1.json
    -> parse with src/lib/shared/utils/openapi/parse.ts
    -> generate code snippets (curl, Python, JS/TS, C#)
    -> pre-render /api/v1 page
```

## Types

Parsed spec types live at `src/lib/types/api.ts`. Key interfaces: `ApiSpec`, `ApiTag`,
`ApiEndpoint`, `ApiParameter`, `ApiResponse`, `CodeSnippet`.

## Parser

The OpenAPI parser at `src/lib/shared/utils/openapi/` transforms the raw spec into the `ApiSpec`
type. It groups endpoints by tag, extracts parameters, generates example JSON from schemas, and
converts markdown descriptions to HTML.

Code snippet generators produce copy-paste examples for each endpoint in four languages. The
snippets use placeholder values (`${PROFILARR_URL}`, `${API_KEY}`) for the user to fill in.
