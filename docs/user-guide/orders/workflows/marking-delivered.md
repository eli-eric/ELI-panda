# Marking lines delivered

## What this is for

Close the loop between procurement and inventory. When the goods arrive, you mark the corresponding order line *Delivered* — PANDA creates the physical item(s) from the line, attaches the supplied serial numbers and EUN, and (if the line had a pre-assigned target system) lands the item on that system in the [System Hierarchy](../../systemHierarchy/README.md). For service lines the action is a simpler status flip with no item creation.

This is the action that turns "we ordered three vacuum gauges" into "these three specific physical units, with these serial numbers, in stock at the facility, attached to these systems."

## Who can do this

📦 **Delivery Editor / Admin** — requires the `orders-delivery-edit` role (held in addition to or instead of `orders-edit`).

`orders-edit` alone is *not* enough to mark delivered — this enforces the separation between procurement (who placed the order) and goods-in (who confirmed receipt).

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- The order line exists and has the supplier-provided serial numbers populated (or you have them in hand to enter at delivery time). See [Adding order lines](./adding-order-lines.md).
- For order lines: a target system is recommended (set on the line) so the resulting physical item lands directly in the [System Hierarchy](../../systemHierarchy/README.md). Without a target the physical item is created but unassigned, and you assign it later from the system detail page.
- For service lines: no extra prerequisites.

## Steps

### Order line — single delivery

1. **Open the order** from the list. Scroll to the *Item Order Lines* table.

2. **Toggle the *Delivered* control** on the line row. A modal opens to collect the per-delivery details.

   `[SCREENSHOT PLACEHOLDER: order line row with the Delivered toggle being switched, the OrderIsDeliveryModal opening on top — fields Serial Number, EUN (with Print button), Confirm and Cancel buttons]`

3. **Confirm or enter the *Serial Number(s)*** and *EUN*. The modal pre-fills these from the line if you set them at line-creation time; otherwise enter them now. For multi-quantity lines, the serial-number field is comma-separated.

4. **Click *Confirm*.** PANDA does two things server-side:
   - **Creates one physical item per serial number** on the line. Each new physical item carries its serial number, the EUN, the catalogue item from the line, and the order reference.
   - **Assigns each physical item to the target system** if the line had one set. Otherwise the items are created as unassigned.

   A toast confirms — *Line delivered*. The line row flips to a *Delivered* badge; the order's *Delivery Status* recomputes.

5. **Verify in the [System Hierarchy](../../systemHierarchy/README.md).** Open the target system; its *Physical Item* tab now shows the new unit with its serial number and EUN. The order's *Linked Orders* view on the [Catalogue](../../catalogue/README.md) item also includes this order.

### Service line — single delivery

1. **Scroll to the *Service Lines* table.**

2. **Toggle the *Delivered* control** on the row. No modal opens — the flag flips immediately and the badge updates.

   `[SCREENSHOT PLACEHOLDER: service line row showing the Delivered toggle in the on position with the badge changed to Delivered]`

3. **Save the order** (or *Save & Exit*) to persist the status.

### Deliver all lines at once

1. **Click *Deliver all*** in the *Item Order Lines* section header (or *Deliver all services* in the *Service Lines* section).

2. **Confirm in the modal.** All not-yet-delivered lines of the matching kind are marked delivered in one server transaction.

   For order lines, *Deliver all* requires every line to already have its serial numbers and EUN populated. Lines missing either are skipped and listed in the result toast.

`[VIDEO PLACEHOLDER: 50s — open an order with three lines and two service lines → toggle a single line delivered → enter serial / EUN → confirm → see new physical item appear in System Hierarchy → return → click Deliver all → confirm → see Delivery Status flip to Delivered on the order header]`

## What gets created / changed

**✅ Created for an order line:**
- One physical item per serial number in the line's serial-number list.
- Each physical item carries: the catalogue reference, the supplied serial number, the EUN, the order reference, optionally the target system, the delivery timestamp, and the delivering user.
- The line's *Delivered* flag flips to true.
- The order's *Delivery Status* recomputes: *None* → *Partially Delivered* (any but not all lines), or *Delivered* (all eligible lines).
- A new audit entry is added to the order's change history.

**✅ Changed for a service line:**
- The line's *Delivered* flag.
- The order's *Delivery Status*.
- An audit entry.

**❌ Not affected:**
- The catalogue item being delivered. The catalogue record is the abstract spec; physical items reference it but do not modify it.
- Other lines on the order. They retain their own delivery state.

## Limitations

- **Cannot undo a delivery cleanly.** Toggling *Delivered* back to off is allowed by the UI, but the physical item already created is *not* deleted automatically — it remains in inventory and must be removed manually from the [System Hierarchy](../../systemHierarchy/README.md) if it was a mistake. Treat the *Delivered* toggle as a one-way action in practice.
- **Partial-line delivery is not supported as a separate flow.** A line is either delivered (all its serial numbers produce physical items) or not delivered (no items yet). To deliver some-but-not-all of a multi-quantity line, split the line first.
- **Service line delivery is a flag only.** No record of *when* a service was performed beyond the order's change history.
- **Deliver all is best-effort.** Lines missing serial numbers / EUN are skipped, not failed. The toast lists what was skipped so you can fill in the missing data and try again.

## Tips & gotchas

- **Fill serial numbers and EUN ahead of time.** It is the difference between a one-click *Deliver all* and a half-hour of per-line modals.
- **Pre-assign target systems on the line.** It saves a separate "assign physical item to system" step in the [System Hierarchy](../../systemHierarchy/README.md) per unit.
- **Watch the Delivery Status badge.** It is the fastest signal that an order is finished. The list view's *Delivery Status* column lets you triage open orders quickly.
- **Print EUN labels before delivery.** The line row's action menu has *Print EUN* — print the labels, stick them on the units, then confirm delivery with the labelled EUN.
- **Audit trail is preserved.** Each delivery is recorded with timestamp and user. If a unit goes missing later, the order's history tells you when it entered the facility and who confirmed receipt.

## Related

- [Adding order lines from the catalogue](./adding-order-lines.md)
- [Adding service lines](./adding-service-lines.md)
- [Creating and editing an order](./creating-and-editing-orders.md)
- Where delivered items end up → see *Managing physical items* in the [System Hierarchy](../../systemHierarchy/README.md) module.
