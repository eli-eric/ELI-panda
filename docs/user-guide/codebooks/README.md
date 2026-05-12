# Codebooks

The Codebooks module is the **central registry of controlled vocabularies** — every dropdown, picker, and filter across PANDA that needs a finite, named set of values reads from here. *Suppliers*, *Manufacturers*, *Locations*, *Item Usage*, *Item Condition*, *System Importance*, *Operational State*, *Contact Person Role*, *Zone*, *Sub Zone*, *Order Status*, *Procurement Status*, *Country*, *Language*, *Department*, *Catalogue Category*, *Catalogue Property Type*, *Publication Category*, *Grant*, *Media Type*, and many more — each is a codebook. Keeping them clean keeps every form in the app coherent.

Use this module to add a new value to an existing codebook (a new supplier, a new department), rename an existing value, fix a typo, or remove a value that is no longer used. Codebooks are administrative — they are not transactional records. Mutations here change the vocabulary the rest of the app uses; *they do not change* the records that already reference those values (those keep their connection by UID).

`[SCREENSHOT PLACEHOLDER: Codebooks page — 280 px sidebar on the left with a searchable list of codebook codes (SYSTEM_TYPE, ITEM_USAGE, LOCATION, …), main detail area on the right showing the selected codebook's title, "Manage codebook values" subtitle, search bar, Add value button, and a data table of values]`

## Access & Responsibilities

**Today's reality:**
- The page route `/codebooks` is **gated by the `admin` role**. Users without `admin` cannot navigate to it; the sidebar entry is hidden.
- Server-side, individual codebooks may additionally carry an `editRole` setting (e.g. `catalogue-edit` for catalogue categories) so values inside that codebook are governed by the relevant module role rather than `admin` alone. The page exposes only the codebooks where the user has effective edit rights.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 🛡️ **Admin** | `admin` | Open the module, see every codebook, browse and edit values: add, rename, change the code, delete |
| ✏️ **Domain Editor** | Module-specific edit role (e.g. `catalogue-edit`, `orders-edit`) | May see the page entry if their effective edit role covers at least one codebook; can edit values of codebooks scoped to their role only |
| 👁️ **Viewer** | Any non-admin role | Does not see the *Codebooks* sidebar entry. Codebook *consumption* (picker values, filter dropdowns elsewhere in the app) is read-only and available everywhere |

> 🔮 **Coming soon — granular codebook roles** — a planned enhancement will introduce a dedicated `codebooks-admin` role that grants edit on codebooks without requiring full `admin`. Today, the role exists in the registry but the page route still requires `admin`.

## Key concepts

- **Codebook** — a named registry of values for one concept (e.g. *Supplier*, *Location*, *Department*). Identified by a short upper-case code (`SUPPLIER`, `LOCATION`, `DEPARTMENT`).
- **Codebook value** — an entry inside a codebook. Has a `name` (required, the user-facing label), an optional `code` (short identifier used for keys and downstream code generation), a system-generated `uid`, and (depending on the codebook) optional `additionalData` and `systemLevel` fields.
- **Editable codebooks** — the subset of codebooks the current user has rights to edit. The sidebar lists only these; codebooks the user cannot edit are not shown.
- **Inline edit** — name and code can be edited in place in the table by clicking the cell. Confirm with the checkmark or *Enter*, cancel with the X or *Escape*.
- **UID** — the system-generated identifier on each codebook value. The UID is the **link** from records elsewhere in the app to the codebook value. Renaming a value keeps the UID stable, so the connection is preserved.

### Codebooks managed here

The following codebooks are surfaced (subject to your effective edit rights). Each manages the dropdown values across the app where the corresponding picker appears.

