# Editing user details

## What this is for

Update a user record after creation — rename them (typo fix, change of name), correct their email, move them to a different facility, link or unlink an Employee record, suspend them with the *Is Enabled* flag, or reset their password. The role assignment lives in its own workflow — see [Assigning and revoking roles](./assigning-roles.md).

## Who can do this

🛡️ **Admin** — requires the `admin` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `admin`.
- You have located the user on the Users list (see [Browsing users](./browsing-users.md)).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

1. **Open the user** from the Users list — click the *User Name* link in the row. The URL takes the form `/administration/user/<uid>`.

2. **Edit any identity field** in the User form card:

   | Field | Notes |
   |---|---|
   | **Employee** | Optional link. Setting an Employee picker auto-fills *First Name*, *Last Name*, *Facility*. Clearing the link does not blank the fields; you continue to edit them by hand. |
   | **Is Enabled** | Toggle to suspend (uncheck) or restore (check) sign-in. Disabled users keep their record but cannot authenticate. |
   | **First Name**, **Last Name** | Display names. Auto-filled from Employee when first linked. |
   | **Email** | Editable. Must remain unique. |
   | **Username** | Editable. Some teams keep username == email; both are user-facing identifiers. |
   | **Facility** | Picker. Required. |

   `[SCREENSHOT PLACEHOLDER: user detail page with Is Enabled unchecked (user suspended), the rest of the fields filled, the Save button highlighted in the header]`

3. **Reset the password** (optional). Fill the *Password* and *Confirm Password* fields. On save:
   - The new password is bcrypt-hashed (12 rounds) and stored.
   - The *password-to-change* flag is re-set, so the user is forced to change it on next sign-in.
   - Communicate the new password out-of-band; PANDA does not send a notification email.

   Leave *Password* and *Confirm Password* **blank** to keep the existing password unchanged.

4. **Click *Save*** in the header. Toast progression:
   - *Updating user…*
   - *User updated successfully*
   - *Failed to update user: <reason>* on failure (often a duplicate email or username).

5. **Verify on the Users list.** Sort or search to find the row and confirm the *Is Enabled* badge, *Facility*, or other changed columns reflect your edit.

### Suspend a user without deleting

1. **Open the user.**
2. **Uncheck *Is Enabled*** in the User form card.
3. **Save.**

The user record remains intact (roles, password, name, history). The account simply cannot authenticate until *Is Enabled* is restored.

### Re-enable a suspended user

1. **Open the user.** Their row in the list still appears (filter by *Is enabled = false* to find them quickly).
2. **Check *Is Enabled***.
3. **Save.** The user can sign in immediately. If their password has rotated since suspension or was forgotten, also set a new password as in step 3 above.

`[VIDEO PLACEHOLDER: 45s — open Administration → Users → find a row → open user → uncheck Is Enabled → Save → return to list, see "false" badge → reopen → set new password + confirm → re-check Is Enabled → Save → see user can sign in again]`

## What gets created / changed

**✅ Affected:**
- The user record's identity fields, *Is Enabled* flag, password hash (when set), *password-to-change* flag (re-set on any password change), Employee link, Facility link.
- *Last update* metadata (timestamp + user).

**❌ Not affected:**
- The user's roles. Role changes are made in the *Roles* card (see [Assigning and revoking roles](./assigning-roles.md)).
- Other users.
- The linked Employee record. Editing the user does not write back to the employee codebook.
- Records the user owns or has touched in other modules (orders they have placed, publications they have edited, etc.) — those keep their `Updated By` references.

## Limitations

- **No password complexity hint in the form.** Pick strong values; PANDA does not enforce minimums today.
- **No email-verification step on email change.** Updating the email field changes the recorded address immediately; the new address is not verified.
- **No history of past edits surfaced in the UI.** What changed and when lives in server logs only.
- **Username collisions return generic errors.** A *Failed to update* toast on a benign-looking edit is often a uniqueness violation on email or username; pick distinct values.
- **You cannot edit a user's *roles* from the User form card alone** — roles live in their own card on the same page. See [Assigning and revoking roles](./assigning-roles.md).

## Tips & gotchas

- **Disable rather than delete for departures.** Suspending preserves audit trails on records the user has touched elsewhere; deletion orphans those references.
- **Communicate password resets immediately.** The user cannot sign in with the old password and PANDA does not auto-notify; they will be locked out until they receive the new value.
- **Re-link Employee carefully.** Switching the Employee link auto-fills the form again, overwriting your manual edits to *First Name* / *Last Name* / *Facility*. Either link first and edit second, or be aware the link re-fill will clobber.
- **Saving without changing the password leaves the existing one in place.** Leave the *Password* fields blank for routine edits.
- ***Is Enabled* propagates immediately.** On the next sign-in attempt the user is rejected. Existing sessions remain until they expire; coordinate with the IdP if you need an immediate session kill.

## Related

- [Browsing users](./browsing-users.md)
- [Creating a new user](./creating-users.md)
- [Assigning and revoking roles](./assigning-roles.md)
- [Deleting a user](./deleting-users.md)
