# Creating and editing a publication

## What this is for

Register a new publication record (paper, book chapter, conference proceeding, …) or amend an existing one. The publication form is wide — it captures bibliographic metadata, identifiers (DOI, ISBN / ISSN, WoS, Scopus), funding context, ELI author credits per department, an attached PDF, and reporting-friendly metadata (OECD FORD, quartile, open-access type, RIV-eligibility flag).

The form's **Media Type** field is the schema driver: switching between *Journal article*, *Book*, *Conference proceeding*, *Other* changes which fields are required and which sections render.

## Who can do this

✏️ **Publications Editor / Admin** — requires the `publications-edit` role.

Viewers can open the detail page but every field is disabled and *Submit* is hidden.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `publications-edit`.
- The **Researchers** you will credit as ELI Authors already exist. If not, add them in [Managing researchers](./managing-researchers.md) before opening the publication form.
- The **Grants** you will cite already exist. If not, add them in [Managing grants](./managing-grants.md).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Create a new publication

1. **Click *Add Publication*** in the toolbar of the Publications overview. The blank detail page opens at `/publication`.

   `[SCREENSHOT PLACEHOLDER: blank publication detail page with the Media Type combobox in focus, the rest of the form mostly empty, Submit and Submit & Exit buttons in the header]`

2. **Pick the *Media Type***. Required. Choices come from the *Media Type* codebook. The selection drives:
   - Which sections render below (journal vs book vs conference vs other).
   - Which validation schema applies (*peer-reviewed* vs *other*).
   - Which RIV result code the publication maps to during export.

3. **Set the *ELI Publication* flag.** Required. `YES` = ELI is an author affiliation (RIV-eligible); `NO` = tracked but not ELI-attributed.

4. **Fill the *Title* and basic identifiers.**

   | Field | Required | Notes |
   |---|---|---|
   | **Title** | ✅ | Publication title (R06 in RIV terms). |
   | **Open Access Type** | ✅ | Picker (R94 in RIV terms). |
   | **DOI** | — | Digital Object Identifier. |
   | **Web Link** | — | URL to the published / preprint version. |

5. **Add ELI Authors.** The *ELI Authors* section is required. Click *Add Eli Author* to open the [Researchers](./managing-researchers.md) selection modal. Tick the researchers to credit; each appears as a badge below the field.

6. **Set author counts and departments.** Capture *All Authors* (the full byline as a string) and *All Authors Count* (the total head count). Add ELI departments via the departments sub-section — each row pairs a department codebook value with an author count for that department.

7. **Pick journal / book / conference details** according to the Media Type. The form renders only the relevant block:
   - **Journal article:** *Long Journal Title*, *Short Journal Title*, *Volume*, *Issue*, *Pages*, *Pages Count*, *ISSN*, *eISSN*.
   - **Book / chapter:** *Publisher*, *Publish Place*, *Publish Format* (codebook), *ISBN*, *Book Title*, *Book Pages Count*, *Edition / Volume*.
   - **Conference proceeding:** *Proceedings ISBN*, *Conference Date*, *Conference Place*, *Conference Scope* (codebook).

8. **Capture *Identifiers*** — *WoS Number*, *Scopus EID* (`eidScopus`). These power the RIV cross-check and external lookups.

9. **Link *Grants***. Click *Add Grant* to open the [Grants](./managing-grants.md) selection modal. Picked grants render as badges. Free-text *Other Grants* captures unstructured funding mentions that are not in the registry.

10. **Fill *Bibliographic* details** — *Year of Publication* (required for RIV), *Date of Publication*, *Abstract*, *Keywords*, *OECD FORD*, *Language* (codebook), *Publishing Country* (codebook), *Impact Factor*, *Quartile Basis*, *Quartile* (codebook), *Cite As* (citation string), *Note*.

11. **Attach the PDF** in the file manager block. Drag-drop the file, or use the *Upload File* control. Multiple supporting files are allowed.

12. **Click *Submit*** (stay on page) or *Submit & Exit* (return to overview). The toast confirms success or surfaces validation errors.

   `[SCREENSHOT PLACEHOLDER: completed publication form mid-page showing the ELI Authors block with three researcher badges, the Grants block with two grant badges, the file manager below with one PDF attached]`

### Edit an existing publication

1. **Open the publication** from the overview — click the row. The URL takes the form `/publication/<uid>` and the form loads with all fields pre-filled.

2. **Adjust fields**. Be careful when changing the **Media Type** — switching from *Journal article* to *Book* clears the journal-specific fields and shows the book-specific ones (any data in fields that disappear is preserved server-side but no longer rendered).

3. **Submit**. Same as creation; the toast confirms.

`[VIDEO PLACEHOLDER: 60s — Add Publication → pick Journal article → set ELI Publication YES → fill title + DOI → add two ELI researchers via the modal → pick the Language codebook value → add a grant → set Year → upload PDF → Submit → return to overview → reopen → switch Media Type to Conference → see fields change → Submit & Exit]`

## What gets created / changed

**✅ Affected:**
- The publication record (every field on the form).
- The denormalised `eliResearchers[]` and `grants[]` arrays embedded in the publication payload.
- The attached files in the publication's file store.
- *Updated at* / *Updated by* on the publication.

**❌ Not affected:**
- The Researcher and Grant master records. Linking them to a publication does not modify their fields.
- Other publications. Even if two share a researcher, edits to one's denormalised entry do not propagate to the other.

## Limitations

- **Denormalised links.** Researchers and grants are stored on the publication's payload, not as separate join records. Renaming a researcher updates the badge label on the publication; replacing the researcher requires editing each publication individually.
- **Media Type change is partly destructive in display.** Fields that disappear from the form do not lose their stored values, but they are no longer visible / editable until the original Media Type is restored.
- **No draft state.** A publication is either submitted or not. Editing live publications is on production data.
- **No co-authoring lock.** Two editors on the same publication can clobber each other. PANDA does not surface a conflict; the second submit wins.
- **No BibTeX / DOI auto-lookup.** All bibliographic fields are entered manually.

## Tips & gotchas

- **Set Media Type and ELI Publication first.** Both drive validation; setting them last means going back to fix required-field gaps revealed by their selection.
- **ELI Authors are RIV-critical.** Each ELI Author must exist in the [Researchers](./managing-researchers.md) registry — RIV validation will flag a publication with no ELI Authors when `ELI Publication = YES`.
- **Capture the full author byline in *All Authors*.** RIV expects the complete citation order; *ELI Authors* is the subset that ELI claims credit for.
- **Quartile + Impact Factor.** RIV uses these for impact reporting. Pick a *Quartile Basis* that documents *where* (WoS / Scopus / journal-publisher) the value was sourced.
- **OECD FORD is mandatory for RIV.** Capture it on every RIV-eligible publication.
- **Files attach against the publication UID.** Files cannot be uploaded before the first save (the publication has no UID yet). Save once, then attach.

## Related

- [Browsing publications](./browsing-publications.md)
- [Managing researchers](./managing-researchers.md)
- [Managing grants](./managing-grants.md)
- [Exporting to RIV](./riv-export.md)
