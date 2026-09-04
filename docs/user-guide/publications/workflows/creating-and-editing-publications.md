# Creating and editing a publication

## What this is for

Register a new publication record (paper, book chapter, conference proceeding, …) or amend an existing one. The publication form is wide — it captures bibliographic metadata, identifiers (DOI, ISBN / ISSN, WoS, Scopus), funding context, ELI author credits per department, an attached PDF, and reporting-friendly metadata (OECD FORD, quartile, open-access type, RIV-eligibility flag).

The form's **Media Type** field is the schema driver: switching between _Journal article_, _Book_, _Conference proceeding_, _Other_ changes which fields are required and which sections render.

## Who can do this

✏️ **Publications Editor / Admin** — requires the `publications-edit` role.

Viewers can open the detail page but every field is disabled and _Submit_ is hidden.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `publications-edit`.
- The **Researchers** you will credit as ELI Authors already exist. If not, add them in [Managing researchers](./managing-researchers.md) before opening the publication form.
- The **Grants** you will cite already exist. If not, add them in [Managing grants](./managing-grants.md).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Create a new publication

1. **Click _Add Publication_** in the toolbar of the Publications overview. The blank detail page opens at `/publication`.

    `[SCREENSHOT PLACEHOLDER: blank publication detail page with the Media Type combobox in focus, the rest of the form mostly empty, Submit and Submit & Exit buttons in the header]`

2. **Pick the _Media Type_**. Required. Choices come from the _Media Type_ codebook. The selection drives:
    - Which sections render below (journal vs book vs conference vs other).
    - Which validation schema applies (_peer-reviewed_ vs _other_).
    - Which RIV result code the publication maps to during export.

3. **Set the _ELI Publication_ flag.** Required. `YES` = ELI is an author affiliation (RIV-eligible); `NO` = tracked but not ELI-attributed.

4. **Load available metadata with the _DOI (R87)_ field.** Enter a bare DOI (`10.1234/example`), a `doi:` value (`doi: 10.1234/example`), or a DOI link (`https://doi.org/10.1234/example`), then press **Fetch from Web of Science**. PANDA converts the value to a bare DOI, fills **Web Link (R86)** with its canonical `https://doi.org/…` link, and asks Web of Science for an exact DOI match. Nothing on the form changes yet.

    A malformed DOI is rejected before PANDA sends a lookup request.

    `[SCREENSHOT PLACEHOLDER: publication form with a DOI entered in DOI (R87), the generated doi.org URL in Web Link (R86), and the Fetch from Web of Science button below the DOI field]`

    **Review the import preview.** PANDA opens a dialog listing every field it can fill, showing your **current value** next to the **Web of Science value**:

    - Fields that are **blank** on your form are ticked for you.
    - Fields you have **already filled** are _not_ ticked — nothing overwrites your work unless you tick it yourself.
    - Fields that already match are shown as _Already up to date_ and cannot be ticked.

    Web of Science can supply: **Title**, **DOI**, **WOS Number**, **Long Journal Title**, **Volume**, **Issue**, **Pages**, **Pages Count**, **Year of Publication**, **Date of Publication**, **ISSN**, **eISSN**, **ISBN**, **Web Link**, **Keywords**, **All Authors list** and **All Authors Count**, and a **Media Type** suggestion.

    The dialog also names what Web of Science **cannot** supply, so you know what is left to complete by hand. **Abstract**, **Open Access Type**, **Publishing Country** and **OECD FORD** are required by the form and are never imported — an import always leaves the record roughly half-complete by design.

    `[SCREENSHOT PLACEHOLDER: Web of Science import preview dialog — field table with Import checkboxes, Field / Current value / Web of Science value columns, an untickable "Already up to date" row, and the ELI researcher matches section below]`

    **Confirm the ELI researchers.** PANDA compares each Web of Science author with the Researchers registry:

    - An author matched by **ResearcherID** is pre-selected.
    - An author matched **by name only** is shown but never pre-selected — most scientists hold several ResearcherIDs, so you confirm the right person yourself.
    - Confirming a match credits the researcher on this publication only. PANDA does not yet learn the ResearcherID for next time — that is coming separately.

    Confirmed researchers are added to the ones already on the form; nothing you selected earlier is removed.

    **Press _Apply selected fields_.** The form fills in. **Nothing is saved** — you still review the record and press _Submit_ as usual, and all normal validation still applies.

    If the DOI is **already in PANDA**, the dialog says so, names the existing publication, and offers to open it instead of creating a duplicate. If the DOI is not in Web of Science, or the service is unavailable, PANDA reports the problem and changes nothing.

5. **Fill the _Title_ and any remaining basic identifiers.**

    | Field                | Required | Notes                                                                          |
    | -------------------- | -------- | ------------------------------------------------------------------------------ |
    | **Title**            | ✅       | Publication title (R06 in RIV terms).                                          |
    | **Open Access Type** | ✅       | Picker (R94 in RIV terms).                                                     |
    | **DOI**              | —        | Digital Object Identifier. Press Enter to repeat the lookup after changing it. |
    | **Web Link**         | —        | Canonical DOI link, derived from **DOI**.                                      |

6. **Review or add ELI Authors.** The _ELI Authors_ section is required. Check the researchers confirmed in the import preview. Click _Add Eli Author_ to open the [Researchers](./managing-researchers.md) selection modal, then tick any remaining researchers to credit; each appears as a badge below the field.

7. **Review author counts and set departments.** Check the loaded _All Authors_ byline and _All Authors Count_, or enter them manually when the lookup did not provide them. Add ELI departments via the departments sub-section — each row pairs a department codebook value with an author count for that department.

