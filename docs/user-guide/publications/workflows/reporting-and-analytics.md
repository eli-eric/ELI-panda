# Reporting review & analytics

The Publications module doubles as the source for management reporting: how much
ELI published in a year, at what journal quality, in which departments, and how
much of it came out of user calls.

Those figures are **not** inferred from the publication record. An editor
confirms them, publication by publication, in the _Management reporting review_
fieldset at the bottom of the publication form. The
[analytics dashboard](#the-analytics-dashboard) then calculates every report
from what was confirmed.

> 🔑 **The most important thing to understand:** a publication nobody has
> reviewed is reported as **unclassified**. It is not guessed at, and it is not
> quietly left out of the totals — it is counted and shown as unreviewed. On a
> database that has never been reviewed, the dashboard will show almost
> everything as unclassified. That is correct, not broken.

## Access

| Role | Can do |
| --- | --- |
| `publications-view` | Open the analytics dashboard, download the Word and PDF reports |
| `publications-edit` | Everything above, plus fill in the reporting review on a publication |

## Reviewing a publication for reporting

Open a publication, scroll to **Management reporting review**, and press
_Review reporting details_. The fieldset stays closed until you do, because an
open fieldset full of defaults would look like somebody had already decided.

`[SCREENSHOT PLACEHOLDER: Publication form — Management reporting review fieldset expanded, showing Reporting classification and Document type side by side, with the credited departments multi-select beneath]`

### Reporting classification

This is separate from the **ELI Publication** flag. That flag means _ELI is a
co-author affiliation_ and drives RIV eligibility; it is unchanged by anything
here.

| Classification | Meaning |
| --- | --- |
| **Own — user publication** | ELI output that came out of a user call. |
| **Own — other** | ELI output that did not. |
| **Co-authorship** | ELI contributed, but the paper is not counted as ELI's own output. |
| **Not classified yet** | Nobody has decided. Reported as such. |

User publications are a **subset of own publications** — every user publication
is also an own publication, which is why they are one list rather than two
checkboxes.

### Credited departments

Select every department that should be credited. **Each selected department is
credited once**, so a paper written across three departments adds three
department credits but only one to the institutional total. Department totals
in the dashboard therefore legitimately sum higher than the headline number.

Record the departments as they were **at the time of publication**. Somebody
moving department later does not change who produced the paper.

### Calls, experiments and systems

Only links you confirm here count. A user publication with no confirmed call is
reported in an explicit _no confirmed call_ bucket — it is never distributed
across the calls that do have links, because that would invent evidence.

### Authorship

Pick the ELI authors in the author field higher up the form first; they then
appear here so you can record who was first author and who corresponded.

Each role has three states, and **Unknown is a real answer**. A role left
unknown is reported separately from a confirmed "no", so a low first-author
count is distinguishable from a review backlog.

### Journal Citation Reports evidence

Add one row per JCR category the journal is ranked in, for the **publication's
own year**. A journal's standing moves between years, so a metric from another
year is ignored rather than used as an approximation.

The highest percentile decides the reported quality band:

| Percentile | Band |
| --- | --- |
| Q1, percentile ≥ 90 | **Q 10%** |
| Q1, percentile < 90 | **Q 10-25%** |
| Q1, percentile unknown | **Q1 unsplit** — the split cannot be made, so it is not guessed |
| Q2 / Q3 / Q4 | as recorded |

If no JCR metric applies, set **When no JCR metric applies**:

- _Unknown / not checked_ — nobody has looked yet.
- _Confirmed unranked journal_ — somebody checked, and the journal has no ranking.

These two are reported separately. "Not checked" is a task; "unranked" is a fact.

> ℹ️ **Quartiles are entered by hand in this release.** Automatic lookup needs
> Clarivate's separately licensed Journals API, which is not yet configured.

### Confirming the review

Tick the review checkbox and **save the publication**. Nothing is recorded until
you save. Your name and the time are recorded by the server, not the browser.

If somebody later edits something the review depends on — the publication year,
DOI, journal, ISSN, media type, quartile, impact factor, authors or departments —
**the review is withdrawn automatically** and the record returns to awaiting
review. Your selections survive; only the confirmation is retracted, because a
tick against changed data would be misleading.

Saving a publication from an older screen that knows nothing about reporting
does **not** erase the review.

## The analytics dashboard

**Publications → Analytics**.

`[SCREENSHOT PLACEHOLDER: Analytics dashboard — KPI tiles across the top, amber backlog banner beneath, grouped quality bar chart below]`

The dashboard opens on the **latest completed calendar year** and shows the six
years before it as trend. All three years are editable.

| Section | What it shows |
| --- | --- |
| **Institutional totals** | Distinct publications, by classification, plus the unclassified and awaiting-review backlog |
| **Quality bands** | Own and user counts per band, side by side |
| **Departments** | The full quality matrix per department. Sums higher than the totals, by design |
| **By call / department / system** | User publications, with unlinked papers counted separately |
| **Journals** | How often each journal appears |
| **Authors** | Authorships, first-author and corresponding counts, with unknown roles shown separately |
| **Q3 + Q4 share** | The share of ranked papers in the bottom two quartiles, over the trend window |

### Reading the Q3 + Q4 share

The denominator is **papers with a known quartile**. Proceedings, book chapters,
confirmed unranked journals and papers still missing evidence are excluded from
both the top and the bottom of the fraction.

A year with no ranked papers shows **N/A**, not 0 %. The share is unknown, and
0 % would assert that nothing was in the bottom half.

### Downloads

_Download Word report_ and _Download PDF report_ produce the figures **currently
on screen**, including the year filters, the calculation timestamp and the
counting notes. Both are built from the same data the page is displaying, so a
download can never disagree with what you were looking at.

Czech names render correctly in the PDF.

## When the dashboard looks wrong

| What you see | What it means |
| --- | --- |
| Almost everything unclassified | Nobody has reviewed those records yet. Expected on a fresh database. |
| Department totals exceed the headline total | Correct. Each credited department gets a credit; the headline counts distinct papers. |
| A large _no confirmed call_ bar | Those user papers have no confirmed call link. Add the links on the publications. |
| Most papers in _No evidence yet_ | JCR rows have not been entered. |
| An error instead of figures | The report could not be calculated. Nothing is shown deliberately — a partial report would look like a complete one. |
