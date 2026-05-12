# Creating and editing a catalogue item

## What this is for

Add a new product spec to the catalogue, or edit an existing one. A catalogue item is the abstract record everything else references — orders link to it, physical items in systems are instances of it, related-item links point at it. Get the base attributes and properties right here and the downstream modules will line up.

## Who can do this

✏️ **Editor / Admin** — requires the `catalogue-edit` role.

Viewers can open a catalogue item to read it, but the form fields are disabled and the *Save* / *Save & Exit* buttons are hidden.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Catalogue** page or on a catalogue item detail page.
- The category you need already exists in the category tree. If not, create it first — see [Managing categories and properties](./managing-categories.md).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Creating a new item

1. **Click *Add Item* in the top action bar.**
   The detail page opens in create mode. The form is empty; *Save* and *Save & Exit* are the visible action buttons.

   `[SCREENSHOT PLACEHOLDER: empty catalogue item detail page in create mode — left image gallery placeholder, right form with Catalogue Name, Part Number, Category, Supplier, Supplier/Manufacturer Url fields blank, Save and Save & Exit buttons in the header]`

2. **Fill in the base attributes** in the form on the right:

   | Field | Required | Notes |
   |---|---|---|
   | **Catalogue Name** | ✅ | Free text, displayed as the item's primary label everywhere |
   | **Part Number** | ✅ | Must be unique across the catalogue; uniqueness is verified live as you type |
   | **Category** | ✅ | Tree picker; the *Category: <parentPath>* label shows the full path of the selection. Selecting a category drives which property groups appear below |
   | **Supplier** | — | Picker from the Supplier codebook |
   | **Supplier/Manufacturer Url** | — | External URL; the link button next to the field opens it in a new tab once saved |
   | **Description** | — | Free-text area below the base fields |

3. **Fill in the property values.** Property groups for the selected category render as cards below the base form. Each card lists the properties defined on the category — *Property name*, type, and *Unit* labels are taken from the category definition. Property values are optional unless flagged otherwise by the category. Switching the category in step 2 rebuilds the property cards to match the new category.

   `[SCREENSHOT PLACEHOLDER: detail page mid-form with one property group card expanded — group title, three properties stacked with their unit labels visible, one filled in]`

4. **Click *Save* or *Save & Exit*.**
   *Save* persists the item and stays on the detail page (URL changes to include the new UID; image gallery and file manager become available — see [Attaching images and files](./attaching-images-and-files.md)). *Save & Exit* persists and navigates back to the catalogue list.

   A toast appears with the result: success → *Catalogue item saved*; failure → an error toast describing the cause (uniqueness collision, missing required field, server error).

### Editing an existing item

1. **Open the item** from the catalogue list — click the row. The URL takes the form `/catalogue/item/<uid>`.

2. **Edit any field** in the form. All fields are editable for `catalogue-edit`; viewers see them disabled. Property cards in the lower section can be edited freely.

3. **Switch the *Category* with caution.** Changing the category re-fetches the property structure: properties not defined on the new category disappear from the form, and new property fields appear empty. Property values for properties that exist on *both* old and new categories are preserved. Save the form to commit the new structure.

4. **Click *Save* or *Save & Exit*.** Same behaviour as in create mode.

`[VIDEO PLACEHOLDER: 45s — click Add Item → fill Name / Part Number / pick Category → property groups appear → fill a few properties → click Save → see toast → navigate to list to find the new item]`

## What gets created / changed

**✅ Created or updated by this workflow:**
- Catalogue item record with all base attributes and property values.
- A fresh audit entry (timestamp + user) — visible in the *Updated time* and *Updated by* columns of the catalogue list.

**❌ Not affected by this workflow:**
- **Images and files** — uploaded separately after the item has been saved at least once. See [Attaching images and files](./attaching-images-and-files.md).
- **Related items** — linked separately after save. See [Managing related catalogue items](./managing-related-items.md).
- **Orders** — populated automatically as orders reference this item; the *Orders* table on the detail page is read-only.
- **Physical items** — created and assigned in the [System Hierarchy](../../systemHierarchy/README.md) module, not here.

## Limitations

- **Part number must be unique** across the entire catalogue — not just within the selected category.
- **Property values are stored as strings today** — typed validation (number ranges, enum picks, booleans) is on the roadmap; for now the form accepts any text in any property.
- **No bulk import.** Items are created one at a time through the form.

## Tips & gotchas

- **Save once before adding media.** The image gallery and file manager only become operable after the first save — they need the item UID to attach uploads to.
- **Part number uniqueness is checked live.** If a duplicate is detected the form blocks the save with a validation message; you do not have to wait for the server round-trip.
- **Conflict detection on save.** If another user has edited the same item between your open and save, the server returns a 409 conflict and the toast tells you to reload. Reload the page to pick up the newest version, then re-apply your changes.
- **Switching category mid-edit is destructive for properties unique to the old category.** Their values are not deleted from the server until you save — so you can switch back if it was a mistake — but new properties that appear with the new category will be blank.
- **Manufacturer URL link button** is gated behind a saved URL: it only opens an external tab once the URL field contains a valid http(s) value.

## Related

- [Browsing and searching the catalogue](./browsing-and-searching.md)
- [Managing categories and properties](./managing-categories.md)
- [Attaching images and files](./attaching-images-and-files.md)
- [Managing related catalogue items](./managing-related-items.md)
- Physical item lifecycle → see the [System Hierarchy](../../systemHierarchy/README.md) module.
