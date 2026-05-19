# Systems Overview

The Systems Overview is the flat, table-only view of every system at the facility — the same entities that live in the [System Hierarchy](../systemHierarchy/README.md) tree, surfaced as a sortable, filterable, exportable list. Use the overview when you need to *answer questions across the whole population* (e.g. "all critical systems in zone B without a responsible person", "every catalogue item used in more than five systems"), or when you want a CSV snapshot for a meeting.

`[SCREENSHOT PLACEHOLDER: Systems Overview landing — top action bar with Add / Refresh / Filter / Export CSV buttons, filter badge row beneath, wide PandaTable with sticky Name column and 20+ data columns visible, pagination at the bottom]`

## Access & Responsibilities

**Today's reality:**
- `systems-view` — read-only access to the overview table, all filters, and CSV export.
- `systems-edit` — everything in Viewer + the *Add* button to create a new system.
- `admin` — same as Editor today.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `systems-view` | Open the overview, sort, filter, change column visibility, export the filtered table to CSV, click a row to open a system in detail view |
| ✏️ **Editor / Admin** | `systems-edit` or `admin` | Everything in Viewer + create a new system from the *Add* button |

> 🔮 **Coming soon — Phase 1: split between Editor and Admin** — the *Add* button and any future bulk actions will be gated by system level. See the System Hierarchy [Access & Responsibilities](../systemHierarchy/README.md#access--responsibilities) for the planned level split.

> 🔮 **Coming soon — Phase 2: team-based scoping** — bulk actions launched from the overview will be restricted to systems in the user's responsible team.

## Key concepts

- **System** — the unit of inventory at the facility. The same entity as in the [System Hierarchy](../systemHierarchy/README.md); the overview just presents it as a flat row instead of a tree node.
- **System level** — classification (`SYSTEM_DOMAIN`, `TECHNOLOGY_UNIT`, `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, `TRASH`).
- **System type** — codebook classification of *what kind* of system this is.
- **System code** — short identifier generated from the system's type, level, and ancestry.
- **Filter chip** — visible badge above the table for every active filter; click × on a chip to clear that one filter.
- **Column visibility** — per-user, per-session toggle for which columns appear in the table. Sort, filter, and pagination state are URL-backed; column visibility is local.
- **Spare-parts coverage (SP Coverage)** — color-coded indicator of how many of a system's required spares are currently available. See *Managing spare parts* in the [System Hierarchy](../systemHierarchy/README.md) module.
- **Sub Systems Count** — number of direct children a system has. Rows in the overview can be expanded inline to show those children without leaving the page.

## Layout

A single-pane table layout with a fixed action bar.

- **Top bar.** Left side: *Add*, *Refresh*, *Filters*, *Export CSV* buttons. Right side: *Column visibility* dropdown. Second row: chips for the active filters with individual clear buttons and a global *Clear all* affordance.
- **Table.** Wide horizontally scrollable table. The leading columns (image avatar, system-level icon, *Name*) are sticky on horizontal scroll; everything else scrolls beneath them. Each row can be expanded with a chevron to inline-render its direct subsystems.
- **Pagination.** Standard page-size selector (default 50) and page navigation at the bottom of the table. Page number and page size are encoded in the URL.

The columns shown by default are: **Name**, **System Code**, **System Type**, **CS Zone**, **Location**, **Responsible**, **Description**, **Importance**, **Sub Systems Count**, **SP Requirement**, **SP Coverage**, **Price**, **EUN**, **Serial Number**, **Catalogue Name**, **Part Number**, **Catalogue Description**, **Catalogue Category**, **Supplier**, **Order Number**. Hide columns you do not need with the *Column visibility* dropdown.

## Common workflows

- [Searching and filtering the overview](./workflows/searching-and-filtering.md) — text search, the multi-field filter sheet, filter chips, sort order, column visibility, URL-backed state.
- [Exporting systems to CSV](./workflows/exporting-csv.md) — export the currently filtered table to a CSV file.
- [Opening a system from the overview](./workflows/opening-a-system.md) — row click navigation, expanding subsystems inline, jumping back to the [System Hierarchy](../systemHierarchy/README.md) tree for context.

For working *inside* a system (editing details, managing physical items, relationships, history) — see the [System Hierarchy](../systemHierarchy/README.md) module; both the overview and the tree open the same detail page.

## Coming soon

- 🔮 **Multi-select bulk actions** — assign responsible person / team, change zone, set importance across many systems in one shot.
- 🔮 **Saved filter presets** — name and recall a frequently used filter combination.
- 🔮 **Advanced filter expressions** — combine fields with AND / OR / NOT instead of the current implicit AND.
- 🔮 **Excel export** — alongside CSV.
- 🔮 **Permission Phase 1 / Phase 2** — see the System Hierarchy [Access & Responsibilities](../systemHierarchy/README.md#access--responsibilities).

`[VIDEO PLACEHOLDER: 60s end-to-end walkthrough — open Systems → set two filters → check a property-coverage column → sort by Importance → hide three columns → export the filtered set to CSV → click a row to open the system]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The wiki generator strips it.*
>
> The overview reads from the same `System` entity as the System Hierarchy. The flat list is served by the `/systems` endpoint and the CSV stream by `/systems/export-to-csv`. Filter inputs map to fields on `SystemFilter`. See `src/server/apollo/schema.graphql` for the full field shapes.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
