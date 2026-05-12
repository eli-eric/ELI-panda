# Managing grants

## What this is for

Maintain the registry of funding instruments that publications can cite. A *Grant* record names a single funding instrument with its code and *Grant Group* (the codebook value identifying the funding body or instrument family). Publications link to grants via the *Grants* selector on the publication form; RIV reporting reads those links to attribute funding correctly.

Use this workflow when a new grant is awarded that will be cited on PANDA-tracked publications, when a grant's name or code changes, or when retiring a grant that is no longer relevant.

## Who can do this

✏️ **Publications Editor / Admin** — requires the `publications-edit` role.

Viewers can browse the grant list but the *Add Grant* and per-row *Edit* / *Delete* affordances are hidden.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `publications-edit`.
- The **Grant Group** the grant belongs to already exists in the *Grant Group* codebook. If not, add it through [Codebooks](../../codebooks/README.md) first.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Add a new grant

1. **Open the Grants page** at `/publications/grants` (sidebar entry *Publications* → *Grants*).

2. **Click *Add Grant*** in the toolbar. The form sheet opens.

3. **Fill the fields:**

   | Field | Required | Notes |
   |---|---|---|
   | **Name** | ✅ | Full grant name as it should appear in citations |
   | **Code** | ✅ | Short grant code (e.g. funder reference, project number) |
   | **Grant Group** | — | Picker from the *Grant Group* codebook (typically the funding body or instrument family) |

   `[SCREENSHOT PLACEHOLDER: Grant form sheet open with Name, Code, and Grant Group fields filled; Save and Cancel buttons at the bottom]`

4. **Click *Save Grant***. The toast confirms; the new row appears at the top of the list.

### Edit an existing grant

1. **Find the row** in the Grants table (columns: *Name*, *Code*, *Grant Group*, *Updated at*).

2. **Open the per-row dropdown**, click *Edit Grant*. The form opens pre-filled.

3. **Adjust fields** and *Save*. The toast confirms.

### Delete a grant

1. **Open the per-row dropdown** and click *Delete*. The confirmation modal asks *Are you sure you want to delete this grant?*

2. **Confirm.** The toast confirms.

   Note: deletion does **not** retroactively remove the grant from publications that cite it. The badge persists on each publication's *Grants* block; the link points at the UID of the deleted grant.

`[VIDEO PLACEHOLDER: 30s — open Grants → Add Grant → fill Name, Code, and pick a Grant Group → Save → see the new row → Edit to rename → Save → see Updated at change → Delete an old grant → confirm]`

## What gets created / changed

**✅ Affected:**
- The Grant record (name, code, grant-group link).
- *Updated at* on the row.

**❌ Not affected:**
- Publications that cite this grant. The denormalised *Grants* entry on each publication preserves the previously-stored label.
- Other grants.
- Researchers.

## Limitations

- **No "where used" view.** PANDA does not list which publications cite a grant. Reverse-lookup is via the Publications overview filtered manually.
- **No bulk import.** Each grant is added individually.
- **No soft-delete.** Deletion is hard; the badge on past publications orphan-references.
- **No date range / period field.** Grants are referenced by name and code only; start / end dates live elsewhere if you need them.
- **No funding amount field.** Financial detail belongs in your finance system.

## Tips & gotchas

- **Use the grant code from the funder.** Funder-issued codes (e.g. EU grant numbers, national-agency identifiers) are the canonical reference and are what RIV reporting will expect.
- **Grant Group is the bucket users will filter by.** Pick it carefully — it sets which programme / instrument family the grant belongs to.
- **Two grants can share a name.** Codes differentiate them in practice; pick the code to make grants unambiguous in pickers.
- **Edit, do not recreate.** A new UID after delete-and-recreate means past publications still cite the dead UID. Always rename in place.
- **Coordinate with the finance team.** PANDA does not duplicate the finance system; it stores just enough metadata to attribute outputs.

## Related

- [Managing researchers](./managing-researchers.md)
- [Creating and editing a publication](./creating-and-editing-publications.md)
- [Exporting to RIV](./riv-export.md)
- Grant Group codebook → see [Codebooks](../../codebooks/README.md).
