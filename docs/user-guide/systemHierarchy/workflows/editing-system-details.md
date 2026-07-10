# Editing system details

## What this is for

Update the core attributes of a system on the **Detail** tab: name, description, system code, system level, system type, location, and zone. All edits are inline (click a field, change it, blur to save) and confirmed with a toast. The Detail tab also exposes the special workflow for generating and releasing the system code.

## Who can do this

✏️ **Editor / Admin** — requires the `systems-edit` role. Viewers see the same fields but cannot modify them.

> 🔮 *Coming soon — Phase 1:* edits to systems at `SYSTEM_DOMAIN` and `TECHNOLOGY_UNIT` levels will be admin-only; Editors will be restricted to lower levels (`KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, `TRASH`).

> ✅ Even with the `systems-edit` role, you can edit a system only if you are **responsible** for it (directly, via its responsible team, or via an ancestor) — this is now enforced. See [Understanding edit permissions](./edit-permissions.md).

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have selected a system whose detail you want to edit (either a leaf in the tree or by clicking *View Detail* on a parent).
- The **Detail** tab is open (it is the default tab in the detail view).
- See [Key concepts](../README.md#key-concepts) for terminology (system level, system type, system code).

## Steps

### Inline-editable fields

The Detail tab lays out the editable attributes in a vertical stack. All fields share the same pattern: click a field to enter edit mode, change the value, then click outside (blur) to save. A toast confirms with *Saving…* → *Saved successfully* (or *Failed to save* on error).

`[SCREENSHOT PLACEHOLDER: Detail tab with all fields visible — Name at top, then System Code with Generate/Release buttons, System Level, System Type, Location, Zone, Description at the bottom]`

| Field | Editor | Notes |
|---|---|---|
| **Name** | free text | Required-ish (avoid empty names). |
| **System Code** | special — see below | Inline-displayed, edited via the Generate / Release buttons next to it. |
| **System Level** | dropdown | Five values, see *System level* section below. |
| **System Type** | modal codebook picker | Click to open *System Type* selection modal. |
| **Location** | modal codebook picker | Click to open *Location* selection modal. |
| **Zone** | searchable combobox | Type to search the zone codebook. |
| **Description** | multi-line textarea | Expands on focus. |

When a field is empty, it shows the placeholder *None entered*. Fields you can edit also show a *Click to edit* hint on hover.

### System code generation

The **System Code** field has two action buttons next to it: **Generate** and **Release**.

1. **Generate the code automatically.** Click *Generate*. The code is generated server-side based on the system's type, level, location, zone, and ancestry. A toast shows *Generating system code…* → *System code generated and saved*.

   `[SCREENSHOT PLACEHOLDER: System Code row with Generate (and possibly Release) buttons highlighted to the right of the code value]`

2. **Generate is disabled** until a *System Type* is set on the system. Hovering the disabled button shows *System Type is required to generate a code*.

3. **Re-generating an existing code** opens a confirmation modal: *Replace existing system code? Current code "<old>" will be replaced with a new generated code. This action cannot be undone.* Confirm to proceed.

4. **Release the code** with *Release* to clear it. Useful when reorganizing the hierarchy and you want the code freed for reuse. The Release button is hidden when there is no code to release.

5. **Duplicate detection.** If the generated code collides with an existing one, the toast shows *System code "<code>" already exists* and the change is rolled back.

### System level — special meaning

The **System Level** field is more than a label — it drives visual styling, filtering, and (in Phase 1) edit permissions. The five values:

| Level | Meaning |
|---|---|
| `SYSTEM_DOMAIN` | Top of the tree. Strategic groupings of systems. |
| `TECHNOLOGY_UNIT` | Major technological unit (e.g., a beamline or an experimental hall). |
| `KEY_SYSTEMS` | Distinguished system within a technology unit. |
| `SUBSYSTEMS_AND_PARTS` | Bulk of the working hierarchy: subsystems, components, individual hardware. |
| `TRASH` | Holding area for retired or replaced items. **Setting a system to *Trash* does not delete it.** |

> 💡 **About `TRASH`.** A system at the `TRASH` level acts as a designated bin in the hierarchy. When a damaged or replaced item is taken out of an in-service system (typically during a spare-part swap), it is moved into the nearest `TRASH` ancestor walking up the tree, unless the user picks a different destination. Mark a *Trash* system at a sensible point in the subtree where you want decommissioned items to accumulate. See [Managing spare parts](./managing-spare-parts.md) for the full lifecycle.

`[VIDEO PLACEHOLDER: 30s — pick a leaf system, change its name inline, change its system level, click into System Type to open the picker, then click Generate next to the system code and watch it populate]`

## Tips & gotchas

- **Save on blur.** All inline fields save when you click out of them. Pressing *Escape* cancels the edit and reverts the value.
- **Generate before Release.** If you Release a code, the field is empty and Generate becomes available again — but Generate still requires a System Type.
- **Modal pickers stack.** When you open the System Type or Location picker, it opens on top of the detail view — close it via its own close button or the backdrop, not the browser back button.
- **Validation feedback comes via toast** — there is no inline error styling. Watch for *Failed to save* and re-check the value.
- **Setting level to `TRASH`** does not move the system anywhere or remove its content; it just changes its classification. The tree node continues to live under its current parent.
- **Description supports line breaks** — useful for short maintenance notes. For long-form documentation prefer Attachments or Links.

## Related

- [Managing system people](./managing-system-people.md) — assign responsible person, team, owner, operators, and maintained-by employees on the **Persons** tab.
- [Managing physical items](./managing-physical-items.md) — physical-item attributes (EUN, serial, condition) are edited in the Catalogue / Items module, not here.
- [Managing spare parts](./managing-spare-parts.md) — for the role of the `TRASH` level in the spare-swap flow.
- [Viewing change history](./viewing-change-history.md) — every edit on this tab appears in the system's history feed.
