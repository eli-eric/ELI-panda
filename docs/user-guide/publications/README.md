# Publications, Researchers & Grants

The Publications module is the facility's **research-output registry**. It tracks every paper, book chapter, conference proceeding, and other scholarly output produced with ELI involvement, alongside two supporting registries used to attribute and fund that output: **Researchers** (the people credited as ELI authors) and **Grants** (the funding instruments referenced on publications).

The module pulls double duty as both an internal catalogue _and_ the upstream source for the Czech **RIV** national research information system — publications recorded here can be validated and exported as a RIV XML delivery per reporting year.

Use this module when registering a new publication, loading bibliographic metadata from a DOI, maintaining researcher / grant master data, linking authors and funding to an in-flight publication, or preparing an end-of-year RIV submission.

`[SCREENSHOT PLACEHOLDER: Publications overview — top toolbar with Add / Refresh buttons on the left, Export and Export to RIV buttons on the right; table beneath with columns Title, Code, Media Type, DOI, Authors, Journal, Year; one row hovered showing per-row actions]`

## Access & Responsibilities

**Today's reality:**

- `publications-view` — read-only access to the Publications overview and detail pages. The _Researchers_ and _Grants_ sub-pages are listed in the sidebar but their editor affordances are hidden — researchers and grants are administrative records and require edit rights.
- `publications-edit` — full edit. Create / edit / delete publications, researchers, and grants. Link researchers and grants to publications. RIV validate and export.
- `admin` — same as Editor.

**Personas (today):**

| Persona                            | Role(s)                        | Can do                                                                                                                                                                                                   |
| ---------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 👁️ **Viewer**                      | `publications-view`            | Open the Publications overview, filter and search, open any publication's detail page in read-only mode. Sees the Researchers / Grants tabs but no add / edit / delete affordances                       |
| ✏️ **Publications Editor / Admin** | `publications-edit` or `admin` | Everything in Viewer + create publications, edit every field on existing publications, manage researchers and grants, link researchers and grants to publications, run RIV validation and RIV XML export |

> 🔮 **Coming soon — department-scoped editor permissions** — a planned enhancement will pair `publications-edit` with a researcher's home department, so a department coordinator only edits their own department's records.

## Key concepts

- **Publication** — a scholarly output record. Carries title, code, DOI, _Media Type_ (paper / book / chapter / conference / other), _Open Access Type_, _ELI Publication_ flag (YES / NO — is ELI a co-author affiliation), authors, ELI researchers, departments, grants, journal / book / conference metadata, abstract, keywords, OECD FORD code, language, publishing country, ISBN / ISSN, WoS / Scopus identifiers, citation string, impact factor, quartile. A DOI can load available bibliographic metadata from Web of Science before the record is submitted — the editor reviews and confirms each value, and nothing is saved until they press _Submit_.
- **Media Type** — drives which fields are shown on the form. The schema bifurcates into a _peer-reviewed_ validation set and an _other_ validation set depending on the picked Media Type.
- **Researcher** — a person who can be cited as an _ELI Author_ on a publication. Fields: first name, last name, internal identification number, ORCID, Scopus ID, ResearcherID, citizenship.
- **Grant** — a funding instrument that publications can cite. Fields: name, code, _Grant Group_ (codebook — typically the funding body).
- **ELI Authors / Other Authors** — every publication carries an authors string and a count; the _ELI Authors_ sub-list is what links the publication to **Researcher** records and powers the credit reporting downstream.
- **Departments** — a publication captures which ELI departments contributed authors and how many.
- **RIV export** — the Czech Research Information System (Rejstřík informací o výsledcích) reporting format. Publications can be validated for completeness against a _year_ and _provider_ parameter and exported as an XML payload.

## Layout

The module surfaces **four pages** under the _Publications_ sidebar group.

### Publications overview (`/publications`)

- **Top bar.** _Add Publication_ (gated by `publications-edit`), _Refresh_, _Export_ (CSV / table export), _Export to RIV_ (validation + XML export dialog). Column visibility on the right. Filter sheet for the multi-field filter.
- **Table.** Columns: _Title_, _Code_, _Media Type_, _DOI_, _Authors_ (string + count), _Journal_, _Year_, _ELI Publication_ flag. 100 rows per page by default. Row click opens the detail page.

