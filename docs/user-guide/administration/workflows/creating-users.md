# Creating a new user

## What this is for

Add a new account to PANDA so the named colleague can sign in. Creation captures the identity (email, username, name, facility), an initial password (used for fallback authentication and rotated on first sign-in), an optional link to an Employee record (which auto-fills name and facility), and the set of *Roles* that gate access to the rest of the application.

## Who can do this

🛡️ **Admin** — requires the `admin` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `admin`.
- The user's **facility** exists. Facilities are managed in the *Facilities* codebook / configuration.
- If linking to an Employee record, the **employee** is registered in the Employee codebook (see [Codebooks](../../codebooks/README.md)).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

1. **Open Administration → Users.**

2. **Click *Add User*** in the top toolbar. The create-user form opens at `/administration/user`.

3. **Optionally pick the Employee.** The Employee picker is at the top of the User form card. Selecting an employee auto-fills *First Name*, *Last Name*, and *Facility* from the employee record. If the user is not in the Employee codebook (e.g. an external contractor), skip this and enter the name fields manually.

   `[SCREENSHOT PLACEHOLDER: create-user form with the Employee picker selected, the First Name / Last Name / Facility fields visibly auto-populated, Is Enabled checked, email / username filled in]`

4. **Confirm or fill the identity fields:**

   | Field | Required | Notes |
   |---|---|---|
   | **Is Enabled** | — (defaults true) | Leave checked so the user can sign in immediately after creation |
   | **First Name** | ✅ | Auto-filled from Employee if linked |
   | **Last Name** | ✅ | Auto-filled from Employee if linked |
   | **Email** | ✅ | Used for sign-in and notifications |
   | **Username** | ✅ | Typically derived from email; must be unique |
   | **Facility** | ✅ | Picker; auto-filled from Employee if linked |

5. **Set an initial password.** *Password* and *Confirm Password*. The password is bcrypt-hashed at 12 rounds before being stored. The new user is flagged *password-to-change*, so PANDA will prompt them to set a new password on their first sign-in.

6. **Pick roles** in the *Roles* card below the form. The default selection on a fresh user is **`BASICS`**, **`CATALOGUE_VIEW`**, **`SYSTEMS_VIEW`**, **`ROOM_CARD_VIEW`** — a read-only baseline. Tick additional roles per the user's responsibilities; see [Assigning and revoking roles](./assigning-roles.md) for guidance.

   `[SCREENSHOT PLACEHOLDER: Roles card with the four default checkboxes ticked and three additional editor roles (e.g. catalogue-edit, systems-edit, orders-edit) freshly ticked in green to indicate selection]`

7. **Click *Save***. Toast progression:
   - *Creating user…*
   - *User was created successfully* — the form stays open and a UID is now present in the URL.
   - Error toast (*Failed to update user…* or similar) on failure; the form retains your entries.

8. **Communicate credentials to the user.** PANDA does not send a welcome email automatically. Share the username and initial password through your team's secure channel; the user will be forced to change the password on first sign-in.

`[VIDEO PLACEHOLDER: 50s — open Administration → Users → Add User → pick an Employee (see auto-fill) → confirm email + username → set initial password + confirm → leave default roles + tick three editor roles → Save → success toast → URL updates with the new UID]`

## What gets created / changed

**✅ Created:**
- A new User record with the supplied identity fields.
- A bcrypt-hashed password (12 salt rounds) stored on the user.
- The user's `roles` connection — every ticked role becomes an outgoing link to the corresponding role record.
- `passwordToChange` flag set to `true` so the user is prompted to rotate on first sign-in.

**❌ Not affected:**
- The linked Employee record (when used). Linking copies name/facility into the user form; the employee record is unchanged.
- Other users.
- IdP / Azure AD records (PANDA does not provision IdP accounts; the user must already be able to authenticate against the IdP, or the password-based fallback is used).

## Limitations

- **No automatic welcome email.** Credentials must be shared out-of-band.
- **No bulk create.** Each user is added through the form.
- **No invitation flow.** PANDA creates the account immediately with an initial password rather than emailing a "set your password" link.
- **Email uniqueness is enforced at the GraphQL layer.** Creating a duplicate email returns a server error in the toast; pick a different email.
- **Facility is required.** A user cannot be created without a facility assignment.

## Tips & gotchas

- **Always check *Is Enabled* on creation.** Otherwise the user cannot sign in even though the record exists.
- **Default roles are read-only.** A user with just the defaults can browse the modules they have view rights to but cannot edit anything. Add editor roles per their responsibility — see [Assigning and revoking roles](./assigning-roles.md).
- **Link Employee when possible.** It avoids the typo risk in name fields and ties the account to the facility's HR data.
- **Use a strong initial password.** The user changes it on first sign-in, but the initial value still sits in the password hash. Pick a generated value rather than `welcome123`.
- **One person = one user.** Do not create shared accounts (`lab-shared@…`) — auditability breaks down. Use the *Is Enabled* flag instead of recycling accounts.
- **Email matters for password reset.** Where IdP-based recovery is in play, the email field is the matching key.

## Related

- [Browsing users](./browsing-users.md)
- [Editing user details](./editing-users.md)
- [Assigning and revoking roles](./assigning-roles.md)
- [Deleting a user](./deleting-users.md)
- Employee codebook → see [Codebooks](../../codebooks/README.md).
