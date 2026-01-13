---
title: Show Your Work
slug: show-your-work
blurb: Upgrades, operations, testing, and treating preference like math.
author: santiagosayshey
created: 2026-01-13
tags:
  - profilarr v2
  - architecture
---

Hey everyone, long time no devlog. This is going to be a long one; we'll discuss three important architecture decisions in v2 and then present a complete rethink of how profiles might be built in the future. But first, some Leibniz.

:::quote
author: Gottfried Wilhelm Leibniz
year: 1685
---
The only way to rectify our reasonings is to make them as tangible as those of the Mathematicians, so that we can find our error at a glance, and when there are disputes among persons, we can simply say: Let us calculate, without further ado, to see who is right.
:::

More on him later.

# Upgrades

One of the most common questions we get on Discord is some variation of "why did Radarr grab this release?" or "why did Sonarr downgrade my file?" People assume the answer has something to do with the quality profiles themselves; that the arrs evaluated all the options and picked the best one. But that's not how it works. The arrs don't search for the best release. They monitor RSS feeds and grab the first thing that qualifies as an upgrade over what you currently have. Not the _best_ option. Just _an_ option that clears the bar.

So the natural question becomes: how do you actually get the best release, not just the first acceptable one? There are a few existing approaches to this.

## Existing Solutions

