# Creating and editing an order

## What this is for

Register a procurement record in PANDA — either a brand-new order, or pick up an existing one for edits to the header (supplier change, updated request number, status transition) or to attach a freshly received invoice. The order header is the *envelope*: it ties together a supplier, dates, identifiers, responsibles, and notes around the set of lines you will add separately (see [Adding order lines](./adding-order-lines.md) and [Adding service lines](./adding-service-lines.md)).

## Who can do this

✏️ **Procurement Editor** — requires the `orders-edit` role.

Viewers see the order detail page in read-only mode (form fields disabled, no *Save* button, *Add Line* and *Delete* affordances hidden).

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `orders-edit` and the **Orders** sidebar entry is visible.
- For brand-new orders, the supplier exists in the supplier codebook. See [Codebooks](../../codebooks/README.md) (or the [user guide index](../../README.md)) for managing the codebook.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Create a new order

1. **Click *Add Order*** in the top toolbar of the **Orders** list page. The order detail page opens in create mode.

   `[SCREENSHOT PLACEHOLDER: empty order detail page in create mode — left column with header form blank, right column showing empty Item Order Lines and Service Lines sections with their Add buttons, Save and Save & Exit in the header]`

2. **Fill the order header fields** in the left card:

   | Field | Required | Notes |
   |---|---|---|
   | **Name** | ✅ | Display label everywhere the order is referenced |
   | **Order Number** | — | Supplier-issued or facility-issued PO number |
   | **Request Number** | — | Internal procurement request id |
   | **Contract Number** | — | Framework / contract id if applicable |
   | **Order Date** | ✅ | Date of the order |
   | **Supplier** | ✅ | Picker from the Supplier codebook |
   | **Order Status** | ✅ | One of *None*, *Planned*, *Requested*, *Ordered*, *Order Completed*, *Cancelled* |
   | **Delivery Status** | — | Read-only — derived from the lines |
   | **Requestor** | — | Employee picker |
   | **Procurement Responsible** | — | Employee picker — the buyer on this order |
   | **Notes** | — | Free text |

3. **Click *Save*** or *Save & Exit*.
   *Save* persists and stays on the detail page so you can immediately add lines. The URL changes to `/order/<uid>`.
   *Save & Exit* persists and returns to the orders list.
   A toast confirms — *Order saved*. The right column's *Add Line* and *Add Service Line* buttons become operable once the order has been saved at least once (they need the order's UID to attach to).

### Edit an existing order

1. **Open the order** from the list — click the row.

2. **Edit any header field.** *Delivery Status* stays read-only since it is derived from the lines below.

3. **Click *Save* or *Save & Exit***. The toast confirms.

### Attach invoices and supporting files

1. **Save the order** at least once so it has a UID.

2. **Scroll to the file manager** below the lines tables.

3. **Upload a file** (drag-and-drop or *Upload File*), or *Add Link* to attach an external URL. Tag the file (e.g. *invoice*, *PO*, *quote*). Tags help filter the file list once it grows.

`[SCREENSHOT PLACEHOLDER: order detail file manager block with two files attached — one PDF tagged as invoice, one external link tagged as quote — and the Upload File / Add Link controls visible]`

### Delete an order

1. **Open the more-actions menu** on the order row in the list (or use the delete affordance on the detail page).

2. **Click *Delete***. A confirmation modal shows: *Are you sure you want to delete {name}?*

3. **Confirm.** Deletion is **blocked** if the order has any delivered lines (because deleting them would orphan the resulting physical items). The error toast lists the blocker.

`[VIDEO PLACEHOLDER: 50s — Add Order → fill header → Save → confirm UID in URL → attach an invoice file → scroll to top → change Order Status to Ordered → Save → return to list → open more-actions menu → Delete (blocked because of a delivered line)]`

## What gets created / changed

**✅ Affected:**
- Order record (header fields).
- Attached file or link records on the order.
- Last Update Time / Last Update By columns on the order.

**❌ Not affected:**
- Existing lines on the order. Header edits do not touch them.
- Physical items already created by previous deliveries. They remain in the [System Hierarchy](../../systemHierarchy/README.md).

## Limitations

- **No undo on delete.** Even when delete is allowed, recovery is manual.
- **Delivery status is derived.** You cannot set it manually; it follows the line states.
- **No per-line attachments today.** Files attach to the order header. A per-line attachment feature is on the roadmap.

## Tips & gotchas

- **Save before adding lines.** *Add Line* and *Add Service Line* need the order's UID. Save the header first; then add lines.
- **Order Status vs. Delivery Status.** *Order Status* is the procurement stage (you set it); *Delivery Status* is the actual goods-in state (PANDA computes it). They tell two different stories — both badges appear on the list.
- **Use Notes for procurement context.** Anything the next person on the order should know — payment terms, partial shipments expected, special handling — belongs here.
- **Delete is best avoided post-delivery.** Once any line has been marked delivered and a physical item exists, prefer *Order Status = Cancelled* over deletion to keep the audit trail intact.

## Related

- [Adding order lines from the catalogue](./adding-order-lines.md)
- [Adding service lines](./adding-service-lines.md)
- [Marking lines delivered](./marking-delivered.md)
- [Browsing and filtering orders](./browsing-and-filtering.md)
- Catalogue → see the [Catalogue](../../catalogue/README.md) module.
- Where delivered items go → see *Managing physical items* in the [System Hierarchy](../../systemHierarchy/README.md) module.
