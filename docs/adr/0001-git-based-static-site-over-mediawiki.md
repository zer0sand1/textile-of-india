# Git-based curated static site, not a wiki platform

Tana Bana is inspired by WikiRug (a MediaWiki encyclopedia), but its goal is a small, fast site for a friend group — so it is a curated static site whose content lives as Markdown files in this public git repo. Friends contribute by editing files through GitHub's web UI and opening pull requests; the maintainer reviews and merges. No CMS is added day one; one can be bolted on later without restructuring if friends struggle with raw Markdown.

## Considered Options

- **Real MediaWiki** — rejected: hosting + PHP/MySQL maintenance burden, and the interactive India map would become a custom extension project. Heavy for a friend group.
- **Decap CMS from day one** — rejected for now: form-based editing is nicer for non-technical friends, but adds auth and config surface before we know it's needed. Plain GitHub editing plus a strict page template is enough to start.

## Consequences

- Content review happens through PRs, so hosting was chosen for PR deploy previews (Vercel) — a friend's content PR can be reviewed as a rendered page, not a raw diff.
- The Craft template is enforced at build time by a schema (zod content collections), which substitutes for wiki-style editorial oversight.
