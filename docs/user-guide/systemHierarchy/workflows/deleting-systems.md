# Deleting systems

## What this is for

Remove a system from the hierarchy when it no longer belongs there. Deletion is **recursive** — deleting a system also deletes every subsystem beneath it — so it is the right tool for retiring a whole branch, not just a single node. If you only want to move a system elsewhere, use the **Systems Moving** module instead; if you want to set a node aside without removing it, move it under the `TRASH` level (see [Editing system details](./editing-system-details.md)).

Deletion is a soft removal: the systems are flagged as deleted and disappear from the hierarchy, and the action is recorded against your user in the change history.

## Who can do this

✏️ **Editor / Admin** — requires the `systems-edit` role.

> 🔮 *Coming soon — Phase 1:* the delete action will be scoped by system level. Editors will be able to delete systems at `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, and `TRASH` levels only; deleting systems at `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT` will be admin-only.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean. Viewers see the **Delete System** menu item greyed out (disabled).

## Prerequisites

- You are looking at the System Hierarchy module.
- You know which system you want to delete, and you understand that **all of its subsystems will be deleted with it**.
- The system (and every subsystem under it) must have **no physical item attached** — otherwise the delete is blocked (see [Limitations](#limitations)).
- See [Key concepts](../README.md#key-concepts) for terminology (system, subsystem, physical item).

## Steps

The action is available in three surfaces — the left **tree**, the **leaves table** (middle panel in table view), and the **Leaves Panel Graph** (middle panel in graph view). The interactions are identical in all three.

1. **Right-click the system you want to delete.**
   A context menu opens. **Delete System** is at the bottom, shown in red.

   `[SCREENSHOT PLACEHOLDER: tree node right-clicked, context menu open with "Delete System" highlighted in red at the bottom, below Create/Copy/Paste entries]`

2. **Click *Delete System*.**
   A **Warning** dialog opens asking *"Are you sure you want to delete "&lt;name&gt;" and all its sub-systems?"*

   `[SCREENSHOT PLACEHOLDER: Warning dialog with the recursive-delete confirmation question, Cancel and Continue buttons]`

3. **Confirm with *Continue*** (or back out with *Cancel*).
   On confirm, a toast tracks the operation: *Deleting system…* → *System "&lt;name&gt;" deleted*.

4. **The view refreshes.** The deleted system and its subtree disappear from the tree, table, and graph. If you were viewing the deleted system (or one of its ancestors) in the detail panel, the selection clears so you are not left looking at a removed node.

`[VIDEO PLACEHOLDER: 20s — right-click a subsystem in the tree → Delete System → confirm in the Warning dialog → watch the node and its children disappear and the success toast appear]`

## What gets deleted

**✅ Removed by the delete:**
- The selected system.
- **Every subsystem beneath it**, to any depth.

**❌ Not removed:**
- **Parent and sibling systems** — only the selected node and its descendants go.
- **Physical items** — items are never deleted by this action; in fact their presence blocks the delete (see below).

## Limitations

- **Blocked by attached physical items.** If the system, or any subsystem under it, still has a physical item attached, the delete is refused and you get a toast: *Cannot delete "&lt;name&gt;": it still has attached physical items (…)*. The message lists the blocking items (up to three names, then a `(+N)` count). Detach or move those items first, then retry. See [Managing physical items](./managing-physical-items.md).
- **Recursive and not selective.** You cannot delete a parent while keeping its children — the whole subtree goes together. To preserve some children, move them to another parent first (Systems Moving module).
- **No bulk delete.** You delete one system (with its subtree) at a time.

## Tips & gotchas

- **The action is recursive — double-check the node.** The confirmation always names the system and warns about sub-systems. On a deep branch, deleting near the top removes a lot at once.
- **Childless rows still say "and all its sub-systems".** The wording is the same everywhere because the system *could* have children; for a true leaf it simply means "this one system".
- **Clear blocking items first.** The fastest path past a blocked delete is to open each system the toast names and detach or move its physical item.
- **Deleted, not destroyed.** Deletion is a soft removal recorded in history; if something was deleted in error, raise it with an administrator rather than recreating it by hand.

## Related

- [Navigating the tree](./navigating-the-tree.md)
- [Editing system details](./editing-system-details.md) — using the `TRASH` level to set a system aside instead of deleting it.
- [Managing physical items](./managing-physical-items.md) — detaching the items that can block a delete.
- [Copying systems](./copying-systems.md)
- Moving a system to a different parent → see the `systemsMoving` module documentation in the [user guide index](../../README.md).