| Solution | How it works | Pros | Cons |
|----------|--------------|------|------|
| [Upgradinatorr](https://github.com/angrycuban13/Just-A-Bunch-Of-Starr-Scripts/blob/main/Upgradinatorr/README.md) by [angrycuban13](https://github.com/angrycuban13) | Triggers manual searches on a schedule. Grabs a batch, searches each, tags them as "done". Cron it and it works through your library over time. | Simple, configurable batch size and filters | Random selection, no prioritisation, manual cron setup |
| [Huntarr](https://github.com/plexguide/Huntarr.io) by [admin9705](https://github.com/admin9705) | Runs as a Docker service, checking the `wanted/cutoff` API to find items below your quality cutoff and triggering searches. | GUI, automated scheduling | Only uses quality cutoff, which works if you don't rely on Custom Format scoring, but the cutoff API itself doesn't account for CF scores. A 1080p Encode with score 5 won't be seen as needing an upgrade even if a 1080p Encode with CF score 500 exists. |

We've traditionally recommended Upgradinatorr, specifically via [DAPS](https://github.com/Drazzilb08/daps), because it doesn't rely on the wanted/cutoff metric and upgrades your library meaningfully over time, even if randomly. But we also realise not everyone wants to set up another service, learn another configuration process, and maintain another piece of their homelab. Or maybe you do, masochist. So we decided to bake upgrade functionality directly into Profilarr, building on Upgradinatorr's approach.

## Profilarr's Solution

The basic approach is the same as Upgradinatorr; iterate through your entire library, figure out what needs an upgrade, and trigger searches using the [`command`](https://sonarr.tv/docs/api/#v3/tag/command/POST/api/v3/command) endpoint on Radarr or Sonarr. Nothing revolutionary there.

The difference is in how we decide what to upgrade. Upgradinatorr selects randomly from whatever matches its basic criteria. That works, but it means you have no control over priority. A niche foreign film from 2003 has the same chance of getting searched as the blockbuster you added yesterday.

Profilarr breaks this into a few steps:

**Initial Grab:** Pull everything from your arr instance - every movie or series, along with its metadata: ratings, popularity, file size, date added, quality profile, whether it's monitored, whether it's hit cutoff, and so on.

**Filter:** Define filters using AND/OR logic to narrow down what qualifies for upgrade. Filters can be nested arbitrarily deep, so you can express fairly complex conditions.

For example, the "High Priority Popular" filter in the screenshot below says: monitored is true AND cutoff met is false AND size on disk is less than 15GB AND (popularity is greater than 30 OR TMDb rating is at least 7 OR year is 2020 or later). That's a filter that targets popular, recent, or well-rated content that's currently undersized, exactly the stuff you'd want to prioritise.

![Upgrades 2.0](/images/devlog_show_your_work_upgrade.png[style=light])
![Upgrades 2.0](/images/devlog_show_your_work_upgrade.png[style=dark])

You can filter on basically anything the arr knows about: title, year, genre, studio, collection, ratings from TMDb/IMDb/Rotten Tomatoes/Trakt, runtime, file size, release group, date added, original language, and more. Each field supports the operators that make sense for its type, text fields get contains/starts with/ends with, numbers get greater than/less than/equals, dates get before/after/in the last N days. Essentially, ~~ripping~~ riffing off Plex's [smart collection filtering](https://support.plex.tv/articles/201273953-collections/)!

**Select:** Once filtering narrows the pool, a selector picks which items actually get searched this run. Options include: random, oldest first, newest first, lowest custom format score, most popular, or least popular. Combined with a count (how many items per run) and a cooldown (skip items searched recently), this gives you precise control over upgrade behavior.

**Modes:** The filter system also supports multiple named filters with a filter mode. Round robin cycles through your filters in order, one filter per scheduled run. So you might have "Upgrade Needed" run on Monday, "High Priority Popular" on Tuesday, and so on. Or use random shuffle if you don't care about order.

**Import/Export:** Filter configs are fully exportable and importable. You can copy someone else's setup, share your own, or just browse examples to understand how the system works. Two filters - Basic & High Priority Popular can be seen below in its raw `json` form.

:::tabs
```json title="Basic"
{
  "name": "Basic",
  "enabled": true,
  "group": {
    "type": "group",
    "match": "all",
    "children": [
      {
        "type": "rule",
        "field": "monitored",
        "operator": "is",
        "value": true
      },
      {
        "type": "rule",
        "field": "cutoff_met",
        "operator": "is",
        "value": false
      }
    ]
  },
  "selector": "random",
  "count": 5,
  "cutoff": 80,
  "searchCooldown": 24
}
```

```json title="High Priority Popular"
{
  "name": "High Priority Popular",
  "enabled": true,
  "group": {
    "type": "group",
    "match": "all",
    "children": [
      {
        "type": "rule",
        "field": "monitored",
        "operator": "is",
        "value": true
      },
      {
        "type": "rule",
        "field": "cutoff_met",
        "operator": "is",
        "value": false
      },
      {
        "type": "rule",
        "field": "size_on_disk",
        "operator": "lt",
        "value": 15
      },
      {
        "type": "group",
        "match": "any",
        "children": [
          {
            "type": "rule",
            "field": "popularity",
            "operator": "gt",
            "value": 30
          },
          {
            "type": "rule",
            "field": "tmdb_rating",
            "operator": "gte",
            "value": 7
          },
          {
            "type": "rule",
            "field": "year",
            "operator": "gte",
            "value": 2020
          }
        ]
      }
    ]
  },
  "selector": "random",
  "count": 5,
  "cutoff": 80,
  "searchCooldown": 24
}
```
:::

The first person who builds the filter that somehow excludes their entire library and makes a support request for it will forever be memorialised in the discord bot with the `/shame` command.

---

# Operations

In the last devlog, [Mutable Immutability](/devlogs/mutable-immutability), we outlined v2's approach to databases using SQL instead of YAML. SQL gave us referential integrity; the database enforces consistency, not the application code. On top of that, we introduced a "change layer" for user customisations. Instead of storing modified data directly, we stored the operations that modified it. Your changes became a sequence of discrete operations replayed on top of an immutable base. It worked. And once it was working, the natural question was: why limit this to user changes?

The new system applies the same principle to everything. The base database isn't state anymore, it's operations. The schema isn't a static DDL file, it's operations. Tweaks aren't a special system bolted on the side, they're operations. Everything reduces to the same primitive: an ordered, append-only sequence of SQL operations that can be replayed to produce state. We call this Operational SQL (OSQL), and the databases built with it are Profilarr Compliant Databases (PCDs).

This shift also made Dolt redundant. The previous devlog positioned Dolt as the version control layer, Git for databases. But Dolt versions state: the database after it's been built. When you pull a Dolt database, you're trusting that the binary blob you received is what was intended. There's no way to audit it without running it. That's like distributing VM images instead of Dockerfiles, or cloud console snapshots instead of Terraform configs. OSQL flips this. The `.sql` files are the source of truth; readable, auditable, diffable. The database state is just what falls out when you replay them. Infrastructure as code, not infrastructure as artifact.

## Layers

Operations are organised into layers. Each layer is append-only, but later layers can override the effects of earlier ones.

| Layer | Purpose | Who writes it | Example |
|-------|---------|---------------|---------|
| **Schema** | Defines tables, columns, foreign keys, constraints. No data. | Profilarr | `CREATE TABLE custom_formats (...)` |
| **Dependencies** | Allows PCDs to compose with other PCDs. Coming in a future major version. | Database maintainers, community | `IMPORT pcd('shared-regex-library')` |
| **Base** | The actual shipped database content. Profiles, formats, regex patterns, quality definitions. | Database maintainers (us) | `INSERT INTO custom_formats VALUES ('DV', 'Dolby Vision', ...)` |
| **Tweaks** | Optional adjustments that modify base behavior. Enable DV, ban a release group, boost streaming. | Database maintainers, community | `UPDATE quality_profile_custom_formats SET score = 0 WHERE ...` |
| **User Ops** | Your personal customisations. Heaviest value guards to detect upstream conflicts. | You | `UPDATE quality_profile_custom_formats SET score = 1500 WHERE ...` |

When Profilarr builds your database, it replays these layers in order: Schema → Dependencies → Base → Tweaks → User Ops. Later operations override earlier ones. The final state is whatever falls out of replaying everything.

## Migration

Of course, none of this matters if migrating from v1 is painful. So [Rosettarr](https://github.com/Dictionarry-Hub/rosettarr) was built to translate the old YAML configs into OSQL operations. Your existing setup becomes a replay log, just like everything else. The full schema and OSQL/PCD documentation are available [here](https://github.com/Dictionarry-Hub/schema).

---

# Testing

Testing in v1 was the weakest part of the system. Regex tests were full of noise, custom format testing only worked for regex-related conditions, and quality profiles didn't get any testing at all. While everything else in v1 was usable, testing was the module I was quite unhappy with, which was frustrating, because it was part of why I started working on Profilarr in the first place. I wanted an easier way to build and verify custom formats and quality profiles, not just sync them. Fixing testing was one of the most important tasks for v2.

## Regular Expressions

Regex testing is straightforward; you want to verify a pattern matches or doesn't match release titles. Solutions for this already exist. [Regex101](https://regex101.com/) does it well, so we use that instead of maintaining something custom. Regex101 gives you an ID for each saved regex, and that ID updates in place when you make changes. We initially wanted to just store the ID, that way, when we update test cases, the link in the repo automatically points to the latest version without needing a commit. But regex101 IDs are editable by anyone who has them. Someone could modify the test suite for a format externally, and the repo would still point to it without any visible change. So we store the full versioned ID instead, the ID plus the version number, which is immutable. It means updating tests requires updating the link, but it also means the test suite can't be tampered with outside the repo.

Storing the full versioned ID also makes caching easier. Since it's immutable, we can cache responses from regex101 indefinitely - first time you view a regex we fetch it, every time after that it loads from cache.

![Regex 2.0](/images/devlog_show_your_work_regex.png[style=light])
![Regex 2.0](/images/devlog_show_your_work_regex.png[style=dark])

## Custom Formats

Custom format testing is harder. You want to verify that a format matches or doesn't match a release title, same as regex, but custom formats aren't just regex. They're combinations of conditions: regex patterns, quality specifiers, size limits, indexer flags. To test whether a format matches, you need to parse the release the same way Radarr and Sonarr do. Not approximately. Exactly.

My first thought was to spin up Radarr and Sonarr as microservices in the compose stack and query their parse endpoints directly. But that's wasteful; you'd need API keys, you'd have to add dummy titles, and the setup overhead made it miserable to work with. So instead, I pulled the `C#` parser code directly from Radarr and Sonarr, unified it under a single endpoint, and ran that as a microservice. Same parsing logic the arrs use, without the extra fluff.

With the parser in place, I added a parse table to the GUI. It breaks down each group of conditions and shows how they pass or fail, so you can see exactly why a format matched or didn't. Hopefully this makes debugging custom formats a bit less painful.

![CF 2.0](/images/devlog_show_your_work_cf.png[style=light])
![CF 2.0](/images/devlog_show_your_work_cf.png[style=dark])

## Quality Profiles

Quality profile testing was the hardest to solve. Unlike regex or custom formats, you're not just checking if something matches. You're checking if a profile *prioritises* releases correctly. Does it pick the right one? Does it skip the ones it should? Does it upgrade when it should?

I ended up with two solutions: a simple one and a complex one. For testing, we went with the simpler approach. Testing needs to be accessible. If no one can read or understand it, no one will use it.

The solution is entity-based testing. You define an entity (a movie, a TV series) and then define a set of releases for that entity. The same parser we use for custom formats determines which formats apply to each release, then scores get calculated based on the profile. From there, you can see exactly how the profile ranks everything: what it would grab, what it would skip, what it would upgrade to.

It's not "testing" in the same sense as regex or custom formats. It's more like a simulation. You're speeding up what you'd normally do manually: sync, interactive search, notice something's wrong, tweak, sync again, search again. Now you can do that loop entirely in Profilarr before anything touches your arr.

This feature isn't complete yet. I'm still figuring out how it can work for documentation, and I think testing is a good double purpose here. Rather than relying on written descriptions to explain what a profile does, users can see exactly how it behaves in practice. Define some releases, watch how the profile scores them, and suddenly the logic clicks in a way that documentation alone can't provide.

---

# Let Us Calculate

Simulation has limits. You're still observing behavior, not specifying it. You watch releases get ranked and hope the ranking matches your intent. If it doesn't, you tweak scores and simulate again. It's better than the sync-search-wait loop, but it's still trial and error.

What if you could skip the trial and error entirely?

Back to Leibniz:

:::quote
author: Gottfried Wilhelm Leibniz
year: 1685
---
The only way to rectify our reasonings is to make them as tangible as those of the Mathematicians, so that we can find our error at a glance, and when there are disputes among persons, we can simply say: Let us calculate, without further ado, to see who is right.
:::

# Property Based Profiles

Quality profiles are still backwards. You assign scores, then check if the behavior matches your intent. Scores first, behavior second. You're working in the wrong direction.

What if you could declare your intent directly? Not "REMUX gets 1500 points" but "REMUX always beats WEB-DL." Not "YIFY gets -10000" but "YIFY is always rejected." Not scores, but *properties*. Invariants. The rules that must hold, regardless of how the scores are configured.

And then: let the system calculate the scores for you.

This flips the entire workflow. Normally you assign scores, sync, search, observe behavior, realise it's wrong, tweak scores, repeat. You're working backwards; implementation first, then checking if it matches intent. Property-based profiles work forwards. You declare intent. The system derives implementation. If your intent is contradictory (A beats B, B beats C, C beats A), the system tells you before you waste an hour debugging.

To make this work, you need a way to express relationships precisely.

## Predicates

A **predicate** is just a description of releases. "REMUX" is a predicate. So is "WEB-DL with HDR" or "anything from YIFY." Predicates can be as simple or compound as you need.

## Propositions

A **proposition** is a claim about how predicates relate:

| Symbol | Meaning | Example |
|--------|---------|---------|
| `≻` | beats | `REMUX ≻ WEB-DL` |
| `≡` | ties | `BHDStudio ≡ FraMeSToR` |
| `★` | is the winner | `★Golden` |
| `⊘` | is rejected | `⊘YIFY` |

## Properties

A **property** is a collection of propositions that together define how a profile should behave. Here's what a real property might look like:

```
Φ = {
    Golden ≻ MA_SDR,        "REMUX+HDR+Atmos beats Movies Anywhere SDR"
    MA_SDR ≻ P+_HDR,        "Source quality over format"
    P+_HDR ≻ Trash,         "Even mediocre HDR beats garbage"
    ★Golden,                "Best release gets grabbed"
    ⊘Trash                  "Trash never gets grabbed"
}
```

## Solving

Each proposition you write translates directly into a mathematical constraint.

Take `REMUX ≻ WEB-DL`. What does that actually mean in terms of scores? It means: for any release matching REMUX and any release matching WEB-DL, the REMUX release must score higher. If we treat scores as variables, let's call the REMUX score `x₁` and the WEB-DL score `x₂`, then `REMUX ≻ WEB-DL` is just:

```
x₁ > x₂
```

Now stack a bunch of these together. A property set with ten propositions becomes a system of ten constraints. Twenty propositions, twenty constraints. And what do you have? A linear [constraint satisfaction problem](https://en.wikipedia.org/wiki/Constraint_satisfaction_problem).

Mathematicians and computer scientists have been solving these for decades. The question "does a set of linear inequalities have a solution, and if so, what is it?" has known, efficient answers.

For a simple case, `≻` relations form a hierarchy. Build a directed graph where each predicate is a node and each "beats" relation is an edge. If there's a cycle, you have a contradiction (more on that in a moment). If there's no cycle, [topologically sort](https://en.wikipedia.org/wiki/Topological_sorting) the graph. That gives you an ordering. Walk the ordering and assign decreasing scores and you're done. Guaranteed to satisfy every constraint.

For more complex cases - ties, specific score gaps, bounded ranges, we'd need [linear programming](https://en.wikipedia.org/wiki/Linear_programming). LP solvers take a system of linear inequalities and either find a feasible solution or prove none exists. This is the same math that optimises airline schedules and supply chains. Applying it to media profile scores is, frankly, overkill. But overkill means it works!

## Cycle Detection

Not all property sets have solutions. If you declare:

```
A ≻ B
B ≻ C  
C ≻ A
```

That's a cycle. A must score higher than B, B higher than C, C higher than A. Impossible. The solver catches this and tells you exactly where the contradiction is!

## Feasibility

This isn't shipping in v2. It might never ship at all. The math works, but that's a long way from "users can actually use this."

The current system: assign scores, observe behavior, tweak, is already hard for people. The Discord is full of questions about why profiles behave unexpectedly. Adding a formal constraint language doesn't magically fix that. It just moves the complexity somewhere else. Instead of "why did this score cause that behavior," it becomes "why did this property set produce those scores" or "why are my constraints unsatisfiable."

There's also the UI problem. How do you make predicate construction accessible? How do you visualise constraint graphs? How do you explain cycle detection errors to someone who just wants their movies to download correctly? I don't have good answers yet.

But I think it's worth writing about anyway. Even if property-based synthesis never becomes a feature, it's a useful thing to optimise *toward*. It clarifies what profiles actually are: not collections of numbers, but encoded intent. The numbers are just one valid implementation of that intent. Keeping that framing in mind shapes how we build everything else: testing, documentation, sharing.

Maybe someday.

# Tidbits

Here's a list of other random things that don't fit neatly into this log's structure.
- v2 is getting closer. Some days I'll write code for 12 hours and other days I'm playing Red Dead Redemption 2 for 12 hours. Balance. Progress is slowing down as I transition to implementing the repetitive tasks like edit functionality, dirty tracking, etc.
- I haven't touched the v1 codebase for a while. I feel pretty guilty about this since there are some outstanding cache bugs that really should have been merged into stable months ago, but just thinking about that god awful codebase makes me anxious. 
- I've written 2 wiki articles recently:
  - [Multi Episode Splitting](/wiki/multi-episode-splitting): A personal project I thought to share. 
  - [Anatomy of a Profile](/wiki/anatomy-of-a-profile): An ELI5 profile building guide at the request of [SFusion](https://discord.com/channels/1202375791556431892/1202375792416260169/1417300222605787156)! (Sorry it took so long)
- I added RSS feeds for the website, check the footer.
- On a more personal note, I finally finished my computer science degree this past december. Hopefully more time to code ( ͠° ͟ʖ ͡°)

That's all for today, thanks everyone. 