# Assigning and revoking roles

## What this is for

Grant or revoke the per-module permissions that let a user do anything beyond the default read-only baseline. Every editor / admin role in PANDA is defined as a string code in `src/types/constants/roles.ts`; the user's *Roles* card on their detail page is the multi-select that links them to the role records. Tick to grant, untick to revoke, save.

## Who can do this

🛡️ **Admin** — requires the `admin` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `admin`.
- The user record already exists. See [Creating a new user](./creating-users.md).
- You know which permissions the user actually needs. The default safe-baseline (`BASICS`, `*-view`) is enough for read-only work; add editor / admin roles only when the user's responsibility requires it.

## Steps

1. **Open the user** from the Users list. The detail page shows two cards: *User form* at the top and *Roles* below.

2. **Scroll to the *Roles* card.** It renders a grid of checkboxes — one per role in the role registry. Ticked checkboxes are currently-assigned roles; unticked are unassigned.

   `[SCREENSHOT PLACEHOLDER: Roles card showing a grid of about 20 role checkboxes; eight are ticked, including BASICS, CATALOGUE_VIEW, CATALOGUE_EDIT, SYSTEMS_VIEW, SYSTEMS_EDIT, ORDERS_VIEW, ORDERS_EDIT, PUBLICATIONS_VIEW]`

3. **Tick to grant a role**, untick to revoke. The change is staged until you save — the form indicates dirty state.

4. **Click *Save*** in the header. Toast progression:
   - *Updating user…*
   - *User updated successfully*
   - *Failed to update user…* on failure.

5. **Verify on the Users list.** The *Roles* badge stack reflects the new set. The user picks up the new permissions on their next sign-in (or page reload — session caching depends on the IdP and how the token is refreshed).

`[VIDEO PLACEHOLDER: 40s — open a user → scroll to Roles card → tick `catalogue-edit` and `orders-edit` to upgrade from view-only → untick a stale `admin` (be careful!) → Save → return to list → see the badge stack update]`

## Role reference (typical bundles)

The full role enum is in `src/types/constants/roles.ts`. The most-used roles, grouped by module:

| Module | View | Edit |
|---|---|---|
| **[Catalogue](../../catalogue/README.md)** | `catalogue-view` | `catalogue-edit`, `catalogue-category-edit` (planned split) |
| **[Systems Hierarchy](../../systemHierarchy/README.md), [Systems Overview](../../systems/README.md), [Systems Relations](../../systemsRelations/README.md)** | `systems-view` | `systems-edit` |
| **[System Type Edit](../../systemTypeEdit/README.md)** | `system-types-view` | `system-types-edit` |
| **[Orders](../../orders/README.md)** | `orders-view` | `orders-edit`, `orders-delivery-edit` |
| **Suppliers (codebook)** | n/a | `supplier-edit` |
| **[Codebooks](../../codebooks/README.md)** | n/a | `codebooks-admin` (route currently gated by `admin`) |
| **[Room Cards](../../roomCards/README.md)** | `room-cards-view` | `room-cards-edit` |
| **[Publications, Researchers & Grants](../../publications/README.md)** | `publications-view` | `publications-edit` |
| **[Services](../../services/README.md)** | `catalogue-service-view` | `catalogue-service-edit` |
| **[Control Systems](../../controlSystems/README.md)** | `control-systems-view` | `control-systems-edit` |
| **[Zones](../../zones/README.md)** | `zones-view` | `zones-edit` |
| **Reports** | `reports-view` | n/a |
| **Dashboard files** | n/a | `dashboard-files-admin` |
| **General** | `basics` | — |
| **Administration** | n/a | `admin` |

**Common bundles:**

| Person | Suggested role set |
|---|---|
| **Read-only viewer** | `basics`, `catalogue-view`, `systems-view`, `room-cards-view`, `orders-view`, `publications-view` (the default-on-create set covers most of this) |
| **Procurement officer** | View baseline + `orders-edit`, `orders-delivery-edit`, `supplier-edit`, `catalogue-edit` |
| **Cleanroom operator** | View baseline + `room-cards-edit`, `zones-view` |
| **Engineering editor** | View baseline + `systems-edit`, `catalogue-edit`, `system-types-view`, `control-systems-view` |
| **Publications coordinator** | View baseline + `publications-edit` |
| **Area Manager** | Whatever editor role above applies + the Area Manager check on the room cards (managed elsewhere) |
| **Full admin** | `admin` (covers everything; assign sparingly) |

## What gets created / changed

**✅ Affected:**
- The user's `roles` graph connection. Each ticked role becomes an outgoing link to the corresponding role record; unticked ones are disconnected.
- *Last update* metadata.

**❌ Not affected:**
- The user's other identity fields (name, email, password, *Is Enabled*).
- Other users sharing the same roles.
- The role records themselves. The role registry is fixed in code; you grant existing roles, you do not create new ones from this page.

## Limitations

- **No per-role description in the UI.** The role label / code is all you see; canonical descriptions live in each module's README under *Access & Responsibilities*.
- **No bulk assignment.** Each user is edited individually. Multi-user role grants are on the roadmap.
- **No role-group templates.** "Procurement officer" is documented as a bundle here but is not a single tick today. Plan the multi-tick yourself.
- **Sign-in session may not refresh immediately.** Some permission changes take effect on the user's next sign-in, depending on token expiry and IdP behaviour. Coordinate with the user when revoking critical roles.
- **No history of past role changes in the UI.** Audit lives in server logs only.

## Tips & gotchas

- **Grant the minimum that does the job.** Adding `admin` "just in case" is the most common over-grant; restrict `admin` to the people who genuinely need to manage other users.
- **The default-on-create roles are the floor, not the ceiling.** A new user with only `BASICS`, `CATALOGUE_VIEW`, `SYSTEMS_VIEW`, `ROOM_CARD_VIEW` is read-only across the app. Add editor roles per their responsibility.
- ***-view* is a prerequisite for many *-edit*** roles to be useful — editing requires being able to see. Most modules behave correctly without the explicit view-role pairing, but check each module's *Access & Responsibilities* table.
- **The delivery role is separate from the order-edit role.** `orders-delivery-edit` gates the *Mark Delivered* action specifically — this is the procurement / goods-in split. Grant carefully.
- **Document the rationale outside PANDA when granting broad roles.** Especially `admin` — pair it with a runbook entry so the next admin knows why.
- **Revoking a role does not delete the records the user has touched.** Audit fields (`Updated By`) on past edits remain stamped with the user even after the role is revoked.

## Related

- [Browsing users](./browsing-users.md)
- [Creating a new user](./creating-users.md)
- [Editing user details](./editing-users.md)
- [Deleting a user](./deleting-users.md)
- Per-module role meaning → see each module's *Access & Responsibilities* section.
