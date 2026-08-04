# ADR 0001 — Scope the leaves endpoint with `directOnly`, don't reuse `/subsystems`

- **Status**: Accepted
- **Date**: 2026-08-04
- **Deciders**: Jan Smrcka
- **Related**: [`systems-family/system-hierarchy.md` § Direct end systems](../technical/systems-family/system-hierarchy.md#direct-end-systems) · [ELI-panda#1143](https://github.com/eli-eric/ELI-panda/pull/1143) · [eli-panda-api#430](https://github.com/eli-eric/eli-panda-api/pull/430)

## Context

The hierarchy explorer had no way to answer **"what hangs directly off this node"**. The tree returns only nodes that have children, so end systems never appear in it; the leaves table returns every end system below the selected node (`HAS_SUBSYSTEM*1..50`), so a node's own direct end systems drown among everything deeper. End systems sitting high in the hierarchy were effectively unreachable.

A REST endpoint that looks like the obvious answer already existed: `GET /system/{uid}/subsystems` returns a node's direct children, and its Cypher `RETURN` block is character-for-character identical to the leaves one — same fields, same `statistics`, same `physicalItem`. It is used by the systems overview for lazy row expansion.

## Decision

Add an optional `directOnly=true` query parameter to `GET /system/{uid}/leaves` (and its `/count` sibling) that narrows the traversal from `*1..50` to `*1..1`, rather than pointing the hierarchy table at `/system/{uid}/subsystems`.

The existing `WHERE NOT (sys)-[:HAS_SUBSYSTEM]->(:System{deleted:false})` clause is what makes depth 1 mean *direct end systems* rather than *all direct children*, so the feature needs no new predicate — only the depth changes.

## Consequences

- **Positive** — search, column filters, sorting, pagination and `totalCount` keep working and **compose** with the new scope, because nothing about the request pipeline changes. The frontend gains one boolean argument on `useSystemLeaves`; there is no second data path, no client-side sorting mode, and no conditional pagination.
- **Positive** — the flag is part of the TanStack query key, so the two scopes never serve each other's rows.
- **Negative** — the feature spans two repositories and two deploys. Until the API ships, the parameter is ignored and the checkbox returns the full list: ineffective, not broken.
- **Neutral** — `GetSystemLeavesByParentUID` must pass the same flag to its internal count query, or pagination is computed over a different set than the rows. This is a correctness constraint, not a preference, and is covered by a test that asserts both queries agree on the depth.

## Alternatives considered

**Point the hierarchy table at `/system/{uid}/subsystems`.** The response shape matches, so this looks like reuse rather than new API surface — which is exactly why a future reader will suggest it. It fails on everything around the payload: the endpoint accepts no parameters at all. No search, no filters, no sorting, no pagination, a bare array capped at `LIMIT 1000`. Adopting it would have meant a second data-fetching path in the leaves panel, client-side sorting and filtering for one mode only, hiding the pagination control, and a UX compromise where the checkbox and the filter sheet are mutually exclusive. Against that, the chosen route is roughly six lines of Cypher.

**Express it as a column filter (`directOnly` in `columnFilter`).** Tempting because it arrives at the backend already parsed and would render a removable badge for free. Rejected on two counts. Semantically it is a *scope*, not a filter: it decides which set is under consideration, so it should compose with filters rather than sit among them. Mechanically, `useFormFilter` clears all column filters whenever the search value changes (`src/hooks/form/useFormFilters.ts:106`), so typing into search would silently switch the mode off.

**A `depth=N` integer instead of a boolean.** More general, and the hierarchy does have five levels. Rejected because the generality is fake: with the end-system predicate in place, `depth=3` would blend leaves from levels 1 through 3 into one list, which answers no question anyone asks. The boolean states the intent and has no invalid values to validate.

**A separate `/leaves/direct` endpoint.** Leaves the existing contract untouched, but duplicates the entire handler and Cypher query — filters, sorting, pagination and all. That is the same duplication the `/subsystems` route was rejected for, just written by us.
