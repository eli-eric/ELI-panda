# Browsing users

## What this is for

Find a user — by username, by facility, by role, by enabled state — and open their detail page for inspection or edit. The list is the entry point for every other administrator action in the module; sorting and filtering it well makes the rest of the work cheaper.

## Who can do this

🛡️ **Admin** — the page route requires `admin`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `admin` and the **Administration** sidebar entry is visible.
- See [Key concepts](../README.md#key-concepts) for terminology (user, role, facility, employee link).

## Steps

1. **Open Administration → Users.** The list loads with the default sort order (username ascending).

   `[SCREENSHOT PLACEHOLDER: Users list with eight rows visible — each row shows User Name link, Facility, First Name, Last Name, Is enabled badge, Roles badge stack; one row hovered showing the delete affordance next to the user name]`

2. **Search.** Type into the search field in the top toolbar — matches against the *Username* field as a partial substring. Results refresh as you type.

3. **Sort.** Click any column header. Common triage sorts:
   - **Is enabled** descending — surface enabled accounts first, disabled at the bottom.
   - **Last Name** — alphabetical for a roster view.
   - **Roles** — group by role pattern (limited usefulness for users with multi-role assignments).

4. **Column visibility.** Adjust with the dropdown on the right of the toolbar. The default columns are usually enough; hide the *Facility* column if you operate at a single-facility site.

5. **Open a user.** Click the *User Name* link in any row. The URL takes the form `/administration/user/<uid>` and the detail page loads.

6. **Refresh** with the *Refresh* button after another administrator has just changed something — the list does not push updates automatically.

`[VIDEO PLACEHOLDER: 25s — open Administration → Users → search "smith" → sort by Is enabled descending → adjust column visibility → click a row to open the detail page → back to list]`

## Reading the row

- **User Name** is also the link. Hovering surfaces a delete affordance next to it — *do not* click delete unless you mean it; the deletion is destructive (see [Deleting a user](./deleting-users.md)).
- **Facility** is the site the user is assigned to. Required on every user record.
- **First Name** / **Last Name** come from either the user record or the linked Employee record (if present).
- **Is enabled** is the gate for sign-in. A `false` here means the user cannot authenticate even if their roles look correct.
- **Roles** badge stack shows every assigned role code (e.g. `admin`, `catalogue-edit`, `systems-edit`). Empty roles stack = the user has the default minimum only.

## Tips & gotchas

- **Search is username-only.** First name, last name, email do not currently filter through the toolbar search; sort the list by those columns instead and skim.
- **Roles badge is informative, not authoritative.** Tooltips show the role code but no description. The canonical role table is in `src/types/constants/roles.ts` and is mirrored in each module's *Access & Responsibilities* section.
- **Disabled users still appear.** They are not hidden by default. Filter the *Is enabled* column to triage; consider periodically removing accounts that have been disabled for a long time.
- **Refresh after creating, editing, or deleting another administrator.** Multi-admin teams overlap; pick up the latest state.
- **No multi-select.** Bulk actions (bulk delete, bulk role change) are not supported today.
- **The list does not surface last-sign-in time.** Activity audit lives in the IdP / authentication layer, not here.

## Related

- [Creating a new user](./creating-users.md)
- [Editing user details](./editing-users.md)
- [Assigning and revoking roles](./assigning-roles.md)
- [Deleting a user](./deleting-users.md)
