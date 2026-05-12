# Browsing codebooks

## What this is for

Find the codebook you need to inspect or edit, and then find the specific value inside it. The Codebooks page is a two-pane explorer: the left sidebar lists every codebook you have edit rights on; the main pane shows the selected codebook's values in a paginated, searchable table. With ~40 codebooks across the app, the sidebar search is the fastest way to land on the right one.

## Who can do this

🛡️ **Admin** — the page route requires `admin`.

Some codebooks may carry an additional module-scoped edit role server-side; if you hold that role you will see the codebook entry in the sidebar even without `admin`. See [Access & Responsibilities](../README.md#access--responsibilities) for details.

## Prerequisites

- You have `admin` (or a module-scoped codebook edit role) and the **Codebooks** sidebar entry is visible.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Pick a codebook from the sidebar

1. **Open Codebooks** from the sidebar. The main pane shows the empty-state card *Select a codebook* with the description *Select a codebook from the list on the left to view and edit values.*

   `[SCREENSHOT PLACEHOLDER: Codebooks page on first load — left sidebar with the search box "Search codebook..." and a long list of codebook codes; main pane in the empty state with the "Select a codebook" card centered]`

2. **Search the sidebar.** Use the *Search codebook…* field at the top of the sidebar to narrow the list. Matches the codebook code (e.g. typing `LOC` surfaces `LOCATION`).

3. **Click a codebook code** in the sidebar. The main pane loads the codebook's title, the *Manage codebook values* subtitle, the value table, and the *Add value* button.

### Search values inside a codebook

1. **Type into the *Search values…* field** above the values table. The query matches the *Name*, *Code*, and *UID* columns simultaneously. Results refresh as you type.

   `[SCREENSHOT PLACEHOLDER: main pane with the SUPPLIER codebook selected, the values search field showing a partial query "acme", three matching rows visible, pagination beneath]`

2. **Clear the search** by deleting the query — the full list returns.

3. **Page through values.** The pagination control beneath the table moves through pages of 10 values each.

### Switch codebooks

1. **Click a different codebook code** in the sidebar. The main pane reloads for the new codebook; your previous search query is cleared.

2. **Return to the empty state** by clicking the currently-selected codebook again (it deselects).

`[VIDEO PLACEHOLDER: 30s — open Codebooks → see empty state → type "LOC" in the sidebar search → click LOCATION → see the values table → search "lab" in the value search → switch to SUPPLIER → search there too]`

## Tips & gotchas

- **The sidebar list is your editable set.** Codebooks the server hides from `editable=true` do not appear in the sidebar — you cannot reach them through this page. Use the relevant domain module instead.
- **System Type lives in its own module.** Even though `SYSTEM_TYPE` appears in the codebook enum, the recommended place to edit it is [System Type Edit](../../systemTypeEdit/README.md) (richer form with groups, codes, and masks). Editing it here works for name and code, but you lose the grouping affordances.
- **Codebook codes are upper-case.** The sidebar shows the raw code. Matching the code to a user-facing concept (`SYSTEM_IMPORTANCE` = Importance picker on systems) takes a moment of habit; the [README's codebook table](../README.md#codebooks-managed-here) lists every code's role.
- **Pagination resets on search.** A new search query returns you to page 1 of the filtered set.
- **No multi-codebook view.** You browse one codebook at a time. Cross-codebook reconciliation (e.g. checking that *Supplier* and *Manufacturer* are not duplicating rows) requires manual cross-referencing.

## Related

- [Adding and renaming codebook values](./adding-and-renaming.md)
- [Deleting codebook values](./deleting.md)
- System Type taxonomy → see [System Type Edit](../../systemTypeEdit/README.md).
- Catalogue categories → see [Managing categories](../../catalogue/workflows/managing-categories.md) in the [Catalogue](../../catalogue/README.md).
