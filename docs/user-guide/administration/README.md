# Administration — Users & Roles

The Administration module is the **user and role management workbench** for PANDA. Every user account that can sign in to the application lives here; the *Roles* card on a user's detail page is what grants access to every other module in the system. Add an account when a new colleague needs PANDA access, toggle the *Is Enabled* flag to suspend access, edit the role set to grant or revoke permissions, or delete an account that should no longer exist.

`[SCREENSHOT PLACEHOLDER: Administration → Users list — top toolbar with Add User and Refresh buttons on the left, search field, column visibility on the right; table with columns User Name (sticky link), Facility, First Name, Last Name, Is enabled, Roles (badge stack)]`

## Access & Responsibilities

**Today's reality:**
- The page route `/administration` is **gated by the `admin` role**. Users without `admin` cannot navigate here; the sidebar entry is hidden.
- There is no read-only sub-tier. Either you are an administrator (full edit) or you do not see the module.
- Authentication itself is handled by an external identity provider (typically Azure AD via next-auth); the Administration module manages the PANDA-side user record — email, name, password hash for fallback auth, role assignments, facility, optional linked employee, *Is Enabled* flag.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 🛡️ **Admin** | `admin` | Open the module, see every user, search and filter, open any user's detail page, create new users, edit names / email / facility, assign and revoke roles, toggle *Is Enabled*, reset a user's password (clears the password hash and forces a change on next sign-in), delete users |
| Everyone else | Anything else | Does not see the Administration sidebar entry. Self-service profile edits (where supported) live on the *Profile* page, not here |

> 🔮 **Coming soon — facility-scoped admin role** — a planned enhancement will let an administrator manage only users in their own facility, separating site-level admin from facility-level admin.

## Key concepts

- **User** — the PANDA-side account record. Carries *Username*, *Email*, *First Name*, *Last Name*, *Facility*, optional *Employee* link, *Is Enabled* flag, a hashed password (for fallback auth), and the set of *Roles* that grant module access.
- **Role** — a permission grant. The role registry lives in `src/types/constants/roles.ts` and includes the role codes used by every other module in PANDA (e.g. `catalogue-edit`, `systems-edit`, `room-cards-edit`, `publications-view`, `admin`).
- **Default roles for new users** — when an admin creates a new user, the system pre-selects `BASICS`, `CATALOGUE_VIEW`, `SYSTEMS_VIEW`, `ROOM_CARD_VIEW`. Anything else is opt-in.
- **Is Enabled** — boolean that gates sign-in. Suspending a user is the soft alternative to deletion. Disabled users cannot authenticate; they keep their record for audit purposes.
- **Password to change** — a flag set on new users (and after a password reset) that forces the user to change their password on next sign-in.
- **Employee link** — optional link to a record in the *Employee* codebook. When linked, the form auto-fills *First Name*, *Last Name*, and *Facility* from the employee record.
- **Facility** — the site assignment for the user. Required.

## Layout

The module has two pages: a **Users list** and a **User detail / edit page** (create mode is the same form, empty).

### Users list (`/administration/users`)

- **Top bar.** *Add User* (gated by `admin`), *Refresh*. Search field that matches against *Username* (substring). Column visibility on the right.
- **Table.** Columns:
  - **User Name** (sticky, clickable) — link to the user's edit page; also surfaces a delete affordance on hover.
  - **Facility** — the user's assigned facility.
  - **First Name**, **Last Name** — name fields.
  - **Is enabled** — boolean badge.
  - **Roles** — badge stack of role codes (e.g. *admin*, *catalogue-edit*, *systems-edit*).

### User detail page (`/administration/user/<uid>` or `/administration/user` for create)

- **Header.** Title *Edit User* (or *Add User* in create mode), *Save* button (gated).
- **User form card.** Fields:
  - **Employee** — optional employee picker. Selecting one auto-fills *First Name* / *Last Name* / *Facility*.
  - **Is Enabled** — checkbox.
  - **First Name**, **Last Name**, **Email**, **Username** — text inputs.
  - **Facility** — dropdown.
  - **Password** / **Confirm Password** — optional; setting these resets the user's password and re-flags *password-to-change* on next sign-in.
- **Roles card.** A grid of checkboxes — one per role in the role registry. Tick to grant, untick to revoke.

`[SCREENSHOT PLACEHOLDER: user detail page — User form card at the top showing Employee picker, Is Enabled checked, First/Last name and email filled, Facility selected; Roles card below with around a dozen role checkboxes, half ticked]`

## Common workflows

- [Browsing users](./workflows/browsing-users.md) — list, search, identifying users by enabled state or role.
- [Creating a new user](./workflows/creating-users.md) — employee-linked vs free-form, default roles, initial password, password-to-change flag.
- [Editing user details](./workflows/editing-users.md) — name, email, facility, *Is Enabled* toggle, password reset.
- [Assigning and revoking roles](./workflows/assigning-roles.md) — what each role grants, how to compose them, default-role caveats.
- [Deleting a user](./workflows/deleting-users.md) — when delete is safe, what survives in other modules, the *Is Enabled = false* alternative.

For the facility-level role reference, see each module's *Access & Responsibilities* section in its own README. The full role enum lives in `src/types/constants/roles.ts`.

## Coming soon

- 🔮 **Facility-scoped admin.** Restrict administrative reach by facility.
- 🔮 **Role groups / templates.** Pre-defined bundles of roles (e.g. *Procurement Officer* = `orders-edit` + `catalogue-view` + …).
- 🔮 **Audit log per user.** Surfacing past role changes, password resets, enable/disable flips.
- 🔮 **Per-user MFA opt-in / opt-out controls** (where the IdP supports it).
- 🔮 **Bulk role assignment.** Apply the same role change to multiple users in one operation.
- 🔮 **Account lock-out controls** for failed sign-in attempts.

`[VIDEO PLACEHOLDER: 60s end-to-end — open Administration → see Users list → search a partial username → click a row to open the user → toggle Is Enabled to suspend → Save → return to list → see the badge change → reopen → re-enable and tick a new role → Save → demo Add User: pick an employee, see auto-fill, accept default roles, set password, Save]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The wiki generator strips it.*
>
> All operations are GraphQL. Queries: `UsersQuery` (paginated list, `UserWhere` filter — `username_CONTAINS`), `UserQuery` (detail by uid), `GetRoles`, `GetFacilities`. Mutations: `CreateUsers(input: [UserCreateInput!]!)`, `UpdateUsers(where, update)`, `DeleteUsers(where)`. Password hashing uses `bcryptjs` at 12 salt rounds; `passwordToChange` is set to true on create and after a password reset. Session shape (`src/types/next-auth.d.ts`) carries `uid`, `email`, `fullName`, `facility`, `facilityCode`, `roles[]`, `apiAccessToken`. The complete role enum lives in `src/types/constants/roles.ts`.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