8. **Pick journal / book / conference details** according to the Media Type. The form renders only the relevant block:
    - **Journal article:** _Long Journal Title_, _Short Journal Title_, _Volume_, _Issue_, _Pages_, _Pages Count_, _ISSN_, _eISSN_.
    - **Book / chapter:** _Publisher_, _Publish Place_, _Publish Format_ (codebook), _ISBN_, _Book Title_, _Book Pages Count_, _Edition / Volume_.
    - **Conference proceeding:** _Proceedings ISBN_, _Conference Date_, _Conference Place_, _Conference Scope_ (codebook).

9. **Capture _Identifiers_** — _WoS Number_, _Scopus EID_ (`eidScopus`). These power the RIV cross-check and external lookups.

10. **Link _Grants_**. Click _Add Grant_ to open the [Grants](./managing-grants.md) selection modal. Picked grants render as badges. Free-text _Other Grants_ captures unstructured funding mentions that are not in the registry.

11. **Fill _Bibliographic_ details** — _Year of Publication_ (required for RIV), _Date of Publication_, _Abstract_, _Keywords_, _OECD FORD_, _Language_ (codebook), _Publishing Country_ (codebook), _Impact Factor_, _Quartile Basis_, _Quartile_ (codebook), _Cite As_ (citation string), _Note_. **Year of Publication** accepts a four-digit year (`YYYY`); it is not limited to a fixed recent-year list.

12. **Attach the PDF** in the file manager block. Drag-drop the file, or use the _Upload File_ control. The publication form accepts one PDF attachment.

13. **Click _Submit_** (stay on page) or _Submit & Exit_ (return to overview). The toast confirms success or surfaces validation errors.

`[SCREENSHOT PLACEHOLDER: completed publication form mid-page showing the ELI Authors block with three researcher badges, the Grants block with two grant badges, the file manager below with one PDF attached]`

### Edit an existing publication

1. **Open the publication** from the overview — click the row. The URL takes the form `/publication/<uid>` and the form loads with all fields pre-filled.

2. **Adjust fields**. Be careful when changing the **Media Type** — switching from _Journal article_ to _Book_ clears the journal-specific fields and shows the book-specific ones (any data in fields that disappear is preserved server-side but no longer rendered).

3. **Submit**. Same as creation; the toast confirms.

`[VIDEO PLACEHOLDER: 90s — Add Publication → pick Journal article → set ELI Publication YES → paste a doi.org URL into DOI (R87) → press Fetch from Web of Science → walk the preview dialog: blank fields pre-ticked, a filled Title left un-ticked, one row ticked deliberately to overwrite, the ResearcherID match pre-selected and a name match confirmed by hand → Apply selected fields → show the form filled and still unsaved → pick the Language codebook value → add a grant → fill Abstract and Open Access Type by hand → upload PDF → Submit → reopen → press Refresh from Web of Science → Submit & Exit]`

## What gets created / changed

**✅ Affected:**

- The publication record (every field on the form).
- The denormalised `eliResearchers[]` and `grants[]` arrays embedded in the publication payload.
- The attached files in the publication's file store.
- _Updated at_ / _Updated by_ on the publication.

**❌ Not affected:**

- The Researcher and Grant master records. Linking them to a publication does not modify their fields.
- Other publications. Even if two share a researcher, edits to one's denormalised entry do not propagate to the other.

## Limitations

- **Denormalised links.** Researchers and grants are stored on the publication's payload, not as separate join records. Renaming a researcher updates the badge label on the publication; replacing the researcher requires editing each publication individually.
- **Media Type change is partly destructive in display.** Fields that disappear from the form do not lose their stored values, but they are no longer visible / editable until the original Media Type is restored.
- **No draft state.** A publication is either submitted or not. Editing live publications is on production data.
- **No co-authoring lock.** Two editors on the same publication can clobber each other. PANDA does not surface a conflict; the second submit wins.
- **An import never completes the form on its own.** Web of Science Starter — the tier ELI subscribes to — publishes roughly 15 of the form's fields. **Abstract**, **Open Access Type**, **Publishing Country** and **OECD FORD** are all required and none of them can be imported, so every imported record still needs manual work before it will submit. **Impact Factor** and **Quartile** come from JCR, a separate Clarivate product, and author departments cannot be derived because Starter carries no affiliations.
- **No fuzzy author matching.** Automatic ELI Author selection requires one exact full-name match in the Researchers registry. Initials, alternative spellings, punctuation differences, and duplicate names are not guessed.

## Tips & gotchas

- **Set Media Type and ELI Publication first.** Both drive validation; setting them last means going back to fix required-field gaps revealed by their selection.
- **Run DOI lookup before manual entry.** The lookup deliberately fills blanks only, so it is safe to run after partial entry, but it will not replace fields you already populated.
- **ELI Authors are RIV-critical.** Each ELI Author must exist in the [Researchers](./managing-researchers.md) registry — RIV validation will flag a publication with no ELI Authors when `ELI Publication = YES`.
- **Capture the full author byline in _All Authors_.** RIV expects the complete citation order; _ELI Authors_ is the subset that ELI claims credit for.
- **Quartile + Impact Factor.** RIV uses these for impact reporting. Pick a _Quartile Basis_ that documents _where_ (WoS / Scopus / journal-publisher) the value was sourced.
- **OECD FORD is mandatory for RIV.** Capture it on every RIV-eligible publication.
- **Files attach against the publication UID.** Files cannot be uploaded before the first save (the publication has no UID yet). Save once, then attach.

## Related

- [Browsing publications](./browsing-publications.md)
- [Managing researchers](./managing-researchers.md)
- [Managing grants](./managing-grants.md)
- [Exporting to RIV](./riv-export.md)
