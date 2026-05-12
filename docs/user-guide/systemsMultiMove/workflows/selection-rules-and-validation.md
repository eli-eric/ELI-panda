# Selection rules and validation

## What this is for

Understand why a row is greyed out, why the *Move Systems here* button does not appear, and how to recover when the bulk move fails. The Multi-Move page enforces a small, strict selection guard so that the bulk transaction cannot produce a cycle, a no-op, or an ambiguous move. The same guard powers the disabled-row affordances in both panes.

## Who can do this

✏️ **Editor / Admin** — the page is gated by `systems-edit`. The selection rules apply equally to Editors and Admins.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems Multi-Move** page.
- See [Key concepts](../README.md#key-concepts) and the happy-path [Moving multiple systems in one operation](./moving-multiple-systems.md) before troubleshooting selection issues.

## The rules

The selection guard runs on every interaction (tick a row, click a destination row, change filters). It compares the **left-pane selection** against the **right-pane selection** and decides which rows are pickable in each pane.

### 1. A system cannot be its own destination

The same UID cannot appear as a source *and* the destination. Selecting a system on the right disables the same system in the left pane and vice versa.

**Visible effect.** The row in the opposite pane greys out. Hovering it surfaces a tooltip explaining the reason.

### 2. The destination cannot be a descendant of any selected source

Putting a parent under one of its descendants creates a cycle and is refused. The guard inspects each candidate destination's parent path; if any selected source UID appears in that path, the destination row is disabled.

**Visible effect.** As you tick sources on the left, rows on the right that are descendants of any ticked source grey out. Removing the offending source restores them.

### 3. A selected source cannot be the destination's parent

The mirror case: if the candidate destination is *already* a child of a system you have selected on the left, the move would be a no-op for the descendants of that source. The guard disables the destination row.

**Visible effect.** Rows on the right whose current parent appears on the left's selection grey out.

### 4. Single destination

Only one row can be highlighted in the right pane. Selecting a second deselects the first. There is no header *select-all* on the right.

**Visible effect.** Click a second candidate destination — the previous highlight clears, the *Move Systems here* button moves to the new row.

### 5. Submission requires both sides populated

The *Move Systems here* button only appears when at least one source is ticked **and** a destination is selected. When disabled (no sources picked, destination chosen) the tooltip reads:

> *Please select the systems you want to move before proceeding.*

`[SCREENSHOT PLACEHOLDER: tooltip over the Move Systems here button reading "Please select the systems you want to move before proceeding." with the right pane showing a destination selected and the left pane empty of selections]`

## Recovery flow when the button is missing or disabled

1. **No button at all** — check whether *both* panes have a selection. The button is rendered inline on the destination row only after sources are ticked. If you do not see it next to the destination's name, either the destination is unselected or no sources are ticked.

2. **Button visible but disabled** — hover it for the tooltip. The most common cause is an empty left-pane selection.

3. **Sources greyed out in the left pane** — you are looking at descendants of the destination you have selected on the right (rule 2). Deselect the destination, or pick a different destination outside their subtree.

4. **Destinations greyed out in the right pane** — they fall under one of:
   - they are themselves selected as a source (rule 1), or
   - they are descendants of a selected source (rule 2 mirror), or
   - they are the current parent of a selected source (rule 3).

   Untick offending sources or scroll to a different destination.

## Server-side validation

If the client-side guard misses an edge case (concurrent edits by another user, a source deleted while you were preparing the batch), the server returns a failure and the toast reads:

> *Something went wrong. Systems didnt move.*

**How to recover.**
- Refresh both panes (the *Refresh* button on each pane) to pick up any concurrent changes.
- Re-tick the sources — your selection is cleared by the refresh.
- Verify the destination is still where you expect.
- Submit again.

If the failure repeats, fall back to the single-system [Systems Moving](../../systemsMoving/README.md) workbench — moving one source at a time will isolate which row is causing the rejection.

## Tips & gotchas

- **Selection state is local.** Selecting rows does not save anything on the server. Refreshing the page clears the selection.
- **Disabled rows are not always obvious.** The grey colour is the only signal — hover the row to see the reason in the tooltip.
- **No partial submission.** A rejected bulk move leaves the hierarchy untouched. There is no "moved some, failed on others" outcome — atomicity is enforced server-side.
- **No undo.** Each source's previous parent is captured in `WAS_MOVED_FROM`, but reverting a successful bulk move is a manual operation. Use the single-system [Systems Moving](../../systemsMoving/README.md) workbench to walk each source back to its old parent if you must, or run a second bulk move with the *old* parent selected as destination (only works if every source had the same old parent).
- **Verify with another surface.** After a successful submission, open the [Systems Overview](../../systems/README.md) and filter by *Parent system* to see the moved rows under the destination.

## Related

- [Moving multiple systems in one operation](./moving-multiple-systems.md)
- Single-system equivalent and its validations → see [Systems Moving](../../systemsMoving/README.md).
