# Searching and filtering the overview

## What this is for

Narrow the flat systems list to the rows you actually want — by name, code, level, type, location, zone, responsible person, spare-parts coverage, catalogue lineage, order, or any of about a dozen other fields. The overview is wide on purpose; filters are what turn it from "every system at the facility" into "the seven systems I need to triage today."

## Who can do this

👁️ All personas — searching, filtering, and changing column visibility are available to anyone with `systems-view`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems** page (sidebar entry *Systems*).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

The overview combines four narrowing surfaces: the **search field** in the top toolbar, the **Filters sheet**, the **filter chips** above the table, and the **column visibility dropdown**. Sort order on column headers adds a fifth.

1. **Type into the search field** in the top toolbar. Search matches partial names and codes; results refresh as you type (debounced). The active query appears as a chip in the filter row.

   `[SCREENSHOT PLACEHOLDER: top toolbar of the Systems Overview with the search field focused, a partial query typed, the table beneath updated to matching rows, one chip visible in the filter row]`

2. **Open the *Filters* sheet** from the top action bar. The sheet groups around 17 filter fields. Each is optional; all selected filters AND together.

   `[SCREENSHOT PLACEHOLDER: Filters sheet open on the right side of the page, several fields filled — Parent system picker, System level multi-select, Responsible person picker, Location combobox — Apply and Reset buttons at the bottom]`

3. **Fill the filter fields** as needed:

   | Field | Match type | Notes |
   |---|---|---|
   | **Parent system** | Tree pick | Limits to systems whose parent is the selection |
   | **System Code** | Contains | Free text |
   | **Name** | Contains | Free text |
   | **System level** | Multi-select | One or more of `SYSTEM_DOMAIN`, `TECHNOLOGY_UNIT`, `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, `TRASH` |
   | **System type** | Picker | Codebook value |
   | **Zone** | Picker | From the Zones codebook |
   | **Location** | Picker | Location codebook |
   | **Responsible** | Picker | Employee picker |
   | **Importance** | Multi-select | Importance levels |
   | **Condition status** | Multi-select | Condition codebook values |
   | **Description** | Contains | Free text |
   | **Item usage** | Multi-select | Usage states for the physical item attached to the system |
   | **Price** | Range | Min / max |
   | **EUN** | Contains | Physical item EUN |
   | **Serial number** | Contains | Physical item serial |
   | **Catalogue name** | Contains | The catalogue item's name |
   | **Catalogue category** | Picker | Catalogue category |
   | **Supplier** | Picker | Supplier codebook |
   | **Order number** | Contains | The order this item came in on |
   | **Spare-parts coverage** / **Critical SP coverage** | Range | Numeric, mainly used for triage of under-stocked critical spares |

4. **Apply the filters.** Submit the sheet to apply. Each active filter shows as a chip in the row above the table; clicking the × on a chip removes that single filter without reopening the sheet.

5. **Sort** by clicking a column header. Each click cycles ascending → descending → none. Sort state is encoded in the URL.

6. **Adjust column visibility** with the dropdown on the right side of the top bar. The wide column set is intentional — hide what you do not need for *this* task. Visibility is local to your browser; sort and filter are shared in the URL.

7. **Read the result count** at the bottom of the table next to the pagination control. Refresh after another user has reported changes — the *Refresh* button forces a refetch.

`[VIDEO PLACEHOLDER: 35s — open Systems → type a partial name in the search field → open Filters → pick a System level + a Zone → Apply → remove the level chip with × → sort by Importance descending → hide three columns]`

## Tips & gotchas

- **URL-backed state.** Search, filters, sort, and pagination are encoded in the URL. Bookmarkable; shareable; back/forward in the browser works. Column visibility is *not* shared — it lives in browser storage.
- **Multi-select fields use OR.** Picking two system levels returns rows matching *either* level. The OR is within a field; fields AND with each other.
- **Subsystems expand in place.** Each row has a chevron — expanding shows direct children of that system without leaving the overview. This is the fastest way to spot-check a parent's children without switching to the System Hierarchy tree.
- **Catalogue and order columns may be blank.** A system without an assigned physical item shows blanks in *Catalogue Name*, *Part Number*, *EUN*, *Serial Number*, *Order Number*, etc. Filter on those fields to find systems that are physically un-instanced.
- **Spare-parts coverage filter is the triage workhorse.** Combine a coverage range filter with an importance filter to surface critical systems with thin spare cover.
- **Refresh and reload.** The *Refresh* button refetches with current filters; a full page reload re-reads the URL and rebuilds state from scratch.

## Related

- [Exporting systems to CSV](./exporting-csv.md)
- [Opening a system from the overview](./opening-a-system.md)
- Tree view of the same data → see the [System Hierarchy](../../systemHierarchy/README.md) module.
