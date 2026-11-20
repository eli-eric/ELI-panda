# Running the employees sync

## What this is for

Import employees from HR (OKBase) now, instead of waiting for the nightly run at 02:00. Use it after HR has changed someone's org. unit or login, or when a new colleague needs their employee record and user link in PANDA today. The sync only adds and updates — it never deletes employees or changes an existing user link.

## Who can do this

🛡️ **Admin** — requires the `admin` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `admin` and can open **Administration** from the user dropdown.
- See [Key concepts](../README.md#key-concepts) for *LDAP user (login)*, *Org. unit code (OJ)* and *Employees sync*.

## Steps

1. **Open the Administration dashboard.** Click your profile at the bottom of the sidebar → **Administration**.

2. **Check the last run.** The *Employees sync* card shows *Last run*: a status badge (*Success* / *Error* / *Running*), when it started, and a message such as `scheduled run: 514 employees saved, 0 errors`.

   `[SCREENSHOT PLACEHOLDER: Employees sync card — title, description "Imports employees from HR (OKBase)…", "Run sync now" button, Last run with a Success badge, date and "scheduled run: 514 employees saved, 0 errors"]`

3. **Click *Run sync now*.** The button changes to *Syncing employees...* and is disabled until the sync finishes (usually a few seconds).

4. **Read the result.** A notification reports `Employees synced: <saved> saved, <errors> errors`, and *Last run* updates with a `manual run: …` message.

## What the sync does

| For each HR employee | Result |
|---|---|
| Employee record exists (same employee number) | Name, e-mail, phones, superior, job position, *LDAP user* and *Org. unit code (OJ)* are updated |
| No record yet | A new Employee is created |
| Employee has no user account linked | Linked to the user whose *Username* equals the HR login (*LDAP user*); if there is none, to the user with the matching e-mail. Old domains `@eli-beams.eu` / `@eli-lasers.eu` count as `@eli-laser.eu` |
| Employee already has a user, or the matching user belongs to another employee | Nothing is linked — links are never moved or doubled |
| Row without an employee number, or the number exists on several Employee records | Skipped and counted as an error |

## Tips & gotchas

- **"Employees sync is already running"** — the nightly run or another administrator is syncing right now. Wait a moment and check *Last run*.
- **"Employees could not be fetched from HR"** — OKBase did not answer. Nothing was changed; try again later. The failed attempt is still recorded in *Last run* with an *Error* badge.
- **Errors greater than 0** mean some rows were skipped (see the table above); everything else was saved. The status shows *Error* so it gets noticed.
- **The sync does not create user accounts.** An employee without a PANDA account stays unlinked until an administrator creates the user ([Creating a new user](./creating-users.md)).
- **Team membership is not synced.** The *Org. unit code (OJ)* is stored on the employee; team members are managed on the Teams page.

## Related

- [Browsing users](./browsing-users.md)
- [Creating a new user](./creating-users.md)
- [Editing user details](./editing-users.md)
