# Contributing a Craft page

Tana Bana is built by friends. To add a new Craft page, you only need a GitHub account — no command line.

## How to add a craft

1. Go to [`src/content/craft/`](https://github.com/zer0sand1/textile-of-india/tree/main/src/content/craft) on GitHub.
2. Click **Add file → Create new file**.
3. Name it something short, e.g. `bandhani.md`.
4. Paste the template below and fill in the fields between the `---` dashes. Required fields are marked.
5. At the bottom, describe your change briefly and select **Create a new branch and start a pull request**.
6. Click **Commit new file**.

## Template

```markdown
---
name:          # Required — the craft name (e.g. Bandhani)
alternateNames:
  -             # Optional — other names for this craft
technique:      # Required — one of: weave, embroidery, block-print, resist-dye, hand-paint
origins:
  -             # Required — one or more place slugs (lowercase, hyphenated)
summary:        # Required — one-line description
history: >      # Optional — a paragraph on the craft's history
howItsMade: >   # Optional — a paragraph on how it's made
motifsAndMaterials: > # Optional — motifs, materials, colours used
images:
  - src:        # Optional — path like /images/photo.jpg
    alt:        # Alt text for the image
    credit:
      author:   # Required for each image — photographer or artist name
      license:  # Required — e.g. CC BY-SA 4.0
      sourceUrl: # Required — URL of the image source
sources:
  - title:      # Required — source title
    author:     # Required — author or site name
    url:        # Required — source URL
    year:       # Optional — publication year
    accessed:   # Optional — date accessed (YYYY-MM-DD)
---
```

## After you open a PR

A preview of your page will appear on Vercel within a few minutes. The maintainer will review and merge it.

If something is wrong, the PR checks will show a red ❌ — click **Details** to see what to fix.
