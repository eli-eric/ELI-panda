# Assigning relationships in bulk

## What this is for

Wire up many engineering relationships in one operation — when you have a set of source systems that all relate to a set of target systems through the *same* relationship type. Examples:

- *Powered from*: every system in a rack is powered from the same PDU. Select the rack's systems on the left, select the PDU on the right, assign *Is Powered From*.
- *Cooled from*: a chiller cools four downstream loops. Source = the loops; target = the chiller.
- *Provides data to*: one DAQ provides data to several control systems.

Per-pair edits on a single system still live on the system detail page (see *Managing relationships* in the [System Hierarchy](../../systemHierarchy/README.md) module); this workflow is the dedicated tool for the many-at-once case.

## Who can do this

✏️ **Editor / Admin** — requires the `systems-edit` role.

> 🔮 *Coming soon — Phase 1:* relationships involving systems at `SYSTEM_DOMAIN` or `TECHNOLOGY_UNIT` levels will become admin-only.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems Relations** page (sidebar entry under *Systems* → *Relations*).
- You know the source and target sets, and which relationship type to apply.
- See [Key concepts](../README.md#key-concepts) for relationship types and direction semantics.

## Steps

The page is a two-pane workbench. Source selection happens on the left; target selection plus the type and the action button live on the right.

1. **Filter the left pane to your source systems.** Use the search box, the filter sheet, and column sorting to narrow the *Source Systems* table to the systems you want as the *from* side of the relationship.

   `[SCREENSHOT PLACEHOLDER: left pane Source Systems with filters applied — chips visible above the table, two rows ticked with the row checkbox, header select-all in indeterminate state]`

2. **Select the source rows.** Tick the row checkboxes; or tick the header select-all to grab every row in the current filtered set. The selection count is reflected in the pane header.

3. **Filter the right pane to your target systems.** Same toolbar — independent filter and search.

4. **Select the target rows.** Same multi-select behaviour. Rows that are already selected in the left pane are disabled on the right (a system cannot be source and target at the same time) — and vice versa.

   `[SCREENSHOT PLACEHOLDER: right pane Target Systems with one row selected, two other rows greyed out and flagged as already-source]`

5. **Pick the *Relationship Type*** in the dropdown at the right of the target toolbar. The dropdown lists the eight assignable types — *Is Spare For*, *Is Powered From*, *Is Cooled From*, *Is Controlled By*, *Is Interlocked By*, *Provides Data To*, *Directs Beam To*, *Provides Vacuum For*.

6. **Click *Assign Relationship*.**

   - **For *Is Spare For*** the form runs a quick validation: if the selected sources and targets do not share part numbers or system types, a warning dialog appears so you can confirm before continuing. See [Assigning spare parts](./assigning-spare-parts.md) for the spare-specific flow.
   - **For all other types**, the relationships are created directly with no extra confirmation.

7. **Read the toast.** The server returns a count of created vs. skipped relationships:
   - *Created N* — the number of new links the operation made.
   - *Skipped N* — the number of source-target pairs that already had the same relationship (server-side duplicate guard) or that the server otherwise refused; details are listed in the toast.

   `[SCREENSHOT PLACEHOLDER: success toast showing "Created: 6, Skipped: 2" with the skipped list expanded — two rows naming the pairs that already had the same link]`

8. **Verify.** Open the *Spare Parts* or *Spare Part for Systems* modal on a target row to see the new links (for `IS_SPARE_FOR`); or open a system's detail page and the *Relationships* tab to see the link for other types. See [Inspecting and removing relationships](./inspecting-and-removing.md) and *Managing relationships* in the [System Hierarchy](../../systemHierarchy/README.md) module.

`[VIDEO PLACEHOLDER: 40s — open Systems Relations → filter sources to a zone → select-all sources → filter targets to a single chiller → select one target → pick Is Cooled From → Assign Relationship → toast confirms created count]`

## What gets created

**✅ Created by this workflow:**
- One directed relationship of the chosen type per source × target pair (Cartesian product).
- Each new link is visible immediately in both the source's outbound view and the target's inbound view.

**❌ Not affected:**
- Source and target system records themselves.
- Existing relationships of *other* types between the same systems.
- The system hierarchy tree (parent-child structure).

## Limitations

- **Single relationship type per submission.** All source × target pairs in one click get the same type. Run the workflow again for a different type.
- **Server-side duplicates are silently skipped.** A pair that already has the chosen relationship type is reported as *skipped*, not as an error.
- **Self-relationship is blocked.** The disabled-row rule prevents picking the same system on both sides.
- **No "replace" operation.** To change an existing relationship's type, delete the old one first (see [Inspecting and removing relationships](./inspecting-and-removing.md)) and create the new one.

## Tips & gotchas

- **Filter before you select.** With wide tables it is much faster to filter to the desired population and *Select all* than to scroll through and tick individually.
- **Use independent filters per pane.** The two tables do not share filters. Filter the left pane by *spare* characteristics and the right pane by *primary* characteristics for the `IS_SPARE_FOR` workflow.
- **Watch the row colour.** Rows whose physical item is unhealthy or whose spare-parts coverage is below 1 are flagged in red; you will usually want to avoid them as targets and prioritize them as sources for spare assignments.
- **Skipped pairs are usually OK.** A non-zero *Skipped* in the result toast is almost always a duplicate, not a failure. Inspect the *skipped details* if the count is unexpectedly high.
- **Cartesian product can be large.** Selecting 50 sources and 50 targets creates up to 2,500 relationships — this is supported but expect the toast to sit briefly while the batch completes.

## Related

- [Assigning spare parts](./assigning-spare-parts.md)
- [Inspecting and removing relationships](./inspecting-and-removing.md)
- *Managing relationships* on a single system → see the [System Hierarchy](../../systemHierarchy/README.md) module.
- *Managing spare parts* (read-only view) → see the [System Hierarchy](../../systemHierarchy/README.md) module.
