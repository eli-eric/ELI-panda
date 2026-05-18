---
name: improve-codebase-architecture
description: Find deepening opportunities in the ELI PANDA codebase, informed by the domain glossary in `docs/CONTEXT.md`, the per-feature pages in `docs/technical/`, the ADRs in `docs/adr/`, and the conventions in `CLAUDE.md`. Use when the user wants to improve architecture, find refactoring opportunities, consolidate tightly-coupled modules, or make the codebase more testable and AI-navigable.
---

# Improve Codebase Architecture

Surface architectural friction in this codebase and propose **deepening opportunities** — refactors that turn shallow modules into deep ones. The aim is testability and AI-navigability.

## Glossary

Use these terms exactly in every suggestion. Consistent language is the point — don't drift into "component," "service," "API," or "boundary." Full definitions in [LANGUAGE.md](LANGUAGE.md).

- **Module** — anything with an interface and an implementation (a function, a hook, a `.cont.tsx`/`.comp.tsx` pair, a Zustand store, a feature folder under `src/modules/`, a server-side helper).
- **Interface** — everything a caller must know to use the module: types, invariants, error modes, ordering, config. Not just the TypeScript signature.
- **Implementation** — the code inside.
- **Depth** — leverage at the interface: a lot of behaviour behind a small interface. **Deep** = high leverage. **Shallow** = interface nearly as complex as the implementation.
- **Seam** — where an interface lives; a place behaviour can be altered without editing in place. (Use this, not "boundary.")
- **Adapter** — a concrete thing satisfying an interface at a seam.
- **Leverage** — what callers get from depth.
- **Locality** — what maintainers get from depth: change, bugs, knowledge concentrated in one place.

Key principles (see [LANGUAGE.md](LANGUAGE.md) for the full list):

- **Deletion test**: imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.
- **The interface is the test surface.**
- **One adapter = hypothetical seam. Two adapters = real seam.**

This skill is _informed_ by PANDA's technical docs. They give names to good seams and record decisions the skill should not re-litigate.

## Project context this skill relies on

- **`docs/CONTEXT.md`** — cross-cutting domain glossary. The first place to look when naming a deepened module. Authoritative *names*; full definitions live on the per-feature pages it links to.
- **`docs/technical/app-architecture.md`** — stack, module layout, request lifecycle, deprecated/legacy clusters, maintenance recommendations. Read this first when proposing cross-cutting refactors.
- **`docs/technical/<feature>.md`** (e.g. `orders-and-order-items.md`, `catalogue-and-items.md`, `permissions-model.md`, `systems-family/*.md`) — per-feature domain vocabulary and known integration points. Read the page covering the area you're touching before naming anything.
- **`docs/adr/`** — architecture decision records. Check this directory for prior decisions that would conflict with a proposed refactor. See `docs/adr/README.md` for when an ADR should be written.
- **`CLAUDE.md`** — coding conventions, container/component split, toast/fetch/modal patterns.
- **`.agents/skills/architecture/SKILL.md`** — canonical folder layout and file-naming rules. A deepening proposal that moves code must respect these or call out the deviation explicitly.

The ADR directory is intentionally lightweight today. Decisions also live in the **Maintenance recommendations**, **Deprecated / legacy**, **Open questions**, and **🔮 Planned** sections of the per-feature pages and `app-architecture.md` — treat those sections as informal ADRs and promote them into `docs/adr/` when a real decision crystallizes.

## Process

### 1. Explore

Read `docs/CONTEXT.md` for vocabulary, the relevant `docs/technical/` page(s) for the area, and `app-architecture.md` for anything cross-cutting. Scan `docs/adr/` for any decision that touches the area. Note the existing **Maintenance recommendations** and **Open questions** in the technical pages — your proposals should either build on them or explain why they're wrong.

Then use the Agent tool with `subagent_type=Explore` to walk the codebase. Don't follow rigid heuristics — explore organically and note where you experience friction:

- Where does understanding one concept require bouncing between many small modules?
- Where are modules **shallow** — interface nearly as complex as the implementation?
- Where have pure functions been extracted just for testability, but the real bugs hide in how they're called (no **locality**)?
- Where do tightly-coupled modules leak across their seams?
- Which parts of the codebase are untested, or hard to test through their current interface?

Apply the **deletion test** to anything you suspect is shallow: would deleting it concentrate complexity, or just move it? A "yes, concentrates" is the signal you want.

#### PANDA-specific friction patterns to look for

The codebase has recurring shapes that often produce shallow modules. Use these as prompts, not as a checklist:

