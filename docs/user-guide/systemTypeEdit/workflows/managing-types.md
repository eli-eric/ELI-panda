# Managing System Types

## What this is for

Add and edit the actual classifications systems will be assigned to. A *System Type* sits one level below a group and carries the information that downstream features need: a name (the label that shows up in pickers), a short *code* (used in generated system codes), a *mask* template (defines how the system code is composed), and an optional *system attribute* link (surfaces relevant attribute presets in catalogue and system forms).

Use this workflow when a new class of facility hardware needs to exist as a taxonomy entry, when a type's identifier needs to change in *future* generated codes, or when the code-generation template for a class of systems should be customised.

## Who can do this

🛡️ **Type Editor / Admin** — requires the `system-types-edit` role.

Viewers can browse types in the right card but the *Add Type*, *Edit Type*, and *Delete Type* affordances are disabled.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `system-types-edit` and have opened **System Type Edit** in the admin section.
- The group the type belongs in already exists. Create it first if needed — see [Managing System Type Groups](./managing-groups.md).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Add a new type

1. **Click the parent group** in the left card. The right card loads the group's types (or the empty-state placeholder *No system types found in this group. Add the first system type.*).

2. **Click *Add Type*** at the top of the right card.

3. **Fill the form fields** in the dialog:

   | Field | Required | Notes |
   |---|---|---|
   | **Name** | ✅ | The user-facing label. Appears in every system-type picker, filter, table column, and report. |
   | **Code** | ✅ | Short identifier. Substituted into the mask as `{STC}` when the application generates a new system code. Plan to keep this stable. |
   | **Mask** | ✅ | Code-generation template. Default `{STC}{ZC}-{serial(3)}`. See [Understanding the code mask](./code-mask.md) for the tokens. |
   | **System Attribute** | — | Optional codebook link. When set, downstream forms (system detail, catalogue) may pre-surface attribute presets relevant to this type. |

   `[SCREENSHOT PLACEHOLDER: Add System Type dialog with Name, Code, Mask, and System Attribute fields filled in; Mask shows the default {STC}{ZC}-{serial(3)} template; Save and Cancel at the bottom]`

4. **Click *Save*.** The dialog closes and the new type appears at the bottom of the right card's list. A success toast confirms.

### Edit an existing type

1. **Click the parent group** in the left card to load its types.

2. **Open the more-actions menu** on the type row (three vertical dots).

3. **Click *Edit Type***. The edit dialog opens with all four fields pre-filled.

4. **Adjust fields and click *Save***. The change is committed and the list refreshes.

   `[SCREENSHOT PLACEHOLDER: more-actions menu open on a type row with Edit Type / Delete Type options; the edit dialog open behind showing the four fields with current values]`

### Delete a type

1. **Open the more-actions menu** on the type row.

2. **Click *Delete Type***. A confirmation modal asks you to confirm.

3. **Confirm.** The type is deleted. Existing systems that have this type assigned **retain** the assignment in their record, but the type is no longer available in the picker for new systems.

`[VIDEO PLACEHOLDER: 40s — select a group → Add Type with name + code + accept default mask → Save → see new row appear → Edit Type to add a System Attribute → Save → Delete Type with confirmation]`

## What gets created / changed

**✅ Affected:**
- Type record (name, code, mask, optional system attribute link).
- Visibility of the type in every system-type picker, filter, and column elsewhere in the app.
- The code-generation behaviour for *new* systems assigned this type after the change.

**❌ Not affected:**
- Existing systems assigned this type. Renaming the type updates the *label* they show; changing the *code* or *mask* does **not** retroactively renumber existing system codes — those are stored when the system was created.
- The parent group's name or other attributes.

## Limitations

- **Cannot move a type between groups.** A type belongs to one group permanently. To re-classify, delete and recreate under the new group (and reassign affected systems individually if needed).
- **Deletion is permanent and not blocked by existing system assignments.** Deleting a type used by 50 systems leaves those systems with a now-orphaned type label. Coordinate carefully or wait for the planned soft-delete (deprecate) feature.
- **No mask preview.** The dialog shows the raw mask string; the actual generated example is only visible when generating a code in the [System Hierarchy](../../systemHierarchy/README.md) detail page.
- **Code length / character set are not validated at form level.** Pick short, conventional codes (letters and digits, typically 1–4 characters) to keep generated system codes readable.

## Tips & gotchas

- **Code stability matters.** Once a type's *code* has been used in generated system codes on real systems, changing it produces an inconsistency: existing codes keep the old `{STC}` substring, new ones get the new one. Pick the code carefully on day one.
- **The mask drives downstream generation.** Read [Understanding the code mask](./code-mask.md) before customising it. The default works for the majority of types; customise only when the downstream code format genuinely needs to differ.
- **System Attribute is a soft hint.** It does not validate; it surfaces presets in some forms. Set it when a type maps cleanly to a single attribute family.
- **Empty types are picker noise.** A type with a misleading name or stale code is worse than a missing type. Keep the list lean.
- **Audit before bulk delete.** Deleting a type does not block on existing systems using it — and there is no undo. Search the [Systems Overview](../../systems/README.md) filtered by *System type* to confirm the type is unused first.

## Related

- [Managing System Type Groups](./managing-groups.md)
- [Understanding the code mask](./code-mask.md)
- Assigning a type to a system → see *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md) module.
- Finding all systems of a given type → see [Searching and filtering the overview](../../systems/workflows/searching-and-filtering.md).
