# Understanding edit permissions

## What this is for

Editing a system is now controlled per system, not just by your role. Having the `systems-edit` role means you *can* edit systems in general; whether you can edit **this particular system** depends on whether you are **responsible** for it. This page explains who can edit a given system, what you see when you can't, and how to find the right person to ask.

## Who can do this

👁️ **Everyone with `systems-view`** can *see* whether they may edit a system and who is responsible for it. Only a responsible user (with the `systems-edit` role) can actually make changes.

You may edit a system when any of these is true:

- You are its **responsible person**.
- You are a member of its **responsible team**.
- You are responsible (person or team) for a system **above it** in the hierarchy — responsibility flows down to subsystems.
- You are an **admin**.
- The system and all of its ancestors have **no** responsible person or team at all (an unowned system is open to any editor).

> This replaces the earlier "policy only" guidance: responsibility-based editing is now enforced, not just recommended.

See [Access & Responsibilities](../README.md#access--responsibilities) for what the personas mean.

## Prerequisites

- You are looking at a system's detail view in the System Hierarchy module.
- See [Key concepts](../README.md#key-concepts) for *responsible person* and *responsible team*.

## What you can and can't do

When you **are** allowed to edit a system, everything behaves as documented in the other workflows — fields are editable, actions are enabled.

When you are **not** allowed to edit a system:

- ❌ All fields on the **Detail**, **Persons**, and **Physical Item** tabs are shown but disabled.
- ❌ Adding or removing operators / maintained-by people is disabled.
- ❌ Uploading or deleting **Attachments** and the system image is disabled.
- ❌ The **Actions** menu (move item, assign item, assign spares) is disabled.
- ❌ Right-click **Create System** (under this system) and **Delete System** are blocked.
- ✅ You can still browse, search, view relationships, and read the change history.

## Steps

1. **Open a system's detail view.** Select a leaf in the tree, or click *View Detail* on a parent.

2. **Look for the permission notice at the top of the detail view.** If you cannot edit this system, a banner appears below the breadcrumb: *You don't have permission to edit this system.* All editable fields below are greyed out.

   `[SCREENSHOT PLACEHOLDER: system detail view with the "You don't have permission to edit this system" banner under the header, an info icon next to it, and the Detail-tab fields visibly disabled]`

3. **Find out who to contact.** The banner lists the responsible people under *Responsible people you can contact:* with their names and email addresses. Hovering the info icon next to the banner title shows the same list as a tooltip. If no one is listed, it reads *Please contact an administrator to request access.*

   `[SCREENSHOT PLACEHOLDER: the info-icon tooltip open, showing a responsible person's name and email]`

4. **If you try a blocked action anyway** (for example right-clicking *Delete System* on a system you're not responsible for), a message appears: *You're not responsible for this system. Contact: <names>* — and nothing is changed.

`[VIDEO PLACEHOLDER: 25s — open a system you're not responsible for (banner + disabled fields shown), hover the info icon to reveal the responsible contact, then open a system you are responsible for and edit a field successfully]`

## Tips & gotchas

- **Responsibility flows downward.** If you are responsible for a key system, you can also edit everything beneath it — you don't need to be named on every subsystem.
- **Changing the responsible person or team can remove your own access.** If you reassign responsibility away from yourself on a system you only controlled directly, the fields lock immediately afterward — that's expected.
- **"Couldn't verify" is different from "not permitted".** If the banner reads *Could not verify your edit permissions* with a **Retry** button, that's a temporary connection problem, not a permission denial — editing stays disabled until it can be confirmed. Click **Retry**.
- **System codes follow the same rule here.** Generating or releasing a system code is disabled when you can't edit the system.

## Related

- [Editing system details](./editing-system-details.md) — the fields this permission gates.
- [Managing system people](./managing-system-people.md) — set the responsible person and team that decide who can edit.
- [Creating systems](./creating-systems.md) and [Deleting systems](./deleting-systems.md) — both check your responsibility for the parent / target.
- Full permission model → see [user guide index](../../README.md).
