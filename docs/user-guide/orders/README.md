# Orders & Order Items

The Orders module is the **procurement record** of the facility — every purchase request, purchase order, and delivery is tracked here. An order is a *container* with a header (supplier, dates, numbers, responsibles, notes) and two kinds of lines beneath it: **Order Lines** (physical items to be received, each producing a stock-tracked physical item on delivery) and **Service Lines** (services or non-physical procurements — no item is created, but the cost and status are recorded). Mark a line as delivered and the system creates the corresponding physical item, assigns it the supplied serial number and EUN, and makes it available for the [System Hierarchy](../systemHierarchy/README.md) to attach to a system.

Use this module when you need to register a new order, follow the progress of a partial delivery, look up which order brought a given physical item into the facility, or close out an order after the last line has been delivered.

`[SCREENSHOT PLACEHOLDER: Orders list landing — top toolbar with Add / Refresh / Filter buttons, filter chips row, table with columns Name / Order Number / Supplier / Order Status / Delivery Status / Order Date / Notes; one row highlighted on hover with the action menu visible]`

## Access & Responsibilities

**Today's reality:**
- `orders-view` — read-only access to the order list and detail page. Filter, search, and inspect lines without creating or editing.
- `orders-edit` — full edit on the order header, order lines, and service lines. Create new orders, add lines, edit prices, delete lines, attach files.
- `orders-delivery-edit` — *delivery-only* edit. Mark lines as delivered (which creates the physical item) and the *Deliver all* affordance. Held in addition to (or instead of) `orders-edit` when the role separation between procurement and goods-in is enforced.
- `admin` — same as all of the above.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `orders-view` | Browse the list, filter, open an order detail, read all fields and lines, view attached files |
| ✏️ **Procurement Editor** | `orders-edit` | Everything in Viewer + create / edit / delete orders, add and edit order lines and service lines, manage attachments |
| 📦 **Delivery Editor** | `orders-delivery-edit` | Mark order lines and service lines as delivered. Required to create physical items from order lines |
| 🛡️ **Admin** | `admin` | All of the above |

> 🔮 **Coming soon — supplier-team scoping** — a planned enhancement will restrict orders-edit and orders-delivery-edit to specific suppliers / responsible teams. Today both roles are facility-wide.

## Key concepts

- **Order** — the top-level procurement record. Has a *Name*, *Order Number*, *Request Number*, *Contract Number*, *Supplier*, *Requestor*, *Procurement Responsible*, *Order Status*, *Delivery Status*, *Order Date*, *Notes*. Carries zero or more *Order Lines* and zero or more *Service Lines*.
- **Order Status** — the procurement stage of the order: `NONE`, `PLANNED`, `REQUESTED`, `ORDERED`, `ORDER_COMPLETED`, `CANCELLED`.
- **Delivery Status** — computed from the lines: *None*, *Partially Delivered*, *Delivered*. Visible as a coloured badge on the list and in the header.
- **Order Line** — a single physical-item entry: pointer to a [Catalogue item](../catalogue/README.md), quantity (typically 1 — multi-quantity is captured by serial numbers), price, currency, target *System* assignment (where the delivered item should live), notes. Becomes a physical item on delivery.
- **Service Line** — a non-physical entry: service type, item codebook value, price, currency, notes. Does **not** create a physical item on delivery; only its *Delivered* flag and cost are tracked.
- **EUN** — *Equipment Unique Number*, the facility-issued label for a physical item. Required when marking an order line as delivered.
- **Serial number** — the manufacturer's identifier on a physical item. Required when marking an order line as delivered; comma-separated when multiple identical units arrive on one line.
- **Mark delivered** — the action that closes a line: prompts for serial / EUN (order lines) or simply flips the flag (service lines), then creates the physical item or service record server-side.

## Layout

The module has two surfaces — a **list page** at `/orders` and an **order detail page** at `/order/<uid>`.

### List page (`/orders`)

