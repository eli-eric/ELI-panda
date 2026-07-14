# Editing or deleting an existing system code

## What this is for

Adjust the system behind an existing code (rename it, change its location, reassign responsible person), or delete a code that should never have been generated. Editing happens on the underlying system — the system code itself is a label on the system, not a separately-editable record. Deletion removes both the code and the system; PANDA blocks deletion when the system has downstream commitments (physical items, relationships, history).

## Who can do this

| Action | Required role |
|---|---|
| Open the per-row *Edit System* / row-click sheet | `control-systems-view` (read) + `systems-edit` (edit fields in the sheet) |
| Actually change fields in the sheet | `systems-edit` **and** being responsible for that system — see [Understanding edit permissions](../../systemHierarchy/workflows/edit-permissions.md) |
| Delete the system from the row's action menu | `systems-edit` (the deletion is enforced at the underlying system) |

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Control Systems** → **Overview** page (see [Browsing the system-codes overview](./browsing-overview.md)).
- You have located the row for the code you want to edit or delete.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Edit the underlying system

1. **Click the row** in the Overview table (or open the row's action menu and click *Edit System*). The system edit sheet opens over the page.

2. **Make changes in the sheet.** All the tabs of the system detail are available — *Detail*, *Persons*, *Physical Item*, *Spare Parts*, *Relationships*, *Attachments*, *History*. Editing is gated **per system**: beyond the `systems-edit` role, you can change fields here only if you are **responsible** for this system (directly, via its responsible team, or via a system above it). If you are not, every field is shown but disabled, the **Save System** button is greyed out, the system-code **Generate** / **Release** buttons are disabled, and a banner at the top explains why and lets you see who is responsible. See [Understanding edit permissions](../../systemHierarchy/workflows/edit-permissions.md).

   `[SCREENSHOT PLACEHOLDER: system edit sheet open over the Control Systems Overview, the Detail tab active showing the system's Name, Code, Level, Type, Location, Zone, Description fields, Save button at the bottom]`

   `[SCREENSHOT PLACEHOLDER: the same sheet for a system the user is not responsible for — all fields disabled, a restriction banner below the Save System button with an info icon listing the responsible people, Save System greyed out]`

3. **Save changes** in the sheet. The Overview row reflects the updated metadata after the save. (**Save System** is only enabled when you are permitted to edit this system.)

4. **Close the sheet.** Your Overview filters, search, sort, and scroll position are preserved.

### Delete a system (and its code) from the Overview

1. **Open the row's action menu** (the more-actions icon at the right of the row).

2. **Click *Delete System***. A confirmation modal asks you to confirm.

3. **Confirm.** The server-side delete runs. The system *and* its code are removed if the system has no blocking dependencies. If there are blockers, the toast lists the cause:
   - Physical item still attached.
   - Engineering relationships (spares, power, control, etc.) still pointing in or out.
   - Subsystems below it.
   - Non-trivial change history that policy prefers to preserve.

   Resolve the blocker first (detach the physical item, remove the relationships, move the subsystems to another parent), then retry.

`[SCREENSHOT PLACEHOLDER: action menu open on an Overview row with Edit System and Delete System options visible; the confirmation modal appearing in front]`

`[VIDEO PLACEHOLDER: 40s — open Overview → find a stale code → action menu → Delete System → confirm → see a "blocker: subsystems remain" error toast → close → open the system in System Hierarchy → move subsystems out → return to Overview → action menu → Delete System → confirm → row gone]`

## What gets created / changed

**✅ Affected by Edit:**
- The underlying system record's fields (name, level, type, location, zone, responsible person, attributes — depending on which tab you edited).
- The Overview's display columns refresh accordingly. The *System Code* itself does not change with field edits.

**✅ Affected by Delete:**
- The system record is removed.
- The system code disappears from the registry (the Overview row is gone).
- Any historical references to the system from other modules become orphan UIDs.

**❌ Not affected:**
- The **System Type** or **Zone** that the code referenced. Codebooks are not modified by per-row deletes.
- The serial counter behind the code's prefix. Deleting a code does not "free up" its serial number for reuse; the next generation continues from where the counter currently sits.

## When to delete vs when to edit

- **Edit** when the system genuinely exists and just needs its metadata changed. This covers ~95 % of cases.
- **Delete** when the system was a mistake (wrong type picked, wrong zone, duplicate of another) and has no commitments yet. Best within minutes of a botched batch create.
- **Re-generate the same code is not possible.** Once a serial number has advanced, deleting a code does not roll back the counter. If continuous numbering matters, raise it as a process issue with the engineering team — PANDA does not implement gap-filling today.

## Limitations

- **No bulk delete from the Overview today.** Each row is deleted individually through its action menu. Bulk delete is on the roadmap.
- **Deletion is per-system, not per-code.** There is no "delete just the code, keep the system" option — they are the same entity surface.
- **Permission is enforced at the underlying system.** Even with `control-systems-edit`, you cannot delete a system you do not also have `systems-edit` on. The toast will surface the role miss if you try.
- **No undo.** Once a delete succeeds, recovery is manual (re-create through the System Hierarchy or by running a new batch — note the new code will carry the *next* serial, not the deleted one).

## Tips & gotchas

- **Audit before deleting.** Open the system detail and check the *Relationships*, *Physical Item*, and *History* tabs first. A code with non-trivial history is rarely worth deleting.
- **Edit, do not regenerate.** If a code's parent path or zone needs to change, edit the system's *Zone* / *Parent* in the detail page; do *not* delete the code and create a new one. The code string is stable per system.
- **Codes with active engineering relationships are blocked.** Detach the relationship in the [Systems Relations](../../systemsRelations/README.md) workbench (or on the system detail) before retrying delete.
- **Use the per-row action menu, not the row click, when you intend to delete.** Row click opens the edit sheet — convenient for inspection, but you cannot delete from inside the sheet.
- **For mid-batch mistakes**, run the action menu's delete on each of the just-created rows. The session's Created band on the Create page still shows them as Created — refresh the page if the Created band ends up stale.

## Related

- [Browsing the system-codes overview](./browsing-overview.md)
- [Creating system codes in batch](./creating-system-codes.md)
- Editing system details and relationships → see *Editing system details* and *Managing relationships* in the [System Hierarchy](../../systemHierarchy/README.md) module.
- Removing relationships → see [Inspecting and removing relationships](../../systemsRelations/workflows/inspecting-and-removing.md) in the [Systems Relations](../../systemsRelations/README.md) module.
