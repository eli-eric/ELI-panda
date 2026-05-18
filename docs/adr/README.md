# Architecture Decision Records (ADRs)

Short, append-only records of architectural decisions that future contributors (and AI agents) should not re-litigate without a load-bearing reason.

Until this directory grows, the existing **Maintenance recommendations**, **Open questions**, **Deprecated / legacy**, and **🔮 Planned** sections in [`docs/technical/`](../technical/README.md) act as informal ADRs — promote any entry from there to a proper ADR here when a real decision crystallizes.

## When to write an ADR

Write one when:

- The user rejects a proposed refactor with a reason that future explorers would otherwise re-discover and re-suggest (most common trigger; see the `improve-codebase-architecture` skill).
- A design choice constrains downstream code in a way that isn't obvious from reading the code.
- A choice trades off something the codebase otherwise pushes for (e.g. depth, locality, testability) for a project-specific reason.

Do **not** write an ADR for:

- Ephemeral reasons ("not worth doing right now") — those belong in an **Open question** in the per-feature page.
- Self-evident decisions already enforced by lint, types, or `CLAUDE.md`.
- Decisions that match the obvious default — no future explorer will fight you on them.

## File naming

`NNNN-kebab-title.md`, four-digit zero-padded, monotonically increasing. Once an ADR is merged, its number is fixed.

Example: `0001-pages-router-not-app-router.md`.

## Format

Copy [`0000-template.md`](./0000-template.md). Keep entries short — context, decision, consequences, in that order.

## Status lifecycle

- **Proposed** — opened for discussion.
- **Accepted** — current state.
- **Superseded** — replaced; link to the ADR that replaces it. Do not delete superseded ADRs.
- **Deprecated** — no longer applies, but no successor.

## See also

- [`docs/CONTEXT.md`](../CONTEXT.md) — cross-cutting domain vocabulary.
- [`docs/technical/`](../technical/README.md) — per-feature engineering pages.
- [`.agents/skills/improve-codebase-architecture/SKILL.md`](../../.agents/skills/improve-codebase-architecture/SKILL.md) — references ADRs when a deepening proposal contradicts an existing decision.
