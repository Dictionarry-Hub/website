-- The click event log: append-only, replayed into ratings at build time.
-- See docs/backend/search.md.
CREATE TABLE clicks (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	query TEXT NOT NULL,
	clicked TEXT NOT NULL,
	shown TEXT NOT NULL, -- JSON array of routes, rank order
	source TEXT NOT NULL DEFAULT 'human',
	ip_hash TEXT,
	ts INTEGER NOT NULL -- unix ms, server clock
);

CREATE INDEX idx_clicks_ts ON clicks (ts);
