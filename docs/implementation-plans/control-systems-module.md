# new Control Systems Module — System Codes

Implement a new **Control Systems** module with two pages:

- `control-systems/overview`
- `control-systems/system-codes-create`

This module mirrors key UX and behaviors from `systems/overview`, while adding a create + preview workflow for generating system codes.

---

## 1) Overview Page (`control-systems/overview`)

### Goal

Provide a searchable, filterable, paginated table of system codes with the same interaction patterns as `systems/overview`.

### UI / UX

- Table grid with:
    - sticky header
    - pagination
- Page header includes **three filters**:
    - `search`
    - `zone`
    - `systemType`
- Filters **must be connected to the Query Manager** (API query params via `useQueryManager`).

### Columns

- `systemCode`
- `name`
- `location`
- `zone`
- `updatedBy`
- `createdBy`

---

## 2) System Codes Create Page (`control-systems/system-codes-create`)

### Layout

Two-pane layout:

**Left pane:** form  
**Right pane:** table grid (similar to Overview, but with additional preview/created state behavior)

### Form (left pane)

Fields:

- `zone` — `CodebookType`
- `systemType` — `CodebookType`
- `batch` — number

Actions:

- Submit button: **Create system codes**

### Table (right pane)

- Reuse the Overview-like grid styling (sticky header, pagination if applicable)
- Displays **both preview rows and created rows**
- Preview rows should be visually distinct (e.g., muted/gray styling or a “Preview” badge)

### Behavior

1. **Preview on blur**
    - When the user blurs any form field (or when the form becomes valid), call the **preview endpoint**.
    - The response represents _what would be created_ (not persisted).
    - Render these rows in the table using a distinct “preview” style.

2. **Create on submit**
    - On submit, call the **create endpoint**.
    - The API returns the **created systems**.
    - Update local state so preview rows are replaced/updated to the created versions.
    - Created rows should display normal styling (not muted).

**State note:** keep preview/created results in local UI state so the table updates immediately and predictably.

---

## 3) Types & Validation

### Requirements

- Define runtime schemas with **Zod**
- Infer TypeScript types from Zod schemas (no hand-written interfaces as source of truth)

### Data shapes (conceptual)

> Adjust exact optionality/fields to match backend behavior.

- **SystemCodeResult**
    - `uid: string` _(not returned by preview)_
    - `name: string`
    - `systemCode: string`
    - `location?: CodebookType` _(not returned by preview)_
    - `zone: CodebookType`
    - `createdBy: string` _(not returned by preview)_
    - `updatedBy: string` _(not returned by preview)_

- **SystemCodeRequest**
    - `zone: CodebookType`
    - `systemType: CodebookType`
    - `batch: number`

- **SystemCodesOverviewResponse**
    - `data: SystemCodeResult[]`
    - `totalCount: number`

---

## 4) API Endpoints

Add three endpoints:

1. **GET** `/systems/system-codes`
    - Classic filter params (driven by Query Manager)
    - Used by Overview page

2. **POST** `/systems/system-codes`
    - Body: `SystemCodeRequest`
    - Creates system codes
    - Returns created `SystemCodeResult[]`

3. **GET** `/systems/system-codes/preview`
    - Query params:
        - `zoneUid`
        - `systemTypeUid`
        - `batch`
    - Returns preview `SystemCodeResult[]` (without `uid`, `createdBy`, `updatedBy`, and possibly `location`)

---

## 5) Data Fetching & Hooks (TanStack Query)

### Requirements

- Provide a **custom hook per endpoint**, using TanStack Query patterns:
    - `useSystemCodesOverviewQuery(...)` (GET)
    - `useCreateSystemCodesMutation()` (POST)
    - `useSystemCodesPreviewQuery(...)` (GET preview) or `usePreviewSystemCodesMutation()` if you prefer imperative calls on blur

### Notes

- Overview GET must integrate with `useQueryManager` for filters, pagination, and sorting (if applicable).
- Preview calls should be debounced or triggered only on blur to avoid excessive requests.
- Ensure cache keys include relevant params (filters for overview, `zoneUid/systemTypeUid/batch` for preview).
