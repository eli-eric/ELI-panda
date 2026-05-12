# Importing zones from CSV

## What this is for

Add many zones in one operation by uploading a CSV file. Useful when commissioning a new wing of the facility, seeding a fresh PANDA environment from an external register, or migrating zone data from a spreadsheet. The server returns a count of *created* and *skipped* rows along with any per-row errors, so you can see at a glance what the import accomplished.

## Who can do this

✏️ **Zone Editor / Admin** — requires the `zones-edit` role.

Viewers see the toolbar without the *Import CSV* button.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `zones-edit`.
- You have a CSV file with a header row and one zone per line. Minimum columns: `name`, `code`. Additional columns (notes, parent zone reference) may be supported depending on the server's import implementation — verify with a small test file before a large import.

## Steps

1. **Click *Import CSV*** in the top toolbar of the Zones page. A native file picker opens.

   `[SCREENSHOT PLACEHOLDER: Zones page top toolbar with the Import CSV button highlighted, the OS-native file picker visible on top of the page]`

2. **Pick the CSV file.** The picker is restricted to `.csv` files. After confirmation the upload begins immediately — there is no preview step.

3. **Wait for the upload.** Toast progression:
   - *Importing zones…* — request in flight.
   - *Import complete: N created, M skipped* — success summary. The table refreshes automatically.
   - *Import failed* — full failure; nothing was created. The toast surfaces the reason.

4. **Read per-row errors** in the toast if any rows were skipped. The server returns a list of error strings; the UI surfaces them as additional toasts. Each error names the offending row and the reason (duplicate code, missing name, malformed column, etc.).

5. **Verify in the table.** Sort by *Name* or *Code* to see the new rows; the table is invalidated and refreshed after the import completes.

`[VIDEO PLACEHOLDER: 35s — open Zones → click Import CSV → pick a file with five rows → see "Importing zones..." toast → "Import complete: 4 created, 1 skipped" toast → an additional error toast for the skipped row naming the duplicate code → refresh the table to see four new rows]`

## CSV format

The minimum viable file is a two-column CSV with a header row:

```
name,code
Beam Hall A,BHA
Beam Hall B,BHB
Diagnostics,DIAG
```

Additional columns may be supported (notes, parent zone reference); test with a small file first and inspect the result. The import is **append-only** — existing zones are not updated by a re-import with the same code; they are skipped instead.

## What gets created / changed

**✅ Created by a successful import:**
- One new Zone record per *created* row, with a fresh UID and the values from the CSV.
- The server's *created / skipped* counters reflect the outcome.

**❌ Not affected:**
- Existing zones. Rows with codes that already exist are *skipped*, not overwritten.
- Subzones / parent linkages of pre-existing zones.

## Limitations

- **Append-only.** Re-running an import to "update" existing zones does not work; existing rows are skipped. Edit existing zones individually through the Edit Zone sheet (see [Creating and editing zones](./creating-and-editing.md)).
- **No preview.** The file uploads as soon as you confirm in the picker. Verify the file outside PANDA before uploading.
- **No partial rollback.** A row that fails server-side validation is skipped, but successfully-imported rows from the same file are kept. Treat the result toast as the ground truth for what landed.
- **No bulk import of subzones / parent assignments today.** Test whether the import supports a parent-zone column on your server — if not, import the zones as roots and reassign parents through individual edits afterwards.
- **CSV-only.** Other formats (Excel, JSON) are not supported.

## Tips & gotchas

- **Header row is required.** The first row of the file must be `name,code` (or whichever columns your server expects). A file without a header is rejected.
- **Codes must be unique across the registry.** A row whose code matches an existing zone is skipped. Plan codes in advance.
- **Quote names with commas.** Standard CSV quoting (`"Beam Hall, North","BHN"`) applies to fields that contain the delimiter.
- **Encoding.** UTF-8 is the safe default. Special characters in zone names work; verify in the result table.
- **Test with a small file first.** Five rows is a cheap test; once verified, the same format scales to hundreds of rows.
- **Keep the source CSV.** A failed-or-skipped row in the result is easiest to fix by editing the source CSV and re-uploading; the skipped rows will be created on the second pass.

## Related

- [Browsing zones](./browsing.md)
- [Creating and editing zones](./creating-and-editing.md)
- [Deleting zones](./deleting.md)
