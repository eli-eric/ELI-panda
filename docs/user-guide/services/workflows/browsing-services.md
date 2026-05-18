# Browsing services

## What this is for

Find a service type — to look up what services exist as templates, to verify a service name before referencing it on an order, to inspect which catalogue category and properties it covers, or simply to maintain the list. The Services list page is small and unstructured by design (no tree, no filter sheet) because the population is intentionally small; every service type is one row.

## Who can do this

👁️ All personas — list browsing and detail-page viewing are available with `catalogue-service-view`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Services** page (sidebar entry under the *Catalogue* / admin section).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

The list is a simple paginated table. The two interesting links per row are the service *Name* (opens the detail page) and the *Category* (opens the [Catalogue](../../catalogue/README.md) filtered to that category).

1. **Scan the list** for the service type you need. The default pagination is 100 rows per page — typically every service type is on a single page.

   `[SCREENSHOT PLACEHOLDER: Services list with a handful of rows visible — columns Name (linked), Category (linked), Description (truncated), Action; mouse hovering over a Name cell showing the underline]`

2. **Click the *Name*** to open the service-type detail page (`/service/<uid>`). The form opens with the existing record loaded; viewers see all fields disabled and *Save* hidden.

3. **Click the *Category*** to navigate to the [Catalogue](../../catalogue/README.md) filtered to that category. Useful for quickly checking which catalogue items the service relates to.

4. **Inspect the detail page.** The detail page shows the *Service Type Name*, the linked *Catalogue Category*, the *Description*, and the selected property checkboxes under each property group. Viewers see the same information as editors — the only difference is the form's editability and the absence of *Save*.

5. **Return to the list** with the browser back button or the sidebar.

`[VIDEO PLACEHOLDER: 25s — open Services → scan the list → click a Name to open the detail → read the description and checked properties → click the Category breadcrumb to jump to the Catalogue → return]`

## Tips & gotchas

- **The list is intentionally short.** Service types are templates, not transactions. If the list is growing past ~50 entries, consider whether some service types are too narrow and could be consolidated.
- **Description is truncated in the list.** The full text is only visible on the detail page.
- **No filters or search on this page today.** With the small population it is not needed; if the list ever grows, search will be added.
- **Linked Category jumps to Catalogue.** This is the fastest way to see *what items* a service type's category covers — useful when planning a service-line price on an order.
- **The list does not show selected properties.** To see which properties of a category a service type covers, open the detail page.

## Related

- [Creating and editing a service type](./creating-and-editing-service-types.md)
- [Deleting a service type](./deleting-service-types.md)
- Using a service type on an order → see [Adding service lines](../../orders/workflows/adding-service-lines.md) in the [Orders](../../orders/README.md) module.
- Catalogue categories and items → see the [Catalogue](../../catalogue/README.md) module.
