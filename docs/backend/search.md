# Search

Notes on the planned search system combining fuzzy matching with Elo-based ranking.

## Concept

Search results are ranked by a combination of fuzzy text matching and Elo ratings derived from user
click behavior. The idea is borrowed from chess rankings: searches are mini matches. Someone
searches "foo" and clicks "bar", bar's rating goes up, every other shown result goes down.

Over time, results converge on what users actually find useful for a given query.

## Two Parts

### Client-Side Fuzzy Search

A pre-built JSON index containing all searchable content is shipped with the static site. A fuzzy
search library (Fuse.js or FlexSearch) runs in the browser against this index. No server round-trip
needed for results.

Each entry in the index includes the page's current Elo rating, baked in at build time.

### Elo Tracking

A lightweight Cloudflare Worker receives click events and updates ratings in KV storage. Single
endpoint:

```
POST /api/click
{ query, clicked, shown }
```

The Worker validates the payload, computes Elo adjustments, and writes updated ratings to KV.

## Rating Flow

Ratings flow into the search index via scheduled rebuilds. A cron job rebuilds the site, pulls
current Elo ratings from KV, and bakes them into the index. The site deploys with updated ratings.

Daily or hourly rebuilds are sufficient. Real-time rating updates are not needed.

## Security

The endpoint is public. Abuse is mitigated through:

- IP rate limiting per query per time window
- Server-side payload validation (shown results must match what the search would actually return for
  that query)
- Elo's natural diminishing returns (clicking an already high-rated result barely moves it)
- Build-time anomaly detection (flag abnormal rating movements before deploy)
