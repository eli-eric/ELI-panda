# Opening a system from the overview

## What this is for

Get from the flat list into the full detail of a single system — the tabbed detail view of the [System Hierarchy](../../systemHierarchy/README.md) (Detail, Persons, Physical Item, Spare Parts, Relationships, Attachments, History). The overview is good for finding the row; the hierarchy detail view is where you actually work on a system.

## Who can do this

👁️ All personas — opening a system to view is available with `systems-view`. Edit actions inside the detail page require `systems-edit`. See the [System Hierarchy](../../systemHierarchy/README.md) workflows for what each tab does.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems** page.
- You can see the row you want to open. If the overview is too noisy, narrow it first — see [Searching and filtering the overview](./searching-and-filtering.md).

## Steps

1. **Locate the row** in the table — by search, by filter, or by scrolling.

   `[SCREENSHOT PLACEHOLDER: Systems Overview filtered to a handful of rows, one row hovered with the cursor on the Name column showing a link affordance]`

2. **Open the system.** There are two paths:

   - **Click the system *Name*** — opens the system in the System Hierarchy detail view, with the tree expanded to its location. The URL takes the form `/systems/hierarchy?leaf=<uid>` and the page is bookmarkable / shareable. Old `/system/<uid>` bookmarks and QR codes keep working — they redirect to the same view.
   - **Click the avatar / image** on the *Name* column — opens a *Device Info* overlay in place, without leaving the overview. Useful for a quick look at the system without losing your filter and scroll position. Close the overlay to return to the table exactly where you were.

   `[SCREENSHOT PLACEHOLDER: System Hierarchy open after clicking a row — tree on the left expanded to the system, detail view showing tabs Detail / Persons / Physical Item / Spare Parts / Relationships / Attachments / History / Graph, breadcrumb at top]`

3. **Expand subsystems inline (alternative path).** If you want to peek at a row's children without leaving the overview, click the chevron at the start of the row. The direct children render inline as nested rows. Their own chevrons can be expanded to drill deeper.

4. **Open a child system** from the inline-expanded view by clicking its name, same as for a top-level row.

5. **Return to the overview** with the browser back button. The URL state — filters, search, sort, page — is restored, so your prior view comes back exactly as you left it.

`[VIDEO PLACEHOLDER: 30s — open Systems → filter to a small set → expand a row inline to peek at children → click a child's name → land in the System Hierarchy detail view → back to the overview with state intact]`

## Tips & gotchas

- **Avatar overlay vs. row navigation.** Click the *image avatar* in the Name column for a non-navigational preview; click the *text name* to open the full detail page. The avatar overlay is the fastest way to scan a system's basics without losing your place in the table.
- **Subsystem expansion is per-row.** Expanding one row does not affect the others — fold a row's children back up with the same chevron.
- **The detail view opens in the same tab.** Use middle-click or *Ctrl/Cmd+click* on the system name to open in a new tab when you are walking through many systems.
- **Detail opens inside the System Hierarchy.** You land in the full hierarchy explorer — the tree on the left shows where the system lives, and edits made in the tabs are the same as editing from the tree. Workflow documentation for editing lives under the [System Hierarchy](../../systemHierarchy/README.md) module.
- **Back is non-destructive.** The browser back button restores your URL-encoded overview state. Bookmark a URL while filters are active to come back to that exact view later.

## Related

- [Searching and filtering the overview](./searching-and-filtering.md)
- [Exporting systems to CSV](./exporting-csv.md)
- System detail workflows (edit, persons, items, relationships, history) → see the [System Hierarchy](../../systemHierarchy/README.md) module.
