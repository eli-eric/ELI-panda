# Exporting systems to CSV

## What this is for

Take the currently filtered systems list out of the app — for offline review, sharing with a non-PANDA team, importing into a spreadsheet for one-off analysis, or attaching to a status report. The export honours all active filters, the search query, and the column set on the server; you get a CSV of *what you see* (plus a few engineering-only columns the server includes by default for completeness).

## Who can do this

👁️ All personas — exporting is available to anyone with `systems-view`. The button is part of the overview's top action bar and is not gated separately.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems** page.
- You have already narrowed the result set with the filters you want — see [Searching and filtering the overview](./searching-and-filtering.md). Exporting before filtering will download the entire systems table.

## Steps

1. **Apply the filters and search you want included.** The export uses the *exact same query* the table is showing — any active search term, all filter chips, and the active sort order.

   `[SCREENSHOT PLACEHOLDER: Systems Overview with a search term, two filter chips visible, table showing the filtered rows, the Export CSV button highlighted in the top toolbar]`

2. **Click *Export CSV*** in the top action bar. A loading toast appears (*Exporting…*).

3. **Wait for the download.** The server streams a CSV; the browser saves it as `systems.csv` to your default download location. A success toast confirms once the file is written.

   `[SCREENSHOT PLACEHOLDER: browser download bar at the bottom showing systems.csv as just-downloaded, with the toast notification visible in the corner of the app]`

4. **Open the CSV** in your spreadsheet of choice. The file is UTF-8, comma-separated, with the first row containing column headers that match the overview's column labels.

`[VIDEO PLACEHOLDER: 25s — apply two filters → click Export CSV → see loading toast → file lands in browser download bar → open file in spreadsheet]`

## What gets exported

**✅ Included:**
- Every row matching the active query, *not just the current page*. Pagination is ignored for export — all matching rows are streamed.
- All standard system columns (Name, System Code, System Type, Zone, Location, Responsible, Importance, Sub Systems Count, SP Requirement, SP Coverage, Price, EUN, Serial Number, Catalogue Name, Part Number, Catalogue Description, Catalogue Category, Supplier, Order Number).
- The active sort order is preserved in row order.

**❌ Not included:**
- Hidden columns are *still* exported. Column visibility is a view preference; it does not change what the server returns. Open the CSV and hide unwanted columns in your spreadsheet if needed.
- Images, files, change history, relationships — none of these surface in the CSV.
- Subsystems are *not* nested. Each system is a flat row; the *Sub Systems Count* column tells you how many children it has but does not list them.

## Limitations

- **CSV only today.** No Excel / XLSX. Open the file in Excel manually if needed.
- **Filename is fixed.** The browser always saves as `systems.csv`. Rename after the fact if you want it dated.
- **Large exports take a moment.** Exporting the entire facility (no filters) streams thousands of rows; expect a few seconds. The toast remains in *Exporting…* state until the download completes.
- **No background export.** The page must stay open while the file streams. Navigating away cancels the export.

## Tips & gotchas

- **Filter first, export second.** It is the single biggest determinant of whether the CSV is useful. Export the whole table only when you genuinely want everything.
- **Sort before exporting.** Row order in the CSV matches your current sort. If you want the spreadsheet sorted by Importance, sort the overview by Importance before clicking *Export CSV*.
- **Date and timezone columns** are exported in ISO-8601 UTC. Adjust in your spreadsheet if you need a local timezone view.
- **Open the CSV with the import wizard** in Excel rather than double-clicking — Excel's silent type-coercion on double-click can damage system codes that start with leading zeroes.

## Related

- [Searching and filtering the overview](./searching-and-filtering.md)
- [Opening a system from the overview](./opening-a-system.md)
