# Map interaction model: overlay thumbnails, slideshow, two click targets

The map is the homepage centerpiece, modelled on WikiRug's rug map. It is an inline SVG built from DataMeet India state boundaries (chosen for the official Survey of India border depiction). Craft thumbnails are overlaid at their Origin's coordinates *inside* the state — not one image per state — with coordinates auto-extracted from Wikipedia by the content pipeline. Where one Place has several Crafts, the thumbnail cycles through them as a slideshow on hover (desktop) or carries a "+n" badge (mobile, which has no hover). There are two distinct click targets: a thumbnail navigates directly to that Craft's page; the state background opens a side panel (desktop) / bottom sheet (mobile) listing all the state's crafts, which itself links to the dedicated, shareable state page.

## Considered Options

- **One featured-craft image per state** — rejected by the maintainer: understates multi-craft states and hides the collection's richness.
- **Panel-only navigation (thumbnails not clickable)** — rejected: pretty thumbnails that don't act feel broken; users will click them anyway.
- **Zoom-in drill-down map** — rejected for v1: double the map artwork/data work and fights small phone screens. Possible v2.

## Consequences

- Every Place in the content model must carry map coordinates; the pipeline derives them, with hand-tuning as the escape hatch.
- States with no Canon craft yet show no overlay — the map visibly fills as the Backlog is processed, which is a feature (progress is legible), not a bug.
