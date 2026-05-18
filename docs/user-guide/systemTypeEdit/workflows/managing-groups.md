# Managing System Type Groups

## What this is for

Shape the top level of the system-type taxonomy — the broad buckets that group related types together. Groups are the navigation layer of the taxonomy: every System Type belongs to exactly one group, and the group is what users browse first in any system-type picker elsewhere in the app. Use this workflow when introducing a new thematic area of facility hardware (e.g. a new diagnostics bench, a new control subsystem family) or when consolidating / renaming an existing bucket for clarity.

Groups themselves do not affect code generation directly — that happens at the System Type level through the *mask*. The group is purely an organisational layer.

## Who can do this

🛡️ **Type Editor / Admin** — requires the `system-types-edit` role.

Viewers can browse the group list but the *Add Group*, *Edit Group*, and *Delete Group* affordances are disabled.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `system-types-edit` and have opened **System Type Edit** in the admin section of the sidebar.
- See [Key concepts](../README.md#key-concepts) for terminology (group, type, mask).

## Steps

### Add a new group

1. **Click *Add Group*** at the top of the left card.

2. **Fill the *Name* field** in the dialog. The name is the only field on a group. Pick a label that reads well in pickers and filter dropdowns elsewhere in the app (it appears in the system-type combobox on every system's detail page).

   `[SCREENSHOT PLACEHOLDER: Add Group dialog open with a single Name input filled in, Cancel and Save buttons at the bottom]`

3. **Click *Save*.** The dialog closes; the new group appears at the bottom of the left card list. A success toast confirms.

### Rename / edit a group

1. **Open the more-actions menu** on the group row in the left card (three vertical dots on the right side of the row).

2. **Click *Edit Group***. The edit dialog opens with the current name pre-filled.

3. **Adjust the name** and click *Save*. The list refreshes and the change propagates to every place the group is shown.

`[SCREENSHOT PLACEHOLDER: more-actions menu open on a group row with Edit Group and Delete Group options visible]`

### Delete a group

1. **Open the more-actions menu** on the group row.

2. **Click *Delete Group***. A confirmation modal asks you to confirm the destructive action.

3. **Confirm.** The group is deleted server-side.

   Deletion is **blocked** if the group still contains System Types. The error toast lists the blocker. Move or delete the types inside the group first (see [Managing System Types](./managing-types.md)).

`[VIDEO PLACEHOLDER: 30s — Add Group with a new name → Save → select the new group → see the right card show the empty-state placeholder → Edit Group to rename → Save → menu shows Delete Group disabled while types exist]`

## What gets created / changed

**✅ Affected:**
- Group record (name).
- The group's position in any taxonomy pickers elsewhere in the app.

**❌ Not affected:**
- Existing system-type assignments on systems. Renaming a group does not change which types systems are assigned to.
- Generated system codes. Group names are an organisational layer only; the mask on each type is what drives code generation.

## Limitations

- **One field per group.** A group has only a name today. No description, no code, no colour assignment.
- **Cannot delete a non-empty group.** Move the types out (delete or — in a future release — move-between-groups) before deleting.
- **No ordering control today.** Groups render in server-defined order. Drag-and-drop ordering is on the roadmap.
- **Type-to-group reassignment is not supported yet.** A type belongs to a group permanently; introducing a new bucket means re-creating the types in the new group.

## Tips & gotchas

- **Keep group names short and unambiguous.** They appear in the picker label above the type — verbose group names crowd the dropdown.
- **Avoid renaming groups frequently.** Although renaming is safe (no downstream data is broken), users develop muscle memory for picker labels. Rename only when the existing name is genuinely misleading.
- **Plan the taxonomy before bulk-adding.** Adding 30 groups now and reorganising next month is more work than spending 10 minutes mapping out the shape first.
- **Empty groups linger.** A group with no types is harmless but adds noise to the picker. Delete groups you do not need rather than leaving them empty.

## Related

- [Managing System Types](./managing-types.md)
- [Understanding the code mask](./code-mask.md)
- Assigning a type to a system → see *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md) module.
