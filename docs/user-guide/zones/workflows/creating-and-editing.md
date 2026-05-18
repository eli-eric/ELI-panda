# Creating and editing zones

## What this is for

Add a new zone to the registry, rename an existing zone, change its code, update its notes, or move a zone under a different parent (or back to root). Zones are referenced from many other modules in PANDA — system records, [Control Systems](../../controlSystems/README.md) code generation, [Room Cards](../../roomCards/README.md), the [Systems Overview](../../systems/README.md) filter sheet — so the names and codes you choose here propagate widely. Rename is non-destructive (existing references are by UID), but the *Code* is what drives generated system code strings, so changing it has downstream consequences (see *Tips & gotchas*).

## Who can do this

✏️ **Zone Editor / Admin** — requires the `zones-edit` role.

Viewers can browse the list but the *Add Zone* button and per-row *Edit* affordance are hidden.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `zones-edit`.
- If creating a subzone, the parent zone already exists as a **root** zone (a zone with no parent of its own).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Add a new zone

1. **Click *Add Zone*** in the top toolbar. The *Create Zone* sheet opens over the page.

2. **Fill the form fields:**

   | Field | Required | Notes |
   |---|---|---|
   | **Name** | ✅ | Display label. Placeholder *Enter zone name*. |
   | **Code** | ✅ | Short identifier substituted into the System Type mask as `{ZC}` for code generation. Placeholder *Enter zone code*. Pick short, stable codes — see *Tips & gotchas* below. |
   | **Parent Zone** | — | Picker over root zones only. Leave blank for a root zone; pick a root zone to make this a subzone. Placeholder *Select parent zone (optional)*. The option *None (root zone)* explicitly returns to root. |
   | **Notes** | — | Multi-line free text. URLs in the notes will auto-link in the table tooltip. Placeholder *Enter zone notes*. |

   `[SCREENSHOT PLACEHOLDER: Create Zone sheet open over the page — Name and Code filled, Parent Zone combobox open with two root zones in the dropdown plus the "None (root zone)" option at the top, Notes text area below with a URL pasted in]`

3. **Click *Create Zone***. Toast progression:
   - *Creating…* — request in flight.
   - *Created* — success; the sheet closes and the new row appears in the table.
   - *Save failed* — error; the sheet stays open with your values so you can correct.

### Edit an existing zone

1. **Open the per-row dropdown** on the zone row (the *Actions* column).

2. **Click *Edit Zone***. The *Edit Zone* sheet opens with the current values pre-filled.

3. **Adjust the fields**. The *Parent Zone* picker still filters to root zones only, and excludes **this** zone from the candidate list (preventing self-reference).

4. **Click *Save Zone***. Toast progression mirrors creation: *Saving…* → *Saved* / *Save failed*.

`[VIDEO PLACEHOLDER: 45s — open Zones → Add Zone with a fresh name, code, and notes (no parent) → Save → see new row → reopen its dropdown → Edit Zone → change the Parent Zone from "None" to an existing root zone → Save → see the Parent Zone column update]`

## What gets created / changed

**✅ Created on add:**
- A new Zone record with a fresh UID, the typed *Name*, *Code*, *Notes*, and the chosen *Parent Zone* (or none).

**✅ Changed on edit:**
- *Name*, *Code*, *Notes*, *Parent Zone* on the existing record. The UID is preserved.

**❌ Not affected:**
- Existing records that reference this zone (systems, room cards, control-systems codes, order lines). They keep their reference by UID and re-render the new label / code automatically.
- Subzones nested under this zone (if it is a parent). Changing the parent's name or notes does not touch the subzones; changing the parent's *code* does change the code that subzones display in their *Parent Zone* breadcrumbs in some surfaces, but the subzones themselves keep their own codes.

## Limitations

- **Two-level nesting cap (today).** The parent picker filters to root zones only — you cannot pick a subzone as a parent. So the tree never goes deeper than root → subzone. Deeper nesting is on the roadmap.
- **No code uniqueness enforcement in the UI.** Two zones could share a code in principle; in practice this breaks code generation because the `{ZC}` substitution becomes ambiguous. Keep codes unique manually.
- **No history view per zone.** Rename audits are not surfaced. Discussion of what changed lives elsewhere (Slack, change tickets).
- **No bulk edit.** Each zone is edited one at a time; the toolbar has no multi-select.
- **No drag-and-drop reordering or re-parenting.** The form is the only path to changing the parent.

## Tips & gotchas

- **Code changes are NOT retroactive.** Renaming the zone updates the *Name* label everywhere. Changing the *Code* does **not** retroactively rewrite existing system codes — those are stored on the systems when they were generated. New system codes generated after a zone-code change will use the new code; existing systems keep the old `{ZC}` substring in their stored code. Plan code changes carefully.
- **Pick the parent before you save the first time.** Changing a zone from root to subzone, or vice versa, propagates to every downstream surface (Control Systems filter eligibility, Room Cards links, Systems Overview filter). Decide once.
- **Notes are a great place for SOPs and contacts.** Paste a SharePoint / Confluence link; the table tooltip auto-linkifies the URL.
- **Code length is uncontested.** Two- or three-character codes (e.g. `B`, `B1`, `CR2`) work best with the standard 3-digit serial in the System Type mask. Longer codes inflate generated system codes.
- **None (root zone)** in the Parent Zone picker is the explicit way to *de-link* a subzone from its parent — promote it to a root zone.

## Related

- [Browsing zones](./browsing.md)
- [Importing zones from CSV](./importing-csv.md)
- [Deleting zones](./deleting.md)
- Code generation reference → see [Understanding the code mask](../../systemTypeEdit/workflows/code-mask.md) in the [System Type Edit](../../systemTypeEdit/README.md) module.
- Control-systems batch creation against root zones → see [Creating system codes in batch](../../controlSystems/workflows/creating-system-codes.md) in the [Control Systems](../../controlSystems/README.md) module.
