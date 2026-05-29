# System Hierarchy

The flagship surface of the systems family — `/systems/hierarchy` — a three-panel explorer that combines tree navigation, leaves panel (table or graph), and a tabbed detail view for the selected system.

> User-facing companion: [System Hierarchy user guide](../../user-guide/systemHierarchy/README.md).

## Module location

```
src/modules/systemHierarchy/
├── SystemHierarchyExplorer.cont.tsx     — top-level container
├── components/
│   ├── layout/                          — three-panel `HierarchyLayout`
│   ├── tree/                            — left tree (`SystemTree`)
│   ├── leaves/                          — middle panel (`LeavesPanel`, `LeavesTable`)
│   ├── filters/                         — leaves filter sheet
│   ├── sidebar/                         — right Quick-Info / Detail sidebar
│   ├── tabs/                            — Detail tabs (Detail, Persons, Physical Item, …)
│   ├── detail/                          — sub-views consumed by tabs
│   ├── history/                         — change-history timeline
│   ├── graph/                           — React Flow relationship graph
│   ├── copy/                            — Copy / Paste dialog
│   ├── create/                          — Create Subsystem dialog (right-click → Create System)
│   ├── relationships/                   — relationships tab visualisation
│   └── shared/                          — small reusables
├── hooks/
│   ├── queries/                         — TanStack Query read hooks
│   ├── mutations/                       — write hooks
│   └── useHierarchyNavigation.ts + many graph/leaves hooks
├── store/
│   ├── useHierarchyStore.ts             — tree + graph expansion, copy buffer
│   └── useDetailGraphStore.ts           — detail-graph view preferences
├── types/                               — schemas, constants, graph types
└── utils/                               — tree, graph, filter, colour helpers
```

Entry point (`SystemHierarchyExplorer.cont.tsx`):

```tsx
const SystemHierarchyExplorerContainer: FC = () => {
    const { selectedLeafUid } = useHierarchyNavigation()
    const { system } = useSystemDetail(selectedLeafUid)

    return (
        <HierarchyLayoutContainer
            tree={<SystemTreeContainer />}
            middle={<LeavesPanelContainer />}
            sidebar={selectedLeafUid ? <HierarchyDetailSidebar system={system} /> : undefined}
        />
    )
}
```

## Layout

```mermaid
flowchart LR
    subgraph Page["/systems/hierarchy"]
        direction LR
        Tree["Left — SystemTreeContainer\nuseSystemHierarchy"]
        Middle["Middle — LeavesPanelContainer\nuseSystemLeaves + view switcher"]
        Side["Right — HierarchyDetailSidebar\nuseSystemDetail"]
    end

    Tree -->|selects leaf uid| Middle
    Tree -->|hover / context menu| Copy["Copy / Paste dialog"]
    Middle -->|select detail uid| Side
    Side --> Tabs["Tabs: Detail · Persons · Physical Item · Spare Parts · Spare For · Relationships · Attachments · History · Graph"]
    Middle -.->|switch view| Graph["Leaves panel — graph mode (React Flow)"]
```

The leaves panel toggles between **Tree View** (the default `LeavesTable`) and **Graph View** (`graph/` components using React Flow). The view choice is held in `useHierarchyStore.graphLayoutMode` and persisted.

## Query and mutation surface

### Queries (`hooks/queries/`)

| Hook | Endpoint key / GraphQL doc | Cache key (`HIERARCHY_QUERY_KEY` etc.) |
|---|---|---|
| `useSystemHierarchy` | `queryFetcher('systemsHierarchy')` (REST) | `HIERARCHY_QUERY_KEY`. 5-minute `staleTime`, no refetch on mount. |
| `useSystemLeaves` | `queryFetcher('systemSubsystems')` (REST) | parameterised by parent uid |
| `useSystemLeavesCount` | `queryFetcher('systemSubsystems')` count variant | optimised for tree badges |
| `useSystemDetail` | `graphql-request` `query SystemHierarchyDetail($where)` (`gql` document) | seeded by `primeSystemDetailCache` |
| `useSystemHistory` | REST endpoint per uid | tab consumer |
| `useSystemRelationships` | REST endpoint per uid | Relationships tab |
| `useRelationshipGraph` | REST endpoint, graph slice | Graph tab + leaves graph view |
| `useRelationshipItemUsage` | REST endpoint, item usage lookup | RelationshipGraph hover |

