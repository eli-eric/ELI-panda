# Exporting to RIV

## What this is for

Produce a **RIV** (Rejstřík informací o výsledcích — the Czech research information system) XML delivery for a given reporting year. The workflow has two stages: **Validate** the publications matching a _year + provider + delivery reference_ combination (the dialog returns a count of valid records plus any per-record warnings), then **Download** the XML payload. Use this at the end of the reporting period, after every relevant publication has been registered and double-checked.

## Who can do this

✏️ **Publications Editor / Admin** — the RIV export controls live in the Publications overview and require `publications-edit`.

Viewers see the _Export to RIV_ button as inactive (or absent depending on the build); validation and XML generation are editor-gated to prevent accidental submissions.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `publications-edit`.
- Every publication intended for this RIV delivery is registered with:
    - **ELI Publication = YES** (the RIV-eligible flag).
    - A valid **Year of Publication** matching the reporting year.
    - The required RIV-grade fields filled (Title, Open Access Type, ELI Authors, OECD FORD, Media Type, etc.). See [Creating and editing a publication](./creating-and-editing-publications.md).
- You have the _provider_ identifier the RIV submission system expects (typically a short institutional code), and the _delivery reference_ string for this submission.

## Steps

1. **Open the Publications overview** at `/publications`.

2. **Click _Export to RIV_** in the top toolbar. The RIV dialog opens.

    `[SCREENSHOT PLACEHOLDER: RIV dialog open with three fields — Year (numeric), Provider (string), Delivery reference (string) — plus Validate and Download buttons at the bottom]`

3. **Fill the dialog fields:**

    | Field                  | Required | Notes                                                                       |
    | ---------------------- | -------- | --------------------------------------------------------------------------- |
    | **Year**               | ✅       | Numeric. The reporting year (e.g. 2025).                                    |
    | **Provider**           | ✅       | Short institutional code expected by RIV.                                   |
    | **Delivery reference** | —        | Optional submission reference string. Recorded in the XML payload metadata. |

4. **Click _Validate_**. PANDA queries the server for the validation summary. The dialog populates with:

    | Result                 | Meaning                                                                                                                                                                                                                   |
    | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | **Total publications** | Count of publications matching `year` + `ELI Publication = YES`                                                                                                                                                           |
    | **Valid publications** | Count of those that pass RIV validation                                                                                                                                                                                   |
    | **Warnings**           | List of per-publication issues (publication code + message) — e.g. _missing OECD FORD_, _no ELI authors_, _invalid open-access type for media type_, or a researcher whose current ResearcherID is missing or out of date |

    Review the warnings carefully. The list links each warning to the publication code; open the offending publication in a separate tab to fix the field, then return to the dialog and _Validate_ again.

    `[SCREENSHOT PLACEHOLDER: RIV dialog after Validate — Total Publications: 47, Valid: 42, Warnings: 5 listed with publication code on the left and warning message on the right]`

5. **Resolve warnings.** Most warnings indicate a missing field on a specific publication. Open the publication, fix the field, save. Re-validate to confirm the count moves.

    Two warnings point at a **researcher** rather than the publication, because RIV sends exactly one ResearcherID per author:

    - _no current ResearcherID set, N on file_ — PANDA knows IDs for that author but none is marked current, so the delivery names none. Open the author on the [Researchers](./managing-researchers.md) page and pick one.
    - _exporting ResearcherID X, newer Y is on file_ — the author has a more recent ID than the one being sent. Usually you want the newer one; promote it on the Researchers page. If the older one is deliberate, the warning can be accepted as-is.

    Some warnings may indicate publications that should _not_ be in this RIV delivery (e.g. wrong year, set ELI Publication to NO). Toggle the flag on the publication and re-validate.

6. **Click _Download_** once the warnings are resolved (or accepted). PANDA streams the XML payload at `GET /publications/export/riv?year=<>&provider=<>&deliveryRef=<>`. The browser saves the file as `riv-export-<year>-<provider>.xml`.

7. **Submit the file to RIV.** This step is outside PANDA — your institution's RIV submission process.

`[VIDEO PLACEHOLDER: 60s — open Publications → Export to RIV → fill 2025 / ELI / 2025-Q4 → Validate → see 47 total / 42 valid / 5 warnings → click one of the warnings → open publication in a new tab → fix the missing OECD FORD → save → return to dialog → Validate again → 47/47 → Download XML]`

## What gets created / changed

**✅ Created:**

- An XML file on your local machine, downloaded by the browser.
- A query log entry on the server (for the validation request).

**❌ Not affected:**

- Publication records. Validation is read-only; the export is read-only too. The publications themselves are not marked as "exported" — there is no submission-tracking column on the overview today.
- Researchers, grants, or codebooks. The export reads them; it does not modify them.

## Limitations

- **No history of past deliveries inside PANDA.** Each export is one download. Keep the XML payloads in your institutional record / submission system.
- **No submission status tracking today.** PANDA does not record whether the RIV system accepted, rejected, or amended a submission. Track outside.
- **Validate and Download are separate buttons.** _Download_ runs the export against the _current_ dataset — if a publication's field changes between Validate and Download, the XML reflects the latest state.
- **Provider is a free-text input.** No codebook today; type the exact identifier RIV expects, every time.
- **No filter to scope export beyond year.** Year + Provider + Delivery Reference are the only knobs. You cannot, for example, scope a delivery to a specific department.

## Tips & gotchas

- **Validate first, then download.** Skipping validation can produce an XML with missing-field rows that RIV rejects at submission time.
- **Warnings are usually fixable in PANDA.** Most fire because a required RIV field is empty on the publication record. Fix and re-validate.
- **Watch for ELI Publication = YES on stale records.** A publication left set to YES from a previous year can sneak into the next year's delivery if its _Year of Publication_ still matches. Triage by filtering the overview to your reporting year before opening the dialog.
- **Provider casing matters.** Some RIV target systems are case-sensitive; copy-paste from the institutional reference rather than typing.
- **Delivery reference helps reconciliation later.** Use a consistent format (`<year>-<quarter>-<run>` is common) so re-deliveries can be traced.
- **Two consecutive deliveries.** If you must split a year across two submissions, run two separate Validate+Download cycles with different _Delivery reference_ values; the contents are identical unless data changed between runs.

## Related

- [Browsing publications](./browsing-publications.md)
- [Creating and editing a publication](./creating-and-editing-publications.md)
- [Managing researchers](./managing-researchers.md)
- [Managing grants](./managing-grants.md)
