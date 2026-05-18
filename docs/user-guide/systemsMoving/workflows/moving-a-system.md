# Moving a system to a new parent

## What this is for

Relocate a system in the hierarchy — change *which parent owns it* — while preserving everything else about it. Use this when the facility's organisation changes (a key system is reorganised under a different technology unit) or when a system was originally placed under the wrong parent. The dragged system keeps its UID, name, code, type, responsible person and team, physical item, attached files, change history, and every engineering relationship. Only its parent edge in the hierarchy changes.

## Who can do this

✏️ **Editor / Admin** — requires the `systems-edit` role.

Viewers can browse both panes and even initiate a drag, but the dialog's *Save* button is disabled.

> 🔮 *Coming soon — Phase 1:* moves of `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT` will become admin-only.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems Moving** page (sidebar entry under *Systems* → *Moving*).
- You know which system you want to move (the **source**) and which existing system will be its new parent (the **destination**).
- The destination is not a descendant of the source — moving a system inside its own subtree creates a cycle and is refused (see [Resolving move validation errors](./resolving-validation-errors.md)).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

The two panes are independent — typically you set them up so one shows the source and the other shows the destination. They can also both show the same branch if the move is local.

1. **Filter the left pane to find the source system.** Use the search box and filter sheet to narrow the tree. Expand parents to reveal the row you want to drag.

   `[SCREENSHOT PLACEHOLDER: left pane Systems table filtered with one chip, an expanded branch showing the source row about to be grabbed]`

2. **Filter the right pane to find the destination.** Independent filter and search; expand the destination's branch so the new parent row is visible. (You can use the same pane if the move is between siblings — both panes operate on the same data.)

3. **Drag the source row onto the destination row.** Grab the row from the left pane and drop it onto the destination row in the right pane. The destination row highlights as a valid drop target while you hover.

   `[SCREENSHOT PLACEHOLDER: source row mid-drag, drag preview showing the system name, destination row in the opposite pane highlighted with a drop indicator]`

4. **The *Move System* dialog opens.** It carries:
   - **Target System:** a breadcrumb of the destination's full parent path so you can confirm you have grabbed the right new parent.
   - **The source's editable fields** — *Name*, *Responsible*, *Zone*, *Location*, *Description* — pre-filled with the source's current values. *System type* and *System code* are shown read-only (they belong to the system identity and are managed elsewhere).

   `[SCREENSHOT PLACEHOLDER: Move System dialog with Target System breadcrumb at the top, editable form fields below (Name, Responsible, Zone, Location, Description), Save and Exit buttons at the bottom]`

5. **Adjust fields if needed.** A common reason to edit during a move is to update the responsible person or team to match the new parent's ownership, or to clarify the description. Skip if no changes are needed.

6. **Click *Save*.** Two server-side operations run in sequence:
   - **Update** — your field edits are committed to the source.
   - **Move** — the parent edge is replaced. A `WAS_MOVED_FROM` audit entry is written to the previous parent with a timestamp and your user UID.

   A toast confirms: *System <name> was moved under <new parent name>*. The dialog closes and both panes refresh to reflect the new hierarchy.

`[VIDEO PLACEHOLDER: 35s — filter left pane to find a subsystem → filter right pane to find a new parent → drag the subsystem onto the new parent → dialog opens with Target System breadcrumb → edit Responsible → Save → toast → both panes refresh]`

## What gets changed / preserved

**✅ Changed by this workflow:**
- The source system's parent link in the hierarchy — `HAS_SUBSYSTEM` from the old parent is removed; a new `HAS_SUBSYSTEM` is created from the destination.
- A `WAS_MOVED_FROM` audit entry is added to the previous parent (timestamp, user).
- Any editable field you changed in the dialog (*Name*, *Responsible*, *Zone*, *Location*, *Description*).

**✅ Preserved through the move:**
- The system's **UID, system type, system code** — identity is stable.
- The **physical item** attached to the system.
- All **engineering relationships** (spares, power, cooling, control, interlocks, data, beam, vacuum).
- **Spare-parts assignments** in both directions and the SP coverage metric.
- The **subtree** below the source — all descendants follow their parent to the new location.
- **Change history**, **attachments**, **persons** (operators, maintained-by, owner), and any other attribute not in the dialog.

**❌ Not affected:**
- Other systems' relationships, hierarchy positions, or fields. Only the source's parent edge changes.
- Order lines and catalogue items that reference the source's physical item.

## Limitations

- **Single system per move.** This page moves one source at a time. For bulk relocation see [Systems Multi-Move](../../README.md).
- **No drag preview of the destination subtree.** The dialog shows the destination's parent path but not the live preview of how the destination tree will look after the move.
- **No undo button.** The previous parent is recorded in `WAS_MOVED_FROM`, so a manual revert is possible (drag the system back), but there is no one-click *Undo move* affordance.
- **Field set in the dialog is intentionally minimal.** For other fields (importance, condition, attributes, custom property bag), use the system detail page in the [System Hierarchy](../../systemHierarchy/README.md) module.

## Tips & gotchas

- **Filter aggressively before dragging.** With wide trees the destination can be many screens of scrolling away from the source. Filter the destination pane to the right area first.
- **Refresh after another user's move.** Page state is not pushed; if a teammate moves a system you are about to drag, your view may be stale. The *Refresh* button on each pane forces a refetch.
- **Edit during the move only when ownership genuinely changes.** Use the move dialog for the minimum field changes needed (typically a new responsible person/team); leave bigger edits for the detail page so they show up cleanly in the change history.
- **The source's subtree comes along.** Moving a key system also moves every child beneath it. Be sure to inspect the destination before dropping — you are relocating a branch, not just a row.
- **Audit trail is preserved.** If you change your mind, the previous parent is recorded; you can drag the system back without losing identity.

## Related

- [Resolving move validation errors](./resolving-validation-errors.md)
- *Editing system details* → see the [System Hierarchy](../../systemHierarchy/README.md) module.
- *Copying systems* → see *Copying systems* in the [System Hierarchy](../../systemHierarchy/README.md) module.
- Multi-system relocate → see [Systems Multi-Move](../../README.md).
