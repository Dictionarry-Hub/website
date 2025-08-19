---
title: Mutable Immutability
slug: mutable-immutability
blurb: Rethinking databases.
author: santiagosayshey
created: 2025-08-19
tags:
  - database
  - architecture
  - workflow
---

Today's dev log goes over changes to our development workflow and an in depth look into how databases will work in Profilarr 2.0.

# Development Updates

[Profilarr 1.1](https://github.com/Dictionarry-Hub/profilarr/releases/tag/v1.1) released today with media management functionality and a ton of bug fixes. Available now in the `latest` image.

Database updates include profile split scoring and the Sonarr version of `1080p Efficient`, now merged from `dev` to `stable`.

We're also changing how we ship updates to get features to you faster:

Profilarr:
- Sprint-based development: Each sprint tackles one feature completely. 
- `beta` image: All new features land here first for immediate testing
- `latest` image: Stable releases after beta testing
- Critical fixes ship directly to `latest` (and flow downstream to `beta`)


Database:
- `dev` branch: Experimental changes and new formats
- `stable` branch: Production-ready updates (~biweekly releases)
- More frequent stable releases to get improvements to you faster 

Development has been all over the place lately, so hopefully having some strict standards will help make things more *stable*.

---

# Databases 2.0

In the current version of Profilarr, databases are just `.yaml` files that are versioned like code and parsed to what you see in your GUIs. In 2.0, they will be version controlled SQL databases that utilise [Dolt](https://github.com/dolthub/dolt) and a custom change layer. 

## The Problem

With YAML, our data looks clean and simple:

```yaml
regex:
  - id: dv_regex
    pattern: "\\b(dv|dovi)\\b"

formats:
  - id: dolby_vision
    name: "Dolby Vision"
    regex_id: dv_regex
```

But what happens when someone tries to delete that regex? In the current system, nothing (implicitly) prevents breaking references:

```python
# Nothing stops this
regex.remove({"id": "dv_regex"})
# Format now points to nothing - discovered when import crashes

# To get referential integrity, you need to manually code:
# - Search all formats for regex_id references
# - Check if any match the regex you're deleting
# - Handle the conflict somehow (block? warn? cascade?)
# - Remember to update this code when you add new relationships
```



## The Solution


### SQL 

SQL gives us explicit relationships between data that are defined in the database schema and not just implicitly "found" at query time. In a nutshell, it gives us "referential integrity" - the database ensures data consistency and not the application code itself. This is good because it means I can code less and make less mistakes!

```sql
-- Schema that enforces referential integrity
CREATE TABLE regex (
    id TEXT PRIMARY KEY,
    pattern TEXT NOT NULL
);

CREATE TABLE formats (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    regex_id TEXT,
    FOREIGN KEY (regex_id) REFERENCES regex(id) ON DELETE RESTRICT
);

-- Now try to delete
DELETE FROM regex WHERE id = 'dv_regex';
-- ERROR: Cannot delete - referenced by formats table!
```

Here's how the current schema looks:

![PCD Schema](devlog_mutable_immutability_schema[style=light])
![PCD Schema](devlog_mutable_immutability_schema[style=dark])

The trade-off is that normalised data means no more "grab profile and you're done." Now it's multiple queries to assemble a complete profile.

```python
# YAML - one lookup
profile = profiles["2160p Remux"]  # Has everything nested inside

# SQL - assembly required  
profile = db.execute("SELECT * FROM profiles WHERE name = '2160p Remux'")
scores = db.execute("SELECT * FROM profile_formats WHERE profile_id = ?", profile.id)
tags = db.execute("SELECT * FROM profile_tags WHERE profile_id = ?", profile.id)
# ... stitch it together
```

### Dolt 

Dolt adds Git-like version control to SQL databases. Instead of parsing text diffs line-by-line, you get structured changelogs of actual data changes.

```sql
-- See what changed locally
SELECT * FROM dolt_diff('HEAD', 'WORKING', 'formats');
-- from_name         to_name             diff_type
-- "Dolby Vision"    "Dolby Vision"      modified (regex_id changed)
-- NULL              "HDR10+"            added

-- Pull and check incoming changes
CALL dolt_fetch();
SELECT * FROM dolt_log('HEAD..origin/main');
-- hash   message
-- abc123 "Updated DV regex to catch more variants"
-- def456 "Added new streaming service formats"
```

However, there's no such thing as free lunch. The biggest drawback here is Dolt detects conflicts at the row level (as opposed to at the column level). If you change a format's description while upstream changes its regex, that's a conflict - even though you touched different columns.

```sql
SELECT * FROM dolt_status;
-- table    staged  status
-- formats  false   conflict

SELECT * FROM dolt_diff('HEAD', 'WORKING', 'formats');
-- id  from_regex        from_description    to_regex            to_description
-- 1   "\\b(dv|dovi)\\b" "Dolby Vision"      "\\b(DV|DOVI)\\b"   "Dolby Vision format"
--     ↑ they changed                                            ↑ you changed
-- CONFLICT: Same row modified = merge fails
```

### Change Layer

Instead of storing modified rows (i.e. a user's custom changes), we store the operations that modify them. Each change becomes a discrete operation on specific columns:

```sql
-- Not the full row, but individual column operations
changes: [
  { query: "UPDATE formats SET regex = '\\b(DV|DOVI)\\b' WHERE id = 1", 
    column_hash: hash("\\b(dv|dovi)\\b"),  -- Expected value when change was made
    affects: ["regex"] },
  { query: "UPDATE formats SET description = 'Dolby Vision format' WHERE id = 1", 
    column_hash: hash("Dolby Vision"),
    affects: ["description"] }
]
```

When applying upstream changes, the system checks if the expected value still matches. If it does, the change applies. If not, you have a real conflict that needs resolution. But critically - changes to different columns never conflict. This fundamentally transforms how merge conflicts work:

- **Fewer conflicts** - Changes to different columns never conflict. You modify a format's score, upstream changes its regex - both changes apply cleanly. The current YAML system would flag this as a conflict because the entire format object changed.

- **Trivial resolution** - When a real conflict occurs (same column, same row), fixing it is dead simple: update the column_hash to match the new upstream value. That's it. No more staring at git diff markers trying to figure out what changed where.

- **Complete history** - Every change is timestamped and stored as a discrete operation. You can see exactly when you changed something, what the value was before, and why you changed it. It's a timeline of your customizations, not just a final state.

- **No more git for users** - Users never touch git again. No staging, no committing, no pushing, no merge conflicts with cryptic messages. Git becomes a developer tool for managing the base database. Users just make changes and they're automatically tracked as operations.

The current merge conflict system is, frankly, terrible. It works in theory but in practice it's shit. I will not, EVER, settle for shit. This system makes it not shit.


## Architecture

The main version controlled database is now completely immutable - it's never modified except when pulling upstream updates. Your customisations live in a separate "changes" database.

At runtime, Profilarr creates a temporary in-memory database that merges everything:

1. Takes the immutable main database
2. Applies your changes from the changes database
3. Creates the actual state you've configured

This merged view then gets mapped into denormalised formats that make API work trivial - those multiple queries we mentioned earlier happen once at startup (and whenever data changes), not on every request.

From the frontend's perspective, nothing changes. The API returns the same JSON structures, the UI works identically. You're just querying the in-memory compiled view instead of parsing YAML files.

![Mutable Immutability Architecture](devlog_mutable_immutability_architecture[style=light])
![Mutable Immutability Architecture](devlog_mutable_immutability_architecture[style=dark])

In a nutshell: Your changes are isolated, the base stays clean, conflicts are minimized, and the whole thing is still lightning fast because queries hit the in-memory compiled view.

## Tweaks

If you've been following Profilarr's development over the past year, you'll know that "tweaks" have been on the roadmap for a while but never implemented properly. Well, here they are.

**Changes ARE tweaks.**

Think about it: When you modify a format's score, you're creating a change. When we want to ship a tweak that boosts streaming service priorities, we're creating the exact same thing - a change. There's no difference between user customizations and official tweaks. They're all just operations on the database.

```sql
-- Your custom change
{ query: "UPDATE formats SET score = 100 WHERE name = 'IMAX'", ... }

-- Official "Prefer Streaming" tweak
{ query: "UPDATE formats SET score = 50 WHERE name IN ('NF', 'DSNP', 'AMZN')", ... }

-- Community "Anime Optimization" tweak
{ query: "UPDATE formats SET score = 75 WHERE name = 'SubsPlease'", ... }
```

They all stack. Enable them, disable them, reorder them. Each tweak is isolated and composable. No more "this tweak conflicts with that tweak" or "you need to disable X before enabling Y." If two tweaks modify different things, they just work. If they modify the same thing, last one wins - simple and predictable.

The architecture was designed to fix merge conflicts and reduce maintenance, but it accidentally created the perfect system for distributing tweaks. Profilarr eats its own dog food!