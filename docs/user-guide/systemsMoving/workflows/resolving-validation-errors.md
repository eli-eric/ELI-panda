# Resolving move validation errors

## What this is for

Understand the rejections you may hit while moving a system, and what to do about each one. The Systems Moving module enforces a small but strict set of rules to keep the hierarchy a tree (no cycles) and to avoid no-op operations (dropping a system on itself). When a drop is refused, the dialog does not open and an error toast appears instead — this workflow walks through the toasts and the fix for each.

## Who can do this

👁️ All personas — the validation messages surface for anyone attempting to drag, regardless of role. Only `systems-edit` can complete a valid move.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems Moving** page.
- You have attempted a drag-and-drop and received an error toast, or you want to understand the rules before attempting.
- See [Key concepts](../README.md#key-concepts) for terminology (cycle, source, destination).

## The validations

### 1. Dropping on a descendant — cycle

**Symptom.** You drag system A onto a row that turns out to be inside A's own subtree. The dialog never opens; you see an error toast:

> *System cannot be moved under itself or its sub-systems*

**Why.** The hierarchy is a tree — every system has exactly one parent. Allowing a system to become a descendant of itself would create a cycle, breaking every tree walk in the application (breadcrumbs, search-up-the-path, role inheritance, copy walks).

**How to fix.**
- **Identify the destination's ancestors.** Look at its breadcrumb in the pane — anywhere in that path is forbidden as a source.
- **Move the destination first** if the relocation you want is genuinely *swap parent and child*. Re-parent the destination to a neutral ancestor, then move A normally, then put the previous destination back where you want it. Each step is a normal move.
- **Re-think the structure.** If you find yourself wanting to put a key system inside one of its own subsystems, the model usually wants you to introduce a third *common parent* and make both systems siblings under it.

`[SCREENSHOT PLACEHOLDER: error toast reading "System cannot be moved under itself or its sub-systems" with the tree behind it showing the source A and the highlighted descendant target]`

### 2. Dropping on the source — self-move

**Symptom.** You drag system A and release on the same row A. The dialog never opens; the same toast appears:

> *System cannot be moved under itself or its sub-systems*

**Why.** The destination must be different from the source. A self-move is a no-op.

**How to fix.** Pick a different destination row. If you only wanted to *edit* fields on the source (rename, change responsible, etc.) use the system's detail page in the [System Hierarchy](../../systemHierarchy/README.md) module instead — the Moving page is not a general editor.

### 3. Server-side rejection — *Failed to move system*

**Symptom.** The dialog opens, you click *Save*, and you receive a toast:

> *Failed to move system: <reason>*

**Why.** A condition the client did not check has been violated server-side. Typical causes:
- Another user re-parented the source or deleted it between your page load and your save.
- A transient database / connectivity error.
- An auth check failed (token expired mid-session).

**How to fix.**
- **Refresh both panes.** The *Refresh* button on each pane forces a refetch; you may see the source has already moved or been removed.
- **Re-attempt the move.** If the source still exists in its expected location, run the workflow again.
- **Sign in again** if the error mentions authentication.

### 4. Server-side rejection — *Failed to update system*

**Symptom.** The dialog opens, you click *Save*, and a toast appears:

> *Failed to update system: <reason>*

**Why.** The dialog runs an *update* before the *move*. If the update fails (validation error on a changed field, conflict with concurrent edits), the move does not proceed.

**How to fix.**
- **Read the reason in the toast.** It will name the failing field or the conflict.
- **Reload the dialog.** Close it, drag again, the fields will refresh.
- **Make the edits in the detail page first**, then come back here and run the move with no edits.

## Tips & gotchas

- **No partial state.** If the move fails server-side, neither the parent edge nor the field updates are applied — the operation is atomic.
- **The toast wording is generic.** It does not always identify which sub-rule was hit; check the source / destination panes for the most likely cause (the destination is inside the source's subtree, the source has been deleted by another user, etc.).
- **Validation is client- *and* server-side.** The cycle and self-move checks fire in the browser before opening the dialog. Server-side checks fire on save and may include conditions that change between page load and save.
- **There is no undo affordance for a refused move.** Nothing has changed; the toast is the only side effect.
- **Sense-check before you grab.** Hovering the candidate destination shows you its parent path in the pane — if the source's name appears anywhere in that path, the move will be refused.

## Related

- [Moving a system to a new parent](./moving-a-system.md)
- *Navigating the tree* and *Editing system details* → see the [System Hierarchy](../../systemHierarchy/README.md) module.
- Multi-system relocate → see [Systems Multi-Move](../../README.md).
