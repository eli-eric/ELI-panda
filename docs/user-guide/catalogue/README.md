# Catalogue

The Catalogue module is the master list of *product specs* used at the facility — every piece of hardware that can be ordered, stocked, or installed exists here as a catalogue item. It is the abstract layer above the physical items installed in the System Hierarchy: a catalogue entry describes *what a thing is*; a physical item is *this specific one we own*. Procurement, spare-parts planning, and system-item assignment all reach back into the catalogue.

`[SCREENSHOT PLACEHOLDER: catalogue landing screen — left category tree expanded to a leaf category, main panel showing item table with thumbnails, breadcrumbs above table, top action bar with Add / Refresh / Statistics / Filters buttons]`

## Access & Responsibilities

**Today's reality:**
- `catalogue-view` — read-only. Browse, search, filter, open item detail, view related items, view linked orders.
- `catalogue-edit` — full edit on every catalogue item *and* every category. Create items, edit attributes, manage property groups, upload images and files, link related items, add and edit categories.
- `catalogue-category-edit` — defined in the role registry as a future split for category-only admin, but not currently enforced; `catalogue-edit` is the working edit gate today.
- `admin` — all of the above.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `catalogue-view` | Browse the category tree, search and filter, open any catalogue item, view its properties, images, files, related items, and linked orders |
| ✏️ **Editor / Admin** | `catalogue-edit` or `admin` | Everything in Viewer + create items, edit any field on any item, manage categories and their property groups, upload and delete images and files, link/unlink related catalogue items |

> 🔮 **Coming soon — category-only admin split** — the `catalogue-category-edit` role will gate category creation, property-group / property management, and category deletion separately from item editing. Today both live behind `catalogue-edit`.

## Key concepts

- **Catalogue item** — the abstract product spec. Has a name, part number, category, supplier, manufacturer URL, description, images, files, property values, related items, and a list of orders that referenced it.
- **Part number** — the unique catalogue identifier for the item. Required, validated for uniqueness on save.
- **Category** — node in the catalogue category tree. Drives which property groups (and therefore which property fields) appear on an item in that category. A category may have a parent category; the tree is browsed in the left sidebar.
- **Property group** — a labeled bucket of properties on a category (e.g. *Electrical*, *Dimensions*). Items inherit the property groups of their category.
- **Property** — a single typed field on a category (name, type, unit, default value). Each catalogue item stores one value per property defined on its category.
- **Related catalogue item** — a directed link between two catalogue items, used to surface companion or compatible products on the detail page. Bi-directional: an item shows both items it references and items that reference it.
- **Linked order** — an order line that referenced this catalogue item. Read-only here — managed in the [Orders](../README.md) module.
- **Physical item** — the concrete instance in a system. Counted per facility in the Statistics block on a catalogue item. Managed in the [System Hierarchy](../systemHierarchy/README.md) module.
- **Supplier** — the supplier codebook record assigned to the item (codebook managed in the [Codebooks](../README.md) module).

## Layout

The module is a two-pane explorer with a fixed top action bar.

- **Top bar — actions and filters.** Left: *Add Item*, *Refresh*, *Statistics*, *Filters* sheet trigger. Right: column visibility dropdown. A second row shows active filter chips and the selected-category chip, each with its own clear button.
- **Left — Category tree.** Collapsible sidebar with the full category hierarchy. Each entry shows the category name; hovering surfaces *Edit*, *Delete*, *Copy*, and *Add Subcategory* affordances for editors. Selecting a category filters the main table to its items and updates the breadcrumb.
- **Main — Catalogue items table.** Breadcrumb path above the table (*Home* → ancestor → current category) with an *Add Category* button trailing the breadcrumb. Table columns include a thumbnail, *Name*, *Description*, *Category name*, *Supplier*, *Part Number*, *Updated time*, and *Updated by*. 50 rows per page; URL-backed pagination, sort, and filters.

On the item **detail page** the layout changes to:

- **Header.** Item name, *Save* and *Save & Exit* buttons (visible only with `catalogue-edit`).
- **Left column.** Image gallery — drag-and-drop upload, thumbnail strip, click to enlarge, primary image marker.
- **Right columns (form).** Base attributes (*Catalogue Name*, *Part Number*, *Category*, *Supplier*, *Supplier/Manufacturer Url* with external-link button), *Description*, then one card per *Property Group* with the properties of that group rendered as fields. Below the form: *Related Items* table, *Orders* table, *Statistics* block (counts of physical items per facility), and *Files* manager.

## Common workflows

- [Browsing and searching the catalogue](./workflows/browsing-and-searching.md) — category tree navigation, breadcrumbs, text search, dynamic property-based filters.
- [Creating and editing a catalogue item](./workflows/creating-and-editing-items.md) — base attributes, category-driven property values, save flow, uniqueness validation, conflict detection.
- [Managing categories and properties](./workflows/managing-categories.md) — add / edit / copy / delete categories, manage property groups and properties.
- [Attaching images and files](./workflows/attaching-images-and-files.md) — upload, delete, mark primary; file links with tags.
- [Managing related catalogue items](./workflows/managing-related-items.md) — link companion items, view inbound and outbound references, disconnect a relation.

For the physical instances of a catalogue item see the [System Hierarchy](../systemHierarchy/README.md) module — physical items are assigned to systems there. For procurement see the [Orders](../README.md) module.

## Coming soon

- 🔮 **Category-only admin role** — separate `catalogue-category-edit` gate for category management, leaving `catalogue-edit` for item-level edits.
- 🔮 **Property type validation** — typed validation (number, enum, boolean) on property values; today values are stored as strings.
- 🔮 **List-of-values picker for ENUM properties** — guided picker UI for properties that have a defined value list.
- 🔮 **Category property inheritance** — subcategories will inherit property groups from their parent.
- 🔮 **Multi-property filter expressions** — combining several property filters with AND / OR; today filters AND together by default.
- 🔮 **Bulk import / export** — CSV-driven item creation and update.

`[VIDEO PLACEHOLDER: 60s end-to-end walkthrough — open the Catalogue, drill into a category in the tree, open an item, scroll through property groups, images, related items, and the orders table, finish on the Statistics block]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The Confluence generator strips it.*
>
> Authoritative entity definitions live in `src/server/apollo/schema.graphql`. Look up `CatalogueItem`, `CatalogueCategory`, `CataloguePropertyGroup`, `CatalogueProperty`, `CatalogueItemDetailProperty`, and `Supplier` for full field shapes; the *related items* link is bi-directional (`relatedCatalogueItems` + `relatedCatalogueItemsFor`). The repo is open-source on GitHub.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
