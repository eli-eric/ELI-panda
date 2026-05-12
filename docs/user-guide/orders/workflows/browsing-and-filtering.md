# Browsing and filtering orders

## What this is for

Find an order — by supplier, by order or request number, by date range, by procurement responsible, by status — and triage the list of in-flight orders by their delivery state. The orders list is the procurement team's daily dashboard: open orders awaiting delivery, partially delivered orders that need follow-up, recently closed orders that should be audited.

## Who can do this

👁️ All personas — browsing, filtering, and sorting are available with `orders-view`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Orders** list page (sidebar entry *Orders*).
- See [Key concepts](../README.md#key-concepts) for terminology — order, order status, delivery status.

## Steps

The list combines a **search box**, a **Filters sheet** (multi-field), **filter chips** above the table, **sort** on column headers, and **column visibility**.

1. **Type into the search box** in the top toolbar. Matches partial text in name, order number, request number, contract number, and supplier.

   `[SCREENSHOT PLACEHOLDER: top toolbar with search field focused, table beneath narrowed to matching rows, the search query appearing as a chip in the filter row]`

2. **Open the *Filter* sheet** from the top toolbar.

3. **Fill any of the filter fields:**

   | Field | Match type |
   |---|---|
   | **Name** | Contains |
   | **Order Number** | Contains |
   | **Request Number** | Contains |
   | **Contract Number** | Contains |
   | **Supplier** | Picker |
   | **Requestor** | Employee picker |
   | **Procurement Responsible** | Employee picker |
   | **Order Status** | Multi-select (*None*, *Planned*, *Requested*, *Ordered*, *Order Completed*, *Cancelled*) |
   | **Delivery Status** | Multi-select (*None*, *Partially Delivered*, *Delivered*) |
   | **Order Date** | Range (from / to) |

4. **Apply.** Each active filter appears as a chip in the filter row; remove a single chip with its × to drop just that filter.

   `[SCREENSHOT PLACEHOLDER: filter sheet open with three filter fields filled in — Supplier, Order Status set to Ordered, Delivery Status set to Partially Delivered — Apply button at the bottom]`

5. **Sort.** Click any column header. The most common triage sort is *Order Date* descending (recent first) plus a *Delivery Status* multi-filter set to *None* and *Partially Delivered* — that surfaces the orders still owed deliveries.

6. **Adjust column visibility** with the dropdown on the right side of the top bar. The table has a wide column set including procurement metadata, status badges, and update audit columns.

7. **Open an order.** Click a row. The URL takes the form `/order/<uid>` and the order detail page loads. The browser back button restores your filter and sort state from the URL.

`[VIDEO PLACEHOLDER: 30s — open Orders → set Delivery Status filter to Partially Delivered → set Procurement Responsible to a specific employee → sort by Order Date descending → see the actionable list → click one row to open the detail]`

## Tips & gotchas

- **URL-backed state.** Search, filters, sort, and pagination are encoded in the URL. Bookmarkable; back/forward in the browser works as expected.
- **Two status columns, two stories.** *Order Status* is the procurement stage you set manually. *Delivery Status* is the goods-in state PANDA computes from the lines. Use both — *Order Status = Ordered* + *Delivery Status = None* is "we placed it, nothing has arrived yet"; *Delivered* is the closure state.
- **Filter chips are the recoverable history.** Each chip is removable independently; you do not have to reopen the sheet to drop one filter.
- **Refresh after a delivery.** Goods-in actions by another user change *Delivery Status* on existing orders; click *Refresh* to pick up the latest state without losing your filters.
- **Hover the row** to surface its action menu (open, delete-if-allowed). Click anywhere on the row body to open the order.
- **Status badges are colour-coded.** Quick visual triage: green for *Delivered*, amber for *Partially Delivered*, blue for *Ordered*, etc. Colour palette is defined per status and consistent with the badge on the detail page header.

## Related

- [Creating and editing an order](./creating-and-editing-orders.md)
- [Marking lines delivered](./marking-delivered.md) — what changes the *Delivery Status* badge.
- Per-line filtering on the catalogue item → see the [Catalogue](../../catalogue/README.md) module.
