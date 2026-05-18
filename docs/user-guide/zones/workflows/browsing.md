# Browsing zones

## What this is for

Find a zone — by name, by code, by parent zone, by notes content — and inspect the parent/subzone topology of the facility. The Zones list is the dashboard for the zone registry: a flat, sortable table that distinguishes root zones from subzones via the *Parent Zone* column and surfaces notes (with auto-linked URLs) for scope reference.

## Who can do this

👁️ All personas — list browsing is available to anyone with `zones-view`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Zones** page (sidebar entry *Zones*).
- See [Key concepts](../README.md#key-concepts) for terminology (zone, code, parent zone, subzone).

## Steps

1. **Scan the list.** Columns at a glance:

   | Column | What it shows |
   |---|---|
   | **Name** | Display label of the zone |
   | **Code** | Short identifier; substituted into system code generation as `{ZC}` |
   | **Parent Zone** | Name of the parent if this is a subzone, or an em dash (—) for root zones |
   | **Notes** | Truncated free text; hover for full text; URLs auto-link |
   | **Actions** | Per-row dropdown (Edit / Delete), visible only with `zones-edit` |

   `[SCREENSHOT PLACEHOLDER: Zones list with seven rows visible — three rows have a Parent Zone name (subzones), four show — (root zones); one Notes cell is hovered showing the tooltip with the full text and a clickable URL]`

2. **Search.** Type into the search field in the top toolbar to narrow the table by name or code (partial match). Results refresh as you type.

3. **Sort.** Click any column header. Common triage sorts: *Parent Zone* to group subzones under each parent, *Code* alphabetically when reconciling against external lists.

4. **Adjust column visibility** with the dropdown on the right of the top bar.

5. **Inspect notes.** Hover a *Notes* cell for the tooltip with the full text. URLs in the notes auto-linkify — click a URL to open in a new tab.

6. **Identify root zones.** A row with em dash (—) in the *Parent Zone* column is a **root** zone. Only root zones are eligible parents for new subzones (see [Creating and editing zones](./creating-and-editing.md)) and only root zones can be picked as targets in the [Control Systems](../../controlSystems/README.md) batch-create page.

`[VIDEO PLACEHOLDER: 25s — open Zones → search "C0" → see code-matching rows → sort by Parent Zone to group → hover a Notes cell with a URL → click the URL → return to the table]`

## Tips & gotchas

- **Root vs subzone matters.** When you need a zone for [Control Systems](../../controlSystems/README.md) batch creation, only **root** zones (— in the Parent Zone column) are eligible. Identify the parent first; if you wanted to mint codes under a subzone, you need to either run a single-system generation in the [System Hierarchy](../../systemHierarchy/README.md) or escalate the subzone to root by clearing its parent in the form.
- **Notes are searchable from the table.** The toolbar search matches name and code only; to search inside the Notes column, sort by Notes and skim, or use the browser's in-page find on the loaded table.
- **URL linkification is regex-based.** Anything that looks like `http://` or `https://` is recognised; intranet shortlinks without a protocol prefix do not auto-link. Add the protocol if you want clickable.
- **Refresh after another user's edit.** The list is not pushed; reload the page if a teammate has just added a zone you expect to find.
- **No filter sheet on zones.** Search + sort is the full toolkit; the list is intentionally compact.

## Related

- [Creating and editing zones](./creating-and-editing.md)
- [Importing zones from CSV](./importing-csv.md)
- [Deleting zones](./deleting.md)
- Where zones are consumed → see *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md), *Searching and filtering* in the [Systems Overview](../../systems/README.md), the [Control Systems](../../controlSystems/README.md) module, and the [Room Cards](../../roomCards/README.md) location linkage.
