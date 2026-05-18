# Adding order lines from the catalogue

## What this is for

Build out the *what* of an order — the physical items being procured. An order line references a [Catalogue item](../../catalogue/README.md), captures the price and quantity, and optionally pre-assigns the target system in the [System Hierarchy](../../systemHierarchy/README.md) so that when the goods arrive and you mark the line delivered, the new physical item lands in the right place without an extra step.

Use this workflow once the order header has been saved. Each line you add becomes one physical item per serial number on delivery.

## Who can do this

✏️ **Procurement Editor** — requires the `orders-edit` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- The order has been saved at least once (the URL contains `/order/<uid>`). See [Creating and editing an order](./creating-and-editing-orders.md).
- The catalogue items you need exist. If a part has never been ordered before, create it in the [Catalogue](../../catalogue/README.md) first.
- Optional: the target system already exists in the [System Hierarchy](../../systemHierarchy/README.md). You can leave the target unassigned and pick it later, or assign it during the line wizard.

## Steps

The line creation is a **3-step wizard**: pick the catalogue item, fill order details, configure the system target. Each step has validation; *Next* is disabled until the current step is valid.

1. **Click *Add Line*** in the *Item Order Lines* section header on the order detail page. The line wizard opens as a sheet on the right.

   `[SCREENSHOT PLACEHOLDER: order detail page with the Add Line wizard sheet open on the right — step indicator at the top showing three steps, the first step (catalogue picker) active with a search box and results below]`

2. **Step 1 — Pick the catalogue item.** The first step is a catalogue picker dialog with search, category tree, and filters (the same picker used elsewhere in the app). Find the item; select its row.

   Once selected, fields downstream pre-fill from the catalogue: *Name*, *Part Number*, *Catalogue Category*, etc.

3. **Step 2 — Fill the order details.** This step covers the per-line procurement attributes:

   | Field | Required | Notes |
   |---|---|---|
   | **Price** | — | Numeric, in the order's currency |
   | **Currency** | — | Defaults to the supplier's currency if known |
   | **Quantity / Serial Numbers** | ✅ | Comma-separated list of serial numbers. The *count* is the quantity; each comma-separated value becomes one physical item on delivery |
   | **EUN** | — | Set if you have pre-assigned facility EUNs; required at delivery time if not set now |
   | **Notes** | — | Free text, per line |

   `[SCREENSHOT PLACEHOLDER: line wizard step 2 with Price / Currency / Serial Numbers / EUN / Notes fields filled; Serial Numbers shows "SN001, SN002, SN003" indicating quantity 3]`

4. **Step 3 — Configure the system target.** Optional but recommended for orders where you already know where the items will go.

   | Field | Required | Notes |
   |---|---|---|
   | **System** | — | Pick the system this line's items will be assigned to on delivery |
   | **Parent System** | — | Surfaced for context; defaults from the picked system |
   | **Location** | — | Codebook location, falls back from the system |
   | **Item Usage** | — | Codebook value indicating intended use (operational, spare stock, etc.) |

   If left blank, the line still saves; you simply assign the resulting physical item to a system after delivery.

5. **Click *Save*** on the wizard. The line appears in the *Item Order Lines* table on the order detail page. The wizard sheet closes.

6. **Save the order.** Click *Save* in the order header to persist the new line(s). Lines are kept in form state until the order is saved.

`[VIDEO PLACEHOLDER: 60s — open an existing order → Add Line → pick a catalogue item → enter price 12 500 CZK → enter three comma-separated serial numbers → pick System target → Save the line → Save the order → see the line render with delivered toggle off]`

## What gets created / changed

**✅ Created when you save the order:**
- One order line record per *Add Line* invocation, attached to the order.
- Line is in *Not Delivered* state — no physical item exists yet. The delivery action creates the physical item per serial number.

**❌ Not affected at this stage:**
- The catalogue item itself. The line references the catalogue record; the catalogue is untouched.
- The target system. The line *points at* the system but does not modify it until delivery.
- Other lines on the order.

## Limitations

- **Three steps are sequential.** Each step must be valid to proceed to the next; you cannot jump.
- **Multi-quantity is captured by serial-number list.** A line with serial numbers `A,B,C` represents three physical items. Quantity is not stored as a separate number; it is `count(serial numbers)`.
- **System assignment is per-line, not per-physical-item.** Every physical item produced by the line lands on the same target system. If different units of the same line should go to different systems, split the line in two before saving.
- **Editing a line is allowed pre-delivery.** Once any unit on the line has been delivered, the line's catalogue and price fields become read-only; only notes and remaining-unit fields can be adjusted.

## Tips & gotchas

- **Serial numbers should reflect the supplier's intent.** Leave placeholders only when serial numbers will not be known until physical receipt — the *Mark Delivered* step requires real serials to be supplied at that point.
- **Pre-assign the system when you can.** It saves one step at delivery and keeps the line auditable end-to-end.
- **Edit a line via its row's action menu.** The wizard reopens scrolled to the step you came from; navigate back to step 1 to swap the catalogue item if needed.
- **Print EUN from the action menu.** The action menu on a line row carries a *Print EUN* affordance that generates a printable label for the EUN on the line — useful when receiving and labelling units.

## Related

- [Adding service lines](./adding-service-lines.md)
- [Marking lines delivered](./marking-delivered.md)
- [Creating and editing an order](./creating-and-editing-orders.md)
- Catalogue items → see the [Catalogue](../../catalogue/README.md) module.
- Where delivered items end up → see *Managing physical items* in the [System Hierarchy](../../systemHierarchy/README.md) module.