| Codebook code | Used in | Notes |
|---|---|---|
| `SYSTEM_TYPE` | [System Type Edit](../systemTypeEdit/README.md) | Managed in its dedicated module — listed here for reference, edits go through *System Type Edit*. |
| `SYSTEM_IMPORTANCE` | System detail | Importance values for a system. |
| `SYSTEM_CRITICALITY_CLASS` | System detail | Criticality classification. |
| `SYSTEM_ATTRIBUTE` | System detail, Service Types | Attribute family per system / service. |
| `SYSTEM_LEVEL` | System hierarchy | `SYSTEM_DOMAIN` … `TRASH`. Read-only in practice. |
| `LOCATION` | System detail, [Room Cards](../roomCards/README.md), Orders | Physical location codebook. |
| `ZONE` / `SUB_ZONE` | System detail | Control-system zones; sub-zones depend on parent zone. |
| `TEAM` | System detail, [Room Cards](../roomCards/README.md) | Teams the facility groups people by. |
| `EMPLOYEE` | Almost everywhere | The employee codebook. |
| `USER`, `DEPARTMENT` | Profile, employees | User and department admin. |
| `SUPPLIER`, `MANUFACTURER` | [Catalogue](../catalogue/README.md), [Orders](../orders/README.md) | Procurement codebooks. |
| `UNIT`, `CATALOGUE_PROPERTY_TYPE`, `CATALOGUE_CATEGORY` | [Catalogue](../catalogue/README.md) | Catalogue property metadata and category tree. |
| `ITEM_USAGE`, `ITEM_CONDITION_STATUS` | Physical items, orders | Usage and condition codebooks. |
| `ORDER_STATUS`, `PROCUREMENT_STATUS` | [Orders](../orders/README.md) | Order lifecycle. |
| `OPERATIONAL_STATE` | [Room Cards](../roomCards/README.md) | The six OS states (governance audit lives elsewhere). |
| `CONTACT_PERSON_ROLE` | [Room Cards](../roomCards/README.md) | Roles for hall contacts. |
| `LANGUAGE`, `COUNTRY` | Profile, publications | Reference data. |
| `PUBLICATION_CATEGORY`, `PUBLICATION_SUPPORT`, `OPEN_ACCESS_TYPE`, `MEDIA_TYPE`, `PUBLISH_FORMAT`, `CONFERENCE_SCOPE` | Publications | Publication metadata. |
| `USER_CALL`, `USER_EXPERIMENT`, `GRANT`, `GRANT_GROUP`, `EXPERIMENTAL_SYSTEM` | Research / publications | Research-program codebooks. |
| `SYSTEM` | Internal | Reference list of systems; managed via [System Hierarchy](../systemHierarchy/README.md). |
| `PROCUREMENTER` | Orders | Procurement officers. |

The full enumeration lives in `src/types/constants/codebook.ts`.

## Layout

A two-pane layout: sidebar of codebook codes on the left, editor on the right.

- **Sidebar (280 px, left).** Title with a *Search codebook…* placeholder. Below: list of editable codebook codes (e.g. `SUPPLIER`, `LOCATION`). Click a code to select it; the right pane loads.
- **Main pane — empty state.** Before a selection: a placeholder card titled *Select a codebook* with the description *Select a codebook from the list on the left to view and edit values.*
- **Main pane — codebook detail.** After a selection:
  - Header with the codebook code (e.g. `LOCATION`) and an info-tooltip icon explaining the inline-edit gesture.
  - Subtitle *Manage codebook values*.
  - A search field (*Search values…*) that filters by name, code, or UID.
  - *Add value* button on the right.
  - Data table with columns: **Name** (editable), **Code** (editable), **UID** (read-only, monospace), **Actions** (delete affordance). 10 rows per page; pagination beneath.
  - Empty states: *Codebook is empty* (no values yet) or *No values match the search* (with an active query).

`[SCREENSHOT PLACEHOLDER: codebook detail in the main pane — LOCATION codebook selected, search field with a partial query, Add value button on the right, table showing five rows with Name / Code / UID / Actions, one row mid-edit on the Name cell with a checkmark and X confirm/cancel buttons]`

## Common workflows

- [Browsing codebooks](./workflows/browsing.md) — picking a codebook from the sidebar, searching values inside it.
- [Adding and renaming codebook values](./workflows/adding-and-renaming.md) — the *Add value* modal and the inline-edit gesture for name and code.
- [Deleting codebook values](./workflows/deleting.md) — the per-row delete, what it means for downstream records, when to retire instead.

For codebooks managed by their own module (System Type Edit, Catalogue Categories), follow the dedicated workflows in those modules.

## Coming soon

- 🔮 **Granular codebook role.** A `codebooks-admin` role is registered in the role list; the page route is currently gated by full `admin`. The granular role will let codebook stewards work without facility-wide admin.
- 🔮 **Soft-delete / retire.** Today delete is hard; values referenced from existing records become orphan labels on those records. A *retire* state will hide a value from pickers without removing it.
- 🔮 **Bulk import.** CSV-driven add for large codebooks (suppliers, manufacturers).
- 🔮 **Audit log.** Per-value history of name / code changes with timestamp and user.
- 🔮 **Reordering / sorting per codebook.** Today values render in server-side order; some pickers would benefit from a custom sort.

`[VIDEO PLACEHOLDER: 50s end-to-end — open Codebooks → search for LOCATION in the sidebar → select it → search values → click Add value → name a new location → Save → inline-edit an existing row's name and code → delete a stale row with the action menu]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The Confluence generator strips it.*
>
> Endpoints: `GET /codebooks?editable=true` (sidebar list, key `codebooks`), `GET /codebook/<TYPE>` (values, key `codebook`), `POST /codebook/<TYPE>` (create, body `{ name }`), `PUT /codebook/<TYPE>/<uid>` (update, body `{ uid, name, code? }`), `DELETE /codebook/<TYPE>/<uid>`. Enum of types in `src/types/constants/codebook.ts`. Value shape (`CodebookType`): `{ uid, name, code?, additionalData?, systemLevel? }`. Edit role is read from `metadata.roleEdit` on the codebook response and overrides the page-level `admin` gate where present.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
