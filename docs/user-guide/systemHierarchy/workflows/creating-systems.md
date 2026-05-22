# Creating systems

## What this is for

Create a new system as a direct child of an existing one — straight from the tree, without leaving the System Hierarchy module. Useful for growing the hierarchy incrementally as new equipment, key systems, subsystems, or parts come online.

The dialog is intentionally minimal — only **Name** and **System level** are asked. Other fields (responsible, location, zone) are pre-filled by inheriting from the parent system; the rest you can fill in on the detail page after creation.

## Who can do this

✏️ **Editor / Admin** — requires the `systems-edit` role.

> 🔮 *Coming soon — Phase 1:* creation will be scoped by system level. Editors will be able to create systems at `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, and `TRASH` levels only; creating systems at `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT` will be admin-only.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are looking at the System Hierarchy module.
- The intended parent system already exists in the tree.
- See [Key concepts](../README.md#key-concepts) for terminology (system, subsystem, system level).

## Allowed parent → child levels

The system-level hierarchy is structural — only certain child levels are allowed under each parent:

| Parent level | Allowed child levels |
|---|---|
| `SYSTEM_DOMAIN` | `TECHNOLOGY_UNIT` only |
| `TECHNOLOGY_UNIT` | `TECHNOLOGY_UNIT`, `KEY_SYSTEMS`, `TRASH` |
| `KEY_SYSTEMS` | `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, `TRASH` |
| `SUBSYSTEMS_AND_PARTS` | `SUBSYSTEMS_AND_PARTS`, `TRASH` |
| `TRASH` | — (creation disabled; items reach Trash through other flows) |

The dialog enforces this — the *System level* picker only shows allowed values. When only one child level is allowed (e.g. under `SYSTEM_DOMAIN` → only `TECHNOLOGY_UNIT`), the picker is preselected and read-only.

## Steps

1. **Right-click the intended parent system in the tree.**
   The context menu opens with **Create System**, **Copy System**, and **Paste System** entries.

   `[SCREENSHOT PLACEHOLDER: tree node right-clicked, context menu open with Create System highlighted]`

2. **Click *Create System*.**
   The **Create new system** dialog opens.

   `[SCREENSHOT PLACEHOLDER: Create new system dialog showing Name input, System level select, the Inherited from <parent> section with responsible / location / zone rows, and Cancel / Create buttons]`

3. **Enter a name.** Required, non-empty.

4. **Pick the system level.** Only levels valid for the parent appear in the picker (see [Allowed parent → child levels](#allowed-parent--child-levels)). When only one is allowed, this field is preselected and disabled.

5. **Review the *Inherited from \<parent>* section** (if present). It shows the values the new system will automatically inherit from the parent:
   - **Responsible** — the parent's responsible person.
   - **Location** — the parent's location.
   - **Zone** — the parent's zone.

   These rows are informational, not editable in the dialog. If the parent has none of the three, the section is hidden entirely. You can change inherited values later on the new system's *Detail* tab.

6. **Click *Create*.**
   A toast appears: *Creating system…* → *System created successfully* (or an error toast on failure).

   On success the dialog closes and the new system is **selected automatically** — the right-hand Detail tab opens populated with the new system's full data, so you can continue filling in fields immediately.

`[VIDEO PLACEHOLDER: 30s — right-click parent in tree → Create System → enter name → click Create → see new system appear with detail tab open]`

## What's populated automatically

**✅ Set on creation:**
- **Name** and **System level** — from the form.
- **Parent system** — the system you right-clicked. Establishes the `HAS_SUBSYSTEM` link.
- **Facility** — taken from your session (same facility scope as you).
- **Responsible**, **Location**, **Zone** — inherited from the parent (when the parent has them set).
- A **History** entry — the *Insert* action with your user as the author.

**❌ Empty until you fill them in:**
- **Description**, **System code**, **System type**, **Attribute**.
- **Responsible team**, **Owner**, **Operators**, **Maintained by**.
- **Physical item**, any **Engineering relationships**, **Spare-part** flags.
- **Attachments**.

After creation, the right sidebar opens the new system's *Detail* tab — finish the setup from there (see [Editing system details](./editing-system-details.md)).

## Limitations

- **Same facility only.** New systems are scoped to your session's facility.
- **Atomic operation.** The system is either created or not — there is no partial state.
- **No bulk create.** One system per dialog. To replicate an existing structure, use [Copying systems](./copying-systems.md) instead.
- **No undo.** If you create a system in the wrong place, move it via the [Systems Moving](../../systemsMoving/README.md) module or delete it via the *Detail* tab.

## Tips & gotchas

- **Pick the parent carefully.** The system level options are derived from the parent's level — picking the wrong parent restricts what you can create. If the picker doesn't show the level you want, you probably need a different parent.
- **The *Create System* item is disabled under `TRASH` nodes.** Trash is a holding area; new systems can't be born there.
- **The action is disabled in read-only mode.** Without `systems-edit`, the item is rendered but disabled — same treatment as Copy / Paste.
- **Inheritance is a one-shot copy at creation.** Later changes to the parent's responsible/location/zone do *not* propagate to children — you'd need to update them individually.
- **Right-click anywhere on a node's row.** The whole row is the context-menu trigger, not just the icon.

## Related

- [Navigating the tree](./navigating-the-tree.md)
- [Editing system details](./editing-system-details.md) — for filling in fields the dialog didn't ask for.
- [Copying systems](./copying-systems.md) — when you want to clone an existing structure instead of starting from blank.
- [Managing system people](./managing-system-people.md) — to override the inherited responsible person or set a team.
- Moving a system to a different parent → see the `systemsMoving` module documentation in the [user guide index](../../README.md).
