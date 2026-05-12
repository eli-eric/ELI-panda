# Systems Moving

The Systems Moving module is the place to **re-parent a single system** — move it (and everything beneath it) to a new place in the hierarchy. The page is a two-pane explorer: pick the system to move on one side, the new parent on the other, drag-and-drop to commit. Use it when the facility's organisation shifts (e.g. a subsystem is consolidated under a different key system) or when an item was originally placed under the wrong parent and needs to be relocated without losing its identity, history, or downstream relationships.

The move is *not* a copy. The system keeps its UID, its name, its physical item, its relationships, and its full change history; only the `HAS_SUBSYSTEM` link to its parent is replaced. A `WAS_MOVED_FROM` audit entry is added so that the previous lineage is recoverable from history.

`[SCREENSHOT PLACEHOLDER: Systems Moving landing — two side-by-side trees, left pane labeled with active filters, right pane scrolled to a different branch, a row in the left pane mid-drag with its system name displayed in the drag preview]`

## Access & Responsibilities

**Today's reality:**
- `systems-view` — read-only access to both panes. Can browse and filter; drag is allowed but the move dialog's *Save* button is inactive.
- `systems-edit` — full edit. Drag a system to a new parent, edit its fields in the confirmation dialog, and commit the move.
- `admin` — same as Editor.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `systems-view` | Browse both tree panes, filter and search independently in each, inspect the destination's parent path; drag is allowed but the *Save* button in the dialog is disabled |
| ✏️ **Editor / Admin** | `systems-edit` or `admin` | Drag a system to a new parent, adjust editable fields in the confirmation dialog, save to commit the move |

> 🔮 **Coming soon — Phase 1: split between Editor and Admin** — re-parenting systems at `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT` will become admin-only. Editors will be limited to re-parenting at `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, and `TRASH`.

> 🔮 **Coming soon — Phase 2: team-based scoping** — only members of the system's *responsible team* will be allowed to move that system and its subtree.

> 🔮 **Coming soon — drag-and-drop directly in the System Hierarchy.** Today re-parenting lives in this dedicated module; eventually it will be available from the [System Hierarchy](../systemHierarchy/README.md) tree directly, and this module will be retired.

## Key concepts

- **Move** — change the parent of a system. The system itself (its data, history, relationships, attached physical item) is preserved; only the parent link changes.
- **Source** — the system being moved. Dragged from one of the two panes.
- **Destination (new parent)** — the system that will become the source's new parent. The drop target.
- **`HAS_SUBSYSTEM`** — the parent-child relationship that defines the hierarchy. The move replaces the source's existing `HAS_SUBSYSTEM` link with a new one to the destination.
- **`WAS_MOVED_FROM`** — the audit relationship written to the old parent on every move. Carries a timestamp and the user who triggered the move. The previous parent's UID is recoverable from this link.
- **Cycle** — moving a system *into* its own subtree (under one of its own descendants). This is detected and refused before the dialog opens.

## Layout

A two-pane tree explorer. Each pane is an independent systems table with its own search, filters, column visibility, and selection — the same component used in [Systems Relations](../systemsRelations/README.md), here with **drag-and-drop** turned on.

- **Left and right panes — identical layout.** Each pane has its own toolbar (search + filter + column visibility) and shows the systems tree with expandable rows. Each can be collapsed independently with the ± button at its top corner to give the other pane more horizontal space.
- **Vertical divider** between the panes. A 4 px gray rule reinforces the two-tree workflow.
- **Drag source** — every system row is draggable. The drag preview is the system's name; the drop affordance lights up as you hover a candidate row in the opposite pane.
- **Drop target** — any system row in either pane (including the same pane). The drop target becomes the new parent; the dragged row becomes the source of the move.

`[SCREENSHOT PLACEHOLDER: dual-pane layout — left pane expanded to a deep leaf, right pane on a different branch, a row in the right pane highlighted as a drop target while a row from the left pane is mid-drag]`

## Common workflows

- [Moving a system to a new parent](./workflows/moving-a-system.md) — the drag-and-drop happy path: pick the source, find the destination, drop, confirm in the dialog, save.
- [Resolving move validation errors](./workflows/resolving-validation-errors.md) — what to do when the move is refused: cycle into own subtree, dropping on self.

For renaming, changing the level, the type, or other system attributes — see *Editing system details* in the [System Hierarchy](../systemHierarchy/README.md) module. The dialog in this module surfaces a small subset of editable fields for last-mile cleanup *during* a move; the canonical place to edit a system is the detail page.

## Coming soon

- 🔮 **Drag-and-drop in the System Hierarchy tree** — eliminates the need for a dedicated module; this page will eventually retire.
- 🔮 **Multi-system move** — already partially live as a separate workflow; see [Systems Multi-Move](../README.md).
- 🔮 **Move preview** — a side-by-side before/after of the destination subtree before commit.
- 🔮 **Move history view** — surfacing `WAS_MOVED_FROM` audit records on the system's *History* tab with a one-click *Revert move* affordance.
- 🔮 **Permission Phase 1 / Phase 2** — see [Access & Responsibilities](#access--responsibilities) above.

`[VIDEO PLACEHOLDER: 50s end-to-end — open Systems Moving → filter left pane to the source system → filter right pane to the desired parent → drag the source onto the destination → dialog opens with Target System and form → adjust responsible person → Save → toast confirms the move → reload to see the new lineage in System Hierarchy]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The Confluence generator strips it.*
>
> The move is implemented by a custom Neo4j resolver (`MoveSystemMutation`) that, in one transaction: disconnects any existing `HAS_SUBSYSTEM` edge into the source, creates a new `HAS_SUBSYSTEM` from the destination, and adds a `WAS_MOVED_FROM` edge to the prior parent carrying `timestamp` and `userUid`. Edits to other fields go through `UpdateSystemMovingMutation` and are committed *before* the move (the dialog runs both mutations sequentially). See `src/server/apollo/resolvers/moveSystemResolver.ts`.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
