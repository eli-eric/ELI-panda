# Managing spare parts

## What this is for

See which systems have been designated as spare parts for the currently-selected system, how well-covered the system is against its required minimum, and understand how a spare swap works conceptually. **The Spare Parts tab in System Hierarchy is read-only** — assignments and the swap action live in other modules today.

## Who can do this

| Action | Where | Role required |
|---|---|---|
| View the Spare Parts tab and coverage | System Hierarchy → Spare Parts tab | `systems-view` (👁️ Viewer or higher) |
| Assign / unassign a system as a spare | **Systems Relations** module | `systems-edit` (✏️ Editor / Admin) |
| Perform a spare swap (*Use Spare*) | Currently the deprecated shared spare flow (feature-flagged off in production) | `systems-edit` (✏️ Editor / Admin) |

> 🔮 *Coming soon — Use Spare in System Hierarchy:* the spare-swap wizard will be brought into this module. Today it lives in a deprecated flow that is disabled in production via the `enableSparePartsAssignment` feature flag.

> 🔮 *Coming soon — Phase 1 / Phase 2 permissions:* the same level- and team-based scoping described in [Access & Responsibilities](../README.md#access--responsibilities) will apply.

## Prerequisites

- You have a system selected and the **Spare Parts** tab is open in the detail view.
- See [Key concepts](../README.md#key-concepts) for terminology (spare part, coverage, physical item, catalogue item).

## What the Spare Parts tab shows

The tab shows all systems flagged as a spare for the currently-selected system, plus the aggregate coverage at the top.

`[SCREENSHOT PLACEHOLDER: Spare Parts tab with header reading "Available 3 out of 5 required" and a table below with columns Icon, Name, Location, Coverage, Part Number, EUN — coverage values in red and green]`

**Header:** *Available {available} out of {required} required* — sum of available spare units against the configured minimum on the parent system.

**Columns:**

| Column | What it shows |
|---|---|
| (Icon) | Item-usage icon for the spare's physical item (in use, in storage, …). Sticky and not hideable. |
| **Name** | Spare-part system name. Hovering shows the full ancestor path. |
| **Location** | Location name and code (e.g. *Lab A — LC-001*). |
| **Coverage** | Numeric coverage value, two decimals, color-coded — see *Coverage colors* below. |
| **Part Number** | Catalogue number of the spare's physical item. |
| **EUN** | Equipment Unique Number of the spare's physical item. |

**Coverage colors:**

- 🟢 **Green** — coverage **meets or exceeds** the configured minimum on the parent.
- 🔴 **Red** — coverage is **below** the configured minimum (insufficient spares).
- ⚪ **Gray** — no minimum threshold is configured on the parent.

**Interactions:**

- **Click a row** to navigate to the spare system's detail.
- **Sort and reorder columns** like any other table; column visibility is configurable, except the icon column.
- **No row-level actions** — the tab is read-only.

## How spares conceptually work

Even though System Hierarchy doesn't expose the swap action today, you should know how the underlying flow works because the *Spare Parts* tab and the [Managing relationships](./managing-relationships.md) view both reflect it.

### The swap

A spare swap operates on **physical items at the system level**, not on the systems themselves. The hierarchy stays put.

1. **Source system** — the in-service system whose item failed or is being replaced.
2. **Spare system** — a system designated as a spare for the source (an *Has spare* relationship).
3. The spare's *physical item* moves into the **source system**.
4. The source system's **old item** is moved out — see *Old item destination* below.

After the swap, the source system continues to operate (now with the spare's item installed) and the spare system has been emptied of its physical item.

### Old item destination

The old item that just came out of the source system has to go somewhere:

- **Default** — it is moved into the **nearest ancestor whose system level is `TRASH`**, walking up the tree. This is why placing one or more `TRASH`-level systems sensibly in your hierarchy matters: they are the natural collection points for retired or damaged items.
- **User-chosen** — when running the swap, the user can override the default and pick a different target system to receive the old item. This is useful when the item still has life and you want it parked under a "to be repaired" branch instead of plain `TRASH`.

> 💡 The item's identity, parameters (EUN, serial, condition status), notes, and service history all carry over with the move. The item is the same database record from before the swap; only its assignment to a system changes.

## Where assignments are made

**Today:** spare-part relationships (an *Has spare* edge between two systems) are created in the **Systems Relations** module — see [user guide index](../../README.md). System Hierarchy only shows the result on the *Spare Parts* tab and on the *Relationships* tab.

When the Use Spare action ships in System Hierarchy, this section will be updated.

`[VIDEO PLACEHOLDER: 30s — select a key system, open the Spare Parts tab, point out the coverage header (red vs green), click a spare row to navigate to it, then back to the source]`

## Tips & gotchas

- **Coverage is computed automatically** from the spare relationships and their items — you don't enter it manually.
- **A spare without a physical item is still listed** but contributes nothing to coverage. If a spare row shows up in red and has no Part Number / EUN, the assigned spare system has no item attached yet.
- **Plan your `TRASH` levels.** A facility-wide convention for where TRASH systems sit (one per technology unit? one global?) makes the swap default predictable.
- **"Has spare" vs "Spare for"** appear mirrored on the source and on the spare system. Same edge, different perspective.
- **Use the relationship view for the engineering picture** — spares are also visible in the Detail → Graph tab as colored edges. See [Managing relationships](./managing-relationships.md).

## Related

- [Managing relationships](./managing-relationships.md) — for the *Has spare* / *Spare for* edges in the broader graph.
- [Editing system details](./editing-system-details.md) — for the `TRASH` level and other system-level meanings.
- [Managing physical items](./managing-physical-items.md) — for how items are assigned and moved (the swap is a special case of moving items).
- Systems Relations module → see [user guide index](../../README.md) — for creating spare-part assignments.
