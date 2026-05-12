# Browsing and searching the catalogue

## What this is for

Find a catalogue item without knowing exactly where it lives. The catalogue is too big to scroll, so navigation combines a category tree (drill-down), a breadcrumb (jump back up), a free-text search, and a filter sheet whose fields adapt to the selected category. Use this workflow when you are looking up an existing item — to view it, copy its part number into an order, or check what physical items reference it.

## Who can do this

👁️ All personas — read-only browsing is available to anyone with `catalogue-view`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Catalogue** page (sidebar entry *Catalogue*).
- See [Key concepts](../README.md#key-concepts) for terminology (category, property group, property, part number).

## Steps

There are four navigation surfaces — the **category tree** on the left, the **breadcrumb** above the table, the **search field** in the filter sheet, and the **filter sheet** itself. They compose: drilling into a category, searching by name, and adding property filters all narrow the same result set.

1. **Drill into a category in the left tree.**
   Click a category to filter the table to its items. Expand and collapse branches with the chevron icons. The selected category shows up as a chip above the table (*category: <name>*) with a clear button (×) to step back to *all categories*.

   `[SCREENSHOT PLACEHOLDER: catalogue page with left category tree expanded two levels deep, a leaf category selected (highlighted), category chip visible above the table, breadcrumb path showing Home > parent > selected]`

2. **Use the breadcrumb to jump up the tree.** The breadcrumb shows the ancestor path of the selected category and ends with an *Add Category* button (editors only). Clicking any ancestor navigates the table to that level. Clicking *Home* clears the category filter.

3. **Open the Filters sheet** from the top action bar. The sheet stacks the **base fields** at the top and the **category property filters** below.

   `[SCREENSHOT PLACEHOLDER: Filters sheet open on the right, sections labeled with base fields (Name, Part Number, Manufacturer URL, Supplier, Category, Description) and below them dynamic property filters for the currently selected category]`

4. **Fill the base filters** as needed. All are optional, all are partial-match unless noted:

   | Field | Match type | Notes |
   |---|---|---|
   | **Name** | Contains | Full text in the *Catalogue Name* field |
   | **Part Number** | Contains | Free text |
   | **Manufacturer URL** | Contains | The *Supplier/Manufacturer Url* field |
   | **Supplier** | Equals | Picker from the Supplier codebook |
   | **Category** | Tree pick | Combobox with the category tree; equivalent to clicking a category in the left sidebar |
   | **Description** | Contains | Full text in the item description |

5. **Fill the property filters.** Below the base block the sheet renders one filter per property defined on the *currently selected* category. Property filters appear *only* when a category is selected — they are how you ask "give me all items in this category whose <property> is X". Available property fields update automatically when you change the category.

6. **Apply the filters.** Submit the sheet to apply. Active filters appear as removable chips above the table; clicking the × on a chip removes that one filter without closing the sheet.

7. **Sort and adjust column visibility.** Column headers in the table sort the result set. The column visibility dropdown on the right side of the action bar lets you hide columns you don't need (*Image*, *Description*, *Category name*, *Supplier*, *Part Number*, *Updated time*, *Updated by*).

8. **Open an item.** Click any row to open the catalogue item detail page. The URL contains the item UID so the page is shareable.

`[VIDEO PLACEHOLDER: 30s — open Catalogue → expand a branch in the left tree → click a leaf category → open Filters sheet → set a property filter → see results narrow → click a row to open the item detail]`

## Tips & gotchas

- **Property filters need a category.** If you want to filter by *Voltage* or *Diameter*, you must first select the category that defines that property. The filter sheet rebuilds whenever the selected category changes.
- **Filters are URL-backed.** The category, page, sort, and filter chips are encoded into the URL. Bookmarkable; shareable; back/forward in the browser works.
- **Statistics is a quick distribution view.** The *Statistics* button in the top bar opens a small dialog summarizing how many catalogue items exist in the current view, broken down by category — useful for spotting gaps in coverage.
- **Refresh refetches.** *Refresh* forces a refetch from the server. Use after another user reports they have just added or edited items.
- **Empty result + filters set** is the most common confusion. Check the chips row — a stale *category* chip from a previous selection is the usual culprit.

## Related

- [Creating and editing a catalogue item](./creating-and-editing-items.md)
- [Managing categories and properties](./managing-categories.md)
- Physical instances of an item → see the [System Hierarchy](../../systemHierarchy/README.md) module.
- Procurement → see the [user guide index](../../README.md) for the Orders module.
