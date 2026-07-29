# Auto-published LLM content, grounded in retrieved sources, with a reader correction loop

Craft pages are researched (Tavily) and drafted (LLM) by a pipeline script, then published **without human pre-review** — a deliberate speed-over-gatekeeping trade the maintainer chose explicitly. Two mechanisms carry the trust burden instead. First, a hard grounding rule enforced by the pipeline: every inline `[n]` citation must map to a URL that Tavily actually retrieved, mechanically verified before publish — model memory is never a Source, which eliminates invented-citation hallucinations. Second, a reader correction loop: every page carries an honest "researched by AI" notice and a "Suggest an edit" button that opens a pre-filled GitHub issue; the maintainer reviews Corrections whenever, no SLA.

## Considered Options

- **LLM drafts, human reviews every page before publish** — rejected by the maintainer: makes 40+ launch pages depend on one person's review time; the correction loop was preferred.
- **Fully automatic with no reader recourse** — rejected: a hallucination with no pressure valve silently rots the site's credibility with exactly the friends it serves.
- **LLM researches, humans write all prose** — rejected: abandons the speed that makes the Canon-then-Backlog scope feasible.

## Consequences

- The repo must be public, or non-collaborator readers cannot file Correction issues.
- Obscure Backlog crafts have thin web coverage — the highest hallucination risk sits exactly where sources are fewest. The grounding rule helps (no fake citations) but cannot fix misreadings of real sources; Corrections are the only backstop there.
- Page freshness is honest: each page states what it was generated from and when.
