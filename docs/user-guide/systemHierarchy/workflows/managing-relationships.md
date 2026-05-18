# Managing relationships

## What this is for

View, create, and remove **engineering relationships** between systems — the directed links describing how systems depend on each other (one is powered from another, one cools another, one provides data to another, and so on). Unlike the parent-child structural hierarchy of the tree, these relationships cross the tree freely and form a multi-edge graph.

Three different surfaces in the module touch relationships, all documented here.

## Who can do this

| Action | Role required |
|---|---|
| View list and graph of relationships | `systems-view` (👁️ Viewer or higher) |
| Create / delete edges | `systems-edit` (✏️ Editor / Admin) |

> 🔮 *Coming soon — Phase 1:* edge creation and deletion will be scoped by system level. Editors will only be able to manage edges where both endpoints are at `KEY_SYSTEMS` or below; admins handle anything touching `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT`.

> 🔮 *Coming soon — Phase 2:* even with the `systems-edit` role you should be a member of the responsible team to edit relationships on a system. Today this is policy only.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have a system selected.
- See [Key concepts](../README.md#key-concepts) for terminology (system, system level, spare part).

## The 9 relationship types

Eight engineering types plus the structural parent-child relationship. The graph view shows all nine; the *Relationships* list groups them by **Inbound** (things pointing at this system) and **Outbound** (things this system points at).

| Type | Outbound label | Inbound label | Use case |
|---|---|---|---|
| **Parent / child** | *(structural)* | *(structural)* | The hierarchy itself — one system is a subsystem of another. |
| **Has spare** | Spare for | Has spare | One system is designated as a spare for another. See [Managing spare parts](./managing-spare-parts.md). |
| **Cooling** | Cooled from | Cools | The source system supplies cooling to the target. |
| **Power** | Powered from | Powers | The source system supplies electrical power to the target. |
| **Control** | Controlled by | Controls | The target governs the operation of the source. |
| **Interlock** | Interlocked by | Interlocks | The target is part of the safety interlock chain protecting the source. |
| **Data** | Provides data to | Receives data from | Data acquisition / telemetry routing. |
| **Beam** | Directs beam to | Receives beam from | Photon beam routing along the beamline. |
| **Vacuum** | Provides vacuum for | Receives vacuum from | Vacuum supply dependency. |

## Surfaces

There are three surfaces where relationships are visible. They share the same data; the difference is in scope and interaction.

### 1. Leaves Panel Graph (middle panel)

Shown when the leaves panel is in **Graph View** instead of *Tree View* (toggle in the panel header — see [Navigating the tree](./navigating-the-tree.md)).

- **Nodes:** the *children* of the currently-selected parent system (the same set as the leaves table).
- **Edges:** all 9 relationship types, including parent-child, between those children.
- **Use case:** see how the children of a hierarchy node are interconnected — handy when reorganizing a subtree.

`[SCREENSHOT PLACEHOLDER: Leaves panel in Graph View showing several child systems as colored nodes with directed edges of multiple types between them, legend at the side]`

### 2. Detail → Graph tab

Open from the **Graph** tab inside the system detail view.

- **Nodes:** the currently-selected system itself plus everything it directly relates to across the engineering types.
- **Edges:** **the 8 engineering types — the parent-child structural edge is hidden by default** (this is intentional: the graph is for engineering view; structural parent-child is what the tree is for).
- **Use case:** "show me the dependencies of *this* specific system."

`[SCREENSHOT PLACEHOLDER: Detail Graph tab with the current system as the central node, engineering relationships radiating to neighbors, legend showing colored edge types]`

### 3. Detail → Relationships tab (list view)

A flat, grouped list. Acts as the read-only / mobile fallback to the graph.

- **Inbound** group at top, **Outbound** below — each labeled with an arrow icon.
- Each row: direction label (e.g. *Cooled from*) on the left, the related system shown as a navigable pill (item-usage icon, name, system code), and a delete icon on the right (Editors / Admins only).
- **Click the pill** to navigate to that related system.
- **Click the delete icon** to delete that edge — see *Deleting an edge* below.

`[SCREENSHOT PLACEHOLDER: Relationships tab showing Inbound section with two rows and Outbound section with three rows, each row has a colored direction label, a system pill in the middle, and a delete icon on the right (Editor view)]`

## Steps

### Viewing relationships

1. **Open the system in detail view.** Click the **Relationships** tab to see the list, or **Graph** for the graph view.

2. **In the graph,** use the legend to identify edge types by color. Pan with click-drag, zoom with the scroll wheel.

3. **Filter the graph.** The graph header has filter controls: by system level, by system type, and by relationship type. The relationship-type filter on the Detail Graph persists between sessions.

4. **Click a node** in the graph to navigate to that system.

### Creating an edge

5. **Switch to a graph view** (Leaves Panel Graph or Detail Graph tab) — edges cannot be created from the list view.

6. **Initiate edge creation** by dragging from a node's connector handle to the target node, or via the node action menu (depends on the connector). The graph offers a *Source* and *Target* selection prompt — confirm both.

   `[SCREENSHOT PLACEHOLDER: graph view with two nodes highlighted as Source and Target during an in-progress edge creation, the relationship-type picker visible]`

7. **Pick the relationship type** when prompted. The 8 engineering types are available; structural parent-child cannot be created from here (use Systems Moving for that).

8. **Confirm.** A toast confirms creation. The edge appears immediately and is also listed under *Relationships*.

### Deleting an edge

9. **From the list view:** click the delete icon at the right of the row, then confirm in the *Delete this relationship?* modal. Toast: *Deleting relationship…* → *Relationship deleted*.

   `[SCREENSHOT PLACEHOLDER: confirmation dialog "Delete this relationship?" with Cancel and Confirm buttons]`

10. **From a graph view:** select the edge (click it) and use the delete action in the edge inspector. Same confirmation modal.

11. **Already-deleted edges** show a friendly message: *Relationship was not found (may have been already deleted)*.

`[VIDEO PLACEHOLDER: 30s — open a system in detail, view the Relationships tab list, switch to the Graph tab and pan around, click an edge to inspect, delete it via the inspector, confirm the modal]`

## Tips & gotchas

- **Parent-child is hidden by default in Detail Graph.** If you want to see the structural edge, enable it in the relationship-type filter — but for browsing the hierarchy, the tree on the left is faster.
- **Direction matters.** *Cooled from A* means the cooling supply flows *from* A into this system. Read the direction label carefully; the graph also shows direction with arrows.
- **Use the Leaves Panel Graph when reorganizing.** It shows children of the current parent, so you see siblings at a glance — useful when you need to move dependencies during a refactor.
- **Spare relationships** appear here too, but the Spare Parts table on its own tab is a more useful view if you only care about coverage. See [Managing spare parts](./managing-spare-parts.md).
- **Edge counts on the side panel** include all relationship types — if a number looks high, the parent-child edge is included.
- **Deletion is permanent.** Edges have no soft-delete; the only way to restore one is to recreate it.
- **Where edges are created in production.** Today the most reliable way to create engineering relationships is the Systems Relations module (see [user guide index](../../README.md)) which has dedicated bulk and per-pair flows. The graph creation in System Hierarchy is a quick path for one-off changes.

## Related

- [Navigating the tree](./navigating-the-tree.md) — for the structural hierarchy and the table↔graph toggle.
- [Managing spare parts](./managing-spare-parts.md) — for the *Has spare* / *Spare for* relationship in detail.
- [Editing system details](./editing-system-details.md) — system attributes, including system level which scopes Phase 1 permissions.
- [Viewing change history](./viewing-change-history.md) — relationship changes appear in the History timeline as well.
