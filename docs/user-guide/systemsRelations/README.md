# Systems Relations

The Systems Relations module is the dedicated workbench for creating engineering relationships **in bulk** between many systems at once. Where the [System Hierarchy](../systemHierarchy/README.md) detail page lets you wire up one system to another one at a time, this module is the place to declare "these ten spare units are spares for those three primary systems," or "everything in this zone is powered from that switchboard." It is also the canonical entry point for assigning **spare parts** (`IS_SPARE_FOR`) — the same operation that drives the spare-parts coverage indicator everywhere else in the app.

`[SCREENSHOT PLACEHOLDER: Systems Relations landing — two side-by-side tables labeled Source Systems and Target Systems, each with its own filter row and column visibility, a Relationship Type selector and Assign Relationship button in the top-right of the target table]`

## Access & Responsibilities

**Today's reality:**
- `systems-view` — read-only access to the page; can browse both tables, filter, and inspect existing spares via the *Spare Parts* / *Spare Part for Systems* modals. The *Assign Relationship* button is inactive without edit permission.
- `systems-edit` — full edit. Pick sources, pick targets, choose a relationship type, and create or delete relationships.
- `admin` — same as Editor.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `systems-view` | Open the page, filter and search both tables, view existing spare assignments via the *Spare Parts* / *Spare Part for Systems* modals |
| ✏️ **Editor / Admin** | `systems-edit` or `admin` | Everything in Viewer + select sources, select targets, pick a relationship type, create or delete relationships in bulk |

> 🔮 **Coming soon — Phase 1: split between Editor and Admin** — bulk assignment of relationships will be scoped by system level. Editors will be limited to systems at `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, `TRASH`; relationships involving `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT` will be admin-only.

> 🔮 **Coming soon — Phase 2: team-based scoping** — bulk relationship assignment will require responsible-team membership on at least one side of the relationship.

## Key concepts

- **Relationship** — a directed engineering link between two systems. The link has a *source*, a *target*, and a *type*. Each type has a forward label (source's view) and a reverse label (target's view).
- **Relationship type** — one of the engineering connection kinds. 9 types exist in total; 8 are assignable in this module (the structural *Has Subsystem* link is implicit from the hierarchy and is not assigned here).
- **Source system** — the *from* side of the relationship. For `IS_SPARE_FOR` this is the spare unit; for `IS_POWERED_FROM` this is the system *being* powered.
- **Target system** — the *to* side. For `IS_SPARE_FOR` this is the primary system being covered; for `IS_POWERED_FROM` this is the upstream power source.
- **Coverage (SP Coverage)** — the spare-parts metric, displayed in the table for each system: a decimal from 0 upwards representing *available spares / required spares*. A value below 1 is shown in red — the system is under-covered.
- **Spare Parts modal** — read-only popup launched from a row, listing every spare currently assigned to that system. The mirror popup, *Spare Part for Systems*, lists every system this row is a spare for.

### Relationship types (assignable)

| Type | EN label | Source perspective | Target perspective |
|---|---|---|---|
| `IS_SPARE_FOR` | Is Spare For | *Spare for* | *Has spare* |
| `IS_POWERED_FROM` | Is Powered From | *Powered from* | *Powers* |
| `IS_COOLED_FROM` | Is Cooled From | *Cooled from* | *Cools* |
| `IS_CONTROLLED_BY` | Is Controlled By | *Controlled by* | *Controls* |
| `IS_INTERLOCKED_BY` | Is Interlocked By | *Interlocked by* | *Interlocks* |
| `PROVIDES_DATA_TO` | Provides Data To | *Provides data to* | *Receives data from* |
| `DIRECTS_BEAM_TO` | Directs Beam To | *Directs beam to* | *Receives beam from* |
| `PROVIDES_VACUUM_FOR` | Provides Vacuum For | *Provides vacuum for* | *Receives vacuum from* |

The ninth type — *Has Subsystem* — is the hierarchical parent-child link. It is not assigned in this module; it follows the tree structure managed in the [Systems Moving](../README.md) module.

## Layout

A two-pane workbench. Each pane is an independent systems table with its own filters, search, column visibility, and multi-select; the action between them is the *Assign Relationship* button.

- **Left pane — Source Systems.** Top toolbar: search + filter + column visibility. Below: a multi-select systems table. Rows that are already selected in the right pane are disabled here (a system cannot be source and target at the same time).
- **Right pane — Target Systems.** Same toolbar layout. Adds a *Relationship Type* dropdown at the right of the toolbar (default starts blank) and the *Assign Relationship* button. Disabled rows are those already selected in the left pane.
- **Selection chips.** Each pane shows its own active-filter chips and a select-all checkbox in the header. The currently chosen relationship type and the source/target selection counts drive whether *Assign Relationship* is enabled.

`[SCREENSHOT PLACEHOLDER: dual-pane layout — left pane Source Systems with three rows selected (checkbox marked), right pane Target Systems with two rows selected, Relationship Type dropdown showing "Is Spare For", Assign Relationship button highlighted]`

## Common workflows

- [Assigning relationships in bulk](./workflows/assigning-relationships-in-bulk.md) — the dual-table flow: pick sources, pick targets, pick a type, assign.
- [Assigning spare parts](./workflows/assigning-spare-parts.md) — the `IS_SPARE_FOR` flow with part-number and system-type validation warnings; the data behind the SP Coverage indicator and the [Spare parts coverage report](#) inside individual systems.
- [Inspecting and removing relationships](./workflows/inspecting-and-removing.md) — view existing spares on either side via the *Spare Parts* / *Spare Part for Systems* modals, and remove a relationship.

For the read-only view of relationships on a single system (in either direction) and the graph view, see *Managing relationships* in the [System Hierarchy](../systemHierarchy/README.md) module.

## Coming soon

- 🔮 **Validation rules per type** — type-specific constraints beyond the current part-number / system-type warning for spares (e.g. *Provides Data To* requires both sides to be control-system tagged).
- 🔮 **Replace relationship in place** — atomic swap to retarget an existing relationship without delete-then-create.
- 🔮 **Audit log view** — see the history of relationship changes for a system or pair.
- 🔮 **Permission Phase 1 / Phase 2** — see [Access & Responsibilities](#access--responsibilities) above and [System Hierarchy](../systemHierarchy/README.md#access--responsibilities).

`[VIDEO PLACEHOLDER: 60s end-to-end — open Systems Relations → filter source table to spares of a given catalogue item → filter target table to primary systems in zone A → select sources and targets → pick Is Spare For → click Assign Relationship → see toast confirm three created, one skipped → open a target row's Spare Parts modal to verify]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The Confluence generator strips it.*
>
> Bulk-create is served by `POST /system/relationships/batch` (`systemRelationshipsBatch`). It accepts `sourceUids[]`, `targetUids[]`, and `relationshipType`, and returns `{ created, skipped, skippedDetails[] }`. Per-pair deletion uses the GraphQL `DeleteSystemRelationship` mutation with `SystemDisconnectInput`. Relationship definitions live in `src/modules/systemHierarchy/types/graph.ts` (`RELATIONSHIP_DEFINITIONS`). Spare-parts modals query `SystemsSpareParts` / `SystemSparePartsFor`.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
