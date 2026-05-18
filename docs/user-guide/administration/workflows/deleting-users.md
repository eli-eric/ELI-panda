# Deleting a user

## What this is for

Permanently remove a user account from PANDA. Deletion drops the user record, the password hash, and the role connections. Records the user has authored or edited elsewhere in the app keep their `Updated By` / `Created By` references — those become orphaned UIDs (the picker label disappears in subsequent views, but the audit fact that "someone made this change" is preserved).

In **almost every case**, suspending a user via *Is Enabled = false* is preferable to deletion. See [Editing user details](./editing-users.md). Delete only when the account was a genuine mistake (duplicate, test account, never used) or when policy requires removal.

## Who can do this

🛡️ **Admin** — requires the `admin` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `admin`.
- You have confirmed:
  - The account is genuinely no longer needed (consider suspension as an alternative — see *Tips & gotchas*).
  - The user's name does not need to remain resolvable in `Updated By` / `Created By` columns elsewhere. (If it does, *do not delete* — suspend instead.)
  - You are not deleting the account you are currently signed in with. PANDA does not specifically block this, but the result is immediate sign-out and possibly loss of admin access if you are the last admin.

## Steps

1. **Open the Users list** at `/administration/users`.

2. **Find the user's row.** Hover the *User Name* cell — a delete affordance appears next to the name link.

3. **Click the delete affordance.** A confirmation modal asks: *Are you sure you want to delete user: "{name}"?*

   `[SCREENSHOT PLACEHOLDER: Users list with one row hovered showing the delete affordance next to the user name; the confirmation modal in front asking to confirm the deletion]`

4. **Confirm in the modal.** The mutation runs (`DeleteUsers`). Toast progression:
   - *Deleting user…*
   - *User {name} was deleted* — success.
   - *Failed to delete user* — server-side block; the toast surfaces the cause.

5. **Verify on the list.** The row is gone. The deleted user can no longer sign in (immediate for future attempts; existing sessions persist until token expiry, but their session token's reference is now orphaned).

`[VIDEO PLACEHOLDER: 30s — open Administration → Users → hover an unused test account's name → click the delete affordance → confirmation modal appears → click confirm → see row disappear → "User X was deleted" toast]`

## What gets removed / preserved

**✅ Removed:**
- The User record.
- The password hash.
- The user's `roles` graph connections (the user's links to each Role record are dropped; the Role records themselves remain).
- The optional Employee link (the Employee codebook record is untouched; only the link is dropped).

**✅ Preserved with orphan references:**
- Records elsewhere in the app that carry `Created By` / `Updated By` references to the deleted user — orders the user placed, publications they edited, systems they last touched. The audit data continues to show the deleted UID; depending on the surface, the rendered label may be blank or a stored-name fallback.

**❌ Not affected:**
- The IdP / Azure AD account. PANDA's delete removes only the PANDA-side record; the corporate identity (if any) remains intact. The deleted user cannot sign in to PANDA but may still be a valid identity elsewhere in your organisation.
- Other users, including those sharing the same roles.
- Role records, codebook records, or any module data beyond the user record itself.

## Limitations

- **No undo.** Recreating a user with the same email and username does *not* restore the audit links — the new account gets a fresh UID. Past records that referenced the deleted user remain orphaned.
- **No "where used" view.** PANDA does not surface a list of records that reference the user before deletion. Audit through the consuming modules' filter sheets (`Updated By` filter on the [Systems Overview](../../systems/README.md), the [Orders](../../orders/README.md) list, etc.).
- **No bulk delete.** Each user is deleted individually.
- **No soft-delete.** Deletion is hard. The alternative is *Is Enabled = false* — see [Editing user details](./editing-users.md).
- **Self-delete is not blocked.** Deleting your own account signs you out immediately and may strand the system if you were the only admin. Coordinate carefully.

## Tips & gotchas

- **Prefer suspension (`Is Enabled = false`).** It preserves audit-trail integrity, lets you re-enable the account later if needed (rare but happens), and avoids orphaning references in other modules. Reserve deletion for genuine mistakes.
- **Audit references first.** A user who has been active for any length of time will have created and updated dozens of records across PANDA. Even if their account is no longer needed, those records' audit trail benefits from the name resolving correctly.
- **Coordinate with the IdP / HR.** When a colleague leaves the organisation, the corporate IdP is the primary place to suspend access. PANDA deletion is a downstream consequence of that — done only when no audit trail needs to remain attached to the name.
- **Last admin caveat.** Never delete the only admin account on the system. Promote another user to `admin` first (see [Assigning and revoking roles](./assigning-roles.md)), confirm their sign-in works, then proceed.
- **Test accounts are the safest deletion targets.** Accounts created and never used (no records anywhere in the app touched by them) are the cleanest deletes. Audit-orphan risk is minimal.

## Related

- [Browsing users](./browsing-users.md)
- [Creating a new user](./creating-users.md)
- [Editing user details](./editing-users.md)
- [Assigning and revoking roles](./assigning-roles.md)
