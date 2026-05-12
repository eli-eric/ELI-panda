# Adding service lines

## What this is for

Capture non-physical procurements — services, calibrations, support contracts, installation fees, training — alongside the physical items on the same order. A *Service Line* records cost, status, and notes the same way an [Order Line](./adding-order-lines.md) does, but it never produces a physical item on delivery. Marking a service line *Delivered* simply flips the flag and contributes the cost to the order's delivered total.

Use this workflow whenever the order envelope includes work performed (rather than goods shipped) — calibration of a delivered instrument, a service window, an annual support package, on-site installation.

## Who can do this

✏️ **Procurement Editor** — requires the `orders-edit` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- The order has been saved at least once. See [Creating and editing an order](./creating-and-editing-orders.md).
- The service type exists in the service codebook (managed in the [Services](../../services/README.md) module or the [Codebooks](../../codebooks/README.md) module — see [user guide index](../../README.md)).

## Steps

The service line creation is a **shorter wizard than the order-line wizard** — no system target, no catalogue picker, no serial numbers.

1. **Click *Add Service Line*** in the *Service Lines* section header on the order detail page. The wizard opens as a sheet on the right.

   `[SCREENSHOT PLACEHOLDER: service line wizard sheet open showing fields Name, Service Type, Item, Price, Currency, Notes, with the Item picker open below them showing a small catalogue tree]`

2. **Fill the service line fields:**

   | Field | Required | Notes |
   |---|---|---|
   | **Name** | ✅ | Display label for the service line in the *Service Lines* table |
   | **Service Type** | ✅ | Picker from the Service-type codebook (e.g. *Calibration*, *Installation*, *Annual support*) |
   | **Item** | — | Optional codebook reference linking the service to the catalogue item it relates to (e.g. calibration of *this specific* instrument) |
   | **Price** | — | Numeric |
   | **Currency** | — | Currency picker |
   | **Notes** | — | Free text |

3. **Click *Save*** on the wizard. The service line appears in the *Service Lines* table on the order detail page.

   `[SCREENSHOT PLACEHOLDER: Service Lines table on the order detail page with three rows — columns Name, Service Type, Notes, Item, Delivered (badge), Price — one row toggled to Delivered]`

4. **Save the order.** As with order lines, service lines are kept in form state until the order itself is saved.

`[VIDEO PLACEHOLDER: 40s — open an order → Add Service Line → fill Name as "On-site installation" → pick Service Type "Installation" → set Price 25 000 CZK → save the wizard → Save the order → toggle the Delivered flag on the service-line row]`

## What gets created / changed

**✅ Created when you save the order:**
- One service line record attached to the order.
- The service line is in *Not Delivered* state by default.

**❌ Not affected:**
- No physical item is created at any stage of a service line's lifecycle. *Marking delivered* on a service line is a status flip only.
- The catalogue item referenced as *Item* is not modified — it is purely a reference.
- The target system. Service lines have no system target.

## Limitations

- **No physical item produced.** A service line is purely an accounting entry. Use an order line if a physical good is part of the delivery.
- **No serial numbers, no EUN.** Service lines do not carry these fields.
- **Item is a soft reference.** The *Item* picker is a convenience link to a catalogue item the service relates to; it is not enforced.
- **Mark-delivered flow is simpler.** No EUN / serial prompt — see [Marking lines delivered](./marking-delivered.md).

## Tips & gotchas

- **Name well.** The *Name* is the only freeform identifier on a service line. *"On-site installation of new vacuum gauge"* reads better in a list than *"Installation"*.
- **Service Type and Service module overlap.** The same codebook value drives both this picker and the [Services](../../services/README.md) module. Keep the codebook curated; renames propagate.
- **Link to Item when relevant.** When the service is *about* a specific catalogue item (calibration, repair, installation of that part), set the *Item* link — it makes auditing easier later.
- **Service Lines and Order Lines do not interlock.** An order can have only service lines (e.g. pure-service contract), only order lines, or a mix. The *Delivery Status* on the order header treats both equally for the partial / complete calculation.
- **No mass-delivery shortcut by line type.** *Deliver all* on the order detail covers all eligible lines; there is no "deliver all services only" affordance.

## Related

- [Adding order lines from the catalogue](./adding-order-lines.md)
- [Marking lines delivered](./marking-delivered.md)
- [Creating and editing an order](./creating-and-editing-orders.md)
- Service codebook → see the [Services](../../services/README.md) module (planned).
- Catalogue items the service relates to → see the [Catalogue](../../catalogue/README.md) module.
