# Browsing the system-codes overview

## What this is for

Find a system code — by its prefix, by its zone, by its system type, by who created it — and jump from the code's row to the underlying system's detail page. The Overview is the audit and triage surface of the module: every system code generated against any zone and type ends up here, with the metadata you need to verify a generation campaign or hunt down a specific label.

## Who can do this

👁️ All personas — Overview browsing is available to anyone with `control-systems-view`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Control Systems** → **Overview** page.
- See [Key concepts](../README.md#key-concepts) for terminology (system code, zone, system type, mask).

## Steps

The Overview combines a **pattern-aware search**, two **filter pickers** (Zone, System Type), **filter chips** above the table, **sort** on column headers, and **column visibility**.

1. **Type into the search field** in the sticky header. The search recognises three patterns:

   | Pattern | Match |
   |---|---|
   | `C01` | Starts-with — codes beginning with `C01` |
   | `*C01*` | Contains — codes that include `C01` anywhere |
   | `*C01` | Ends-with — codes ending in `C01` |

   Hover the help icon next to the search field for the inline reference.

   `[SCREENSHOT PLACEHOLDER: sticky header with the search field focused, the help tooltip visible explaining the three patterns, the table below filtered to a handful of matching rows]`

2. **Filter by *Zone***. Picker over the Zone codebook. Restricts the table to system codes generated against the selected zone.

3. **Filter by *System Type***. Picker over the System Type codebook (any type, not only root). Restricts the table further.

4. **Read the chips row.** Every active filter (search + zone + type) appears as a chip; click × on a chip to drop just that one.

5. **Sort** by any column header. Common triage sorts: *Created By* (group by user), *System Code* alphabetical, *Path* (group by hierarchy location).

6. **Adjust column visibility** with the dropdown on the right side of the header. Columns: *System Code*, *Name*, *Location*, *Zone*, *System Type*, *Path*, *Updated By*, *Created By*.

7. **Open the underlying system.** Click any row — the system's edit sheet opens over the page. From the sheet you have access to the full system detail (Detail / Persons / Physical Item / Spare Parts / Relationships / Attachments / History tabs) — see *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md) module.

   Alternatively, open the per-row action menu on the right of the row for *Edit System* (same as the row click) or *Delete System* (gated, blocked if the system has dependencies — see [Editing or deleting an existing system code](./editing-and-deleting.md)).

`[VIDEO PLACEHOLDER: 30s — open Control Systems Overview → type "C01*" → see contains-match results → pick a Zone in the filter → narrow further → sort by Created By descending → click a row to open the system edit sheet → close → adjust column visibility]`

## Tips & gotchas

- **Patterns are mutually exclusive within one query.** Use one of the three; combining them does not enrich the match.
- **Zone filter is *not* limited to root zones here.** Unlike the Create page (which restricts to root zones for new generation), the Overview filter accepts any zone.
- **Path column is the lineage.** When the code is bound to a system inside the [System Hierarchy](../../systemHierarchy/README.md), the *Path* column shows the parent path. Empty *Path* means the system is at the top of the tree or has not been re-parented yet.
- **Updated By vs Created By.** *Created By* is the user who generated the code. *Updated By* is whoever last touched the underlying system — often a different person. They diverge as the system's lifecycle progresses.
- **Row click opens an edit sheet, not a new page.** The system stays in the sheet so you can return to the Overview by closing it. To open in a new tab, use the action menu's *Edit System* or middle-click the row name.
- **No CSV export from the Overview today.** Filter the table to what you need and screenshot or copy manually until CSV export lands.

## Related

- [Creating system codes in batch](./creating-system-codes.md)
- [Editing or deleting an existing system code](./editing-and-deleting.md)
- The underlying system editor → see *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md) module.
- The code mask that drives the code string → see [Understanding the code mask](../../systemTypeEdit/workflows/code-mask.md) in the [System Type Edit](../../systemTypeEdit/README.md) module.
