# Managing physical items

## What this is for

Attach a concrete piece of hardware (a *physical item*) to the currently-selected system, or move a hardware item from one system to another while preserving its identity, parameters, and service history. Physical items represent the real-world equipment installed against the abstract systems in the hierarchy.

This workflow covers two actions exposed from the system detail's **Actions** menu: **Assign Item** and **Move Item**.

## Who can do this

✏️ **Editor / Admin** — both Assign Item and Move Item require the `systems-edit` role.

> ✅ Editing a physical item's fields requires that you are **responsible** for its system (now enforced) — see [Understanding edit permissions](./edit-permissions.md). Level-based scoping (Phase 1) is still upcoming.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have a system selected.
- You know whether the item already exists in the catalogue (it should — items are created upstream from a catalogue spec via an order; see *Lifecycle recap* below).
- See [Key concepts](../README.md#key-concepts) for terminology (catalogue item, physical item, EUN, serial number, item usage).

## Lifecycle recap

Before doing the action, here is where physical items come from. The catalogue / order modules cover this end-to-end; the System Hierarchy module only handles the assignment and movement steps:

1. **Catalogue** — every item starts as a *catalogue item*, an abstract product spec with properties, supplier, and manufacturer link.
2. **Order** — when procuring hardware, an order is created with order lines; each delivered order line produces a *physical item* in the system.
3. **Assignment** *(this workflow)* — the item is assigned to a system.
4. **Movement** *(this workflow)* — the item can later be reassigned to a different system without losing its identity, EUN, serial number, condition status, notes, or service history.

> 💡 **Cardinality.** A system has **at most one** physical item. The relationship is *1 system : 0..1 item* — assigning an item to a system that already has one requires moving the existing item out first (or using the *exchange* path of the Move Item wizard).

> The **Physical Item** tab lets you inline-edit the item's key fields — *Serial Number*, *Item Usage*, *Condition Status*, and *Item notes* — and review its catalogue properties read-only. These edits are recorded in the system's change history. Deeper attributes and the full service log are managed in the Catalogue / Items module. System Hierarchy still handles which system an item is on.

## Viewing item details and catalogue properties

The **Physical Item** tab is the read/edit surface for the hardware attached to the selected system.

1. **Open the system in detail view and select the *Physical Item* tab.** The top block shows the item's fields:
   - *Eun* and *Part Number* — read-only identifiers.
   - *Serial Number*, *Item Usage*, *Condition Status*, *Item notes* — editable inline; click a field to change it. A toast confirms each save, and the change appears in the system's *History* tab.

2. **Below the fields, the *Catalogue Properties* block** lists the technical parameters the item inherits from its catalogue item — grouped by category (for example *Other*, *TMP parameters*, *Flanges*). These are read-only.

   `[SCREENSHOT PLACEHOLDER: Physical Item tab showing the editable fields at top and a "Catalogue Properties" section below with grouped property rows, one row marked as modified with a strikethrough original value]`

3. **Properties changed by a service are flagged.** When a service has rewritten a catalogue value, the row shows the **current** value with the original struck-through next to it (e.g. *240V ⚠ was 220V*), and the section header carries a **Modified** badge. Parameters a service added that the catalogue never had are listed as normal rows.

> The **Quick Info** sidebar shows the same properties in a compact form — every property, with `(was …)` next to any value a service modified. Use the tab for the full grouped view, the sidebar for an at-a-glance summary.

## Assigning an item

The **Assign Item** action attaches an existing physical item to the currently-selected system.

1. **Open the system in detail view.** In the detail header, expand the **Actions** menu and pick *Assign Item*.

   `[SCREENSHOT PLACEHOLDER: detail view header with the Actions dropdown open and "Assign Item" highlighted]`

2. **The Assign Item modal opens** as a wide dialog with two steps.

3. **Step 1 — Select Item.** A searchable, filterable table of systems with available items. Each row is a system that currently holds a physical item. Only rows with an item attached are selectable; the rest appear grayed out.

   `[SCREENSHOT PLACEHOLDER: Assign Item modal Step 1 showing a search bar at top, filter buttons, and a table of systems-with-items where one row is highlighted in orange as the currently selected source]`

4. **Search and filter** to find the right item. The search bar is free-text; the filter buttons offer system type, level, and other facets.

5. **Click a row** to mark it as the source. The row highlights in orange. *Next* enables.

6. **Click *Next*.** The modal advances to the summary.

7. **Step 2 — Summary.** Review the item that will be assigned and the destination system. Confirm.

8. **Confirm.** A toast confirms the assignment. The system's *Physical Item* tab now shows the assigned item; the *Move Item* action becomes available.

> **Note:** "Assign Item" picks an *existing* item already in the system somewhere, sourced from another system. To create a *brand new* item from scratch, you must do that upstream via an order in the Orders module.

## Moving an item

The **Move Item** action transfers the physical item currently attached to the selected system to a different system.

The wizard has a dynamic step count (3 to 5 steps) depending on the destination's state.

1. **Move Item is only visible** when the current system has a physical item to move. If the system has no item, the action is hidden in the menu.

2. **Open the wizard.** From the **Actions** menu, pick *Move Item*. The wizard opens.

3. **Step — Pick the move mode.** Choose between:
   - *Move to a new (empty) system.*
   - *Move to a destination system that already has its own item* (this triggers an *exchange*: the destination's existing item has to go somewhere too).

4. **Step — Select destination system.** A searchable, filterable hierarchy table; click a system to highlight it as the destination.

   `[SCREENSHOT PLACEHOLDER: Move Item wizard step showing the system selection table with one destination row highlighted in orange, search and filters at the top]`

5. **Step — System detail (if creating context).** Confirm or fill in destination metadata.

6. **(Exchange only) Step — Pick parent for the displaced item.** When the destination already has an item, the wizard asks where its current item should go. Pick a parent system to receive it.

7. **Step — Final summary.** Review:
   - The item being moved.
   - Source system → destination system.
   - In the exchange path: the destination's old item and where it will land.

8. **Confirm.** Toast confirms; both the source and destination subtrees refresh.

`[VIDEO PLACEHOLDER: 45s — open Actions on a system that has an item, click Move Item, walk through the wizard for an exchange (pick a destination that has its own item, pick where the displaced item should go), confirm, then verify the source system now has the new item]`

## What carries over on a move

When an item is moved:

- ✅ **Identity** preserved — same database record, same UID.
- ✅ **EUN, serial number, notes, condition status, item usage** all carry over.
- ✅ **Service history** preserved.
- ✅ The catalogue item the physical item is based on is unchanged.

Only the *which system holds this item* assignment changes.

## Tips & gotchas

- **You cannot create new items from System Hierarchy.** Assignment picks from items that already exist in the system somewhere. New items come from orders.
- **The 1:0..1 cardinality is enforced** — you cannot stack two items onto one system. The Move Item wizard's exchange path is the supported way to swap items between systems.
- **Service history travels with the item**, not with the system. If you move an item, the destination system's *History* timeline picks up the move event; the item's full service log stays attached to the item itself in the Items module.
- **Filter by EUN or serial number** in the leaves panel ([Searching and filtering](./searching-and-filtering.md)) when you're trying to track down which system currently holds a specific piece of hardware.
- **Item Usage and Condition Status are editable** directly on the *Physical Item* tab. After a move you may want to update them to reflect the item's new placement.
- **Use the *Use Spare* flow when the move is a spare-part swap** — that path moves both items at once and routes the old one toward the nearest TRASH ancestor automatically. See [Managing spare parts](./managing-spare-parts.md). The action lives on the *Spare Parts* tab; in production it stays disabled until the `enableSparePartsAssignment` feature flag is enabled.

## Related

- [Managing spare parts](./managing-spare-parts.md) — for the structured swap flow that handles items + relationships in one step.
- [Editing system details](./editing-system-details.md) — for system-level fields that influence item placement.
- [Viewing change history](./viewing-change-history.md) — item assignment and move events appear under *Item Changes* and *Item Moves*; inline edits to the item's fields (serial number, usage, condition, notes) appear in the system's history too.
- Catalogue, Orders, and Items modules → see [user guide index](../../README.md).
