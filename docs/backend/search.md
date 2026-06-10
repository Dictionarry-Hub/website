# Search

Design for the search system: a hand-rolled fuzzy scorer blended with Elo ratings derived from
click behavior. Nothing here is implemented yet; this is the agreed design.

## Concept

Search results are ranked by a combination of fuzzy text matching and Elo ratings. The idea is
borrowed from chess rankings: searches are mini matches. Someone searches "foo" and clicks "bar",
bar's rating goes up, every other shown result goes down.

Over time, results converge on what users actually find useful for a given query.

The system has three parts:

1. **Index**: pre-built JSON shipped with the static site.
2. **Ranking algorithm**: a hand-rolled scorer running in the browser. No search library.
3. **Click store**: a Cloudflare Worker appending click events to a D1 database, replayed into
   ratings at build time.

The first two work without the third; ratings default to neutral until the store exists.

## Index

Search is scoped to the currently selected database. The index is split accordingly:

- **Core index**: Profilarr docs, dev logs, wiki articles, API reference. Shared by all databases.
- **Per-database index**: every PCD entity in one database, one file per database.

The client lazy-loads the core index, the active database's index, and the per-term rating table
(`/search-index/query-ratings.json`, see Rating Computation) on first search interaction. Index
files are emitted as prerendered endpoints (like the markdown artifact routes), not bundled into
the JS.

### Entry schema

```ts
{
	title: string;       // display name
	url: string;         // route; the identity key everywhere
	type: string;        // content type (dev-log, api-endpoint, quality-profile, ...)
	blurb: string;       // short description, built per type; displayed and searchable
	keywords: string[]; // searchable but never displayed (tags, arr types, quality names)
	elo: number;         // rating baked in at build time, 1500 baseline
}
```

Body text is not indexed. Search matches against title, blurb, and keywords.

### Blurb builders

Each content type defines a function that builds its entry from its data at index build time. The
blurb serves two masters: searchable text and display text in the palette. Terms that are
searchable but not readable prose (tags, arr types, quality names) belong in keywords instead.

Descriptions are nullable across PCD entities (and absent entirely on some types), so every PCD
builder has a derived fallback.

| Type                    | Blurb                                                                                              | Keywords            |
| ----------------------- | -------------------------------------------------------------------------------------------------- | ------------------- |
| Dev log                 | Frontmatter blurb, passed through                                                                  | Tags                |
| Wiki article (future)   | Frontmatter blurb (constrains the to-be-defined frontmatter)                                       | Tags                |
| Profilarr doc (future)  | Frontmatter description; fallback decided when the layer exists                                    |                     |
| API endpoint            | Method plus path ("GET /api/v1/databases"); title from the operation summary                       | Tag name            |
| Quality profile         | Description, truncated. Fallback: upgrade-target sentence ("Upgrades until Bluray-1080p"). No stats | Tags, quality names |
| Custom format           | Description. Fallback: condition-type summary ("3 conditions: release title, resolution, source")  | Tags                |
| Regex                   | Description. Fallback: truncated pattern                                                           | Tags                |
| Delay profile           | Derived: protocol, delays, bypass ("Prefers usenet. 120 min torrent delay.")                       |                     |
| Naming                  | Derived: "Radarr naming scheme, renaming enabled."                                                 | Arr type            |
| Media settings          | Derived: propers/repacks behavior, MediaInfo on/off                                                | Arr type            |
| Quality definitions     | Derived: tier count and range ("12 quality tiers, SDTV to Remux-2160p.")                           | Arr type            |

The API reference is indexed per endpoint, one entry per operation, with URLs anchored into the
single API reference page by operationId (`/api/v1#getDatabases`). The page already renders
`id={operationId}` on every endpoint section. Anchored URLs are full identity keys for Elo like any
other route. No per-tag entries in v1.

## Ranking Algorithm

A pure function `(query, entries) -> ranked results` in `src/lib/client/search/`, fully separate
from the UI. Four stages:

1. **Normalize.** Lowercase, strip diacritics and punctuation, collapse whitespace. Index entries
   are normalized and tokenized once at load; the query per keystroke.

