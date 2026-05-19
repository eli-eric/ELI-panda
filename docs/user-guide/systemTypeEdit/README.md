# System Type Edit

The System Type Edit module is the **admin workbench for the system-type taxonomy** — the dictionary of "what kinds of system exist at the facility." Every system in the [System Hierarchy](../systemHierarchy/README.md) carries a *system type* assignment; that assignment drives filtering, code generation, and visual cues. The taxonomy is organised in two levels: **System Type Groups** (broad buckets such as *Vacuum*, *Optics*, *Diagnostics*) at the top, and **System Types** (specific classifications such as *Ion Gauge*, *Mirror Mount*, *Beam Position Monitor*) nested under each group.

Manage the taxonomy here so the rest of the application has a stable vocabulary. New facility hardware classes start their life as a new System Type in this module.

`[SCREENSHOT PLACEHOLDER: System Type Edit landing — two side-by-side cards: left card "System Type Groups" with five groups listed, the third selected and highlighted; right card "System Types" filled with the types belonging to that group; Add Group / Add Type buttons visible above each list]`

## Access & Responsibilities

**Today's reality:**
- `system-types-view` — read-only access to the page. Browse groups and types, but the *Add*, *Edit*, and *Delete* affordances are disabled.
- `system-types-edit` — full edit. Create, rename, and delete groups; create, rename, and delete types; edit the per-type *code*, *mask*, and *system attribute*.
- `admin` — same as Editor.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `system-types-view` | Open the page, browse the groups list, select a group to inspect its types, read the code and mask on each type |
| 🛡️ **Type Editor / Admin** | `system-types-edit` or `admin` | Everything in Viewer + add, edit, and delete groups and types; change code and mask templates that drive system code generation downstream |

> 🔮 **Coming soon — taxonomy approval workflow** — a planned enhancement will route new group / type creations through an approval step before they appear in the system-type pickers elsewhere in the app.

## Key concepts

- **System Type Group** — top-level taxonomy bucket. Has a *name*. Used to organise types into thematically related sets so the picker on a system's *Detail* page stays browsable.
- **System Type** — a specific classification a system can be assigned. Belongs to exactly one System Type Group. Carries a *name*, a short *code*, a code-generation *mask*, and an optional *system attribute* link.
- **Code (per type)** — a short identifier (typically a few letters or digits) substituted into the mask when the application generates a new system code. Codes need to be stable: changing a type's code does not retroactively renumber existing systems, but it does affect new systems created against the type afterwards.
- **Mask** — a code-generation template. The default `{STC}{ZC}-{serial(3)}` reads: System Type Code, then Zone Code, hyphen, then a 3-digit zero-padded serial number. Templates can be customised per type.
- **System Attribute** — optional codebook link on the type that lets a downstream form (catalogue, system detail) surface attribute presets relevant to systems of this type.
- **System Code Generation** — the actual generation happens elsewhere (in the [System Hierarchy](../systemHierarchy/README.md) detail page, *Generate* on the system code field) — *this module defines the template*, the hierarchy *applies* it. See *Editing system details* in the [System Hierarchy](../systemHierarchy/README.md).

## Layout

A two-card dual-pane layout. Both panes are bounded scroll areas so the cards stay sized to one viewport regardless of taxonomy size.

- **Left card — *System Type Groups*.** Help text below the title reads *Manage groups for organizing system types*. Below it sits the list of groups. Each row shows the group name and a more-actions menu (Edit / Delete). The *Add Group* button sits at the top of the card. Click a group to load its types in the right card; the active group is highlighted.
- **Right card — *System Types*.** Empty until a group is selected — placeholder text *Select a group from the left panel to view system types.* Once a group is selected, the list of its types renders below the *Add Type* button. Each row shows the type's name and a more-actions menu (Edit / Delete). An empty group shows *No system types found in this group. Add the first system type.*

On mobile the layout stacks (single column); the right card scrolls into view after a group is selected.

`[SCREENSHOT PLACEHOLDER: dual-pane with two visible action menus — one on a group row showing Edit Group / Delete Group, one on a type row showing Edit Type / Delete Type]`

## Common workflows

- [Managing System Type Groups](./workflows/managing-groups.md) — add, rename, delete groups; the top-level taxonomy buckets.
- [Managing System Types](./workflows/managing-types.md) — add, edit, delete the types within a selected group; set the *code*, *mask*, and *system attribute*.
- [Understanding the code mask](./workflows/code-mask.md) — what the mask template tokens mean (`{STC}`, `{ZC}`, `{serial(N)}`) and how they combine into a generated system code in the [System Hierarchy](../systemHierarchy/README.md).

For where these types are *consumed* — picking a type when editing a system, viewing how the code template generates a code — see *Editing system details* in the [System Hierarchy](../systemHierarchy/README.md) module.

## Coming soon

- 🔮 **Type retirement instead of deletion** — soft-delete (deprecate without removing) so historical references on systems remain valid.
- 🔮 **Drag-and-drop ordering** of groups and of types within a group. Today both lists render in server-side order; reordering is not exposed.
- 🔮 **Move type between groups** — today a type belongs to one group permanently; the planned feature lets you re-parent a type without delete-and-recreate.
- 🔮 **Mask preview** — show the generated example next to the mask input as you edit so you can verify the template before saving.
- 🔮 **Taxonomy approval workflow** — review step for new groups / types.

`[VIDEO PLACEHOLDER: 60s end-to-end — open System Type Edit → Add Group → name it → click the new group → Add Type → fill name + code + accept default mask → Save → open a system in System Hierarchy → assign the new type → see the generated system code reflect the new mask]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The wiki generator strips it.*
>
> The module is REST-backed. Groups: `GET /system/system-type-groups`, `POST /system/system-type-group`, `PUT /system/system-type-group/{uid}`. Types: `GET /system/system-type-group/{uid}/system-types`, `POST /system/system-type-group/{uid}/system-type`, `PUT /system/system-type-group/{groupUid}/system-type/{typeUid}`, `DELETE /system/system-type/{uid}`. Entity definitions live in `src/server/apollo/schema.graphql` (`SystemType`, `SystemTypeGroup`). Code generation uses the mask at `/system/systemCode` (called from the System Hierarchy detail page).

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
