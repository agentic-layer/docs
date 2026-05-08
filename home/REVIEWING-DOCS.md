# Reviewing Docs Changes

A one-page checklist for reviewing pull requests that change documentation in any repo aggregated by this site (`agent-runtime-operator`, gateway operators, `observability-dashboard`, `testbench`, `showcase-news`, `guardrail-adapter`, and this `docs` home repo).

## Build verification

- [ ] The contributor ran `scripts/local-build.sh` from the docs repo and the build exited 0. Confirm in the PR description or by running it yourself.
- [ ] No new Antora warnings or errors compared to the base branch (kroki/plantuml warnings when docker is offline are acceptable).
- [ ] Every new page renders in `build/site/` at the expected path.

## Diátaxis category purity

Each page must fit one Diátaxis category — `tutorial`, `how-to-guide`, `reference`, or `explanation`. Templates with the acceptance criteria live at `home/templates/{tutorial,how-to-guide,reference,explanation}.adoc`.

- [ ] **Tutorials** (showcase repos only): linear path; concrete commands and expected output; one outcome. No branching, no reference tables, no concept teaching.
- [ ] **How-to guides**: goal-shaped ("how do I do X?"); assume context; concrete steps; link out for reference and explanation. No tutorials, no field tables, no long concept prose.
- [ ] **Reference**: information-shaped; tables, field lists, full API surface; exhaustive within scope; ctrl-F-able structure. No tutorials, no decision trees, no "why" explanations.
- [ ] **Explanation**: understanding-shaped; what/why/how-it-fits/trade-offs; cross-link to how-to and reference. No step-by-step instructions, no exhaustive field listings.

If a section drifts, move it. The template comment blocks list the drift signals.

## Layout and naming

- [ ] Files live under `docs/modules/<module>/pages/` — never `partials/`. The partials indirection is gone everywhere.
- [ ] Single page per category per module: `tutorial.adoc` / `how-to-guide.adoc` / `reference.adoc` / `explanation.adoc`. When a category needs multiple pages, use a `how-to-guides/` (or `tutorials/`) subdirectory.
- [ ] Option A repos use module name `ROOT`. Option B repos (only `agent-runtime-operator` today) use feature-named modules.

## Xrefs

- [ ] Cross-repo xrefs use the implicit-ROOT form: `xref:<repo>::<page>.adoc[]`, not `xref:<repo>:ROOT:<page>.adoc[]`.
- [ ] When a target page renames or moves, every xref into it is updated in the same PR (or in lockstep PRs across affected repos). The build catches the unresolved ones.

## Source-of-truth alignment

- [ ] Reference pages match the actual code: CRD field types, CLI flags, env vars, endpoints. Spot-check at least one field against the Go struct or source file.
- [ ] CLAUDE.md `@`-references in the affected repo point at `pages/`, not `partials/`, and at the new file paths.
- [ ] If the page was split or moved, repo-internal xrefs (e.g. "see install" pointers) target the new path.

## Scope hygiene

- [ ] The PR doesn't touch unrelated files. Documentation PRs should stay in `docs/`, `CLAUDE.md`, and (where applicable) `docs/antora-playbook.yml` plus `home/modules/*/partials/nav.adoc` in the docs repo.
- [ ] Cross-repo coupling: when a path change in one repo breaks an xref in another repo, the same logical change updates both — no orphan broken xrefs.

## Tutorials and showcases

- [ ] Tutorial-shaped content lives only in showcase repos. Component repos do not get tutorials.
- [ ] Showcase repos may bypass the per-category Diátaxis split if the whole repo is a single tutorial-as-product (current example: `showcase-news`).

## Common drift patterns to flag

- "Quick Start" / "Your First X" framing in a how-to → that's tutorial-shaped; it belongs in a showcase repo.
- Field tables in a how-to → move to reference.
- "When to use X vs Y" decision prose in a how-to → move to explanation.
- `kubectl` commands in an explanation → move to how-to.
- Repeated CRD field listings across multiple repos → keep CRD reference in `agent-runtime-operator` (the CRD owner); cross-link from implementation repos.
