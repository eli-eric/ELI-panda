# Managing related catalogue items

## What this is for

Link a catalogue item to its companion items in the catalogue — accessories, replacements, compatible counterparts, or items that are typically ordered together. The relation is directional but the detail page surfaces *both sides*: items this one references, and items that reference this one. Use this when ordering one thing usually implies needing another, or when documenting product families that should travel together.

## Who can do this

✏️ **Editor / Admin** — requires the `catalogue-edit` role.

Viewers see the related-items list (both directions) but cannot add or remove links.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on a catalogue item detail page (URL `/catalogue/item/<uid>`).
- The item you want to link to already exists in the catalogue.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Add a related catalogue item

1. **Scroll to the *Related Items* table** on the detail page.

   `[SCREENSHOT PLACEHOLDER: Related Items section showing a small table with two existing rows (thumbnail / name / part number / category / supplier) and an Add Related Item button above the table]`

2. **Click *Add Related Item*.** A catalogue item picker dialog opens — the same picker used elsewhere in the app for choosing catalogue items. The picker has its own search, category tree, and filters; the item you are currently editing is excluded from the result set.

   `[SCREENSHOT PLACEHOLDER: catalogue item picker dialog open in front of the detail page, showing a search box, category tree on the left, a small results table, and Select / Cancel buttons]`

3. **Find the target item** using the picker's search and filters, then select its row and confirm. The new link appears in the *Related Items* table on the current item, and on the target item it appears in *Items that reference this one*.

### Remove a related catalogue item

1. **Hover the row** in the *Related Items* table and click the disconnect affordance.

2. **Confirm in the warning modal.** Removing the link does not affect either catalogue item's base record — only the link between them is dropped. The opposite side (items that referenced this one) updates immediately on the related item's detail page.

`[VIDEO PLACEHOLDER: 30s — open a catalogue item → click Add Related Item → search for a target in the picker → select it → see it appear in Related Items → open the target item to see the back-reference → disconnect the link from either side]`

## What gets created / changed

**✅ Affected:**
- A directed relation between the two catalogue items.
- Visible on **both** items' detail pages — outgoing on the source, incoming on the target.

**❌ Not affected:**
- Base attributes, property values, images, or files on either item.
- Physical items, orders, or system assignments.
- Other relations the items already have to third items.

## Limitations

- **No relation type.** All relations are of one undifferentiated kind — there is no *accessory of* / *replaces* / *compatible with* distinction today.
- **No bulk link.** Items are linked one at a time through the picker.
- **Self-link is blocked.** The picker excludes the current item from results.

## Tips & gotchas

- **Picker scope.** The picker searches the entire catalogue, not just the current category. Use the picker's own filters when the catalogue is large.
- **Bi-directional view, one-sided edit.** Adding the link from item A to item B is enough; you do not need to add it again on item B. Removing from either side disconnects both.
- **Use related items for procurement hints**, not for engineering relationships between systems. Engineering links live on systems in the [System Hierarchy](../../systemHierarchy/README.md) module (see *Managing relationships* there).
- **Companion item count is small by design.** If you find yourself adding dozens of related items, consider whether a shared category or a property is the better model.

## Related

- [Browsing and searching the catalogue](./browsing-and-searching.md)
- [Creating and editing a catalogue item](./creating-and-editing-items.md)
- Engineering relationships between systems → see *Managing relationships* in the [System Hierarchy](../../systemHierarchy/README.md) module.
