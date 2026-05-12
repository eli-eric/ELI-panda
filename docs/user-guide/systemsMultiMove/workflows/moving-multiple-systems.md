# Moving multiple systems in one operation

## What this is for

Re-parent a *set* of systems under a single new parent in one server transaction. Use when you want to consolidate orphaned subsystems under a freshly-created parent, when a re-org collapses several branches into one, or when the same edit needs to be applied to every system in a filter. The bulk move is atomic — if it fails it fails for the whole set; on success every source's parent link is replaced.

Each selected source keeps its identity (UID, name, code, type, attached physical item, persons, relationships, attachments, change history). The descendants under each source come along — only the top-of-branch parent edge is rewritten.

## Who can do this

✏️ **Editor / Admin** — the page itself is gated. Viewers cannot reach it.

> 🔮 *Coming soon — Phase 1:* moves involving `SYSTEM_DOMAIN` / `TECHNOLOGY_UNIT` sources will become admin-only.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `systems-edit` and have opened **Systems** → **Multi Move** in the sidebar.
- You know the set of systems you want to move and the single destination they should all land under.
- The destination already exists. Create it first in the [System Hierarchy](../../systemHierarchy/README.md) if needed.
- See [Key concepts](../README.md#key-concepts) for terminology and [Selection rules and validation](./selection-rules-and-validation.md) for what makes a row pickable.

## Steps

1. **Filter the left pane (*Systems to Move*) to the candidate sources.** Use the search and filter sheet to narrow the table; expand parent rows to reach deep nodes. The multi-select column is the leading column.

   `[SCREENSHOT PLACEHOLDER: left pane with a filter chip and three rows ticked; the row checkboxes show the active selection; one row is greyed out and marked as ineligible]`

2. **Select sources.** Tick the row checkboxes for every system you want to move. The header *select-all* checkbox grabs every top-level row in the current filter; expand and tick children individually if you want only a subset of a parent's descendants treated as separate moves (the children below each ticked row come along automatically).

3. **Filter the right pane (*Target parent system*) to the destination.** Independent search and filter; expand to reveal the candidate parent.

4. **Click the destination row** to select it. The right pane is single-select — clicking a second row deselects the first. As soon as a destination is highlighted *and* sources are selected, the *Move Systems here* button appears **on the destination's Name row**.

   `[SCREENSHOT PLACEHOLDER: right pane with one row highlighted as destination; the Move Systems here button is rendered next to the system name on that row]`

5. **Hover the *Move Systems here* button** to confirm both sides. If the button does not appear, one of the selection rules is preventing the move — see [Selection rules and validation](./selection-rules-and-validation.md). When the button is disabled and you hover it, a tooltip reads: *Please select the systems you want to move before proceeding.*

6. **Click *Move Systems here*.** A single request is sent (`POST /systems/move`) carrying the array of source UIDs and the single destination UID.

7. **Read the toast.**
   - **Success** → *Systems moved successfully.* Both panes refresh; the moved sources now appear under the destination in any tree view you open next.
   - **Failure** → *Something went wrong. Systems didnt move.* No partial state is applied — the whole batch either succeeded or did not. Retry the operation, or refresh both panes to pick up changes another user has made.

`[VIDEO PLACEHOLDER: 45s — open Multi-Move → filter left pane → tick five sources via row checkboxes → filter right pane → click the destination row → Move Systems here button appears → click → success toast → reload to verify lineage]`

## What gets changed / preserved

**✅ Changed by this workflow:**
- Each selected source's parent link in the hierarchy — `HAS_SUBSYSTEM` from the old parent is removed, a new `HAS_SUBSYSTEM` is created from the destination.
- A `WAS_MOVED_FROM` audit entry is added to each source's previous parent (timestamp, user UID), mirroring the single-system [Moving a system](../../systemsMoving/workflows/moving-a-system.md) flow.

**✅ Preserved through the move:**
- Each source's **UID, name, code, system type**, and any non-parent attribute.
- The **physical item** attached to each source.
- All **engineering relationships** in both directions (spares, power, cooling, control, interlocks, data, beam, vacuum).
- The full **subtree** below each source — descendants follow their parent to the new location.
- **Change history**, **attachments**, **persons** — all carry over.

**❌ Not affected:**
- Systems *not* in the source selection. Their hierarchy and relationships are untouched.
- The destination's existing children. The newly moved sources become additional children alongside them.
- Catalogue items, orders, supplier records.

## Limitations

- **Single destination per submission.** Every source in the batch goes under the same destination. To move different sources to different parents, run the workflow once per destination.
- **No dry-run preview today.** Inspect the right pane carefully before clicking; the only confirmation is the success / failure toast.
- **No bulk undo.** Each source has a `WAS_MOVED_FROM` audit entry, so a manual revert is possible by running the bulk move again with the old parent as destination — but there is no one-click *Revert last bulk move*.
- **Cannot reach the page as a Viewer.** Even read-inspection of the bulk move workbench requires `systems-edit`. Viewers use the [System Hierarchy](../../systemHierarchy/README.md) tree or [Systems Overview](../../systems/README.md) instead.

## Tips & gotchas

- **Filter both panes before clicking.** Wide tables make it easy to misidentify the destination. Pin the destination's parent path in your head and verify it on the row before submitting.
- **Audit trail is preserved per source.** If the bulk move was a mistake, run a second bulk move with the old parents as destinations — the `WAS_MOVED_FROM` entries on each source carry the previous parent UID, recoverable via the [System Hierarchy](../../systemHierarchy/README.md) module's history view.
- **No partial commit.** Either all selected sources move, or none do. Treat the success toast as binary.
- **Verify with a different surface.** After the bulk move, open the [Systems Overview](../../systems/README.md) and filter by parent — the moved rows should appear under the destination immediately.
- **Selection guard greys out invalid rows.** If a row you expected to select is disabled, it is because it would violate one of the rules; see [Selection rules and validation](./selection-rules-and-validation.md).

## Related

- [Selection rules and validation](./selection-rules-and-validation.md)
- Single-system equivalent → see [Systems Moving](../../systemsMoving/README.md).
- *Editing system details* → see the [System Hierarchy](../../systemHierarchy/README.md) module.
- Catalogue or order references → unaffected by a move; see the [Catalogue](../../catalogue/README.md) module for catalogue items.
