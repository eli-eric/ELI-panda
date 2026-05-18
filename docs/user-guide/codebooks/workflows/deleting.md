# Deleting codebook values

## What this is for

Remove a value from a codebook permanently. Use this only when a value is genuinely retired and you accept that existing records referencing it become *orphaned* — their connection points at a UID that no longer exists, and most display surfaces will render the previous label as best-effort or blank.

In most cases **renaming** is the better answer than deleting. Delete only when the value was a mistake (typo, duplicate) or is so old that any orphaned references are negligible.

## Who can do this

🛡️ **Admin** (page-level), or holder of the codebook's module-scoped edit role (server-side `roleEdit`). See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You can see the codebook in the sidebar (see [Browsing codebooks](./browsing.md)).
- You have confirmed there is *no good rename* that would consolidate the value into another. Renaming preserves UID and is non-destructive — see [Adding and renaming codebook values](./adding-and-renaming.md).
- You have audited downstream usage of the value (filter the [Systems Overview](../../systems/README.md), [Orders](../../orders/README.md), [Catalogue](../../catalogue/README.md), or [Room Cards](../../roomCards/README.md) by the value to gauge impact).

## Steps

1. **Open the codebook** from the sidebar.

2. **Find the row** to delete using the *Search values…* field or by paging through the list.

3. **Open the row's *Actions* menu** on the right side of the row.

4. **Click *Delete***. A confirmation modal asks you to confirm. *No row is mass-deleted; one row at a time.*

   `[SCREENSHOT PLACEHOLDER: values table row showing the Actions menu open with a single Delete entry highlighted, the confirmation modal appearing in front of the table]`

5. **Confirm in the modal.** Toast progression:
   - *Deleting value…*
   - *Value deleted* — success; the row disappears.
   - *Failed to delete value* — server-side block (often because the value is referenced by records the server refuses to orphan).

6. **Verify** that the value is gone from the codebook. The picker dropdown elsewhere in the app will no longer offer it on next open. Records that previously referenced the value continue to exist but now point at a missing UID.

`[VIDEO PLACEHOLDER: 30s — open Codebooks → pick a codebook → search for a stale value → open Actions menu → Delete → confirm → see the row gone → open the dependent module's picker to confirm the value is no longer available]`

## What gets created / changed

**✅ Affected:**
- The codebook value record is removed from the database.
- Pickers and filter dropdowns elsewhere in the app no longer offer the value.

**❌ Not affected:**
- Existing records that referenced the value. They retain the UID link but display the value as blank / stored-name fallback / missing.
- Other values in the codebook. Deletion is per-row.

## Limitations

- **No undo.** Deletion is final from the UI. To restore, recreate the value — but you get a **new UID**, so past records pointing at the old UID stay orphaned.
- **No "where used" view in the codebooks page.** PANDA does not show you upfront how many records reference the value. Audit through the consuming modules' filter sheets before confirming the delete.
- **Server-side may reject the delete.** Some codebooks enforce referential integrity (e.g. a system type still assigned to systems may be blocked). The *Failed to delete value* toast is the only feedback channel today.
- **No soft-delete / retire today.** A planned enhancement will let you hide a value from pickers without removing it; until then, delete is the only retirement mechanism.

## Tips & gotchas

- **Prefer rename over delete.** Renaming preserves UID and updates the label everywhere. Use this when consolidating two near-duplicate values (rename one, delete the other only after no more records reference it).
- **Audit usage first.** Filter the relevant module (e.g. [Systems Overview](../../systems/README.md) by *System type*, [Orders](../../orders/README.md) by *Supplier*) to see how many records would be affected. If the number is non-trivial, consider renaming or waiting for soft-delete.
- **Recreating with the same name is *not* the same value.** A recreated value gets a fresh UID. Past records that referenced the old UID stay orphaned.
- **Codebooks managed by their own module deserve their own delete affordance.** Delete a system type via [System Type Edit](../../systemTypeEdit/README.md), a catalogue category via [Managing categories](../../catalogue/workflows/managing-categories.md). Those modules sometimes provide blocker hints (e.g. "category not empty") that this generic page does not.
- **The sidebar entry does not disappear after deletion.** You are deleting a *value* inside the codebook, not the codebook itself. The codebook type remains; the sidebar shows it as long as there is at least the empty state to surface.

## Related

- [Browsing codebooks](./browsing.md)
- [Adding and renaming codebook values](./adding-and-renaming.md)
- System Type deletion → see [System Type Edit](../../systemTypeEdit/README.md).
- Catalogue category deletion → see [Managing categories](../../catalogue/workflows/managing-categories.md) in the [Catalogue](../../catalogue/README.md).
