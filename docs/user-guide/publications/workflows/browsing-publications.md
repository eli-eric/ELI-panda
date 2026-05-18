# Browsing publications

## What this is for

Find a publication — by title, by DOI, by year, by media type, by author — and prepare the filtered view that feeds the *RIV export* or a CSV download. The overview is wide on purpose: dozens of columns capture the bibliographic detail and the identifier landscape (DOI, WoS, Scopus, ISSN, eISSN, …). Search + filters narrow it; column visibility keeps the working set readable.

## Who can do this

👁️ All personas — overview browsing is available to anyone with `publications-view`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Publications** overview (sidebar entry under *Publications* → *Overview*).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

1. **Search.** Type into the search field. The toolbar search matches title, code, and DOI as a partial substring.

2. **Filter.** Open the filter sheet from the toolbar. Common fields to combine:

   | Field | Match type |
   |---|---|
   | **Media Type** | Multi-select. Drives both the displayed columns and which RIV validations apply later |
   | **Year of publication** | Range or exact |
   | **ELI Publication** | Multi-select (`YES` / `NO`). Limits to the official ELI-affiliated subset |
   | **Open Access Type** | Multi-select |
   | **Language** | Picker |
   | **Publishing Country** | Picker |
   | **Quartile** | Multi-select |
   | **OECD FORD** | Free-text contains |

   `[SCREENSHOT PLACEHOLDER: filter sheet open with Media Type set to a couple of values and Year set to 2025; the overview table beneath the sheet shows the filtered subset]`

3. **Sort** by clicking a column header. Common triage sorts: *Year of publication* descending (most recent first), *Updated at* (catch what was changed today), *Title* (alphabetical for proofreading).

4. **Column visibility.** The overview table has a very wide column set; hide what you do not need with the dropdown on the right side of the toolbar (column choices persist locally).

5. **Open a publication.** Click the row to navigate to `/publication/<uid>`. Detail loads in read-only mode for viewers; editors see the *Submit* / *Submit & Exit* buttons.

   The browser back button returns to the overview with filter / sort / pagination state restored.

`[VIDEO PLACEHOLDER: 35s — open Publications → filter Media Type "Journal article" + Year 2025 + ELI Publication YES → sort by Year descending → hide unwanted identifier columns → click a row to inspect a publication → back to the overview with state preserved]`

## Tips & gotchas

- **Media Type is the most powerful filter.** It is also what determines which validation schema applies on the form (peer-reviewed vs other). Filter by Media Type first when scoping a RIV export.
- **ELI Publication = NO** rows are valid records — they are publications the system tracks for completeness but does *not* count as ELI-affiliated output. Filter to ELI Publication = YES to scope the RIV-eligible subset.
- **DOI matches partial strings.** Searching `10.1038/` quickly surfaces all Nature-family papers.
- **Author search is not in the top-bar.** To find publications by a specific author, open the *Researchers* page, find the researcher, and look at the *Updated at* or related publications surface (read-only links).
- **The overview does not auto-refresh.** Use the *Refresh* button after a teammate has added a new publication you expect to see.
- **Two export buttons.** *Export* is a general CSV-like table export. *Export to RIV* opens the dedicated validation + XML dialog — see [Exporting to RIV](./riv-export.md).

## Related

- [Creating and editing a publication](./creating-and-editing-publications.md)
- [Managing researchers](./managing-researchers.md)
- [Managing grants](./managing-grants.md)
- [Exporting to RIV](./riv-export.md)
