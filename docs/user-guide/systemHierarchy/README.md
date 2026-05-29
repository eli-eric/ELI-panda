# System Hierarchy

The System Hierarchy module is the central place to browse, organize, and inspect the tree of systems and subsystems at the facility. It surfaces accountability (responsible person and team), physical-item assignments, engineering relationships between systems, and a full change history.

`[SCREENSHOT PLACEHOLDER: full module landing screen — left tree expanded to a leaf, middle leaves panel in table mode, right Quick Info sidebar visible, breadcrumb at top]`

## Access & Responsibilities

**Today's reality:**
- `systems-view` — read-only.
- `systems-edit` and `admin` — both grant full edit on every system (functionally equivalent right now).

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `systems-view` | Browse the tree, view details, view relationships, search and filter, view change history |
| ✏️ **Editor / Admin** | `systems-edit` or `admin` | Everything in Viewer + edit fields, manage persons, manage relationships, **use and remove spare parts** (feature-flag gated in production), **create subsystems**, copy systems, assign and move physical items |

> 🔮 **Coming soon — Phase 1: split between Editor and Admin**
> - **Admin** will have exclusive edit on systems at `SYSTEM_DOMAIN` and `TECHNOLOGY_UNIT` levels (the strategic top of the tree).
> - **Editor** (`systems-edit`) will be restricted to `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, and `TRASH` levels.
> - All derived actions (relationships, persons, items, copy/paste) inherit the same level scope.

> 🔮 **Coming soon — Phase 2: team-based scoping (policy today, enforced later)**
> Each system has a *responsible person* and a *responsible team*. Only members of the responsible team should edit that system and its subtree. **Today this is policy only — please follow it manually**; technical enforcement is planned but the data structure for it is not yet in place.

## Key concepts

- **System** — a hierarchical entity representing a piece of facility infrastructure (e.g. a beamline, a vacuum chamber, a controller).
- **Subsystem** — a system nested under a parent system. A system can have any number of subsystems.
- **System level** — classification of where in the hierarchy a system sits: `SYSTEM_DOMAIN`, `TECHNOLOGY_UNIT`, `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, `TRASH`. Levels drive both visual styling and (in Phase 1) edit permissions. The `TRASH` level marks a holding area for retired or replaced items — see [Managing spare parts](./workflows/managing-spare-parts.md).
- **System type** — codebook classification of *what kind* of system this is. Used for code generation and filtering.
- **System code** — short identifier for the system, generated based on type, level, and ancestry.
- **Responsible person** — the employee accountable for a system.
- **Responsible team** — the team accountable for a system. Governs edit policy (Phase 2).
- **Owner** — computed read-only ownership marker.
- **Operators** — employees authorized to operate the system day-to-day.
- **Maintained by** — employees responsible for maintenance of the system.
- **Physical item** — the concrete piece of hardware currently installed in a system. A system holds at most one physical item.
- **Catalogue item** — the abstract product spec a physical item is based on.
- **Relationship** — a directed engineering link between two systems (9 types — see [Managing relationships](./workflows/managing-relationships.md)).
- **Spare part** — a system designated as a spare for another system.
- **Coverage** — the spare-parts metric: how many of the required spares are currently available, color-coded against the configured minimum.

## Layout

The module is a three-panel explorer:

- **Left — System tree.** Resizable. Top of the tree has a search box (300 ms debounced) and a *Collapse All* button. Each tree node shows the system name, a folder icon colored by system level, and a subsystem-count badge. Selecting a node auto-expands its ancestors. On mobile the tree collapses behind a toggle.
- **Middle — Leaves panel.** Shows the children of the selected tree node, either as a table (default) or as a relationship graph. Has a toolbar with *Filters*, *Search*, and *Column visibility* controls, and a view switcher between *Tree View* (table) and *Graph View*.
- **Right — Quick Info sidebar.** On large screens a sticky 320 px panel with statistics (subsystem count, spare-part count, spare coverage) and metadata. On smaller screens accessible via a floating *Info* button.
- **Top — Breadcrumb.** Shows the ancestor path of the currently selected system. Clicking any ancestor navigates to it. Long paths collapse with an ellipsis (first ancestor + last two).

When a system is selected for full detail view, a tabbed area replaces the leaves panel with: **Detail**, **Persons**, **Physical Item**, **Spare Parts**, **Spare For**, **Relationships**, **Attachments**, **History**, and (depending on context) **Graph**.

## Common workflows

- [Navigating the tree](./workflows/navigating-the-tree.md) — expanding the tree, breadcrumb navigation, switching between table and graph views in the leaves panel.
- [Searching and filtering](./workflows/searching-and-filtering.md) — search box and the multi-field filter sheet for the leaves panel.
- [Editing system details](./workflows/editing-system-details.md) — inline edit of name, code, level, type, location, zone, description on the *Detail* tab. Includes system code generation and the special meaning of the `TRASH` level.
- [Managing system people](./workflows/managing-system-people.md) — responsible person, owner, responsible team, and the operators / maintained-by tables on the *Persons* tab.
- [Managing relationships](./workflows/managing-relationships.md) — the 9 engineering relationship types, viewing them in the list and the graph, creating and deleting edges.
- [Managing spare parts](./workflows/managing-spare-parts.md) — *Spare Parts* tab with per-row **Use** + **Remove** actions, *Spare For* tab listing parent systems, the spare-swap wizard, where assignments are made.
- [Viewing change history](./workflows/viewing-change-history.md) — the *History* tab timeline and its filters.
- [Creating systems](./workflows/creating-systems.md) — right-click a parent in the tree to create a new subsystem. Two-field dialog (name + level), inherits responsible/location/zone from the parent.
- [Copying systems](./workflows/copying-systems.md) — copy/paste a system (and optionally its subtree) under a different parent.
- [Managing physical items](./workflows/managing-physical-items.md) — assigning and moving the physical item attached to a system.

For moving a system to a different parent, see the **Systems Moving** module — drag-and-drop rearrangement of the hierarchy lives there. See the [user guide index](../README.md).

## Coming soon

- 🔮 **Permission Phase 1** — split `admin` (top-level system edits at `SYSTEM_DOMAIN`, `TECHNOLOGY_UNIT`) from `systems-edit` (lower levels at `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, `TRASH`). All derived actions scoped accordingly.
- 🔮 **Permission Phase 2** — team-based edit enforcement (responsible-team membership required to edit subtree). DB structure pending.
- 🔮 **Use Spare in production** — the spare-swap wizard is live in System Hierarchy in non-production environments. The `enableSparePartsAssignment` feature flag still hides it in production; once enabled the button becomes active everywhere.
- 🔮 **Drag-and-drop move at hierarchy level** — currently move lives in the separate Systems Moving module.

`[VIDEO PLACEHOLDER: 60s end-to-end walkthrough — open the module, expand the tree to a key system, browse its subsystems in table view, switch to graph view, open the detail tabs, finish on the History tab]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The wiki generator strips it.*
>
> Authoritative entity definitions live in `src/server/apollo/schema.graphql`. Look up `System`, `Item`, `CatalogueItem`, `Order`, `Employee`, `Team`, and `Link` types for full field shapes and relationship directions. The repo is open-source on GitHub.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
