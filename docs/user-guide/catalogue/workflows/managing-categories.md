# Managing categories and properties

## What this is for

Shape the catalogue tree and decide which property fields a catalogue item in a given category exposes. A category is both a navigation node (it groups related items) and a *property schema*: it defines a set of property groups and properties that every item in the category will display. Changes to a category cascade to every item beneath it — adding a new property makes that field appear on every existing item; removing one removes the field on every existing item.

Use this workflow when you need to add a new product family, reorganize the tree, or extend the data captured for a class of items.

## Who can do this

✏️ **Editor / Admin** — requires the `catalogue-edit` role.

> 🔮 *Coming soon — category-only admin:* the `catalogue-category-edit` role will split category management away from item editing. Editors will be restricted to item-level edits; category structure changes will be admin-only.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Catalogue** page.
- See [Key concepts](../README.md#key-concepts) for terminology (category, property group, property).

## Steps

### Add a new category

1. **Open the parent context.** Either select the parent category in the left tree (the new category will be created underneath it) or stay at *Home* to create a top-level category.

2. **Click *Add New Category*** — in the left tree (button at the bottom of the category list) or at the end of the breadcrumb above the table (*Add Category*).

3. **Fill the *Basic Information* block** in the category dialog:
   - **Name** (required) — the category label displayed in the tree.
   - **Code** — short identifier used in generated catalogue numbers.
   - **Parent category** — pre-filled from your selection in step 1; can be changed.
   - **Mini image** — small icon shown next to the category name in the tree.

   `[SCREENSHOT PLACEHOLDER: Add New Category dialog open with Basic Information section filled (Name, Code, Parent category dropdown), mini image upload control visible to the right]`

4. **Add property groups.** Below the basic information block sits *Property Groups*. Click *Add Group* to append a group; give it a *Group name*.

5. **Add properties to a group.** Inside each group, click *Add Property*. Each property has:
   - **Property name** — label shown on the item form.
   - **Property type** — string, number, etc. (see *Limitations* below for current type behaviour).
   - **Unit** — optional unit suffix displayed next to the field on the item form.
   - **Default value** — pre-fill applied to new items in this category (existing items are not affected).

   `[SCREENSHOT PLACEHOLDER: Category dialog scrolled to Property Groups section — one group named, two properties added to it with name / type / unit / default value columns visible, Add Property and Add Group buttons]`

6. **Save the category.** Submit the dialog. A toast confirms creation.

### Edit a category

1. **Hover the category in the left tree** to reveal the affordances (*Edit*, *Delete*, *Copy*, *Add Subcategory*). Click *Edit Category*.

2. **Adjust basic info, groups, and properties** in the same dialog used for creation. Renaming a property updates the label on every item in the category; the values themselves are preserved.

3. **Save.** Changes are propagated server-side; reload the catalogue list to see the new column labels reflected on existing items.

### Copy a category

1. **Hover the source category** in the tree, click *Copy*. The category structure (basic info template + property groups + properties) is cloned into a new sibling category. The new copy contains no items — copy only clones the *schema*, not the catalogue items inside.

### Delete a category

1. **Hover the source category**, click *Delete*. Confirm in the modal.

   Deletion is blocked server-side if the category still contains catalogue items or subcategories — move or delete those first. The error toast names the blocker.

`[VIDEO PLACEHOLDER: 40s — open Catalogue → click Add New Category → fill name + code + parent → add a property group → add two properties to it → Save → see the new branch appear in the tree → open Edit on it → rename a property → Save → open an item under that category to see the renamed field]`

## What gets created / changed

**✅ Affected by this workflow:**
- Category record with name, code, parent, mini image.
- Property group definitions on the category.
- Property definitions on each group.
- The *form layout* of every existing catalogue item in this category — fields appear or disappear immediately to match the new schema.

**❌ Not affected:**
- **Existing property values on items** — when a property is renamed or moved between groups, stored values are preserved. When a property is removed, its values are dropped from existing items.
- **Items in the category** — items are not moved or relabeled by category edits; only their *form structure* updates.
- **Order lines and physical items** — referenced catalogue items continue to be referenced.

## Limitations

- **Same facility scope.** Categories are global to the catalogue, not per-facility.
- **Property typing is partial.** Type metadata is captured on the property but the form treats all values as strings today. Plan to validate manually until typed validation ships.
- **No subcategory property inheritance.** Each category declares its own property groups; properties on a parent category are not inherited by its subcategories. Duplicate the structure with *Copy* and then trim.
- **Cannot delete a non-empty category.** Move or delete its items / subcategories first.

## Tips & gotchas

- **Property removal is destructive across the category.** Removing a property from a category deletes the stored values on every item in that category. Export or audit the values first if there is any chance you will need them back.
- **Renaming preserves values.** Use rename rather than delete-and-recreate when adjusting a property — values stay attached to the renamed property by UID, not by name.
- **Code is for generated catalogue numbers** — keep it short and stable. Changing the code on an existing category does not retroactively renumber items.
- **Copy is shallow.** Copy duplicates the category and its property schema but does not duplicate any items or subcategories inside.
- **Mini image is a navigation aid.** Use small, high-contrast icons; the tree shows them at a small size.

## Related

- [Browsing and searching the catalogue](./browsing-and-searching.md)
- [Creating and editing a catalogue item](./creating-and-editing-items.md)
- Codebook-managed values like *Supplier* → see the [user guide index](../../README.md) for the Codebooks module.
