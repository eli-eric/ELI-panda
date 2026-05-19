---
name: update-technical-docs
description: Update or extend the engineering-facing documentation in `docs/technical/` after a code change that affects architecture, public hook/store surfaces, query/mutation contracts, module structure, or known maintenance items. Use when a feature ships, when a module is split or consolidated, when a new query/mutation is added or removed, when domain vocabulary changes, when an Open question is resolved, or when a decision is worth promoting to an ADR. Targets the cross-cutting pages, the per-feature pages under `docs/technical/<area>.md` and `systems-family/<page>.md`, the glossary in `docs/CONTEXT.md`, and the ADRs in `docs/adr/`.
---

# Update Technical Docs

Engineering docs live in `docs/technical/` and are published to the GitHub Pages wiki on merge to `dev`. Update them when the code change is visible at the level of **architecture, public surfaces, or load-bearing decisions** — not for every refactor.

## When this skill applies

Trigger this skill when a change affects what an engineer reading the docs would need to know:

- New / removed / renamed **public surface**: hook, store, container/component, GraphQL mutation, query key, REST endpoint.
- **Module layout change**: new folder under `src/modules/<feature>/components|hooks|store|utils|types/`, file moved, module renamed.
- **Cross-module integration** added or removed (a consumer of someone else's hook, store, or query key).
- **Domain vocabulary change** — a new term in conversations that lacks a glossary entry, or a renamed concept.
- **Maintenance recommendation / Open question / Deprecated item** resolved — close the loop in the relevant page.
- **Architectural decision** worth not re-litigating — promote to an ADR.

Skip this skill when the change is internal to an already-documented module and doesn't affect its public surface (e.g. extracting a helper inside an existing hook, renaming a local variable, adding a test for existing behavior).

For UI-only / behavior-only changes a user can see, use [`update-user-guide`](../update-user-guide/SKILL.md) instead. Many features need both.

## Files you may touch

```
docs/
├── CONTEXT.md                        — cross-cutting domain glossary (one-line entries + links)
├── adr/
│   ├── README.md                     — when/why to write an ADR
│   ├── 0000-template.md              — copy this for a new ADR
│   └── NNNN-<title>.md               — append-only; monotonic 4-digit numbering
└── technical/
    ├── README.md                     — index of cross-cutting + module pages (only on a new module/page)
    ├── app-architecture.md           — stack, module layout, request lifecycle (only on cross-cutting changes)
    ├── authentication.md             — NextAuth + Entra ID flows
    ├── permissions-model.md          — role inventory, @authorization, UI gates, audit
    ├── deployment-runbook.md         — environments, pipelines, env vars, rollback
    ├── local-development.md          — setup, conventions, troubleshooting
    ├── <feature>.md                  — e.g. catalogue-and-items.md, orders-and-order-items.md
    └── systems-family/
        ├── README.md                 — index for the family
        ├── system-hierarchy.md       — `/systems/hierarchy`
        ├── system-item.md            — `/system/[uid]`
        ├── systems-overview.md       — `/systems/overview`
        ├── relations-and-spares.md   — engineering relations + spare-for
        ├── moving.md                 — single + multi-move
        └── system-type-edit.md
```

## Workflow

### 1. Locate the right page(s)

Match the changed surface to its page:

| Change touches | Page |
|---|---|
| `src/modules/<feature>/` (existing feature) | `docs/technical/<feature>.md` or `systems-family/<page>.md` |
| `src/modules/systemHierarchy/` | `systems-family/system-hierarchy.md` |
| `src/modules/systemItem/`, `systemsRelations/`, `systemsMoving/`, `systems-multi-move/`, `system-type-edit/`, `systems/` | the matching `systems-family/<page>.md` |
| Cross-cutting: app shell, request lifecycle, env, scripts, Next config | `app-architecture.md` |
| NextAuth, Entra ID, JWT shape | `authentication.md` |
| Roles, `@authorization`, UI gates, audit | `permissions-model.md` |
| Deploy, env vars, Azure, rollback | `deployment-runbook.md` |
| Setup, lint/format/test infra, codegen | `local-development.md` |
| Domain glossary (cross-cutting names) | `CONTEXT.md` |
| Load-bearing decision worth recording | `docs/adr/NNNN-<title>.md` |

If the change touches an area that **doesn't have a page yet**, add a row to the relevant index (`docs/technical/README.md` or `systems-family/README.md`) and start a new file. Cross-link it from `CONTEXT.md` entries that point into it.

### 2. Read the page first

Per-feature pages have a recurring shape. Skim it before editing so you know which section to land in:

- **Module location** — folder tree of the module.
- **Layout** — Mermaid diagram or paragraph.
- **Query and mutation surface** — tables of hooks → operations.
- **Stores** — Zustand stores with field tables.
- **Tabs / sub-views** — if the module has them.
- **Notable flows** — Copy/Paste, Create, wizards, etc. — dedicated sections with rationale.
- **Tests** — pointers to spec clusters.
- **Deprecated / legacy** — flag what's on its way out.
- **Maintenance recommendations** — numbered, actionable.
- **Open questions** — bullets for unresolved trade-offs.
- **🔮 Planned** — roadmap items.
- **Data model reference** (engineer-only collapsed block) — entity definitions, line refs to `schema.graphql`.

The order varies per page. Don't invent new section names; reuse the ones already there.

### 3. Make the edits

Apply changes following the page's existing patterns:

**New hook → add a row to the relevant query/mutation table.** Include the operation name, cache-key behavior, and any non-obvious side effects (cache seeding, invalidation set, audit edges).

**New module folder → add a line to the *Module location* tree.** Keep alphabetical order or grouping consistent with the existing tree.

**New flow / dialog / wizard → add a dedicated section.** Cross-link the user-guide companion at the top of the section. Include parent → allowed-child rules, validation matrices, or option tables when they exist — tables are the right shape for these.

**Resolved a Maintenance recommendation or Open question → remove the bullet** (don't strike-through). If the resolution itself is load-bearing, write an ADR (see step 4).

**Renamed a term or introduced a new domain concept → update `docs/CONTEXT.md`** in the same PR. Add a one-line entry with a link to the page that owns the long definition.

### 4. Decide if this warrants an ADR

Write an ADR (`docs/adr/NNNN-<title>.md`) when:

- A design choice constrains downstream code in a way that isn't obvious from reading it (e.g. "we keep two separate Zustand stores because…", "permission check stays in the hook, not the resolver, because…").
- The user rejected a refactor with a reason future explorers would otherwise re-discover.
- A trade-off goes against the codebase's usual direction (depth, locality, testability) for a specific reason.

Don't write one for ephemeral reasons, self-evident defaults, or anything already enforced by lint/types/`CLAUDE.md`. See [`docs/adr/README.md`](../../docs/adr/README.md) for the full criteria. ADRs are append-only and monotonically numbered (`NNNN-kebab-title.md`).

If you're tempted to write an ADR but unsure, leave a bullet in the page's **Open questions** section instead. Promote to ADR later if it crystallizes.

### 5. Authoring rules

- **Engineer audience.** Hooks, store fields, GraphQL ops, query keys, file paths, line refs to `schema.graphql` — all fair game. Source code is the authoritative cross-reference.
- **Tables over prose** for hook → operation, store field → purpose, parent → allowed children, role → capability matrices.
- **Mermaid diagrams** for module-shape, request lifecycle, layout. Match the diagram style already on the page (don't introduce new shape vocabulary).
- **Cross-link, don't duplicate.** Glossary entries live in `CONTEXT.md`. Long definitions live on one page and other pages link to that section anchor.
- **Engineer-only block** uses the standard footer:
  ```markdown
  ## Data model reference

  > 🔧 *This section is for engineers reading the docs in the repo. The wiki generator strips it.*
  >
  > <schema refs and line numbers>
  ```
- **No marketing copy.** "Powerful", "flexible", "robust" don't belong here. State the contract, the trade-offs, the gotchas.
- **English only.**

### 6. Glossary alignment (`docs/CONTEXT.md`)

When you use a new term in a per-feature page, check `CONTEXT.md`:

- If the term is already there → make sure your usage matches.
- If it's a new cross-cutting concept → add a one-line entry that links to the page section that owns the long definition.
- If a term is renamed in code → grep `docs/` for the old name and update.

Names must match between **code**, **CONTEXT.md**, and the **per-feature page**. Drift across these three is the most common cause of repeat-suggested refactors.

### 7. Verification

- Open every relative link in the changed/new files — broken paths are the #1 mistake.
- `grep -ri "<oldTermOrFilename>" docs/` if you renamed something — other pages probably reference it.
- If you added a row to a query/mutation table, confirm the file path / operation name matches the actual export name in the code.
- If you wrote an ADR, confirm the four-digit number is the next monotonic value (`ls docs/adr/`).

### 8. Commit

Commit message format: `docs(<area>): <verb> <subject>`. Examples:

- `docs(systemHierarchy): document Create Subsystem flow`
- `docs(authentication): note the new refresh-token rotation`
- `docs(adr): 0007 keep two zustand stores for hierarchy + detail graph`
- `docs(CONTEXT): add 'Inherited subsystem field' glossary entry`

## Companion skill

When the same change is also user-visible, run [`update-user-guide`](../update-user-guide/SKILL.md) in the same PR. Keep both updates in one commit *or* one PR so they ship together.

## Common pitfalls

- **Documenting an internal helper** that no caller outside the module sees. Engineering docs are about public surfaces and decisions, not every file.
- **Adding a section name that doesn't already exist on the page.** Use the existing section vocabulary so cross-page readers know what to expect.
- **Skipping `CONTEXT.md`** when introducing a new term. Vocabulary drift kills the system.
- **Inventing an ADR for an ephemeral reason.** If it's not load-bearing, it goes in *Open questions*, not `docs/adr/`.
- **Forgetting the engineer-only block** for any sub-section that references file paths or `schema.graphql` lines. Wrap with the standard footer.
- **Forgetting the user-guide companion** when the change is also user-visible. The two skills compose.
