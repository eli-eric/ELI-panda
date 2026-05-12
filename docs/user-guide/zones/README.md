# Zones

The Zones module is the **registry of control-system zones** used as a categorisation dimension across PANDA. A zone is a named region of the facility (or a logical control area) with a short *code* and optional *notes*. Zones can have *subzones* — children of another zone — forming a shallow parent / subzone tree. Zones drive system code generation (the `{ZC}` token in the [code mask](../systemTypeEdit/workflows/code-mask.md) is the zone's code), appear as a filter on the [Systems Overview](../systems/README.md), tie systems to [Room Cards](../roomCards/README.md), and gate [Control Systems](../controlSystems/README.md) batch creation.

Use this module to add a new zone (when an experimental hall or new wing comes online), maintain notes about a zone's scope or constraints, manage the parent/subzone relationships, or import a batch of zones from CSV.

`[SCREENSHOT PLACEHOLDER: Zones page — top toolbar with Add Zone and Import CSV buttons on the left, column visibility dropdown on the right; table beneath with columns Name, Code, Parent Zone, Notes; one row with a subzone whose Parent Zone column shows the parent name]`

## Access & Responsibilities

**Today's reality:**
- `zones-view` — read-only access to the Zones page. Browse the list, search, sort, inspect notes; the *Add Zone*, *Import CSV*, and per-row *Edit* / *Delete* affordances are hidden.
- `zones-edit` — full edit. Add new zones, edit names / codes / notes / parent zone, delete zones, import a CSV.
- `admin` — same as Editor.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `zones-view` | Open the Zones page, search and sort, read notes (with URL auto-linkification), inspect parent/subzone relationships |
| ✏️ **Zone Editor / Admin** | `zones-edit` or `admin` | Everything in Viewer + create / rename / delete zones, set or change the parent zone, import a CSV file, manage notes |

> 🔮 **Coming soon — zone-scoped permissions** — a planned enhancement will pair `zones-edit` with the zone(s) a user is responsible for, so a sub-area lead only manages their own zones.

## Key concepts

- **Zone** — the registered region. Has *Name*, *Code*, optional *Notes*, and an optional *Parent Zone*.
- **Code** — the short identifier substituted into the *System Type* mask as `{ZC}` when a system code is generated. Pick short, stable codes — see [Understanding the code mask](../systemTypeEdit/workflows/code-mask.md).
- **Notes** — free-text annotation surfaced in the list with URL auto-linkification. Use it for scope notes, contact links, SOP references.
- **Parent Zone** — optional link to a parent zone. When set, the zone is treated as a **subzone** of the parent; the `HAS_SUBZONE` relationship is what drives it.
- **Root zone** — a zone with **no** parent. Only root zones are eligible as targets in the [Control Systems](../controlSystems/README.md) batch creation page, and only root zones can themselves be picked as a parent zone (preventing arbitrary nesting depth in practice).
- **Subzone** — a zone whose *Parent Zone* points at another zone. Rendered alongside root zones in the same table; the *Parent Zone* column distinguishes them.

## Layout

A single-pane explorer with a thin toolbar.

- **Top bar.** *Add Zone* (gated by `zones-edit`), *Import CSV* (gated by `zones-edit`, opens a file picker), column visibility dropdown on the right.
- **Search field** narrows the list by name and code (partial match).
- **Table.** Columns:
  - **Name** — the zone's display label.
  - **Code** — the short identifier used in code generation.
  - **Parent Zone** — name of the parent if this is a subzone; em dash if root.
  - **Notes** — truncated with a tooltip on hover; URLs auto-link.
  - **Actions** — per-row dropdown (*Edit*, *Delete*), visible only with `zones-edit`.

Form interactions happen in a **sheet-based modal** (the *Add Zone* / *Edit Zone* sheet opens over the page; closing returns to the table with state preserved).

## Common workflows

- [Browsing zones](./workflows/browsing.md) — search, parent/subzone identification, notes view.
- [Creating and editing zones](./workflows/creating-and-editing.md) — name, code, notes, parent zone, validation.
- [Importing zones from CSV](./workflows/importing-csv.md) — CSV format, result toast (created / skipped / errors), recovery.
- [Deleting zones](./workflows/deleting.md) — what gets removed, when delete is blocked, impact on downstream modules.

For where zones are *consumed* — see *Editing system details* in the [System Hierarchy](../systemHierarchy/README.md), *Searching and filtering* in the [Systems Overview](../systems/README.md), the [Control Systems](../controlSystems/README.md) batch creation page, and the [Room Cards](../roomCards/README.md) location links.

## Coming soon

- 🔮 **Zone-scoped edit permission** — restrict `zones-edit` by the zones a user owns.
- 🔮 **Bulk delete** of zones from the table.
- 🔮 **Multi-level subzone nesting** — today parent-zone pickers filter to root zones only, capping depth at 2 (root → subzone). Planned: configurable depth.
- 🔮 **CSV export** to round-trip with the import.
- 🔮 **Map view** — surface zones on a facility map for visual selection.
- 🔮 **Notes Markdown support** — today notes render as plain text with URL linkification; Markdown rendering is planned.

`[VIDEO PLACEHOLDER: 50s end-to-end — open Zones → Add Zone → name + code + notes → Save → see new row → Edit a different row → assign Parent Zone to make it a subzone → Save → Import CSV with three new zones → see toast "created 3, skipped 0" → delete a stale zone]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The Confluence generator strips it.*
>
> Endpoints: `GET /zones` (list, key `zones`), `GET /zone?uid=<uid>` (detail, key `zone`), `POST /zone` (create), `PUT /zone?uid=<uid>` (update), `DELETE /zone?uid=<uid>`, `POST /zones/import` (multipart CSV). GraphQL type: `Zone { uid, name, code, notes, parentZone, hasSubzoneZones[], zonesHasSubzone[] }` with `HAS_SUBZONE` relationship in both directions. Parent-zone picker on the form filters to root zones only (`parentZone == null`). Import result: `{ created: number, skipped: number, errors: string[] }`.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