### Publication detail (`/publication` or `/publication/<uid>`)

- **Header.** _Submit_, _Submit & Exit_ buttons, gated.
- **Form.** Multi-column grid with dynamic field visibility per Media Type. Sections include: _Basic_ (media type, title, ELI publication flag), _Authors_ (text + count + ELI Authors selector with badge display), _Departments_, _Journal / Book / Conference_ (whichever applies), _Identifiers_ (DOI lookup, web link, ISBN / ISSN / WoS / Scopus), _Funding_ (grants selector + other-grants free text), _Bibliographic_ (year, date, abstract, keywords, OECD FORD, language, country, impact factor, quartile, citation), _Note_.
- **File manager.** Attach the PDF and supporting files.

### Researchers (`/publications/researchers`)

- **Top bar.** _Add Researcher_ (gated by `publications-edit`), _Refresh_. Column visibility.
- **Table.** Columns: _Last name_, _First name_, _ORCID_, _Scopus ID_, _Researcher ID_, _Identification Number_, _Citizenship_, _Updated at_. Per-row dropdown: _Edit_, _Delete_.

### Grants (`/publications/grants`)

- **Top bar.** _Add Grant_ (gated by `publications-edit`), _Refresh_.
- **Table.** Columns: _Name_, _Code_, _Grant Group_, _Updated at_. Per-row dropdown: _Edit_, _Delete_.

## Common workflows

- [Browsing publications](./workflows/browsing-publications.md) — overview filters (media type, year, ELI flag), search, opening detail.
- [Creating and editing a publication](./workflows/creating-and-editing-publications.md) — DOI metadata lookup, multi-section form, Media-Type-driven schema, linked researchers, linked grants, file attachment.
- [Managing researchers](./workflows/managing-researchers.md) — adding researchers, ORCID / Scopus / ResearcherID, citizenship.
- [Managing grants](./workflows/managing-grants.md) — grants, grant groups, codes.
- [Exporting to RIV](./workflows/riv-export.md) — validation, year / provider / delivery reference, XML download.

## Coming soon

- 🔮 **Department-scoped editor permissions.**
- 🔮 **ORCID lookup on researcher form** — auto-fill from a researcher's ORCID profile.
- 🔮 **Bulk publication import** — CSV / BibTeX.
- 🔮 **Per-publication change history.**
- 🔮 **Co-author conflict detection** — surface when two researchers share an identification number / ORCID.
- 🔮 **RIV submission tracking** — record acknowledgement / receipt from the RIV system inside PANDA.

`[VIDEO PLACEHOLDER: 80s end-to-end — open Publications → see overview → filter by Media Type "Journal article" + Year 2025 → click a row to open detail → review fields → switch to Researchers tab → Add Researcher → fill ORCID and Scopus ID → Save → switch to Grants → Add Grant → return to a publication → link the new researcher and grant via the modals → Submit → return to overview → click Export to RIV → fill year/provider → Validate → see counts → Download XML]`

## Data model reference

> 🔧 _This section is for engineers reading the docs in the repo. The wiki generator strips it._
>
> Endpoints — Publications: `GET /publications` (list, key `publications`), `GET /publication?uid=<uid>` (detail), `POST /publication` / `PUT /publication?uid=<uid>` (create/update), `DELETE /publication?uid=<uid>`, `GET /v1/publication/wos/:doi` (authenticated Web of Science lookup, key `publicationWos`), `GET /generateUUID` (used for new-doc UID prep). RIV: `GET /publications/validate/riv` (validation, key `rivValidate`), `GET /publications/export/riv?year=<>&provider=<>&deliveryRef=<>` (XML stream). Researchers: `GET /researchers` (list), `GET /researcher?uid=<uid>` (detail), `POST /researcher` / `PUT /researcher?uid=<uid>` (create/update), `DELETE /researcher?uid=<uid>`. Grants: same shape with `/grant` and `/grants`. Linking is denormalised — `eliResearchers[]` and `grants[]` live directly inside the Publication payload. Form Zod schemas live in `src/modules/publication/form/` (`publicationPeerReviewedSchema`, `publicationOtherSchema`) and switch based on Media Type.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
