# Managing spare parts

## What this is for

See which systems have been designated as spare parts for the currently-selected system, how well-covered the system is against its required minimum, perform a *Use Spare* swap to put a spare into service, and remove a designation that no longer applies. Companion view: the **Spare For** tab shows the inverse — which parent systems this system is registered as a spare for.

## Who can do this

| Action | Where | Role required |
|---|---|---|
| View the Spare Parts and Spare For tabs | System Hierarchy → Spare Parts / Spare For tab | `systems-view` (👁️ Viewer or higher) |
| **Use Spare** (run a spare swap) | Spare Parts tab → **Use** button per row | `systems-edit` (✏️ Editor / Admin) **AND** feature flag `enableSparePartsAssignment` enabled (today: enabled outside production) |
| **Remove** a spare designation | Spare Parts tab → trash icon (inbound) **or** Spare For tab → trash icon (outbound) | `systems-edit` (✏️ Editor / Admin) |
| Create a *Has spare* relationship | **Systems Relations** module or the **Relationships** tab | `systems-edit` (✏️ Editor / Admin) |

> 🔮 *Coming soon — feature-flag rollout to production:* the **Use Spare** action is live in non-production environments today. Once the `enableSparePartsAssignment` flag is enabled in production, the button becomes active everywhere.

> 🔮 *Coming soon — Phase 1 / Phase 2 permissions:* the same level- and team-based scoping described in [Access & Responsibilities](../README.md#access--responsibilities) will apply.

## Prerequisites

- You have a system selected and the **Spare Parts** or **Spare For** tab is open in the detail view.
- See [Key concepts](../README.md#key-concepts) for terminology (spare part, coverage, physical item, catalogue item).

## The Spare Parts tab

Lists all systems flagged as a spare *for* the currently-selected system, plus the aggregate coverage at the top. Same row-card layout as the *Spare For* tab.

`[SCREENSHOT PLACEHOLDER: Spare Parts tab with header "Spare Parts" on the left and a color-coded "Available 3 out of 5 required" on the right; below it a list of spare rows, each showing an icon, the spare's name, a coverage badge, an EUN badge, then a Use button and a trash icon]`

**Header:** *Available {available} out of {required} required* on the right side — sum of available spare units against the configured minimum on the parent system. Color-coded:

- 🟢 **Green** — coverage **meets or exceeds** the configured minimum on the parent.
- 🔴 **Red** — coverage is **below** the configured minimum (insufficient spares).
- ⚪ **Gray** — no minimum threshold is configured on the parent.

**Each row shows:**

| Element | What it shows |
|---|---|
| (Icon) | Item-usage icon for the spare's physical item (in use, in storage, …). |
| **Name** | Spare-part system name. |
| **Coverage badge** | Numeric coverage value for this individual spare, two decimals. |
| **EUN badge** | Equipment Unique Number of the spare's physical item (only when the spare has an item assigned). |
| **Use** | Opens the spare-swap wizard. |
| **Remove** (trash) | Disconnects the *Has spare* relationship after confirmation. The spare system itself is not deleted. |

**Interactions:**

- **Click a row** (outside the action buttons) to navigate to the spare system's detail — where you can see its location, catalogue number, parent path, etc.
- **Use button** — opens the spare-swap wizard (see *Using a spare* below).
- **Remove (trash icon)** — disconnects the *Has spare* relationship after confirmation.

### Why the Use button may be disabled

The *Use* button stays visible but is greyed out, with a tooltip explaining why, in these cases (in priority order):

1. You don't have the **`systems-edit`** role.
2. The **`enableSparePartsAssignment` feature flag is off** (today: production only).
3. The spare row has **no physical item** assigned yet — there is nothing to install.

## Using a spare (the swap)

A spare swap operates on **physical items at the system level**, not on the systems themselves. The hierarchy stays put.

1. Open the **Spare Parts** tab on the system you want to replace an item in.
2. Click **Use** on the spare row you want to install.
3. The two-step wizard opens:
   - **Step 1 — Item settings:** pick the **condition status** of the old item being removed (e.g. *Damaged*, *Working*) and the **location** the old item will land in. Choose whether to **auto-assign** the old item to the nearest `TRASH` ancestor (default — recommended).
   - **Step 2 — Select parent system** (only if you turned auto-assign off): pick a destination system for the old item from the searchable table.
4. **Submit.** A toast confirms success; the Spare Parts tab refreshes (no full page reload) and the coverage header updates.

### What happens under the hood

1. **Source system** — the in-service system whose item you replaced.
2. **Spare system** — the system you clicked *Use* on.
3. The spare's *physical item* moves into the **source system**.
4. The source system's **old item** is moved out — either to the nearest `TRASH` ancestor (default) or to the system you picked in step 2.

The item's identity, parameters (EUN, serial, condition status), notes, and service history all carry over with the move. The item is the same database record from before the swap; only its assignment to a system changes.

`[VIDEO PLACEHOLDER: 45s — open Spare Parts tab on a key system, click Use on a spare row, walk through the two wizard steps with default auto-assign on, submit, point out the refreshed coverage header]`

## The Spare For tab

The inverse view of *Spare Parts*. Lists the parent systems this system is registered as a spare for. Useful when you're looking at a spare system and want to know **what it could replace**.

`[SCREENSHOT PLACEHOLDER: Spare For tab with two rows showing parent system icon, name, EUN badge, an arrow, and a trash icon]`

**Each row shows:**

- Item-usage icon for the parent system's physical item.
- Parent system name.
- EUN badge (if the parent has a physical item attached).
- A right-pointing arrow indicating the row is clickable.
- A trash icon (right-aligned) to remove this designation.

**Interactions:**

- **Click a row** (outside the trash icon) to navigate to the parent system.
- **Trash icon** — removes the spare designation (outbound side). After confirmation, the relationship is dropped and the parent system's Spare Parts tab loses this row on next view.

## Where assignments are made

The act of **designating** one system as a spare for another (creating the *Has spare* edge) happens in either:

- the **Systems Relations** module — bulk-friendly cross-system view, or
- the **Relationships** tab inside System Hierarchy — single-system view.

Once the designation exists, **using** or **removing** it happens here in the Spare Parts / Spare For tabs.

## Tips & gotchas

- **Coverage is computed automatically** from the spare relationships and their items — you don't enter it manually.
- **A spare without a physical item is still listed** but contributes nothing to coverage. The *Use* button on that row is disabled until an item is attached.
- **Plan your `TRASH` levels.** A facility-wide convention for where TRASH systems sit (one per technology unit? one global?) makes the swap default predictable.
- **"Has spare" vs "Spare for"** appear mirrored on the source and on the spare system. Same edge, different perspective.
- **Remove vs Use** — *Remove* drops the designation only (an admin decision, no item moves). *Use* moves the item.
- **Use the relationship view for the engineering picture** — spares are also visible in the Detail → Graph tab as colored edges. See [Managing relationships](./managing-relationships.md).

## Related

- [Managing relationships](./managing-relationships.md) — for creating the *Has spare* / *Spare for* edges in the broader graph.
- [Editing system details](./editing-system-details.md) — for the `TRASH` level and other system-level meanings.
- [Managing physical items](./managing-physical-items.md) — for how items are assigned and moved (the swap is a special case of moving items).
- Systems Relations module → see [user guide index](../../README.md) — for creating spare-part assignments in bulk.
