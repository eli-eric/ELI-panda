# Understanding edit permissions

## What this is for

Editing a system needs the `systems-edit` role. On top of that, every system has people **responsible** for it. If you edit a system you are not responsible for, the app does not stop you — it asks you once to confirm, and your change is marked in the system's history as made *outside responsibility*. This page explains who counts as responsible, what the confirmation looks like, and where you see it afterwards.

## Who can do this

✏️ **Editors with `systems-edit`** can edit any system. Without the role, every field is read-only and edit actions are disabled.

You count as **responsible** for a system when any of these is true:

- You are its **responsible person**.
- You are a member of its **responsible team**.
- You are responsible (person or team) for a system **above it** in the hierarchy — responsibility flows down to subsystems.
- You are an **admin**.
- The system and all of its ancestors have **no** responsible person or team at all.

See [Access & Responsibilities](../README.md#access--responsibilities) for what the personas mean.

## Prerequisites

- You are looking at a system in the Systems Explorer detail view or in the *Edit System* sheet.
- See [Key concepts](../README.md#key-concepts) for *responsible person* and *responsible team*.

## Steps

1. **Open a system's detail.** Select a system in the Systems Explorer, or open the *Edit System* sheet from the systems overview.

2. **Check the notice at the top.** If you are not responsible, a banner reads *You're not responsible for this system.* with the line *You can still edit it — you will be asked to confirm once, and your changes are marked in history.* Hover the info icon next to the title to see who is responsible.

   `[SCREENSHOT PLACEHOLDER: system detail with the "You're not responsible for this system." banner under the header, the info-icon tooltip open listing a responsible person's name and email, fields below fully editable]`

3. **Edit a field as usual.** On your first change to this system a confirmation appears: *You are not responsible for this system (responsible: <names>). Your change will be recorded as made outside your responsibility. Do you want to continue?*

   `[SCREENSHOT PLACEHOLDER: the warning dialog with the outside-responsibility text and the Continue / Cancel buttons, an edited field visible behind it]`

4. **Choose *Continue* or *Cancel*.** *Continue* saves the change and the app does not ask again for this system until you reload the page. *Cancel* discards the change — the field returns to its previous value.

5. **See it in the history.** Open the **History** tab: the entry carries an *Outside responsibility* badge next to your name.

`[VIDEO PLACEHOLDER: 30s — open a system you're not responsible for, see the banner, edit the description, confirm the dialog, edit a second field without a new prompt, then open History and point at the "Outside responsibility" badge]`

## When the confirmation appears

| Action | Asks for confirmation? |
|---|---|
| Editing any field (detail, people, physical item, minimal spares, system code) | ✅ once per system and session |
| **Create System** under a system | ✅ — checked against the **parent** system |
| **Delete System** | ✅ — the note is added to the normal delete confirmation (one dialog) |
| Creating or removing engineering relationships | ❌ |
| Using / assigning spare parts | ❌ |
| Uploading or deleting images and attachments | ❌ |

## Tips & gotchas

- **The confirmation is per system.** Confirming for a parent does not cover its subsystems — each system you edit outside your responsibility asks once.
- **Someone else may change the system at the same time.** If another user saved the same system in the meantime, your save is rejected with *Someone else changed this system in the meantime. The latest data was loaded — please repeat your change.* Your field shows the latest value; apply your change again.
- **"Couldn't verify" is not a denial.** *Could not verify your responsibility for this system.* means a temporary connection problem — editing stays available and the server records responsibility itself. Click **Retry** to refresh the banner.
- **The same rule applies everywhere.** The *Edit System* sheet from the [Systems overview](../../systems/README.md), the [Control Systems](../../controlSystems/README.md) code list, or a relationship graph node behaves exactly like the Systems Explorer.

## Related

- [Editing system details](./editing-system-details.md) — the fields you edit.
- [Managing system people](./managing-system-people.md) — set the responsible person and team.
- [Viewing change history](./viewing-change-history.md) — where the *Outside responsibility* badge shows.
- [Creating systems](./creating-systems.md) and [Deleting systems](./deleting-systems.md).
- Full permission model → see [user guide index](../../README.md).
