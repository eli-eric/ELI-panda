# Searching and filtering

## What this is for

Quickly find specific subsystems within the *currently selected* parent, either by free-text search across common fields or by a multi-field filter sheet that can combine many criteria. The active filter set is reflected in the URL so you can share or bookmark a view.

## Who can do this

👁️ **All personas** — search and filter are read-only and available to anyone with the `systems-view` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are looking at the System Hierarchy module.
- You have selected a parent system in the tree (search and filter operate on its subsystems — the leaves panel).
- See [Key concepts](../README.md#key-concepts) for terminology (system level, system type, EUN, catalogue item).

## Steps

### Free-text search

1. **Find the search box** in the leaves panel toolbar (next to the *Filters* button at the top of the *Subsystems* table).

   `[SCREENSHOT PLACEHOLDER: leaves panel toolbar with Filters button on the left, search input in the middle, column-visibility dropdown on the right]`

2. **Type a query.** Search is debounced — results update shortly after you stop typing. The query also becomes part of the URL so you can copy the link to a colleague.

3. **Clear the search** by emptying the input. The full subsystem list returns.

> **Tip:** the toolbar search filters only the *leaves panel* (everything beneath the selected parent), not the whole hierarchy. To search the whole tree, use the search box at the top of the System Tree on the left — see [Navigating the tree](./navigating-the-tree.md).

### Narrowing to direct end systems

By default the table lists every end system beneath the selected parent, however deep. *Direct only* changes **which systems are under consideration** — unlike the filters below, which narrow a list you already have.

4. **Tick *Direct only*** next to the search box. The table drops to the end systems hanging immediately off the selected parent.

5. **Combine it freely.** Search, filters, sorting, and paging all keep working on the narrowed list. Ticking the box does not clear anything you had set.

6. **If the table comes up empty**, you see *No end systems directly under this system* — everything beneath the parent sits deeper. Use *Show all levels* in that message to go back to the full list.

> **Tip:** the dot next to a node's count badge in the tree tells you in advance whether *Direct only* will find anything there. See [Navigating the tree](./navigating-the-tree.md#finding-a-nodes-own-end-systems).

### Opening the filter sheet

7. **Click *Filters*** in the leaves panel toolbar. A side sheet slides in with all available filter fields.

8. **Watch the filter button:** when one or more filters are active, the button is filled (vs. outline when empty) and a *Filters Applied* tooltip appears on hover. A row of filter badges appears below the toolbar summarizing what is active.

   `[SCREENSHOT PLACEHOLDER: leaves panel with the Filters button highlighted/filled and a row of small filter badges visible below the toolbar]`

### Filter fields

The filter sheet is laid out in two columns. All fields combine with AND.

| Group | Field | Type |
|---|---|---|
| **System** | Name | text |
|  | System Code | text |
|  | System Level | multi-select (multi-checkbox) |
|  | System Type | combobox |
|  | Importance | multi-select |
|  | Description | text |
|  | Spare Parts Coverage | numeric range (Min / Max) |
|  | Critical SP Coverage | checkbox |
| **People** | Responsible Person | multi-select (employee codebook) |
| **Place** | Zone | multi-select |
|  | Location | location combobox |
| **Item / Catalogue** | Item Usage | multi-checkbox (e.g. *In use*, *In storage*) |
|  | EUN | text |
|  | Part Number / Catalogue Number | text |
|  | Serial Number | text |
|  | Catalogue Name | text |
|  | Category | catalogue category combobox (tree picker) |
|  | Supplier | multi-select |
|  | Price | range slider (min/max derived from data) |
| **Order** | Order Name | text |
|  | Order Number | text |
|  | Order Request Number | text |
|  | Order Contract Number | text |

`[SCREENSHOT PLACEHOLDER: filter sheet open with several fields filled in across both columns, showing the variety of types — text inputs, multi-checkboxes, a range slider]`

### Dynamic property filters

9. **Pick a *Category*** in the catalogue section. When a category is selected, two extra sections appear at the bottom of the sheet:

   - **Category Properties** — filters keyed to the properties defined on that catalogue category.
   - **Item Properties** — filters keyed to per-item property values within that category.

   These are dynamic and depend on which category you picked, so they only show up when relevant.

### Applying, saving, and clearing

10. **Save your filter setup** with *Save Settings* in the footer of the sheet — this stores the current filter combination as a named preset for later reuse.

11. **Clear everything** with *Clear Filters* in the footer. The form resets and all column filters in the table clear. *Direct only* is a scope, not a filter, so it stays as you left it.

12. **Close the sheet** by clicking outside it or using the close icon. Active filters remain applied.

`[VIDEO PLACEHOLDER: 30s — type a search term and watch the table filter, then open the Filters sheet, set a system level + responsible person + price range, see the badge row appear below the toolbar, then clear all filters]`

## Tips & gotchas

- **Filters live in the URL.** The current filter set is encoded as a query parameter — you can share the URL or bookmark it to come back to the same view. So does *Direct only*.
- **Search and filters compose.** A free-text search applies on top of any active filter set; the displayed table is the intersection. *Direct only* composes with both.
- **Nothing resets when you pick a different parent** — search, filters, and *Direct only* all follow you around the tree until you clear them. Only the page number resets. If a node looks emptier than expected, check the toolbar before concluding it has nothing in it.
- **Spare-part coverage range** treats blank Min/Max as "no bound" — leave one side empty to filter only on the other.
- **Category-driven property filters** disappear if you remove the category. If you saved a preset that included property filters, switching categories may leave you with stale property filters that no longer match anything — clear and reapply.
- **The price range** picks up its dynamic min/max from the currently visible data set, so the slider bounds shift as the rest of the filters narrow the data.

## Related

- [Navigating the tree](./navigating-the-tree.md) — for searching the whole tree (left search box) instead of just the current leaves panel.
- [Editing system details](./editing-system-details.md) — once you've found the system you wanted.
- [Managing physical items](./managing-physical-items.md) — many of the filter fields key off catalogue and order data attached to physical items.
