# Administration — Users, Roles & HR sync

The Administration module is the **user and role management workbench** for PANDA, plus the place to run the employees sync from HR (OKBase) on demand. Every user account that can sign in to the application lives here; the *Roles* card on a user's detail page is what grants access to every other module in the system. Add an account when a new colleague needs PANDA access, toggle the *Is Enabled* flag to suspend access, edit the role set to grant or revoke permissions, or delete an account that should no longer exist.

`[SCREENSHOT PLACEHOLDER: Administration → Users list — search field with the hint "Search name, email, LDAP user, role, team...", columns User Name, Name, Email, LDAP User, Org. Unit (OJ), Teams, Facility, Status badge and role badges, pagination at the bottom]`

## Access & Responsibilities

**Today's reality:**
- The page route `/administration` is **gated by the `admin` role**. Users without `admin` cannot navigate here; the sidebar entry and the *Administration* item in the user dropdown are hidden.
- There is no read-only sub-tier. Either you are an administrator (full edit) or you do not see the module.
- Authentication itself is handled by an external identity provider (typically Azure AD via next-auth); the Administration module manages the PANDA-side user record — email, name, password hash for fallback auth, role assignments, facility, optional linked employee, *Is Enabled* flag.

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 🛡️ **Admin** | `admin` | Open the module, run the employees sync, see every user, search and filter, open any user's detail page, create new users, edit names / email / facility, assign and revoke roles, toggle *Is Enabled*, reset a user's password (clears the password hash and forces a change on next sign-in), delete users |
| Everyone else | Anything else | Does not see the Administration sidebar entry. Self-service profile edits (where supported) live on the *Profile* page, not here |

> 🔮 **Coming soon — facility-scoped admin role** — a planned enhancement will let an administrator manage only users in their own facility, separating site-level admin from facility-level admin.

## Key concepts

- **User** — the PANDA-side account record. Carries *Username*, *Email*, *First Name*, *Last Name*, *Facility*, optional *Employee* link, *Is Enabled* flag, a hashed password (for fallback auth), and the set of *Roles* that grant module access.
- **Role** — a permission grant. The role registry lives in `src/types/constants/roles.ts` and includes the role codes used by every other module in PANDA (e.g. `catalogue-edit`, `systems-edit`, `room-cards-edit`, `publications-view`, `admin`).
- **Default roles for new users** — when an admin creates a new user, the system pre-selects `BASICS`, `CATALOGUE_VIEW`, `SYSTEMS_VIEW`, `ROOM_CARD_VIEW`. Anything else is opt-in.
- **Is Enabled** — boolean that gates sign-in. Suspending a user is the soft alternative to deletion. Disabled users cannot authenticate; they keep their record for audit purposes.
- **Password to change** — a flag set on new users (and after a password reset) that forces the user to change their password on next sign-in.
- **Employee link** — optional link to a record in the *Employee* codebook. When linked, the form auto-fills *First Name*, *Last Name*, and *Facility* from the employee record. One person = one Employee = one User.
- **LDAP user (login)** — the employee's Azure AD login from HR (OKBase `LDAP_USER`). Sign-in matches it against the user's *Username*, so it can differ from the employee's e-mail (e.g. after a name change). Read-only, filled by the employees sync.
- **Org. unit code (OJ)** — the employee's organizational unit from HR (OKBase `OJ_KOD`). Teams use the same codes. Read-only, filled by the employees sync.
- **Employees sync** — imports employees from HR (OKBase) every night at 02:00 and links each new employee to its user account. An administrator can also run it on demand from the Administration page.
- **Facility** — the site assignment for the user. Required.

## Layout

The module has three pages: the **Administration dashboard**, a **Users list** and a **User detail / edit page** (create mode is the same form, empty). Teams have their own page, linked from the dashboard.

### Administration dashboard (`/administration`)

Open it from the user dropdown at the bottom of the sidebar → **Administration**.

- **Users** and **Teams** cards — links to the two lists.
- **Employees sync** card — *Run sync now* button and the *Last run* (status, time, how many employees were saved and how many rows failed). See [Running the employees sync](./workflows/running-employees-sync.md).

`[SCREENSHOT PLACEHOLDER: Administration dashboard — Users and Teams cards at the top, Employees sync card below with the "Run sync now" button and a "Success" last-run badge with the message "manual run: 514 employees saved, 0 errors"]`

### Users list (`/administration/users`)

- **Top bar.** *Add User* (gated by `admin`), *Refresh*. Search field — matches username, name, e-mail, LDAP user, org. unit code, facility, roles and teams; ignores upper/lower case and diacritics. Column visibility on the right.
- **Table.** Columns:
  - **User Name** (sticky, clickable) — link to the user's edit page; also surfaces a delete affordance on hover.
  - **Name** — first and last name.
  - **Email**.
  - **LDAP User** — the linked employee's Azure AD login (empty when no employee is linked).
  - **Org. Unit (OJ)** — the linked employee's org. unit code.
  - **Teams** — badges of the teams the user belongs to.
  - **Facility** — the user's assigned facility.
  - **Status** — *Enabled* / *Disabled* badge.
  - **Roles** — badge stack of role codes (e.g. *admin*, *catalogue-edit*, *systems-edit*).
- **Pagination** at the bottom — 50 users per page.

### User detail page (`/administration/user/<uid>` or `/administration/user` for create)

- **Header.** Title *Edit User* (or *Add User* in create mode), *Save* button (gated).
- **User form card.** Fields:
  - **Employee** — optional employee picker. Selecting one auto-fills *First Name* / *Last Name* / *Facility*.
  - **Is Enabled** — checkbox.
  - **First Name**, **Last Name**, **Email**, **Username** — text inputs.
  - **Facility** — dropdown.
  - **Password** / **Confirm Password** — optional; setting these resets the user's password and re-flags *password-to-change* on next sign-in.
- **Organization card** (existing users only, read-only) — *LDAP user (login)*, *Org. unit code (OJ)* and *Teams*. Values come from HR via the employees sync; teams are managed on the Teams page.
- **Roles card.** A grid of checkboxes — one per role in the role registry. Tick to grant, untick to revoke.

`[SCREENSHOT PLACEHOLDER: User detail page — user form, Organization card with LDAP user (login), Org. unit code (OJ) and Teams, and the role assignment panel below]`

## Common workflows

- [Running the employees sync](./workflows/running-employees-sync.md) — import employees from HR now instead of waiting for the nightly run.
- [Browsing users](./workflows/browsing-users.md) — list, search, identifying users by enabled state, role, team or login.
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
> User operations are GraphQL. Queries: `UsersQuery` (all users sorted by username; search and paging run client-side), `UserQuery` (detail by uid), `GetRoles`, `GetFacilities`. Mutations: `CreateUsers(input: [UserCreateInput!]!)`, `UpdateUsers(where, update)`, `DeleteUsers(where)`. Password hashing uses `bcryptjs` at 12 salt rounds; `passwordToChange` is set to true on create and after a password reset. Session shape (`src/types/next-auth.d.ts`) carries `uid`, `email`, `fullName`, `facility`, `facilityCode`, `roles[]`, `apiAccessToken`. The complete role enum lives in `src/types/constants/roles.ts`.
>
> Employees sync is REST on the API gateway (admin only): `POST /v1/cron/sync-employees` returns `{savedCount, errorCount}`, 409 when a sync is already running, 502 when HR is unavailable; `GET /v1/cron/history` returns the last 100 cron runs (job uid `sync-employees-from-hr-eli-bm`).

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
