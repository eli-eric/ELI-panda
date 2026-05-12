# Deleting a service type

## What this is for

Remove a service type from the catalogue when it is genuinely no longer offered or contracted, and you want it gone from the *Service Type* picker on every order's service-line wizard. Deletion is irreversible from the UI; service lines on *past* orders that referenced the deleted service type continue to exist but their reference becomes orphaned (the dropdown label disappears).

In most cases, **editing** is the better answer than deleting — see [Creating and editing a service type](./creating-and-editing-service-types.md). Delete only when consolidation, rename, or rescope is impossible.

## Who can do this

✏️ **Service Editor / Admin** — requires the `catalogue-service-edit` role.

Viewers see the *Delete* affordance disabled.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `catalogue-service-edit`.
- You have confirmed the service type is not heavily referenced on existing orders. There is no in-app "where used" view for service types today — use the [Orders](../../orders/README.md) list filtered by *Procurement Responsible* / *Order Date* to spot-check historical use if uncertain.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

1. **Open the Services list** at `/services`. Locate the row for the service type to delete.

2. **Click the *Delete* affordance in the row's Action column.** A confirmation modal opens.

   `[SCREENSHOT PLACEHOLDER: Services list row with the Delete button in the Action column highlighted, the confirmation modal in front asking to confirm the deletion of the named service type]`

3. **Confirm in the modal.** The request is sent to the server. A toast confirms success or surfaces an error.

4. **Verify in the picker.** Open any order's service-line wizard — the deleted service type is no longer in the *Service Type* dropdown.

`[VIDEO PLACEHOLDER: 20s — open Services → click Delete on a row → confirm modal → toast confirms → reload list and see the row gone → open an order → Add Service Line → confirm the service type is no longer in the picker]`

## What gets created / changed

**✅ Affected:**
- The service-type record is removed from the database.
- The service-type picker on every order's service-line wizard no longer offers it.

**❌ Not affected:**
- **Existing service lines on past orders** that referenced this service type. They remain on the orders with their *Service Type* reference now orphaned — the label may render as blank or as the stored name fallback depending on which surface displays it. The cost, notes, and *Delivered* state on the past lines are preserved.
- The linked catalogue category and the catalogue items inside it.
- Any other service type sharing the same category.

## Limitations

- **No "where used" check.** The UI does not stop you from deleting a service type that is heavily referenced on past orders. Use [Browsing and filtering orders](../../orders/workflows/browsing-and-filtering.md) to scan historical use before deleting if you are unsure.
- **No undo.** Deletion is final from the UI. Recreate the service type manually if you delete the wrong one — past lines will not re-link automatically; they will need to be updated one by one.
- **No archive / deprecate state today.** A planned enhancement will let you mark a service type as deprecated so it disappears from new pickers but remains a valid reference for history. Until then, delete is the only "retirement" mechanism.

## Tips & gotchas

- **Prefer editing.** Renaming and re-scoping is almost always cheaper than deleting and recreating. The service-type UID is what every past service line points at — keep it stable.
- **Audit past usage before deleting.** Open the [Orders](../../orders/README.md) list and skim recent service lines. If the service type appears on several closed orders, the orphaned references will surface in audits later — be sure that is acceptable.
- **Recreate with the same name is *not* the same service type.** A new service type has a new UID. Past service lines that pointed at the old UID stay orphaned even if you recreate a service type with an identical name.
- **No bulk delete.** Service types are deleted one at a time. There is no multi-select.
- **Use the description on adjacent services.** When consolidating two service types into one, document the consolidation in the surviving service type's description so future editors know what happened.

## Related

- [Browsing services](./browsing-services.md)
- [Creating and editing a service type](./creating-and-editing-service-types.md)
- Auditing past usage → see [Browsing and filtering orders](../../orders/workflows/browsing-and-filtering.md) in the [Orders](../../orders/README.md) module.
