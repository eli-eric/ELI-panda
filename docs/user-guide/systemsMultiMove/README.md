# Systems Multi-Move

The Systems Multi-Move module is the place to **re-parent many systems at once** to a single new parent. Where [Systems Moving](../systemsMoving/README.md) handles one-at-a-time drag-and-drop relocations, this page is the bulk equivalent: pick a set of source systems on the left, pick a single destination on the right, click *Move Systems here*. Use it during reorganisations of the facility, when consolidating a number of orphaned subsystems under a freshly-created parent, or when a refactor of the tree needs to be applied in one transaction.

Every selected source keeps its identity — UID, name, code, type, attached physical item, engineering relationships, persons, attachments, and full change history. Only each source's `HAS_SUBSYSTEM` link to its parent is replaced. The descendants of each source come along, since they are reached through their parent's edge.

`[SCREENSHOT PLACEHOLDER: Systems Multi-Move landing — two side-by-side tables, left labeled implicitly with multi-select checkboxes (Systems to Move), right with a single-select destination column, the Move Systems here button visible on the destination's Name row]`

## Access & Responsibilities

**Today's reality:**
- The page itself is **gated by `systems-edit`** at the route level. Viewers cannot open it; the sidebar entry is hidden for users without the role.
- `admin` has the same access as Editor today.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `systems-view` | *Cannot access this module.* The route requires `systems-edit`. Read-only access to the same hierarchy is available through the [System Hierarchy](../systemHierarchy/README.md) and [Systems Overview](../systems/README.md) modules. |
| ✏️ **Editor / Admin** | `systems-edit` or `admin` | Open the page, select one or more source systems on the left, select exactly one destination on the right, and commit the bulk move |

> 🔮 **Coming soon — Phase 1: split between Editor and Admin** — moves involving systems at `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT` levels will become admin-only.

> 🔮 **Coming soon — Phase 2: team-based scoping** — bulk moves will require responsible-team membership on each affected source.

## Key concepts

- **Source system (one of many)** — a system selected on the left pane to be relocated. Every selected source is moved to the *same* destination in a single submission.
- **Destination (new parent)** — the single system selected on the right pane that will become the new parent of every source.
- **Bulk move** — one server transaction that re-parents all selected sources under the destination. Each source's existing parent link is replaced; an audit entry is written.
- **Selection guard** — the rules that decide which rows are pickable in each pane (no self-move, no ancestor-under-descendant, no current-parent destination). See [Selection rules and validation](./workflows/selection-rules-and-validation.md).
- **HAS_SUBSYSTEM** — the hierarchy parent-child edge. The move replaces each source's existing `HAS_SUBSYSTEM` with a new one to the destination.

## Layout

A two-pane table layout, similar to [Systems Moving](../systemsMoving/README.md) but with different selection semantics in each pane.

- **Left pane — *Systems to Move*.** Multi-select. Each row has a checkbox; a header *select-all* checkbox is provided for the top-level systems in the current filter. Standard system columns: name, system code, type, zone, location, responsible person, description, physical-item metadata.
- **Right pane — *Target parent system*.** Single-select. Only one row can be highlighted as the destination at a time; selecting another deselects the previous. The *Move Systems here* action button appears **inline on the destination's Name row** once both panes have valid selections.
- **Disabled rows.** The selection guard greys out rows that would violate the rules in each pane — a destination cannot be a source, and a source cannot be the parent of the destination (or vice versa). Hovering a disabled row surfaces the reason in a tooltip.

`[SCREENSHOT PLACEHOLDER: dual-pane Multi-Move — left pane with five rows ticked under a single technology unit, right pane scrolled to a different branch with one row highlighted as destination, the Move Systems here button rendered next to the destination row's name]`

## Common workflows

- [Moving multiple systems in one operation](./workflows/moving-multiple-systems.md) — the bulk happy path: pick sources, pick a destination, click *Move Systems here*, confirm in the toast.
- [Selection rules and validation](./workflows/selection-rules-and-validation.md) — what makes a row pickable in each pane, why some rows are disabled, what happens when a selection turns out to be invalid.

For the single-system equivalent see [Systems Moving](../systemsMoving/README.md). For reorganising relationships (not parentage) see [Systems Relations](../systemsRelations/README.md).

## Coming soon

- 🔮 **Per-source destinations.** Today every selected source goes to the *same* destination. A future enhancement will allow per-source targeting in one transaction.
- 🔮 **Dry-run preview.** Before commit, surface the new shape of the destination subtree with all incoming sources nested in place.
- 🔮 **Bulk undo.** A one-click revert of the last bulk move, using the per-source `WAS_MOVED_FROM` audit entries.
- 🔮 **Move-and-edit.** Edit shared fields (responsible team, zone) across all selected sources during the move.
- 🔮 **Permission Phase 1 / Phase 2** — see [Access & Responsibilities](#access--responsibilities) above.

`[VIDEO PLACEHOLDER: 60s end-to-end — open Systems Multi-Move → filter the left pane to a set of orphaned subsystems → tick all five → filter the right pane to the new parent → click the new parent's row → Move Systems here button appears on that row → click → success toast → reload to verify in System Hierarchy]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The wiki generator strips it.*
>
> The bulk move is committed by a single `POST /systems/move` request (`systemsMove` API key) with payload `{ systemsToMoveUids: string[], targetParentSystemUid: string }`. The endpoint returns `text/plain` on success; client toasts are emitted client-side. Per-source `WAS_MOVED_FROM` audit edges are written server-side, mirroring the single-system flow.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
