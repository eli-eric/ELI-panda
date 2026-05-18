# Services & Service Types

The Services module is the **catalogue of service kinds** offered or contracted at the facility — calibrations, repairs, installations, audits, training, support packages. Each *Service Type* is a templated specification of a kind of service: it has a name, a description, a linked [Catalogue category](../catalogue/README.md) (which dictates *which property dimensions matter* for this service), and a set of checked-off properties from that category that the service touches.

Service types are *templates*, not individual transactions. A specific service performed against a specific physical item is captured *elsewhere* — today, as a [Service Line](../orders/workflows/adding-service-lines.md) on an order. This module's job is to maintain the vocabulary of services so that order forms, reports, and pickers have a stable set of options to reference.

`[SCREENSHOT PLACEHOLDER: Services list page — top bar with "Manage Services" title and "Add New Service" button on the right (visible for editors), table below with columns Name, Category (linked), Description, Action; each Name cell is a link to the detail page]`

## Access & Responsibilities

**Today's reality:**
- `catalogue-service-view` — read-only access. Browse the service-type list and open any detail page; the form fields and the *Add New Service*, *Delete* affordances are inactive.
- `catalogue-service-edit` — full edit. Create new service types, edit names / categories / descriptions, toggle which properties from the linked category the service covers, delete service types.
- `admin` — same as Editor.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `catalogue-service-view` | Open the list, browse all service types, click into a detail page and inspect its category and selected properties |
| ✏️ **Service Editor / Admin** | `catalogue-service-edit` or `admin` | Everything in Viewer + create a new service type, change its category, edit its description, select / deselect properties from the linked category, delete a service type |

## Key concepts

- **Service Type** — the templated record for a kind of service. Fields: *Service Type Name*, *Catalogue Category*, *Service Type Description*, plus a set of selected *properties* drawn from the linked category.
- **Catalogue Category (link)** — every service type belongs to a category from the [Catalogue](../catalogue/README.md). The category's *property groups* and *properties* become the candidate checkboxes shown on the service-type detail page; the service type opts *into* the subset of properties it cares about. Changing the category resets the property selection.
- **Property selection** — a multi-select of property names (from the category) that the service touches. Stored on the service type as a list of strings.
- **Linked services on a catalogue item** — the [Catalogue item](../catalogue/README.md) detail page can show service types relevant to it (via the category match). Service types do *not* themselves carry a list of physical items they have serviced — that audit data lives in the orders / order-line history.

## Layout

A simple two-surface module: a list page and a detail page.

### List page (`/services`)

- **Top bar.** Page title *Manage Services*. Right-hand *Add New Service* button (gated by `catalogue-service-edit`).
- **Table.** Columns:
  - **Name** — link to the service-type detail page.
  - **Category** — link to the [Catalogue](../catalogue/README.md) filtered to that category.
  - **Description** — truncated free text (first ~100 characters).
  - **Action** — *Delete* on each row (gated by `catalogue-service-edit`).

  Pagination defaults to 100 rows per page.

### Detail page (`/service/<uid>`)

- **Header.** Title *Edit Service* (for existing records) or *New Service* (in create mode), *Save* / *Save & Exit* buttons (gated).
- **Form card.**
  - *Service Type Name* — single text input.
  - *Catalogue Category* — tree combobox over the catalogue category tree. Changing this clears the property selection below.
  - *Service Type Description* — multi-line text area.
- **Properties card.** One section per property group on the chosen category. Each property in the group is a checkbox; ticking it opts the service into covering that property. Grid layout — typically four columns on wide screens.

`[SCREENSHOT PLACEHOLDER: service detail page — top form card with Service Type Name / Catalogue Category combobox / Description filled in, below it a Properties card with two property-group headings (e.g. "Performance", "Dimensions") and checkboxes under each]`

## Common workflows

- [Browsing services](./workflows/browsing-services.md) — list page, opening a detail page, navigating to the linked catalogue category.
- [Creating and editing a service type](./workflows/creating-and-editing-service-types.md) — name, category, description, the property selection that changes with the chosen category.
- [Deleting a service type](./workflows/deleting-service-types.md) — when it is safe, how to confirm it is not referenced.

For where service types are *consumed* — adding a service line to an order — see [Adding service lines](../orders/workflows/adding-service-lines.md) in the [Orders](../orders/README.md) module.

## Coming soon

- 🔮 **Service history on a physical item** — a planned enhancement to surface every service performed against a given physical item (today the link `IS_SERVICED_BY` is not modelled in the application).
- 🔮 **Service request workflow** — a per-item request form that produces a service line on a draft order.
- 🔮 **Per-service-type cost / duration defaults** — pre-fill the order's service-line price and duration when the service type is picked.
- 🔮 **Property inheritance across categories** — today changing the category resets the property selection; inheritance would let categories with shared properties keep the ticks.

`[VIDEO PLACEHOLDER: 50s end-to-end — open Services → see the list → Add New Service → name "Calibration of Vacuum Gauge" → pick category "Vacuum / Gauges" → description → tick three properties → Save → return to list → open the new row to confirm]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The Confluence generator strips it.*
>
> Endpoints: `GET /serviceTypeList` (list, key `serviceTypeList`), `GET /serviceType/<uid>` (detail, key `serviceType`), `POST /serviceType` (create), `PUT /serviceType/<uid>` (update), `DELETE /serviceType/<uid>` (delete). Property checkboxes are sourced from the linked catalogue category via the same hook the [Catalogue item](../catalogue/README.md) form uses (`useGroupDetails`). The list of selected property names is stored as `properties: string[]` on the service-type record.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
