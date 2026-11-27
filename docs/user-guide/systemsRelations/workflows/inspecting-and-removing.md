# Inspecting and removing relationships

## What this is for

See what relationships a system already has — particularly its spares — without leaving the Systems Relations workbench, and remove a relationship when the link is no longer valid (a spare has been consumed and re-assigned elsewhere, a power source has been re-routed, a control link has been retired).

Bulk *creation* is the workbench's primary purpose; bulk *removal* lives in the per-system detail view (see *Managing relationships* in the [System Hierarchy](../../systemHierarchy/README.md) module). This workflow covers the read-only inspection surfaces in the workbench and points you at the right place for deletions.

## Who can do this

| Action | Required role |
|---|---|
| View *Spare Parts* / *Spare Part for Systems* modals from a row | `systems-view` |
| Remove an individual relationship from a system's *Relationships* tab | `systems-edit` |

> 🔮 *Coming soon:* a future enhancement will surface bulk *remove* directly in the workbench. Today, batch removal is reached one system at a time through the detail page.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems Relations** page (for the modal-based inspection) or on a system's detail page in the [System Hierarchy](../../systemHierarchy/README.md) (for the actual remove action).
- See [Key concepts](../README.md#key-concepts) for relationship terminology.

## Steps

### Inspect a system's current spares from the workbench

1. **Find the row** in either pane (Source or Target) by search or filter.

2. **Click the *Spare Parts* affordance on the row.** A modal opens listing every system currently linked as a spare for this one. Columns include name, parent path, system type, zone, and location.

   `[SCREENSHOT PLACEHOLDER: Spare Parts modal open over the workbench — title "Spare Parts:" followed by the system name, table of three spare rows, Close button at the bottom]`

3. **Click the *Spare Part for Systems* affordance on the row** (the mirror affordance). Lists every system that *this* row is a spare for.

   `[SCREENSHOT PLACEHOLDER: Spare Part for Systems modal — title "Spare Part for Systems:" with the system name, two rows of primary systems this spare covers]`

4. **Close the modal.** Your selection state, filters, and scroll position in the workbench are preserved.

### Inspect or remove other relationship types

For relationship types other than `IS_SPARE_FOR`, and for actual removal of any type, switch to the system's detail page:

1. **Open the system detail view** — either from the workbench (click the row's name) or from the [System Hierarchy](../../systemHierarchy/README.md) module or the [Systems Overview](../../systems/README.md). It opens in the System Hierarchy; the URL takes the form `/systems/hierarchy?leaf=<uid>` (old `/system/<uid>` links redirect there).

2. **Go to the *Relationships* tab.** It lists every relationship for that system in both directions, grouped by type, with a *Delete* affordance on each row (visible only with `systems-edit`).

3. **Click *Delete* on the relationship row** you want to remove. Confirm in the modal.

   `[SCREENSHOT PLACEHOLDER: Relationships tab in the System Hierarchy detail view, showing groups for Is Powered From / Is Spare For / Provides Data To, one row hovered with the Delete affordance visible]`

4. **Read the toast.** Success → the relationship is gone from both sides. The opposite system's *Relationships* tab updates immediately on next view.

5. **Verify on the other side.** Open the partner system and confirm the relationship no longer appears in its inbound / outbound list. The *SP Coverage* metric on either side updates for `IS_SPARE_FOR` removals.

`[VIDEO PLACEHOLDER: 35s — open Systems Relations → filter target pane to one system → open Spare Parts modal → close → click row name → land on system detail → Relationships tab → delete one Is Spare For link → confirm → SP Coverage decreases]`

## What gets removed

**✅ Removed by the delete action:**
- The single directed relationship between the two systems.
- The link disappears from *both* sides — the source's outbound view and the target's inbound view.
- *SP Coverage* on the affected primary recomputes immediately for `IS_SPARE_FOR` removals.

**❌ Not affected:**
- Either system's other relationships (other types, or same type to other partners).
- Physical items, persons, hierarchy parent, or any other system attribute.
- Change history — a removal is logged as its own audit entry.

## Tips & gotchas

- **Modals are read-only.** The *Spare Parts* and *Spare Part for Systems* modals in the workbench do not offer a delete action. Use them to verify; delete from the system detail view in the System Hierarchy.
- **Mirror affordances are not symmetric in label.** *Spare Parts* lists the spares **for** this system; *Spare Part for Systems* lists the systems **this** spare covers. Confirm which side of the link you are inspecting before deleting.
- **One link, one delete.** Each click of *Delete* removes a single directed relationship. The reverse direction does not exist as a separate link — deletion is symmetric.
- **No undo.** Recreate the relationship via the workbench if you delete the wrong one.
- **Coverage can flip after removal.** A primary that was at exactly coverage 1 will drop below 1 (and turn red) if you remove one of its spares.

## Related

- [Assigning relationships in bulk](./assigning-relationships-in-bulk.md)
- [Assigning spare parts](./assigning-spare-parts.md)
- *Managing relationships* on a single system → see the [System Hierarchy](../../systemHierarchy/README.md) module.
- *Managing spare parts* on a single system → see the [System Hierarchy](../../systemHierarchy/README.md) module.