- **`.cont.tsx` leaking into `.comp.tsx`** — a "pure" component that still reads from a store, calls a mutation, or knows about GraphQL types. The container's interface is wider than it looks. Deepening usually means pulling logic back into the container (or a hook) and narrowing the props the `.comp.tsx` receives.
- **Hooks extracted for tests, then called from one place** — a `useXyz` hook whose body is small and whose only caller is one container. The deletion test usually clears it.
- **Mutation glue around `queryMutate`** — wrappers that re-throw, re-shape, or re-toast around an axios-shaped response. The duplication is locality begging to live behind `toast.promise` (see the `toast` skill) or a typed mutation helper.
- **Filter / table state spread across module store + `useTableStateStore` + URL params** — three places to update when a filter is added. A deeper module owns the filter state and exposes a small read/write interface.
- **Modal duality** — code that touches both `useModalStore` (legacy) and `useDynamicModalStore` (current). See `app-architecture.md` "Maintenance recommendations" #3; new proposals should pick the dynamic side.
- **`fetchClient` / `axiosInstance` / `queryMutate`'s `AxiosResponse<T>` shape** — three transports for the REST gateway. The interface is wider than the work needs (see `app-architecture.md` "Maintenance recommendations" #1).
- **Form module + Zod schema + RHF wiring repeated per feature** — wizard steps, field-level Zod, RHF resolver bindings duplicated across `src/modules/<feature>/components/`. Look for a deeper "form module" the feature can instantiate.
- **GraphQL query + custom hook + container plumbing** — a query is defined in `queries/`, a typed hook generated by codegen, then re-wrapped by a feature hook that adds one parameter. Often the codegen-generated hook is already deep enough.

These are pointers, not mandates. Use the deletion test before proposing any of them.

### 2. Present candidates

Present a numbered list of deepening opportunities. For each candidate:

- **Files** — which files/modules are involved (use repo-relative paths like `src/modules/orders/Orders.cont.tsx:42`)
- **Problem** — why the current architecture is causing friction
- **Solution** — plain English description of what would change
- **Benefits** — explained in terms of locality and leverage, and also in how tests would improve

**Use `docs/CONTEXT.md` + `docs/technical/` vocabulary for the domain, and [LANGUAGE.md](LANGUAGE.md) vocabulary for the architecture.** If `docs/CONTEXT.md` (and `docs/technical/orders-and-order-items.md`) calls something an "order line," say "the order-line intake module" — not "the OrderItemHandler," not "the order-item service."

**Existing decision conflicts**: if a candidate contradicts an ADR in `docs/adr/`, or an item in a `docs/technical/` page's **Maintenance recommendations**, **Open questions**, or **Deprecated / legacy** section, mark it clearly (e.g. _"contradicts ADR-0007 — but worth reopening because…"_ or _"contradicts `app-architecture.md` Maintenance rec #2 — but worth reopening because…"_). Don't list every theoretical refactor those sources forbid.

Do NOT propose interfaces yet. Ask the user: "Which of these would you like to explore?"

### 3. Grilling loop

Once the user picks a candidate, drop into a grilling conversation. Walk the design tree with them — constraints, dependencies, the shape of the deepened module, what sits behind the seam, what tests survive. The companion `grill-me` skill describes the cadence.

Side effects happen inline as decisions crystallize:

- **Naming a deepened module after a concept that's not in `docs/CONTEXT.md`?** Add a short entry to `docs/CONTEXT.md` (one or two lines + link to the per-feature page that owns the long definition). If the long definition doesn't exist yet, add it to the relevant `docs/technical/` page (or `app-architecture.md` if it's cross-cutting). Don't invent terminology that lives only in code.
- **Sharpening a fuzzy term during the conversation?** Update `docs/CONTEXT.md` and the per-feature doc right there. Vocabulary drift across docs is the most common cause of repeat re-suggestions.
- **User rejects the candidate with a load-bearing reason?** Offer to record it as an ADR under `docs/adr/`, framed as: _"Want me to record this as an ADR so future architecture reviews don't re-suggest it?"_ Use the template at `docs/adr/0000-template.md`. Only offer when the reason would actually be needed by a future explorer to avoid re-suggesting the same thing — skip ephemeral reasons ("not worth it right now") and self-evident ones. For ephemeral or open-ended rejections, an **Open question** entry in the per-feature `docs/technical/` page is the right home instead.
- **Want to explore alternative interfaces for the deepened module?** See [INTERFACE-DESIGN.md](INTERFACE-DESIGN.md).
- **Deepening crosses into a domain another skill already owns?** Defer to it for the implementation shape: `fetching` for query/mutation hooks, `toast` for mutation feedback, `modals` for dialog/sheet wiring, `tables` for `PandaTableV2`, `wizard` for multi-step forms, `architecture` for where new files land. The architectural argument is still yours; the local pattern is theirs.