### Mutations (`hooks/mutations/`)

| Hook | Operation |
|---|---|
| `useSystemFieldUpdate` | PATCH a single field on a `System` — used by inline edit. Calls `updatedByResolver` for audit. |
| `useItemFieldUpdate` | PATCH a single field on the attached `Item` |
| `useSystemCopy` | Calls REST endpoint `system/<uid>/copy` — server orchestrates the recursive copy |
| `useCreateSubsystem` | `mutation CreateSystems` via `useGraphQLMutation`. Payload assembled by the pure `utils/buildCreateSubsystemPayload`, including `parentSystem.connect`, parent-inherited `responsible/location/zone`, and the required `updatedBy.connect[edge.action=Insert]` so `updatedByResolver` writes a history edge. On success seeds `[SYSTEM_DETAIL_QUERY_KEY, newUid]` with the full SystemDetail fragment returned by the server, then invalidates `HIERARCHY`, `LEAVES`, `LEAVES_COUNT`, and `RELATIONSHIP_GRAPH` keys. |
| `useSystemCodeGenerate` | Generate a code based on type + level + ancestry |
| `useSystemCodeClear` | Clear a previously generated code |
| `useDeleteRelationship` | Remove one of the 8 engineering edges. Always invalidates `RELATIONSHIP_GRAPH_QUERY_KEY`; on `IS_SPARE_FOR` disconnect additionally invalidates via `matchesSpareAffectedQuery([currentSystemUid, relatedSystemUid])` — see [Cache invalidation for spare flows](#cache-invalidation-for-spare-flows). |

`useSystemFieldUpdate` is the canonical hook for "inline-edit a system field" and is consumed by detail tabs, sidebar, and the Quick-Info panel.

### `primeSystemDetailCache`

`hooks/queries/useSystemDetail.ts:38-77` is worth a paragraph. The hook uses `refetchOnMount: false` so a leaf click feels instant, but that means *something* has to populate the cache before the first render — otherwise the breadcrumb and side panel render empty. The fix:

```ts
primeSystemDetailCache(queryClient, uid, hint)
  → seeds a partial SystemDetailFragment from the tree node's data
  → kicks off a background fetch (using the live cache key)
  → real fragment replaces the seed transparently
```

It is called from `SystemTree` selection handlers and `LeavesTable` row clicks. Treat it as part of the public surface of the hook — see the in-source comment for the rationale and the `primeSystemDetailCache.test.ts` for the contract.

## Stores

### `useHierarchyStore` (persisted)

State carried across page reloads:

| Field | Type | Purpose |
|---|---|---|
| `expandedNodes` | `string[]` | UIDs currently expanded in the tree |
| `graphLayoutMode` | `GraphLayoutMode` | `VERTICAL` / `HORIZONTAL` / `FORCE` for leaves graph |
| `graphExpandedNodes` / `graphExpandedEdges` | arrays | Cached graph state for the relationship view |
| `copiedSystemUid` | `string \| null` | Copy-paste buffer (one system at a time) |

Notable actions: `toggleNode`, `expandNodes`, `collapseAll`, `setCopiedSystemUid`, `addGraphExpanded` (merges into the persisted graph).

### `useDetailGraphStore` (persisted)

Per-system Graph tab preferences:

| Field | Notes |
|---|---|
| `relationshipTypes` | Visible relationship types; `null` means default (all except `HIDDEN_BY_DEFAULT = ['HAS_SUBSYSTEM']`). |
| `layoutMode` | Mirror of `graphLayoutMode` but local to the detail graph. |
| `expandedNodes` / `expandedEdges` | Persistable cache of graph expansion so coming back to the tab restores it. |

Two stores rather than one because the *leaves* graph (middle panel) and the *detail* graph (right tab) have independent UI state and should not collide.

## Tabs

The tabbed detail surface lives under `components/tabs/`:

| Tab | Container | Notes |
|---|---|---|
| Detail | `DetailTab.cont.tsx` | Inline-edit name / level / code / location / zone / description |
| Persons | `PersonsTab.cont.tsx` | Responsible person + team + operators + maintained by |
| Physical Item | `PhysicalItemTab.cont.tsx` | View/edit the `Item` attached via `CONTAINS_ITEM` |
| Spare Parts | `SparePartsTab.cont.tsx` (+ `.columns`, `.types`, `SparePartsTabActionsCell.tsx`) | Table of systems flagged spare *for* this system. Actions column with **Use** (opens shared `useSpareDialog` wizard) + **Remove** (shared `SpareRelationshipDeleteButton`). Use button has a 4-level priority tooltip chain — `!canEdit` → feature-flag off → `!physicalItem` → enabled. Click + keydown propagation isolated by a cell-level wrapper so row-click `selectLeaf` still works. |
| Spare For | `SpareForTab.cont.tsx` | The inverse: lists `sparePartsForSystems` (exposed by `useSystemDetail`) with icon + name + EUN badge + outbound `SpareRelationshipDeleteButton`. |
| Relationships | `RelationshipsTab.cont.tsx` | List of all 9 relationship types, edit/delete |
| Attachments | `AttachmentsTab.cont.tsx` | File manager (MinIO-backed) |
| History | `HistoryTab.cont.tsx` | `WAS_UPDATED_BY` timeline + filters |
| Graph | `GraphTab.cont.tsx` | React Flow detail graph for this system |

## Create Subsystem

User-facing companion: [Creating systems](../../user-guide/systemHierarchy/workflows/creating-systems.md).

The right-click context menu on a tree node offers **Create System** alongside Copy / Paste. The orchestrator is `hooks/useCreateSubsystemAction.ts` — it mirrors `useSystemCopyPaste`: gated by `usePermission([ROLE.SYSTEM_EDIT])`, opens `CreateSubsystemDialog` through `useDynamicModalStore` with a stable id `create-subsystem-${parentUid}`.

Parent → allowed-child rules are a pure lookup table in `utils/systemLevelRules.ts`:

| Parent level | Allowed child levels |
|---|---|
| `SystemDomain` | `[TechnologyUnit]` |
| `TechnologyUnit` | `[TechnologyUnit, KeySystems, Trash]` |
| `KeySystems` | `[KeySystems, SubsystemsAndParts, Trash]` |
| `SubsystemsAndParts` | `[SubsystemsAndParts, Trash]` |
| `Trash` | `[]` — `canCreateUnder(Trash) === false` |

`TreeNode` calls `canCreateUnder(node.systemLevel)` to disable the menu item, and the dialog's *System level* `Select` is filtered by `getAllowedChildSystemLevels(parentLevel)` (preselected + read-only when only one option remains).

The dialog reads the parent via `useSystemDetail(parentUid)` to surface the inherited `responsible`/`location`/`zone` values as a read-only block, then passes their uids into `useCreateSubsystem` so the mutation payload includes them. Submit is disabled while the parent fetch is in flight.

After the mutation resolves, the dialog calls `selectLeaf(newUid)` **without** an optimistic hint — the mutation hook has already written the full `SystemDetail` fragment into the system-detail query cache, so the detail page renders every field on first navigation (a minimal hint would otherwise stick because `primeSystemDetailCache`'s background `fetchQuery` is a no-op under the 60 s `staleTime`).

`TreeNode` also takes a `canEdit` prop and a `onCreateSubsystem(parentUid, parentName, parentLevel)` callback. Permission gating is now uniform — Copy, Paste, and Create System are **always rendered** and `disabled` based on `canEdit` (plus their per-action rule: `!canPaste` for paste, `!canCreateUnder(level)` for create). The previous "hide handlers when no edit permission" behaviour in `SystemTree.cont` was dropped in favour of always-render-disabled for better discoverability.

## Copy / Paste

The copy-paste flow lives in `components/copy/`. Buffer: `useHierarchyStore.copiedSystemUid`. The right-click context menu on a tree node or graph node offers **Copy System** (sets the buffer) and **Paste System** (opens the dialog).

The dialog options table:

| *Copy only children* | *Copy recursively* | Effect |
|---|---|---|
| OFF | OFF | Source system only, no descendants |
| OFF | ON | Source + full subtree |
| ON | OFF | Direct children, source skipped |
| ON | ON | **Default** — direct children with their subtrees, source skipped |

Server-side the copy is a single REST call (`useSystemCopy` → `system/<uid>/copy`); the response triggers `useSystemHierarchy` + `useSystemLeaves` invalidation.

See the user-facing walkthrough → [Copying systems](../../user-guide/systemHierarchy/workflows/copying-systems.md).

## React Flow graph

Two surfaces use React Flow:

- **Leaves panel graph view** — `components/graph/`. Driven by `useLeavesGraphState` and the hierarchy store's `graphLayoutMode`.
- **Detail graph tab** — `components/relationships/` + `useRelationshipGraph*` hooks. Driven by `useDetailGraphStore`.

Both share node/edge types from `types/graph.ts` and colour helpers from `utils/graphColors.ts`. Layout helpers in `utils/graphLayout.ts` compute force-directed and orthogonal positions.

`useRelationshipGraphApiQuery` is the gate between React Flow node selection and TanStack Query — expanding a node fires a `useRelationshipGraph` query for that uid and merges the result into the persisted store via `addExpanded`.

## Cache invalidation for spare flows

The shared **`matchesSpareAffectedQuery`** predicate at `src/utils/query/spareInvalidationPredicate.ts` is the single mechanism that keeps all spare-aware views fresh after an assign/remove. It exists because callers of `useSpareDialog` and `useDeleteRelationship` span three modules with different query-key shapes, and no whitelist of constants can cover them all.

```ts
matchesSpareAffectedQuery([systemUid, spareItemUid])(query)
// matches if:
//   key[0] === RELATIONSHIP_GRAPH_QUERY_KEY  → true (anything in the graph)
//   key[0] === SYSTEM_DETAIL_QUERY_KEY       → true iff key contains one of the uids
//   key[1] is an object (useGraphQL default [opName, variables, document])
//                                            → JSON-scan variables for either uid
```

Covered call sites:

| Caller | Query-key shape | Match path |
|---|---|---|
| `systemHierarchy/hooks/queries/useSystemDetail.ts` | `[SYSTEM_DETAIL_QUERY_KEY, uid]` | constant branch |
| `systemHierarchy` graph hooks | `[RELATIONSHIP_GRAPH_QUERY_KEY, …]` | constant branch |
| `systemItem/hooks/useSystemDetail.ts` | `useGraphQL` default: `[opName, { where: { uid, … } }, document]` | variables-scan branch |
| `device-info-overlay/hooks/useSuspenseSystemDetail.ts` | same as above | variables-scan branch |
| `system-edit/...` form load | same as above | variables-scan branch |

Used by:

- `useSpareDialog` / `spare-assignment-wizard` — replaces three earlier invalidations (one was a hyphenated `'system-detail'` string that matched nothing).
- `useDeleteRelationship` (only when `isSpareDisconnect(field)`) — replaces a PascalCase `'SystemDetail'` string literal that didn't match the camelCase `SYSTEM_DETAIL_QUERY_KEY` constant.

Query-key constants `SYSTEM_DETAIL_QUERY_KEY` and `RELATIONSHIP_GRAPH_QUERY_KEY` live in `src/utils/query/queryKeys.ts` and are re-exported from `src/modules/systemHierarchy/types/constants.ts` for back-compat with existing imports.

### `SpareRelationshipDeleteButton`

Lives in the shared spare module: `src/modules/shared/system/use-spare/components/spare-relationship-delete-button.comp.tsx`. Thin wrapper around `useDeleteRelationship` that owns spare-specific copy (`common.spareAssignment.remove.*` for inbound, `common.spareAssignment.spareFor.remove.*` for outbound) and a `canEdit` gate. Kept separate from the generic `DeleteRelationshipButton` in `components/relationships/` to avoid generic-component prop sprawl.

## Filters

The leaves filter sheet (`components/filters/`) is a multi-field RHF form persisted via TanStack Query URL state (`?filter[…]=`). Filter values land in `useGraphFilters` which feeds both the table and the graph view.

`utils/graphFilters.ts` reproduces the filter logic client-side for the graph (which receives the *whole* relationship slice from the server, not a filtered one).

## Tests

Unit coverage under `__tests__/` is heaviest in:

- `types/__tests__/` — schema parsing.
- `utils/__tests__/` — tree search, graph layout, filter predicates, change-builder, **parent→child level rules** (`systemLevelRules.spec.ts`), **create-subsystem payload builder** (`buildCreateSubsystemPayload.spec.ts` — locks the `updatedBy[Insert]` audit edge).
- `hooks/queries/__tests__/` — `primeSystemDetailCache.test.ts` (the contract above), `useSystemLeaves.test.ts`, `useSystemLeavesCount.test.ts`.
- `hooks/mutations/__tests__/` — `useSystemFieldUpdate.spec.ts`.
- `components/{tree,leaves,filters,graph,detail,copy,create,shared,tabs}/__tests__/`.

## Deprecated / legacy

- The persisted graph state in `useHierarchyStore` (`graphExpandedNodes`/`graphExpandedEdges`) can drift if the underlying graph data changes — stale nodes appear in subsequent loads. Consider TTL or versioning.
- `useSystemDetail` uses `graphql-request` directly; everything else in the family uses `queryFetcher`. See the family-level [Open questions](./README.md#open-questions).
- The Graph tab's relationship-type filter (`useDetailGraphStore.relationshipTypes`) initialises to `null` for "default visible types"; new relationship types added to `RELATIONSHIP_DEFINITIONS` will be visible by default unless added to `HIDDEN_BY_DEFAULT`.

## Maintenance recommendations

1. **Replace `graphql-request` with the existing `useGraphQL` helper** in `useSystemDetail.ts`. The seed/prime mechanism is independent of the transport.
2. **TTL the persisted graph state**. Two `persist`ed stores with arbitrary node arrays can outgrow `localStorage`'s 5 MB quota on large hierarchies. Add a soft cap (e.g. last 200 nodes) or invalidate on schema-version change.
3. **Document the two-graph split** (`useHierarchyStore` vs `useDetailGraphStore`) inline. A single sentence at the top of each store would prevent newcomers from collapsing them.
4. **Test `useSystemCopy`** — none of the existing specs cover the copy dialog combinatorics. The matrix in [Copy / Paste](#copy--paste) is a natural test parameterisation.

## Open questions

- Should the Copy / Paste buffer survive a hard reload? Today it does (persisted) — but the user has no UI indicator that something is buffered.
- The Graph tab's force-layout iteration count is hardcoded in `utils/graphLayout.ts`. Configurable per-system?
- The right sidebar (`HierarchyDetailSidebar`) and the `SystemForm.cont` (in `systemItem`) both edit the same `System` shape but with different UI affordances. Are both needed long-term, or is the sidebar the modern surface?

---

## Data model reference

> 🔧 *Engineer-only; stripped from the wiki.*
>
> Relevant schema: `System`, `SystemInterface`, `ParentPathItem` (`src/server/apollo/schema.graphql:266-369`). Relationship registry: `src/modules/systemHierarchy/types/graph.ts` (`RELATIONSHIP_DEFINITIONS`). Endpoint keys consumed: `systemsHierarchy`, `systemSubsystems`, `systemDetail`, `systemRelationships`, `system/<uid>/copy`.
