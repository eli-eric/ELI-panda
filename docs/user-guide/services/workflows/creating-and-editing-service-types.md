# Creating and editing a service type

## What this is for

Add or amend a service-type template — the named, reusable definition of *a kind of service* that the facility offers, contracts, or performs. A service type is what users pick in the *Service Type* field on a [Service Line](../../orders/workflows/adding-service-lines.md) of an order; it is also the place where the *which properties does this service touch* selection is recorded.

Create a new service type when a previously-undefined kind of service starts being procured (and you want it to show up consistently in pickers and reports). Edit an existing one when its scope changes — typically when more / fewer properties of the linked catalogue category are now within the service's remit.

## Who can do this

✏️ **Service Editor / Admin** — requires the `catalogue-service-edit` role.

Viewers can open the detail page but the form fields are disabled and *Save* is hidden.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- The catalogue category you will link the service to already exists. If not, create it first in the [Catalogue](../../catalogue/README.md) → [Managing categories](../../catalogue/workflows/managing-categories.md).
- You have a clear idea of which properties of that category the service touches (calibrating an instrument typically touches *Performance* properties; an installation service touches *Dimensions* and *Connections*).

## Steps

### Create a new service type

1. **Click *Add New Service*** in the Services list page top bar. The detail page opens in create mode with the title *New Service*.

   `[SCREENSHOT PLACEHOLDER: blank service-type detail page in create mode — form card with empty Name, empty Catalogue Category combobox, empty Description; Properties card below shows the empty-state hint "Select a catalogue category to see properties"]`

2. **Fill the *Service Type Name***. Pick a name that reads well in pickers (it appears in the *Service Type* field of every order's service-line wizard) — *"Calibration of vacuum gauge"* is better than *"Calibration"*.

3. **Pick the *Catalogue Category***. The combobox browses the catalogue category tree. The selection drives which properties are offered below; expect the Properties card to repopulate when you change the selection.

4. **Fill the *Service Type Description***. Optional; useful for clarifying scope (what is included, what is not). The full text appears on the detail page; the list truncates after ~100 characters.

5. **Tick the properties** the service covers. The Properties card renders one section per property group on the linked category; each property is a checkbox. Multi-select.

   `[SCREENSHOT PLACEHOLDER: detail page with Service Type Name filled, a Catalogue Category selected, Description filled, and the Properties card showing two groups "Performance" / "Dimensions" each with four checkboxes — three ticks total across the two groups]`

6. **Click *Save*** or *Save & Exit*. *Save* persists and stays on the detail page; *Save & Exit* returns to the list. A toast confirms — *Service type saved* (or an error toast on failure).

### Edit an existing service type

1. **Open the service type** from the list — click the *Name* link.

2. **Adjust any field** in the form card or the Properties card.

3. **Save.** Same as creation. The change propagates immediately to every order's service-line wizard.

### Changing the linked category

Be aware: changing the *Catalogue Category* **resets** the property selection. The Properties card rebuilds for the new category, and the old ticks are not migrated (the previous category's properties are not in the new category, so they cannot be carried over).

If the category needs to change *and* you want to preserve coverage, plan the new property selection before saving. You can leave the form open with the new category picked and tick the equivalent properties before clicking *Save*.

`[VIDEO PLACEHOLDER: 50s — Add New Service → name "Annual maintenance contract" → pick category → fill description → tick a handful of properties across two groups → Save → return to list → reopen → change the category to a different one → see Properties card rebuild → tick equivalents → Save]`

## What gets created / changed

**✅ Affected:**
- The service-type record (name, linked category, description, list of selected property names).
- The available options in the *Service Type* picker on every order's service-line wizard.

**❌ Not affected:**
- Existing service lines on orders that reference this service type. They remain bound by UID; renaming the service type updates the label they display, but the link is stable. Re-categorising the service type does not retroactively rewrite anything on past orders.
- The linked catalogue category itself. The service only *reads* the category's property groups — it does not modify them.
- Catalogue items in the category. Adding or removing service types has no effect on them.

## Limitations

- **One category per service type.** A service is tied to a single category; cross-category services have to be split into multiple service-type entries.
- **Property selection is per-category.** Switching the category clears the ticks. No inheritance between sibling categories.
- **No cost / duration defaults today.** The service type does not carry a default price; the order's service-line wizard captures price per line.
- **No image / file attachments.** Service types are textual records only.

## Tips & gotchas

- **Name carefully.** The name is the only identifier users see in pickers — it should be unambiguous at a glance.
- **Match the category to the catalogue items being serviced.** Pick the category whose property dimensions describe what the service touches. If multiple categories are plausible, pick the *most specific* one whose property groups read like a checklist for the service.
- **Keep the property selection meaningful.** Ticking *every* property because "the service might touch any of them" defeats the purpose. Tick what the service *actually* covers; leave the rest off.
- **Edit instead of recreate.** A service type's UID is referenced by past service lines on orders; renaming and reconfiguring is preferable to delete-and-recreate (which would orphan historical references).
- **Use the description for scope boundaries.** What is *not* covered is often more useful than what is — write the description with future ordering staff in mind.

## Related

- [Browsing services](./browsing-services.md)
- [Deleting a service type](./deleting-service-types.md)
- Using the service type on an order → see [Adding service lines](../../orders/workflows/adding-service-lines.md) in the [Orders](../../orders/README.md) module.
- Catalogue categories and properties → see the [Catalogue](../../catalogue/README.md) module.