2. **Match per token, in tiers.** Each query token is checked against field tokens in order of
   strictness, stopping at the first hit:
    - exact match: 1.0
    - prefix match: high, scaled by typed coverage
    - substring match: mid
    - fuzzy match: Damerau-Levenshtein capped at edit distance 2, scored by `1 - distance / length`

    The edit distance pass only runs for entries that failed the cheap string checks. No
    subsequence/acronym matching (fzf-style) in v1.

3. **Aggregate to an entry score.** Each query token takes its best match anywhere in the entry;
   scores are averaged. Title matches outweigh blurb matches (blurb at roughly half weight). No
   type boosts in v1. Unmatched tokens split into two cases:
    - A token that matches *some* entries but not this one (a discriminating token, e.g. "sonarr")
      applies a hard penalty multiplier, not a soft dilution.
    - A token that matches *nothing in the entire index* ("best", "how") is qualifier language, not
      failed navigation. It is dropped from text scoring with no penalty and counted as an
      exploratory-intent signal for stage 4.

4. **Gate, then blend Elo.** Admission is a tiny absolute floor (at least one real token match, so
   nonsense queries return empty rather than a popularity dump) plus a band relative to the top
   candidate's text score. Popularity can never buy entry for an irrelevant page.

    Among qualifiers, the final score is a weighted sum of text score and normalized Elo. Each
    candidate's rating resolves per-term first: if the normalized query has a per-term table (see
    Rating Computation), those ratings feed the blend, otherwise the entry's global `elo` does.
    Ratings normalize to 0..1 via Elo's own expected-score formula:
    `1 / (1 + 10^((1500 - rating) / 400))`.
    The Elo weight is not fixed: it scales with how *flat* the top text scores are. When one entry
    towers over the field (navigational query), Elo influence stays small. When the top candidates
    are clustered ("best 1080p profile" matching several profiles near-identically), text matching
    has no real opinion and the Elo weight slides up toward a cap; exploratory-intent tokens from
    stage 3 nudge the same dial. Even at the cap, text still tie-breaks among equals; Elo reorders
    the pack, it never overrides a clearly better text match.

All weights, tiers, and thresholds live in one constants block and are tuned by feel against a test
suite.

## Click Store

A Cloudflare Worker (planned: `worker/` directory in this repo, deployed via Wrangler) with a
single endpoint:

```
POST /api/click
{ query, clicked, shown }
```

The Worker validates the payload and appends one row to a D1 table. No Elo computation happens at
write time. Stored event:

| Field     | Notes                                                  |
| --------- | ------------------------------------------------------ |
| `query`   | Normalized query text                                  |
| `clicked` | Route of the clicked result                            |
| `shown`   | Routes shown at click time                             |
| `source`  | `human` or `synthetic` (for bootstrap/test data)       |
| `ip`      | Hashed, for rate limiting and retroactive exclusion    |
| `ts`      | Server timestamp                                       |

D1 over KV: appends to distinct rows cannot conflict (no read-modify-write race), and the free tier
allows 100k row writes/day versus KV's 1k.

Local development runs the real Workers runtime via `wrangler dev` with D1 simulated as a local
SQLite file. Production is `wrangler deploy` plus a real D1 database and CORS headers allowing the
GitHub Pages origin.

## Rating Computation

Ratings are derived state, rebuilt from scratch on every scheduled build. The build fetches all
events, folds them in timestamp order through the Elo update function, and bakes the resulting
ratings into the index. Real-time updates are not needed; daily rebuilds are sufficient.

### Pipeline

Ratings enter the build as a third compile pipeline, shaped like `compile:pcd` and `compile:api`:

1. **`compile:elo`** (`tooling/elo/`, pre-build): fetches all click events from D1, replays them in
   timestamp order through the Elo fold, and writes two gitignored files: `ratings.json` (the flat
   global `route -> rating` map) and `query-ratings.json` (the shrunk per-term tables, served as a
   prerendered endpoint like the index files). The K-factor, shrinkage constant, `synthetic`
   down-weighting, and build-time anomaly detection live here.
