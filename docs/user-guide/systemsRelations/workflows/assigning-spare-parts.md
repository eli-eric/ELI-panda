# Assigning spare parts

## What this is for

Declare that one system serves as a *spare* for another, by creating an `IS_SPARE_FOR` relationship between them. Spare assignments drive the **SP Coverage** indicator that appears throughout the app — every system shows whether its required spares are present, and the colour cue on system rows / cards is computed from these links. Get the spare links right here and the coverage signals downstream become trustworthy.

This is a specialization of [Assigning relationships in bulk](./assigning-relationships-in-bulk.md) for the `IS_SPARE_FOR` type. The flow is the same; the difference is the validation step that fires for spares.

## Who can do this

✏️ **Editor / Admin** — requires the `systems-edit` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Systems Relations** page.
- The spare systems already exist as separate system entries. A spare is its own system record — it is not a duplicate of the primary, it is a peer system that happens to be designated as spare-for-another.
- You know which primary systems each spare covers. A single spare can cover several primaries, and a single primary can have multiple spares.
- See [Key concepts](../README.md#key-concepts) for relationship and coverage terminology.

## Steps

1. **Filter the left (Source) pane to the spare systems.** Typical narrowing:
   - Same *Catalogue Name* / *Part Number* — when sparing identical units;
   - Located in a stock area (filter by *Location* or *Zone*);
   - System level *Subsystems and parts* — spares almost always live here.

   `[SCREENSHOT PLACEHOLDER: Source Systems table filtered to a stock zone, three rows selected — visible columns: Name, System Code, Catalogue Name, Part Number, SP Coverage]`

2. **Filter the right (Target) pane to the primary systems** that the selected spares should cover. Typically narrowed by the same *Catalogue Name* / *Part Number* as the sources — sparing should preserve part interchangeability.

3. **Select sources and targets.** Tick the row checkboxes; use *Select all* in either pane after filtering. Disabled rows on each side are systems already chosen on the other side.

4. **Pick *Is Spare For* in the Relationship Type dropdown** on the right toolbar.

5. **Click *Assign Relationship*.**

6. **Resolve the validation prompt if it appears.** Before sending the batch, the form checks each source × target pair for:
   - **Part Number match** — every selected source has the same part number as every selected target.
   - **System Type match** — every selected source has the same system type as every selected target.

   If either check fails, a warning dialog lists the mismatches and asks you to confirm. You can:
   - **Cancel** and refine the selections, or
   - **Continue** to create the spare links anyway — useful for legitimate cross-type substitutes (e.g. a more capable spare covering a lesser primary), but a flag to double-check.

   `[SCREENSHOT PLACEHOLDER: warning modal titled "Spare validation" listing two pairs of source / target with different Part Numbers, Continue and Cancel buttons]`

7. **Confirm and read the result toast.** Same as [Assigning relationships in bulk](./assigning-relationships-in-bulk.md): the toast shows *Created N* / *Skipped N* counts with a list of skipped pairs (pairs that already had an `IS_SPARE_FOR` link).

8. **Verify the coverage update.** Refresh and look at the **SP Coverage** column on the target rows — it should reflect the new spares (values ≥ 1 indicate fully covered systems; values < 1 indicate the primaries still need additional spares to meet their requirement, and stay red). Open the *Spare Parts* modal on a target row to list every spare now assigned.

`[VIDEO PLACEHOLDER: 45s — open Systems Relations → filter source to spare stock → filter target to primaries with the same part number → select sources and targets → Is Spare For → Assign Relationship → resolve a Part Number warning → toast shows Created: 4 / Skipped: 1 → reopen target row to see Spare Parts modal listing the new links]`

## What gets created / changed

**✅ Created:**
- One `IS_SPARE_FOR` link per source × target pair.
- *SP Coverage* metric on each target recomputes immediately to include the new spares.
- The new spare is visible in the *Spare Parts* modal on the target and in the *Spare Part for Systems* modal on the source.

**❌ Not affected:**
- The required-spares count per system. The requirement (the denominator of coverage) is set per primary system separately — typically on the system's *Detail* tab in the [System Hierarchy](../../systemHierarchy/README.md) module — and is not changed by this workflow.
- The physical item attached to either side. Spare assignment is a *system-level* relationship; it does not move, swap, or duplicate physical items.
- The *Has spare for* count column on primaries refreshes after a page refresh.

## Limitations

- **Spare validation can be overridden.** Mismatched part numbers / system types only warn; they do not block. Document the substitution rationale elsewhere if you override.
- **No coverage-aware bulk constraint.** The workflow does not stop you from over-assigning spares (creating coverage > 1 across primaries). Use the SP Coverage column / filter to triage if needed.
- **No batch un-assign here.** Removing a spare link is a per-pair operation — see [Inspecting and removing relationships](./inspecting-and-removing.md).

## Tips & gotchas

- **Match part numbers and system types first.** The cleanest spare population is one where source and target share both — coverage is meaningful and the validation prompt does not fire.
- **Spare-for-many is fine.** Selecting one source and many targets makes that one spare countable for each of the targets. (It is still only one physical unit — see *Managing spare parts* on a system for the swap rationale.)
- **Many-spares-to-one-target is the normal case.** Selecting many sources and one target is how you reach coverage ≥ 1 for an under-covered primary.
- **Stale red rows.** A row whose *SP Coverage* is red even after assignment means the **required count** is higher than the spares now linked. Adjust requirements on the primary if the requirement is wrong, or assign more spares.
- **The coverage filter is the triage tool.** Use the *Spare Parts Coverage* range filter on the target pane to surface under-covered primaries before you assign.

## Related

- [Assigning relationships in bulk](./assigning-relationships-in-bulk.md)
- [Inspecting and removing relationships](./inspecting-and-removing.md)
- *Managing spare parts* on a single system → see the [System Hierarchy](../../systemHierarchy/README.md) module.
