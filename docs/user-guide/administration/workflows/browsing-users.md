# Browsing users

## What this is for

Find a user — by name, e-mail, login, org. unit, team, role or enabled state — and open their detail page for inspection or edit. The list is the entry point for every other administrator action in the module; sorting and filtering it well makes the rest of the work cheaper.

## Who can do this

🛡️ **Admin** — the page route requires `admin`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `admin` and the **Administration** sidebar entry is visible.
- See [Key concepts](../README.md#key-concepts) for terminology (user, role, facility, employee link).

## Steps

1. **Open Administration → Users.** From the user dropdown → **Administration** → *Users*, or the sidebar *Administration* entry. The list loads sorted by username, 50 users per page.

   `[SCREENSHOT PLACEHOLDER: Users list — User Name, Name, Email, LDAP User, Org. Unit (OJ), Teams, Facility, Status and Roles columns, search field with the hint "Search name, email, LDAP user, role, team...", pagination at the bottom]`

2. **Search.** Type into the search field in the top toolbar. It matches username, name, e-mail, *LDAP User*, *Org. Unit (OJ)*, facility, role codes and names, and team names. Upper/lower case and diacritics do not matter (`novak` finds *Novák*). Several words narrow the result — every word has to match something, e.g. `novak admin` or `410 lasers`. Results refresh as you type and the list jumps back to page 1.

3. **Sort.** Click any column header. Common triage sorts:
   - **Status** — group enabled and disabled accounts.
   - **Name** — alphabetical for a roster view.
   - **Org. Unit (OJ)** — group users by department.

   Sorting covers all users, not just the current page. *Roles* cannot be sorted.

4. **Column visibility.** Adjust with the dropdown on the right of the toolbar. Hide the *Facility* column if you operate at a single-facility site.

5. **Page through.** Use the pagination at the bottom of the table.

6. **Open a user.** Click the *User Name* link in any row. The URL takes the form `/administration/user/<uid>` and the detail page loads.

7. **Refresh** with the *Refresh* button after another administrator has just changed something — the list does not push updates automatically.

`[VIDEO PLACEHOLDER: 25s — open Administration → Users → search "novak admin" → sort by Status → adjust column visibility → go to page 2 → click a row to open the detail page → back to list]`

## Reading the row

- **User Name** is also the link. Hovering surfaces a delete affordance next to it — *do not* click delete unless you mean it; the deletion is destructive (see [Deleting a user](./deleting-users.md)).
- **Facility** is the site the user is assigned to. Required on every user record.
- **Name** comes from the user record (filled from the linked Employee when the user was created).
- **LDAP User** is the Azure AD login of the linked employee. Sign-in matches it against *Username*; if the two differ, the person may not be able to sign in to this account.
- **Org. Unit (OJ)** and **Teams** show where the person belongs. Empty *LDAP User* / *Org. Unit (OJ)* = no employee is linked to this account.
- **Status** is the gate for sign-in. A `false` here means the user cannot authenticate even if their roles look correct.
- **Roles** badge stack shows every assigned role code (e.g. `admin`, `catalogue-edit`, `systems-edit`). Empty roles stack = the user has the default minimum only.

## Tips & gotchas

- **Roles badge is informative, not authoritative.** Tooltips show the role code but no description. The canonical role table is in `src/types/constants/roles.ts` and is mirrored in each module's *Access & Responsibilities* section.
- **Disabled users still appear.** They are not hidden by default. Sort by *Status* to triage; consider periodically removing accounts that have been disabled for a long time.
- **Refresh after creating, editing, or deleting another administrator.** Multi-admin teams overlap; pick up the latest state.
- **No multi-select.** Bulk actions (bulk delete, bulk role change) are not supported today.
- **The list does not surface last-sign-in time.** Activity audit lives in the IdP / authentication layer, not here.

## Related

- [Running the employees sync](./running-employees-sync.md)
- [Creating a new user](./creating-users.md)
- [Editing user details](./editing-users.md)
- [Assigning and revoking roles](./assigning-roles.md)
- [Deleting a user](./deleting-users.md)
