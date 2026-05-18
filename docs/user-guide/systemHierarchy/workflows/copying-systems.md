# Copying systems

## What this is for

Copy a system — and optionally its entire subtree — under a different parent in the hierarchy. Useful when you need to seed a new branch that mirrors an existing one (e.g., a sibling beamline with the same internal structure as one that already exists), or to clone a template subsystem into multiple parents.

The copy is a **structural skeleton only.** New system entities are created with a fresh UID, the original system's name, system level, and system-type assignment — but **no other data carries over** (see [What gets copied](#what-gets-copied) below). After the copy, source and destination subtrees are completely independent.

## Who can do this

✏️ **Editor / Admin** — requires the `systems-edit` role.

> 🔮 *Coming soon — Phase 1:* the copy action will be scoped by system level. Editors will be able to copy systems at `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, and `TRASH` levels only; copying systems at `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT` will be admin-only.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are looking at the System Hierarchy module.
- You know which system you want to copy (the **source**) and which existing system will be the new parent (the **destination**).
- See [Key concepts](../README.md#key-concepts) for terminology (system, subsystem, system level).

## Steps

The action is available in two surfaces — the left **tree** and the **Leaves Panel Graph** (middle panel, when the leaves view is in graph mode). The interactions are identical in both.

1. **Right-click the source system.**
   A context menu opens with **Copy System** and **Paste System** entries.

   `[SCREENSHOT PLACEHOLDER: tree node right-clicked, context menu open with "Copy System" and "Paste System" entries visible]`

2. **Click *Copy System*.**
   The source system is now held in the copy buffer. There is no on-screen indicator — the buffer is invisible until you paste. (Only one system can be in the buffer at a time; copying another system replaces it.)

3. **Right-click the destination system** — the system you want to be the new parent.

4. **Click *Paste System*.**
   The **Copy System** dialog opens.

   `[SCREENSHOT PLACEHOLDER: Copy System dialog showing Source block (system name + level badge + parent breadcrumb) above a Destination block, two checkboxes below, Cancel and Copy buttons at the bottom]`

5. **Review the source and destination blocks** in the dialog. Each shows the system name, system-level badge, and the full parent path so you can confirm you've picked the right systems.

6. **Choose the copy options.** Two checkboxes, both default to ON. Their interaction:

   | *Copy only children…* | *Copy recursively…* | Result |
   |---|---|---|
   | OFF | OFF | The source system **only** (one node) is copied as a child of the destination. No descendants. |
   | OFF | ON | The source system **and its entire subtree** are copied. |
   | ON  | OFF | Each **direct child of the source** is copied as a separate child of the destination. The source itself is skipped; deeper descendants are skipped. |
   | ON  | ON  | **Default.** Each direct child of the source is copied **with its full subtree**. The source itself is skipped. Useful for grafting a parent's contents into a sibling. |

7. **Click *Copy*.**
   A toast appears with the progress: *Copying system…* → *System copied successfully* (or an error toast on failure).

   The destination subtree refreshes to show the newly created systems. If the destination was collapsed in the tree, it expands.

`[VIDEO PLACEHOLDER: 30s — right-click source in tree → Copy System → right-click destination → Paste System → review dialog → check defaults → click Copy → see new subtree appear under destination]`

## What gets copied

The copy is a **structural skeleton.** Only the bare minimum needed to recreate the hierarchy is carried over.

**✅ What carries over to each new copy:**
- **Name** of the source system (verbatim).
- **System level** (e.g. `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`).
- **System type** — the new copy points at the same system-type record as the original (the type itself is not duplicated; it's just an assignment).
- **Facility** — the copy is placed in the same facility as the source.
- **Parent-child structure** — the internal hierarchy among copied nodes is preserved (only when *Copy recursively* is ON).
- A fresh audit entry on each copy: the operation timestamp and the user who triggered it.

**❌ What does NOT carry over:**
- All other system attributes: **description**, **system code**, **importance**, **criticality**, **attribute**, custom property bag.
- **Physical item** — the original's item stays with the original. Copies start without an item.
- **Location** and **zone** assignments.
- **Responsible person**, **responsible team**, **owner**, **operators**, **maintained by** — copies start with no people assigned.
- **Spare-part relationships** — the copy is not flagged as spare for anything, and nothing is flagged as spare for it.
- **Engineering relationships** — *powered from*, *cooled from*, *controlled by*, *interlocked by*, *provides data to*, *directs beam to*, *provides vacuum for* (none of the 8 non-structural relationship types carry over). See [Managing relationships](./managing-relationships.md).
- **Photos and attachments.**
- **Change history** — copies start with a fresh audit trail; the source's history is not duplicated.

After the copy succeeds you typically need to revisit each new system and fill in the data that didn't carry over.

## Limitations

- **Same facility only.** Source and destination must belong to the same facility. Copying across facilities is not supported.
- **50-level recursion cap.** The recursive copy walks at most 50 levels of parent-child depth from the source. In practice this is well above any real hierarchy, but if you have a pathologically deep tree, anything below level 50 is silently skipped.
- **Atomic operation.** The whole copy either succeeds or fails as one transaction — you will not end up with a half-built subtree.

## Tips & gotchas

- **Pasting onto the source** is silently ignored. The dialog does not open if destination equals source.
- **Pasting without copying first** is silently ignored. The *Paste System* item only triggers a dialog when the buffer holds a system.
- **The copy is not a link.** After copying, edits to the source do not propagate to the copy and vice versa.
- **Plan to fill in the gaps.** Because only structure + name + level + system-type carry over, expect to revisit each new copy and assign location, zone, responsible team, items, and any engineering relationships you need.
- **Reuse names with care.** Names are copied verbatim. If you copy a subtree under a sibling and then look at the wider hierarchy, you will see duplicate names — rename copies that need disambiguation.
- **Bulk copies can be slow.** Recursive copy of a deep subtree creates many new systems server-side; expect the *Copying system…* toast to sit for a few seconds on large branches.
- **Use the Graph view** in the Leaves Panel for copy/paste when you want to see siblings while choosing the destination — the visual layout often surfaces a better target than a flat tree expansion.

## Related

- [Navigating the tree](./navigating-the-tree.md)
- [Editing system details](./editing-system-details.md)
- [Managing relationships](./managing-relationships.md)
- Moving a system to a different parent → see the `systemsMoving` module documentation in the [user guide index](../../README.md).
