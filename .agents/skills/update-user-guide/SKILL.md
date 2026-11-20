---
name: update-user-guide
description: Update or extend the end-user documentation in `docs/user-guide/` after shipping a user-facing feature. Use when adding a new workflow, changing user-facing behavior in an existing workflow, expanding what a persona can do, or fulfilling/removing a "Coming soon" item. Targets the per-module folder under `docs/user-guide/<module>/` with its README + `workflows/` pages, and follows the templates in `docs/user-guide/_template/`.
---

# Update User Guide

End-user docs live in `docs/user-guide/<module>/` and are published to the GitHub Pages wiki on merge to `dev`. Update them whenever a user-facing change ships.

## When this skill applies

Trigger this skill when the change is **visible to a user in the UI**:

- New context-menu item, button, dialog, page, or wizard.
- New / changed validation rule, error message, or constraint a user can hit.
- Expanded or contracted capability of a persona (Viewer / Editor / Admin).
- Fulfilled or cancelled item from a module's *Coming soon* list.
- New permission gate that changes who can do what.

Skip this skill for purely internal refactors with no UI/behavior change. Those go to the [`update-technical-docs`](../update-technical-docs/SKILL.md) skill.

## Files you will touch

```
docs/user-guide/
├── README.md                        — module status table (only on first doc of a module, or status flip)
├── _template/
│   ├── README.template.md           — copy this when documenting a new module
│   └── workflow.template.md         — copy this when adding a new workflow
└── <module>/
    ├── README.md                    — module overview, personas, key concepts, workflow links, Coming soon
    └── workflows/
        └── <new-or-changed>.md      — one page per user-facing workflow
```

## Workflow

### 1. Map the change to its module + persona

- Which module folder owns this? (`systemHierarchy/`, `catalogue/`, `orders/`, …)
- Which persona gained/lost capability? (Viewer / Editor / Admin — see the persona table in the module's `README.md`)
- Does this fulfill a 🔮 *Coming soon* bullet? If yes, plan to delete that bullet.

If the affected module has **no folder yet**, copy `_template/README.template.md` to `<module>/README.md` and bump the row in the top-level `README.md` status table from 🚧 to 📝.

### 2. Decide: new workflow page, or edit existing one?

- **New workflow page** — when the change introduces a distinct user task (e.g. "Creating systems", "Bulk-exporting orders"). One workflow = one page.
- **Edit existing page** — when the change adjusts an already-documented flow (e.g. new field on an existing dialog, new validation rule, scope change to who can do it).

If editing an existing page, also re-read the module `README.md` — persona capabilities and the workflow link's one-line summary often need a touch.

### 3. Author following the templates

For a **new workflow**, start from `docs/user-guide/_template/workflow.template.md`. Required sections in order:

| Section | Required? | Notes |
|---|---|---|
| `# <Workflow title>` | yes | Imperative — "Creating systems", "Copying systems" |
| `## What this is for` | yes | 1-3 sentences. Lead with the user's intent + a key constraint. |
| `## Who can do this` | yes | Persona badge (✏️ / 👁️) + required role(s). Add 🔮 if Phase 1/2 changes the gate. |
| `## Prerequisites` | yes | Where the user must be, key concepts to know — link to README. |
| `## Steps` | yes | Numbered. **Bold-led** instruction sentence per step, then detail. `[SCREENSHOT PLACEHOLDER: <what should be visible>]` between steps where UI state matters. `[VIDEO PLACEHOLDER: <duration + scenario>]` at the end. |
| `## What gets <verb>ed` | optional | Use when the effect is non-obvious or partial — ✅/❌ bullets. |
| `## Limitations` | optional | Hard constraints (scope, depth caps, atomicity). |
| `## Tips & gotchas` | optional | Real tips/edge cases only. Don't pad. |
| `## Related` | yes | Sibling workflow links + cross-module pointers via the user-guide index. |

For a **new module**, start from `docs/user-guide/_template/README.template.md`. Required sections: Overview, Access & Responsibilities (today + 🔮 callouts), Key concepts, Layout, Common workflows (links), Coming soon, Data model reference (engineer-only block), Language.

### 4. Authoring rules

- **Audience is hybrid** — engineers and business users. Engineering parts may use precise terms (entity names, relationship names from the user's vocabulary); business parts stay plain.
- **Never reference code paths** (`.tsx`, hook names, file paths). Code-level details go to `docs/technical/`.
- **Match UI labels verbatim** to the EN locale at `src/i18n/src/locale/en.ts`. Wrap them in **bold** or *italic* exactly as the user sees them.
- **Placeholders, not images.** Every `[SCREENSHOT PLACEHOLDER: …]` must describe *what should be visible* — never a bare `[SCREENSHOT]`. Same for `[VIDEO PLACEHOLDER: …]` (include duration + scenario).
- **Tables for option matrices.** When a workflow has a parent→child rule, an allowed-combination matrix, or a `What gets copied / What does NOT` block — use a table or paired ✅/❌ lists.
- **Cross-link, don't duplicate.** Term definitions live in the module README's *Key concepts*. Link there, don't redefine.
- **English only.** The app is English-only today.

### 5. Update the module `README.md` if needed

After authoring the workflow, check the module README for:

- **Persona capabilities row** — if the new workflow added a capability for a persona, append it to the *Can do* cell (the verb form, comma-separated). Example: copy/paste shipped → add "copy systems" to Editor's capabilities.
- **Common workflows list** — add a bullet linking the new workflow file with its one-line summary.
- **Coming soon list** — if this change fulfilled a 🔮 bullet, **delete** that bullet entirely. Don't strikethrough.
- **Layout / Key concepts** — usually not needed, but if the change introduces a new term or panel, update accordingly.

### 6. Verification

- Open every link in the changed/new files locally — broken relative paths are the most common mistake.
- Grep the rest of `docs/user-guide/` for the old behavior if you removed/replaced a feature. Other workflow pages may reference it.
- If you bumped a row in the top-level `docs/user-guide/README.md` status table, double-check the link target exists.

### 7. Commit

Commit message format: `docs(<module>): <verb> <workflow> workflow`. Examples:

- `docs(systemHierarchy): document Create Subsystem flow`
- `docs(orders): update delivery flow for partial shipments`
- `docs(catalogue): drop 'Coming soon' bulk-import bullet (feature shipped)`

## Glossary alignment

Names must match `docs/CONTEXT.md` and the relevant `docs/technical/<feature>.md` page. If you're using a term that isn't already in CONTEXT.md, either pick an existing one or update the glossary in the **same PR** as the user-guide change.

## Common pitfalls

- **Leaving the *Coming soon* bullet** after shipping the feature. Always remove it.
- **Skipping the persona table update.** A new workflow almost always changes what at least one persona can do.
- **Linking to a workflow file that doesn't exist yet.** Create the file before the link.
- **Inventing UI labels.** Open `src/i18n/src/locale/en.ts` and copy the exact string.
- **Bare screenshot placeholders.** Always describe what the screenshot should show.
- **Mixing engineering details in.** No file paths, no hook names, no GraphQL fragments — those belong in `docs/technical/`.