2. **Overlay in the index endpoints**: builders always emit the 1500 baseline; the endpoints load
   `ratings.json` with a tolerant glob and apply `entry.elo = ratings[entry.url] ?? baseline`. That
   lookup is the entire join. New pages miss the map and keep baseline; orphaned ratings are never
   looked up.
3. Downstream is unchanged: the scorer reads `entry.elo` either way.

Local, CI, and PR builds never run `compile:elo`; the file is absent and everything ships at
baseline. Only the scheduled production rebuild (a GitHub Actions cron running `compile:elo`
before `pnpm build`) bakes live ratings into the index.

Full replay is what makes the system tunable and recoverable:

- Change the K-factor, recompute all of history.
- Spot an abusive IP later, exclude its events, recompute.
- Down-weight or drop `synthetic` events once real traffic exists.

### Identity

Ratings are keyed by route (`route -> rating`), joined to index entries by URL at build time:

- **New page**: no events reference it, gets the 1500 baseline. Cold start is neutrality.
- **Deleted page**: its events still replay (history happened), the orphaned rating finds no entry
  at join time and is dropped.
- **Renamed page**: the rating is orphaned and the page restarts at 1500. Consciously accepted for
  v1; the event log is permanent, so rename mapping can be added retroactively if it ever matters.
  This mostly affects PCD entities, whose names form their routes.

### Per-term ratings

Clicks happen in the context of a search term, and subjective queries ("best 1080p profile") are
where Elo matters most. The replay builds two layers from the same events:

- A **global per-page leaderboard** from all events. Dense, fast-converging, the floor everywhere.
- **Per-term leaderboards** for normalized terms. Term normalization (lowercase, token sort,
  whitespace collapse) merges variants like "profile 1080p" and "1080p profile".

Sparse terms are the failure mode: a leaderboard built from two clicks is a frozen coin flip. So a
term's rating shrinks toward the global rating by click volume:

```
confidence = clicks / (clicks + C)
effective  = confidence * perTermRating + (1 - confidence) * globalRating
```

A term with a handful of clicks sits near global; a term with hundreds is essentially its own
leaderboard. `compile:elo` computes effective ratings at build time and ships them as
`/search-index/query-ratings.json` (`term -> route -> rating`), only for terms above a minimum
click count. That cutoff is a file-size optimization, not a correctness cliff: below it the
effective rating is approximately global anyway.

At search time the scorer resolves ratings per-term first: if the normalized query matches a term
in the table, those ratings feed the blend; otherwise each entry's global `elo` does. Click-count
shrinkage and the flatness-adaptive blend weight are orthogonal dials: one picks which rating to
trust, the other how much rating matters at all for the query.

## Security

The endpoint is public. Validation at ingest is deliberately cheap; replay makes abuse recoverable
after the fact rather than needing perfect prevention:

- Schema validation; `clicked` must be in `shown`; length caps on all fields
- IP rate limiting per time window
- Elo's natural diminishing returns (clicking an already high-rated result barely moves it)
- Build-time anomaly detection (flag abnormal rating movements before deploy)
- Retroactive exclusion: filter bad events out of the log and recompute

Server-side re-running of the search to validate `shown` was considered and rejected: it requires
shipping the index to the Worker and keeping two search implementations in sync, for marginal
benefit.

## UI

A command palette modal, opened with Ctrl+K, designed mobile-first (a modal escapes the small
screen in a way inline dropdowns cannot). Requires new UI primitives (modal/dialog, text input,
keyboard list navigation) that do not exist yet; to be designed per the UI workflow before
implementation.

## Open Questions

- How `compile:elo` fetches events: a GET endpoint on the Worker versus the D1 HTTP API.
- Exact scoring weights, tiers, the flatness measure, and the Elo K-factor (tuned during
  implementation).
- The shrinkage constant `C` and the per-term shipping cutoff (tuned once real query data exists).
- The Elo update rule details (pairwise updates of clicked versus shown, K-factor schedule).
