# Creating system codes in batch

## What this is for

Mint a *batch* of system codes against a single **Zone + System Type** combination in one operation. The per-system *Generate System Code* affordance on a system detail page is fine for one code at a time; this workflow is built for commissioning runs where you need N consecutive codes ready before the units arrive — typically 5, 10, or 25 in a single submission. The Create page shows a live preview of what will be generated so you can confirm the next-serial range before committing, and accumulates a "Created in this session" history on the right as you submit subsequent batches.

## Who can do this

✏️ **Control-Systems Editor / Admin** — requires the `control-systems-edit` role.

Viewers cannot reach the Create page; the *Create System Codes* button on the Overview is hidden, and the route is gated.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `control-systems-edit` and reached the Create page (via the **Create System Codes** button on the Overview, or directly at `/control-systems/system-codes-create`).
- The **Zone** you intend to target is a **root** zone in the Zone codebook. Sub-zones are not eligible here.
- The **System Type** you intend to use has its **mask** configured. The mask drives how the code string is composed (see [Understanding the code mask](../../systemTypeEdit/workflows/code-mask.md) in the [System Type Edit](../../systemTypeEdit/README.md) module).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

The Create page is a **two-pane workbench**. The left pane is a small form; the right pane is a live preview that also accumulates the codes you have created in the current session.

1. **Pick the *Zone*** in the form. The combobox lists *root* zones only. Code generation will substitute the zone's code into the type's mask wherever `{ZC}` appears.

   `[SCREENSHOT PLACEHOLDER: Create page with the Zone combobox open, three root zones in the dropdown, the first one being hovered]`

2. **Pick the *System Type***. The type's mask drives the code template. After selection, the right pane will start rendering preview rows once the batch count is set.

3. **Set the *Batch Count***. Spinner with ± controls and a numeric input. Range **1–25**. Placeholder: *Number of system codes to create*.

   Each integer change re-fetches the preview after a short debounce — the right pane updates to show that many candidate rows.

   `[SCREENSHOT PLACEHOLDER: form with Zone and System Type set, Batch Count spinner at 5; right pane showing five Preview rows badged grey beneath the empty Created band]`

4. **Inspect the preview** in the right pane. Each preview row shows:
   - **Status badge** — *Preview*, in a subdued style.
   - **System Code** — the candidate code, derived from the selected Zone + System Type + the next available serial.
   - **Name**, **Zone**, **Parent path** — the contextual fields that will be set on the resulting systems.

   No state has been created on the server yet; preview is purely visual.

5. **Click *Create System Codes***. Toast progression:
   - *Creating system codes…* — request in flight.
   - *System codes created successfully* — success.
   - *Failed to create system codes* — error; the form stays populated for retry.

6. **Review the *Created* band** that now sits at the top of the right pane. Each newly created row:
   - Has the green *Created* badge.
   - Has a clickable **System Code** — opens the corresponding system detail in a new tab.
   - Sits above the Preview band so you keep visual continuity for the next batch.

7. **Run another batch.** Change Zone / System Type / Batch and click *Create System Codes* again. Each successful submission **prepends** to the Created band; the session history accumulates until you navigate away.

`[VIDEO PLACEHOLDER: 60s — open Create page → pick Zone → pick System Type → set Batch to 3 → see three Preview rows → Create → see three Created rows appear above the Preview band → change System Type → see preview rebuild → set Batch to 1 → Create → see Created band grow by one]`

## What gets created / changed

**✅ Created by this workflow:**
- One system code per row in the submitted batch.
- Each new code is stored on the systems-code registry visible on the Overview.
- The per-zone / per-prefix serial counter is advanced by the batch size.

**❌ Not affected:**
- Existing system codes. They are not renumbered.
- The Zone or System Type records themselves.
- Systems in the [System Hierarchy](../../systemHierarchy/README.md) until they bind to a code via the per-system *Generate System Code* path. The Control Systems Create page mints codes; binding to an existing system is a separate operation.

## Limitations

- **Batch range is 1–25 per submission.** Larger campaigns are run as multiple back-to-back batches; the Created band keeps them all visible during the session.
- **Root zones only.** Sub-zones are not eligible targets here. To create codes inside a sub-zone, switch to the per-system *Generate System Code* path in the [System Hierarchy](../../systemHierarchy/README.md) module.
- **No reservation / draft state.** Codes are committed on submission; there is no "preview-and-save-without-binding" mode.
- **Session-scoped history.** The Created band lives in the current session only. Refreshing the page or navigating away clears the band — the codes themselves are persisted server-side and continue to appear on the Overview.
- **Mask configuration is read-only here.** The code string is determined by the System Type's mask; to change it, edit the mask in [System Type Edit](../../systemTypeEdit/README.md) before creating.

## Tips & gotchas

- **Verify the preview before submitting.** The preview is the canonical "what will be generated" — read it row by row for the first batch you run against a new type, then trust it.
- **The mask is the contract.** If the preview shows codes that look wrong (missing zone, wrong padding, unexpected prefix), the System Type's mask is the cause. Open it in [System Type Edit](../../systemTypeEdit/README.md), tweak, and come back.
- **Created rows are deep-linkable.** Each Created row's *System Code* opens the corresponding system detail in a new tab. Useful for printing labels: open them all in tabs, walk through and confirm.
- **The serial counter is per-prefix.** Two types sharing the same `{STC}{ZC}` prefix share the counter. Avoid this scenario by giving each type a distinct code.
- **Submission is atomic.** Either every code in the batch is created, or none. A failed submission leaves the registry untouched.
- **Switching tabs preserves the form.** Navigating to the Overview to verify and back to Create preserves the form values until the page is closed.

## Related

- [Browsing the system-codes overview](./browsing-overview.md)
- [Editing or deleting an existing system code](./editing-and-deleting.md)
- Per-system code generation → see *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md) module.
- Mask reference → see [Understanding the code mask](../../systemTypeEdit/workflows/code-mask.md) in the [System Type Edit](../../systemTypeEdit/README.md) module.
- Zones codebook → see the [Zones](../../zones/README.md) module.
