# Navigating the tree

## What this is for

Move around the system hierarchy: open a tree node, drill down to its subsystems, jump up via the breadcrumb, and switch between a table view and a relationship-graph view of the children. This is the foundation of every other workflow — most user journeys start by selecting a system in the tree.

## Who can do this

👁️ **All personas** — navigation is read-only and available to anyone with the `systems-view` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are looking at the System Hierarchy module.
- See [Key concepts](../README.md#key-concepts) for terminology (system, subsystem, system level, system code).

## Steps

### Browsing the tree

1. **Open the System Tree on the left.** The header shows *System Tree*, a search input, and a *Collapse All* button.

   `[SCREENSHOT PLACEHOLDER: left tree panel with several top-level system domains visible, one expanded showing two levels of children, count badges on the right of each node]`

2. **Click the chevron** next to a node to expand it, or click the node label to select it. Selecting a node automatically expands all its ancestors so you can always see where you are in the tree.

3. **Read each node:** name on the left (highlighted if a search term matches), a folder icon colored by system level, and a small badge with the count of **end systems anywhere beneath it** — not just its direct children. The badge shows `…` while the count is loading.

4. **Watch for the small dot** just before the count badge. It means the node has at least one end system hanging *directly* off it. Because end systems never appear in the tree itself, the dot is your only cue that something is there — see [Finding a node's own end systems](#finding-a-nodes-own-end-systems) below.

   `[SCREENSHOT PLACEHOLDER: two adjacent tree nodes at the same level, one showing the dot before its count badge and one without, to make the difference legible]`

5. **Click *Collapse All*** to fold the entire tree back to the top level.

### Reading the breadcrumb

6. **Look above the leaves panel** for the breadcrumb. It shows the full ancestor path of the currently selected system, ending with the system name and its system-code badge in bold.

   `[SCREENSHOT PLACEHOLDER: breadcrumb showing ancestors separated by ">" arrows, ending with the current system in bold and a code badge]`

7. **Click any ancestor** in the breadcrumb to navigate to it. The leaves panel and detail update to that ancestor.

8. **Long paths collapse** with an ellipsis: if there are more than four ancestors, the breadcrumb shows the first ancestor, an ellipsis, and the last two. The ellipsis itself is not clickable.

### Working with the leaves panel

9. **Pick a parent in the tree.** The middle panel lists every **end system** beneath that parent — at any depth, not only its direct children. The panel header reads *Subsystems*. If there is nothing beneath it, you see *No subsystems found*.

   The **System Path** column shows only the part of the path *below* the system you picked — the part above it is already in the breadcrumb, so it is not repeated in every row. When a system hangs directly off the selected one, the column names that system instead. Hover the cell to see the full path from the very top.

10. **Use the view switcher** in the panel header to flip between two layouts:

   - **Tree View** (default) — a sortable, paginated table of subsystems with columns for code, path, name, type, location, zone, importance, and spare counts. See [Searching and filtering](./searching-and-filtering.md) for the toolbar above it.
   - **Graph View** — a relationship graph centered on the selected parent's children, showing how they relate to each other. See [Managing relationships](./managing-relationships.md) for full graph controls.

   `[SCREENSHOT PLACEHOLDER: Subsystems panel with the view switcher (Tree View / Graph View buttons) at the top right of the header, currently in Tree View showing a table of subsystems]`

11. **Click any subsystem row** in the table to open its detail view (or click any node in the graph). The breadcrumb updates and the right sidebar populates with that system's *Quick Info*.

12. **Use *View Detail*** in the leaves panel header to open the full detail of the *currently-selected parent itself* (rather than one of its children).

### Finding a node's own end systems

The tree lists only systems that *have* children, and the table lists everything beneath the selected node at any depth. Between the two, a node's own end systems can be hard to spot: three of them sit unnoticed among two thousand rows coming from deeper branches.

13. **Tick *Direct only*** next to the search box in the leaves panel toolbar. The table narrows to the end systems hanging immediately off the selected node, and the count in the panel header reads e.g. *(12 direct)* to distinguish it from the tree badge, which keeps counting everything below.

    `[SCREENSHOT PLACEHOLDER: leaves panel toolbar with the Direct only checkbox ticked, and a short table below it — contrast with the same node unticked showing a long paginated list]`

14. **Keep browsing with it on.** The setting stays as you move around the tree, so you can walk down level by level and see what each node holds directly. It is also part of the URL, so a shared link opens in the same mode.

15. **Untick it** — or use *Show all levels* if the table came up empty — to go back to the full list.

`[VIDEO PLACEHOLDER: 30s — expand a top-level domain in the tree, drill two levels down by clicking nodes, watch the breadcrumb update, click an ancestor in the breadcrumb to jump back, tick Direct only on a node marked with the dot, then switch the leaves panel to Graph View and back]`

## Tips & gotchas

- **Selecting and expanding are different.** Clicking a node selects it (and the leaves panel updates); clicking the chevron expands without selecting. This is useful when you want to inspect a sibling without losing your current selection.
- **The graph view is per-parent.** It shows children of the parent you've selected, not the whole tree. To see relationships from a specific system's perspective, open its full detail and use the *Graph* tab — see [Managing relationships](./managing-relationships.md).
- **The quick-info sidebar** on the right always reflects the *currently selected* system, not the parent you're browsing in the leaves panel. Selecting a leaf row updates it.
- **Mobile layout** collapses the tree behind a toggle and replaces the right sidebar with a floating *Info* button.
- **The tree shows folder icons** colored by system level — use this as a quick visual cue for what kind of node you're looking at without having to read the breadcrumb.
- **The count badge ignores *Direct only*.** It always counts every end system beneath a node, so you can keep comparing nodes against each other while the table shows a narrowed view. A node with a dot and a badge of `250` has *some* direct end systems among those 250 — tick *Direct only* to see how many.
- **A node with no dot has nothing directly beneath it.** Everything under it sits deeper in the tree, so *Direct only* will come up empty there.

## Related

- [Searching and filtering](./searching-and-filtering.md) — narrow down what's shown in the leaves panel, and the *Direct only* scope control.
- [Editing system details](./editing-system-details.md) — once you've reached a system, edit its attributes.
- [Managing relationships](./managing-relationships.md) — full graph view controls and edge editing.
- [Copying systems](./copying-systems.md) — right-click context menu on a tree node.
