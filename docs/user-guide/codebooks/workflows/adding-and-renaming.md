# Adding and renaming codebook values

## What this is for

Add a new value to an existing codebook (a new supplier, a new department, a new contact role) or amend an existing value's *name* / *code* without breaking the records that already reference it. Codebook UIDs are stable, so a rename here updates the label everywhere the value is shown — past records remain connected by UID.

## Who can do this

🛡️ **Admin** — required for the page route. Codebooks with a module-scoped edit role (server-side `roleEdit`) may also be edited by that module's role-holders. See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have effective edit rights on the codebook (you can see it in the sidebar — see [Browsing codebooks](./browsing.md)).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Add a new value

1. **Open the codebook** from the sidebar. The main pane shows the value table and the *Add value* button.

2. **Click *Add value***. A modal opens — *Add value*.

   `[SCREENSHOT PLACEHOLDER: Add value modal centered over the page, single "Name *" field with placeholder "Enter value name", Cancel and Save buttons at the bottom]`

3. **Fill the *Name*** field. It is the only required field at creation. Validation:
   - Name is required.
   - Name must be at most 255 characters.

4. **Click *Save***. Toast progression:
   - *Adding value…* — request in flight.
   - *Value added* — success; the new row appears in the table.
   - *Failed to add value* — error; the modal stays open with the field so you can correct and retry.

5. **Set the *Code*** for the new value inline if needed (see *Rename — inline edit* below). Many codebooks need a code in addition to a name; the modal accepts only the name to keep creation fast — finish in the table row.

### Rename — inline edit of name or code

The values table supports cell-level inline editing for the **Name** and **Code** columns. The **UID** column is read-only.

1. **Click the *Name* cell** of the row you want to rename. The cell becomes an input pre-filled with the current value. A checkmark and X appear next to the field for confirm / cancel.

   `[SCREENSHOT PLACEHOLDER: values table with one row's Name cell expanded into an input — the input contains the new name, a green checkmark button and an X button visible immediately to the right of the input]`

2. **Type the new value**.

3. **Confirm** the change either by clicking the **checkmark** or pressing **Enter**. Toast progression:
   - *Saving changes…*
   - *Changes saved*
   - *Failed to save changes* — typically because the *Code* you typed already exists on another value (*This code already exists*).

4. **Cancel** the edit by clicking the **X** or pressing **Escape** — the cell reverts to the previous value.

5. **Edit the *Code* cell** the same way. Codes are trimmed of leading / trailing spaces on save.

### What inline edit *does not* let you change

- **UID** — system-generated, immutable. Editing the row preserves the UID, which is exactly what keeps downstream records connected.
- **Additional fields** (`additionalData`, `systemLevel`) — when present they are not editable inline today. Use the relevant module's dedicated editor (e.g. [System Type Edit](../../systemTypeEdit/README.md) for the system-type taxonomy).

`[VIDEO PLACEHOLDER: 40s — open Codebooks → pick LOCATION → Add value → fill name → Save → see new row → click the new row's Code cell → type a short code → press Enter → see Changes saved → click the Name cell of a different row → rename → confirm → cancel an edit halfway through with Escape to demonstrate]`

## What gets created / changed

**✅ Affected:**
- A new codebook value record (on add) with a fresh UID, the typed name, and an empty code.
- The existing value's *name* and/or *code* (on rename). The UID is unchanged.

**❌ Not affected:**
- Records elsewhere in the app that already reference this value. They keep their connection by UID. The new label / code propagates to displays everywhere the value is rendered.
- Other codebooks. Each codebook is independent.

## Limitations

- **Code uniqueness is enforced.** Saving a code that already exists on another value in the same codebook returns *This code already exists*. The conflict applies within the codebook only — `SUPPLIER` and `MANUFACTURER` can have overlapping codes.
- **Modal captures the name only.** Other fields (code, additional data) must be filled inline after creation.
- **No bulk import in the UI.** Values are added one at a time. For populating a new codebook with many entries, prepare a script or use a domain-specific module if it offers richer creation.
- **No drag-and-drop reorder.** Values render in server-side order; some pickers downstream are sorted at render time, but you cannot control that here.
- **No description / tooltip text on a value.** If a value's meaning needs explanation, capture that in external docs — the codebook stores only name + code.

## Tips & gotchas

- **Keep codes short and stable.** Codes that have already been used downstream (e.g. embedded in generated system codes via [System Type Edit](../../systemTypeEdit/README.md)'s mask) should not be renamed — the past generated identifiers won't follow.
- **Renames are silently global.** A change to *Supplier "Acme Inc."* → *"ACME Corporation"* updates the label in every order, every catalogue item, every detail view. Confirm the new name is genuinely the canonical form before saving.
- **Add via the modal, refine in the table.** The modal is intentionally minimal so the common case (just a name) is fast. Drop into the row's inline edit for code, additional data, etc.
- **Enter and Escape are friendly.** They are the fastest way to confirm and cancel inline edits when you are editing many rows.
- **Sidebar codebook code is also editable in some codebooks.** The sidebar shows the *codebook type* code (`LOCATION`, `SUPPLIER`), which is *not* editable. Inline edit on a value row changes the *value's* code, not the codebook's type.

## Related

- [Browsing codebooks](./browsing.md)
- [Deleting codebook values](./deleting.md)
- System Type taxonomy → see [System Type Edit](../../systemTypeEdit/README.md).
- Catalogue categories → see [Managing categories](../../catalogue/workflows/managing-categories.md) in the [Catalogue](../../catalogue/README.md).