- **Top bar.** *Add Order* (gated by `orders-edit`), *Refresh*, *Filter* sheet trigger, column visibility dropdown on the right. Second row shows active filter chips.
- **Table.** Columns: *Name*, *Order Number*, *Request Number*, *Contract Number*, *Supplier*, *Requestor*, *Procurement Responsible*, *Order Status* (badge), *Delivery Status* (badge), *Notes*, *Order Date*, *Last Update Time*, *Last Update By*. Sticky *Name* column on horizontal scroll. Row hover surfaces an action menu with *Open*, *Delete* (gated). Click a row to open the detail.

### Order detail page (`/order/<uid>`)

- **Header bar.** Order title, *Save*, *Save & Exit* (both gated by `orders-edit`).
- **Left column (1/3 width on desktop).** The **order header form** card: *Order Number*, *Request Number*, *Contract Number*, *Order Date*, *Supplier*, *Order Status*, *Delivery Status* (read-only, derived), *Requestor*, *Procurement Responsible*, *Notes*.
- **Right column (2/3 width).** Stacked sections:
  - **Item Order Lines** — table of physical-item lines with inline *Delivered* toggle, edit / delete / *Print EUN* actions, and an *Add Line* button. Optional *Deliver all* at the section header.
  - **Service Lines** — table of non-physical lines with *Delivered* toggle, edit / delete actions, and *Add Service Line* button. Optional *Deliver all services*.
  - **File manager** — attachments block (invoices, PO PDFs, supporting docs). Tied to the order; uploads land against the order's UID.

## Common workflows

- [Creating and editing an order](./workflows/creating-and-editing-orders.md) — header fields, save and exit flow, deletion, attachment manager.
- [Adding order lines from the catalogue](./workflows/adding-order-lines.md) — the 3-step line wizard: pick catalogue item, fill order details, configure target system; serial-number handling for multi-quantity lines.
- [Adding service lines](./workflows/adding-service-lines.md) — service type, item, price; the simplified service flow without physical items.
- [Marking lines delivered](./workflows/marking-delivered.md) — the *Delivered* toggle, the EUN / serial-number prompt, the *Deliver all* shortcut, what gets created on the server side.
- [Browsing and filtering orders](./workflows/browsing-and-filtering.md) — list page filters, status badges, sort order.

For where the delivered physical items end up — see *Managing physical items* in the [System Hierarchy](../systemHierarchy/README.md) module. For the catalogue items being ordered see the [Catalogue](../catalogue/README.md) module.

## Coming soon

- 🔮 **Order workflow approval** — a planned approval gate between *REQUESTED* and *ORDERED*.
- 🔮 **Partial-quantity delivery from a single line.** Today delivery is per-line; partial-line delivery is captured by splitting via the serial-number list.
- 🔮 **Per-line attachments.** Today files attach to the order header. A future release will let individual lines carry their own files.
- 🔮 **Bulk order import** from CSV.
- 🔮 **Filter persistence presets** — saved filter combinations for the list.
- 🔮 **Supplier-team scoped permissions** — see [Access & Responsibilities](#access--responsibilities) above.

`[VIDEO PLACEHOLDER: 75s end-to-end — open Orders → Add Order → fill header → save → on the detail page Add Line → walk through the line wizard (catalogue pick, order details, system target) → save → mark line delivered → enter serial / EUN → see new physical item appear in the System Hierarchy under the target system]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The Confluence generator strips it.*
>
> Endpoints: `GET /orders` (list, `orders` key), `GET /order/<uid>` (detail, `order` key), `POST/PUT /order` (create/update), `DELETE /order/<uid>`, `PUT /order/<uid>/orderline/<itemUid>/delivery` (per-line deliver with `{ isDelivered, serialNumber?, eun? }`), `PUT /order/<uid>/orderlines/delivery` (bulk deliver), and mirror endpoints for `serviceline(s)`. Status enums in `src/modules/orders/types/types.ts` (`ORDER_STATUS`, `DELIVERY_STATUS`). File attachments use `FILE_TYPE.ORDER` against the order's UID.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
