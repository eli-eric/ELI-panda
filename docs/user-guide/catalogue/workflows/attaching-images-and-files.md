# Attaching images and files

## What this is for

Add visual context and documentation to a catalogue item — product photos, dimensional drawings, datasheets, certificates, supplier links. Images are shown in the gallery on the left of the detail page; files are listed in a manager below the form. Both attach to the catalogue item record and surface anywhere the item is referenced (orders, related-items pickers).

## Who can do this

✏️ **Editor / Admin** — requires the `catalogue-edit` role.

Viewers see the image gallery and the file list but cannot upload, delete, or add links.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on a catalogue item detail page (URL `/catalogue/item/<uid>`).
- The item has been saved at least once. The image gallery and file manager only become operable after the first save — they attach uploads against the item UID.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Add an image to the gallery

1. **Open the catalogue item.** Scroll to the image gallery on the left side of the detail page.

   `[SCREENSHOT PLACEHOLDER: catalogue item detail page with image gallery on the left showing two existing thumbnails plus the empty upload tile; main image preview area on top of the strip]`

2. **Drag-and-drop an image file** onto the gallery, or click the upload tile and pick a file. A progress toast tracks the upload; on success the thumbnail joins the strip.

3. **Set the primary image.** Click a thumbnail to make it the main display image — this is the image used in the catalogue list, in pickers, and on linked-orders previews. The primary image is marked in the strip.

### Remove an image

1. **Hover the thumbnail** in the gallery and click the delete affordance. Confirm in the modal. The file is removed from storage immediately; a toast confirms.

### Add a file (datasheet, drawing, certificate)

1. **Scroll to the file manager** below the form on the detail page.

   `[SCREENSHOT PLACEHOLDER: file manager block with two existing rows — first row a PDF datasheet with a tag chip, second row an external link with a tag — and an Upload File / Add Link control above]`

2. **Click *Upload File*** and pick a local file. Or click *Add Link* to attach an external URL (manufacturer datasheet page, certificate PDF on the supplier's site).

3. **Tag the file.** Each file row accepts free-text tags (e.g. *datasheet*, *certificate*, *3D model*). Tags help filter the list once it grows.

4. **Save the file or link.** A toast confirms upload / link creation.

### Remove a file or link

1. **Click the delete affordance on the row** and confirm. Local uploads are deleted from storage; links are removed from the catalogue item record but the external resource is not touched.

`[VIDEO PLACEHOLDER: 40s — open a catalogue item → drag two images into the gallery → set one as primary → scroll to file manager → upload a PDF → add a tag → add an external link → delete the placeholder image]`

## What gets created / changed

**✅ Affected:**
- Image records (binary + thumbnail) attached to the catalogue item.
- File records (binary or link) attached to the catalogue item, optionally tagged.
- The *primary image* marker — points at one of the image records.

**❌ Not affected:**
- Catalogue item base fields and property values.
- Physical items in systems — they read the catalogue item primary image automatically when displayed.
- Orders — order lines referencing this item refresh their preview thumbnail on next render.

## Limitations

- **Item must be saved first.** Image / file upload buttons are inactive in create mode.
- **No alt-text or captions today.** Images carry no metadata beyond filename and primary flag.
- **Max upload size and accepted MIME types** follow global app limits — refer to your administrator if a file is rejected.

## Tips & gotchas

- **Pick a clean primary image early.** It propagates to the catalogue list, pickers, and order previews — a clear isolated shot is worth more than a busy installation photo.
- **Tags are searchable in the file list, not in the global filter.** They help organize files inside a single item; they do not surface in the catalogue-wide filter sheet.
- **Links versus uploads.** Use a link for content the supplier maintains (datasheets that get updated); use an upload for content you want to preserve as-is. Links break if the supplier moves the page.
- **Deletion is immediate.** There is no undo — re-upload if you delete the wrong file.

## Related

- [Creating and editing a catalogue item](./creating-and-editing-items.md)
- [Managing related catalogue items](./managing-related-items.md)
- [Browsing and searching the catalogue](./browsing-and-searching.md)
