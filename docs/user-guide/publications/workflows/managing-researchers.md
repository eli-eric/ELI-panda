# Managing researchers

## What this is for

Maintain the registry of researchers who can be credited as *ELI Authors* on a publication. Each researcher record carries the identifiers (ORCID, Scopus ID, ResearcherID, internal identification number) and metadata (citizenship) that downstream reporting — especially the [RIV export](./riv-export.md) — needs to attribute work correctly.

Use this workflow when a new ELI researcher joins, when a researcher's external identifier becomes available (ORCID issued, Scopus profile linked), or when an outdated researcher record needs to be retired.

## Who can do this

✏️ **Publications Editor / Admin** — requires the `publications-edit` role.

Viewers can browse the researcher list but the *Add Researcher* and per-row *Edit* / *Delete* affordances are hidden.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `publications-edit`.
- You have the researcher's basic name and any external identifiers (ORCID, Scopus ID, ResearcherID) you intend to record.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Add a new researcher

1. **Open the Researchers page** at `/publications/researchers` (sidebar entry *Publications* → *Researchers*).

2. **Click *Add Researcher*** in the toolbar. The form sheet opens over the page.

3. **Fill the fields:**

   | Field | Required | Notes |
   |---|---|---|
   | **First name** | ✅ | Given name |
   | **Last name** | ✅ | Family name; appears first in lists, sorted on |
   | **Identification number** | — | Internal facility identifier |
   | **ORCID** | — | 0000-0000-0000-0000 format |
   | **Scopus ID** | — | Numeric Scopus author ID |
   | **Researcher ID** | — | WoS ResearcherID / Publons ID |
   | **Citizenship** | — | Picker from the *Country* codebook |

   `[SCREENSHOT PLACEHOLDER: Researcher form sheet open over the page — First name, Last name, ORCID, Scopus ID, Researcher ID, and Citizenship fields visible; Save and Cancel buttons at the bottom]`

4. **Click *Save Researcher***. The toast confirms; the new row appears at the top of the list.

### Edit an existing researcher

1. **Find the row** in the Researchers table (columns: *Last Name*, *First Name*, *ORCID*, *Scopus ID*, *Researcher ID*, *Identification Number*, *Citizenship*, *Updated at*).

2. **Open the per-row dropdown** in the *Actions* column.

3. **Click *Edit Researcher***. The form opens pre-filled.

4. **Adjust fields** and *Save*. The toast confirms; the row refreshes.

### Delete a researcher

1. **Open the per-row dropdown** and click *Delete*. A confirmation modal asks *Are you sure you want to delete this researcher?*

2. **Confirm.** The toast confirms.

   Note: deletion does **not** remove the researcher from publications that already credit them. The badge persists on each publication's *ELI Authors* block with the stored name fallback, but the link is orphaned (no longer pointing at a live record). Re-creating a researcher with the same name does not re-link past publications — the UID is new.

`[VIDEO PLACEHOLDER: 40s — open Researchers → Add Researcher → fill ORCID and citizenship → Save → see the new row → reopen its dropdown → Edit → add Scopus ID → Save → see Updated at change → Delete an old researcher → confirm modal → see row disappear]`

## What gets created / changed

**✅ Affected:**
- The Researcher record (every field on the form).
- *Updated at* on the row.

**❌ Not affected:**
- Publications that already credit this researcher. The denormalised *ELI Author* entry on each publication keeps the previously-stored name; only the link to this live record is updated where it is re-read.
- Other researchers.
- Grants.

## Limitations

- **No ORCID auto-lookup.** Fields are entered manually; verify against the ORCID profile separately.
- **No deduplication.** Two researchers with identical names can coexist; differentiate by Identification Number or ORCID.
- **Soft-delete is not available.** Delete is hard; retire by editing the record (e.g. add a note in the name field) is the only mitigation today.
- **No bulk import.** Each researcher is added individually.
- **No "where used" view.** PANDA does not show which publications cite a researcher; reverse-lookup is via the Publications overview, filtering by author.

## Tips & gotchas

- **Identification Number is the local stable ID.** ORCID / Scopus may not be available for new researchers; the Identification Number is the placeholder you can always rely on.
- **ORCID is the RIV preferred external identifier.** Capture it as early as possible — RIV validation may flag a missing ORCID on RIV-eligible publications.
- **Last Name first is the convention.** The table sorts by *Last Name* by default; lists in modal pickers also lead with last name.
- **Avoid renaming-as-replacement.** When a person changes name (marriage, transliteration update), edit the existing record — do *not* create a new researcher and delete the old one. The UID stability preserves citation chains.
- **Citizenship is reporting-grade.** It feeds national-research-system reports; pick the correct codebook value.

## Related

- [Managing grants](./managing-grants.md)
- [Creating and editing a publication](./creating-and-editing-publications.md)
- [Exporting to RIV](./riv-export.md)
- Country codebook → see [Codebooks](../../codebooks/README.md).
