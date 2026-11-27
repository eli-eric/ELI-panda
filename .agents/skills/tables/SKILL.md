---
name: tables
description: Table layout patterns with PandaTableV2, sticky headers, pagination, and scroll handling. Use when implementing tables, fixing scroll issues, or working with TableLayoutContainer in different layout contexts.
user-invocable: false
---

# Table Layout Patterns

## Overview

This project uses `PandaTableV2` for virtualized tables with sticky headers. Proper layout setup is critical for scroll behavior.

## Key Components

- **`TableLayoutContainer`** - Calculates table height for full-page layouts
- **`PandaTableV2`** - Virtualized table with sticky header
- **`PaginationV2`** - Pagination component (often sticky at bottom)

## When to Use TableLayoutContainer

`TableLayoutContainer` is designed for **full-page table layouts** where the table is a direct child of the main content area.

```tsx
// GOOD: Full-page layout (e.g., Orders, Catalogue)
const OrdersPage = () => (
    <TableLayoutContainer>
        <SearchBar />
        <PandaTableV2 ... />
        <Pagination ... />
    </TableLayoutContainer>
)
```

### How TableLayoutContainer Works

Located at: `src/components/layout/TableLayoutContainer.tsx`

It calculates height using `calc(100vh - height)` where height is the sum of:

- `#search-bar`
- `#table-heading`
- `#page-head`
- `#column-hiding`
- `#category-list`
- `#nav-bar`
- `#breadcrump`
- `#paging`

Elements must have these IDs to be included in the calculation.

## When NOT to Use TableLayoutContainer

**Do NOT use** `TableLayoutContainer` in nested/constrained layouts:

- Inside grid cells with fixed height
- Inside flex containers with `h-full` or `flex-1`
- Inside sidebars or panels
- Any context where parent height is NOT `100vh`

### Why It Fails in Nested Contexts

```
HierarchyLayout: h-[calc(100vh)] grid
  └── main: flex flex-col overflow-hidden
        └── Panel: h-full
              └── TableLayoutContainer: calc(100vh - ...)  ← CONFLICT!
```

`TableLayoutContainer` calculates against `100vh`, but the panel is already constrained. This causes overflow and broken scrolling.

## Solution for Nested Layouts

Use flex layout with proper height constraints:

```tsx
// Pattern for nested table with sticky header and pagination
const NestedTablePanel: FC = () => {
    return (
        <div className="flex flex-col h-full">
            {/* Header - fixed at top */}
            <PanelHeader />

            {/* Table wrapper - fills remaining space */}
            <div className="flex-1 min-h-0 flex flex-col">
                <PandaTableV2
                    className="flex-1 min-h-0"
                    ...
                />
            </div>

            {/* Pagination - sticky at bottom */}
            <div className="shrink-0">
                <Pagination ... />
            </div>
        </div>
    )
}
```

### Critical CSS Classes

| Class             | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| `h-full`          | Take full height of parent                                  |
| `flex-1`          | Grow to fill available space                                |
| `min-h-0`         | **CRITICAL** - Allow flex item to shrink below content size |
| `shrink-0`        | Prevent element from shrinking (for pagination)             |
| `overflow-hidden` | On parent containers to establish scroll boundary           |

### Why `min-h-0` is Critical

In flexbox, items have `min-height: auto` by default, meaning they won't shrink below their content size. This breaks scroll containers.

```tsx
// BAD - table won't scroll properly
<div className="flex-1">
    <PandaTableV2 />
</div>

// GOOD - table scrolls correctly
<div className="flex-1 min-h-0">
    <PandaTableV2 />
</div>
```

## Complete Example: Panel with Table

```tsx
// Parent container (e.g., in a grid layout)
const ParentLayout = () => (
    <div className="grid h-[calc(100vh)] grid-cols-[280px_1fr]">
        <aside className="overflow-hidden">
            <TreeView />
        </aside>
        <main className="flex flex-col overflow-hidden">
            <TablePanel />
        </main>
    </div>
)

// Table panel component
const TablePanel: FC = () => {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Panel header with ID for potential TableLayoutContainer use */}
            <div id="page-head" className="border-b px-4 py-2 shrink-0">
                <h2>Panel Title</h2>
            </div>

            {/* Table container */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <TableComponent />
            </div>
        </div>
    )
}

// Table component with pagination
const TableComponent: FC = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0 flex flex-col">
                <PandaTableV2
                    className="flex-1 min-h-0"
                    ...
                />
            </div>
            <div className="shrink-0">
                <Pagination ... />
            </div>
        </div>
    )
}
```

## Hierarchy of Height Constraints

For proper scrolling, every ancestor must have a defined height:

```
viewport (100vh)
  └── grid/flex container (h-[calc(100vh)] or h-full)
        └── main area (flex-1 + overflow-hidden)
              └── panel (h-full + overflow-hidden)
                    └── content wrapper (flex-1 + min-h-0)
                          └── table (flex-1 + min-h-0 + overflow-auto inside)
```

**Breaking any link in this chain will cause scroll issues.**

## PandaTableV2 Internal Structure

`PandaTableV2` renders via `TableContainer` which has:

```tsx
<Fragment>
    {tableHeading && <div id="table-heading">...</div>}
    {enableColumnHiding && <TableSettings />}
    <div
        ref={tableContainerRef}
        className="overflow-auto relative h-full min-w-full" // scrollable area
    >
        <table>
            <thead className="sticky top-0 z-10">...</thead> // sticky header
            <tbody>...</tbody>
        </table>
    </div>
    {enablePagination && <Pagination />}
</Fragment>
```

The `className` prop on `PandaTableV2` is passed to the scrollable `div`.

## Debugging Scroll Issues

1. **Check height chain** - Every parent needs defined height
2. **Look for missing `min-h-0`** - Required on flex items that should scroll
3. **Check for double scrollbars** - Remove `overflow-auto` from wrapper if table has its own
4. **Inspect computed heights** - Use DevTools to see if heights are calculated correctly
5. **Check `overflow-hidden`** - Parent containers need this to establish boundaries

## Common Patterns

### Full-page table (use TableLayoutContainer)

```tsx
<TableLayoutContainer>
    <PandaTableV2 ... />
    <Pagination ... />
</TableLayoutContainer>
```

### Nested panel table (use flex layout)

```tsx
<div className="flex flex-col h-full">
    <div className="flex-1 min-h-0 flex flex-col">
        <PandaTableV2 className="flex-1 min-h-0" />
    </div>
    <div className="shrink-0">
        <Pagination />
    </div>
</div>
```

### Split view with table

```tsx
<div className="grid grid-cols-2 h-full">
    <div className="overflow-hidden">
        <LeftPanel />
    </div>
    <div className="flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0">
            <PandaTableV2 ... />
        </div>
    </div>
</div>
```
