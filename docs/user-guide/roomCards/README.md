# Room Cards

The Room Cards module is the **operational record of cleanroom and technical-hall spaces** at the facility. Each room card captures a single space's identity (name, status, linked physical locations), its current operational state, the cleanroom purity requirements (ISO class, prescribed clothing, cleaning schedule), the utilities it is provisioned with (cooling water, indoor environment, compressed air, nitrogen, max pressure — both *facility-side* and *client-side*), and the people responsible for it (hall contacts, department contacts, assigned teams).

Use this module when a space's operational state changes (e.g. transitioning from *In operation* to *Experimental Technology Standby*), when commissioning a new cleanroom area, when documenting the utility envelope for an experimental team, or when checking who is on-call for a specific hall.

`[SCREENSHOT PLACEHOLDER: Room Cards list page — top bar with Add / Refresh buttons, table with columns Name (linked), Status badge, Operational State badge, Locations chip stack, Purity Class badge, Prescribed Clothing badges]`

## Access & Responsibilities

**Today's reality:**
- `room-cards-view` — read-only access to the list and detail pages. Inspect all fields, contacts, schedules, and utility values; cannot edit anything.
- `room-cards-edit` — full edit on all sections *except* the **Operational State** field, which has an additional Area-Manager check.
- **Area Manager** (per-card check via `useCanEditOperationalState`) — required to *change* the Operational State value. Editors without this check can read it but the field is disabled with a hint.
- `admin` — same as Editor, plus the Area-Manager check still applies (the operational state field is governance-sensitive).

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `room-cards-view` | Browse the list, open any room card detail page, read every field — including operational-state history |
| ✏️ **Room-Card Editor** | `room-cards-edit` | Everything in Viewer + create a new room card, edit name / status / purity class / clothing / utilities / cleaning schedule / contacts / locations / teams. Cannot change Operational State without Area-Manager permission |
| 🛡️ **Area Manager** | `room-cards-edit` + per-card area scope | Change the Operational State, which writes an audit record visible in the history modal |

> 🔮 **Coming soon — per-location scoping of edits** — a planned enhancement will restrict editor permissions by the locations the user is responsible for, so a cleanroom operator only edits their own halls.

## Key concepts

- **Room card** — the record for a single space. Has *Name*, *Status*, *Operational State*, *Purity Class*, *Prescribed Clothing*, utilities, cleaning schedule, and links to locations, contacts, and teams.
- **Status** — high-level mode of the space: `CLEAN_MODE`, `DIRTY_MODE`, `IN_PREPARATION_MODE`. Drives row colour in the list.
- **Operational State** — finer-grained operational stage of the space. Six values: `OS1: In operation`, `OS2: Overnight standby`, `OS3: Experimental Technology Standby`, `OS4: Experimental Technology Safe State`, `OS5: All Technology Shutdown`, `OS6: Power Shutdown`. Editable only by Area Managers; every change is captured with timestamp + user in the Operational State History.
- **Purity Class** — cleanroom ISO classification: `ISO_5`, `ISO_6`, `ISO_7`, `ISO_8`.
- **Prescribed Clothing** — a multi-select of garment requirements (e.g. *Cap*, *Coat*, *Gloves ISO 5*, *Boots ISO 5*, *Hood*, *Gown ISO 5*, *Beard cover*).
- **Utilities (facility-side / client-side)** — the room's provisioning envelope. Five utility families — *Cooling Water*, *Indoor Environment Quality*, *Compressed Air Distribution*, *Nitrogen Central Distribution*, *Max Pressure In Cold Distribution* — each captured with what the building provides (*facility-side*) and what the experimental client consumes (*client-side*).
- **Cleaning schedule** — a set of recurring days (Mon–Sun) plus a next-cleaning date.
- **Entry to HVAC tent** — free-text note describing entry procedure to the HVAC tent.
- **Additional requirements** — free-text catch-all for room-specific operational notes.
- **Hall contact / Dept contact / Team** — three independently-managed contact tables on the card.
- **Linked locations** — a room card can cover one or more *Locations* from the location codebook. The same location may not appear on two room cards.

## Layout

The module has a **list page** at `/room-cards` and a **detail page** at `/room-card/<uid>`.

### List page (`/room-cards`)

- **Top bar.** Title *Room Cards*, *Add Room Card* (gated by `room-cards-edit`), *Refresh*, and search/filter affordances.
- **Table.** Columns: *Name* (sticky, link), *Status* (badge), *Operational State* (badge with OS code), *Locations* (chip stack of location codes), *Purity Class* (badge), *Prescribed Clothing* (badge stack). 50 rows per page; row hover surfaces *Delete* (gated).

### Detail page (`/room-card/<uid>`)

A single long form composed of six stacked cards:

1. **Info card.** *Name*, *Status* picker (`Clean mode` / `Dirty mode` / `In preparation mode`), *Operational State* picker (OS1–OS6, gated by Area Manager) with *Last updated:* timestamp and *View History* button.
2. **Contacts card.** Three sub-tables side by side:
   - *Contact - Hall* (role + employee + phones)
   - *Contact - Dept.* (employee + phones)
   - *Team* (team name).
3. **Locations card.** List of linked location codes / names with *Add Location* and per-row delete.
4. **CleanRooms card.** *Purity Class*, *Prescribed Clothing* multi-select, *Cleaning Schedule* (day checkboxes + date), *Entry to HVAC tent* text, *Additional Requirements* text.
5. **Building Maintenance card.** Two columns:
   - *Facility-side parameters* — cooling water, indoor environment, compressed air, nitrogen, max pressure (as provided by the building).
   - *Client-side requirements* — the equivalent five fields the experimental team requires.
6. **File manager.** Attachments (drawings, SOPs, photos) — drag-drop upload, link mode for external URLs, tagging.

`[SCREENSHOT PLACEHOLDER: room card detail page mid-scroll — Info card at top showing Status badge and Operational State dropdown with the Last updated timestamp and View History link, Contacts card below with three contact tables, Locations card with two location chips]`

## Common workflows

- [Creating and editing a room card](./workflows/creating-and-editing.md) — name, status, purity, clothing, utilities, cleaning schedule, additional requirements.
- [Managing operational state](./workflows/managing-operational-state.md) — the Area-Manager-gated state change, the history view, what each OS value means.
- [Managing contacts and teams](./workflows/managing-contacts.md) — hall contacts (role-based), department contacts, assigned teams.
- [Managing linked locations](./workflows/managing-locations.md) — add or remove the physical locations the room card covers.
- [Browsing room cards](./workflows/browsing.md) — list page, search, badge legend.

## Coming soon

- 🔮 **Per-location editor scoping** — restrict `room-cards-edit` by the locations the user is responsible for.
- 🔮 **Maintenance schedule** — a separate scheduling block for periodic technical maintenance, similar to the cleaning schedule.
- 🔮 **Alarms / handoff page** — when operational state changes to OS4 / OS5 / OS6, surface a handoff checklist to the next shift.
- 🔮 **Linked systems view** — show the systems located in this room card's locations as a read-only embedded list.
- 🔮 **Bulk operational-state change** — change OS on multiple cards at once during a planned shutdown.

`[VIDEO PLACEHOLDER: 80s end-to-end — open Room Cards → see list → open one card → review Info / Operational State badge → scroll through Contacts → Locations → CleanRooms → Building Maintenance → File manager → click View History on Operational State → see the change log]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The Confluence generator strips it.*
>
> Queries: `RoomCardsQuery` (list), `RoomCardQuery` (detail by uid), `RoomCardContactsHallQuery` / `RoomCardContactsDeptQuery` / `RoomCardTeamsQuery` / `RoomCardLocationsQuery` (per-section subqueries). Mutations: `CreateRoomCards`, `UpdateRoomCards`, `UpdateOperationalStateMutation` (separate so the audit log captures previous/new state), Connect/Disconnect mutations for contacts, teams, and locations. Enums (in the schema): `RoomCardStatus`, `OperationalState`, `PurityClass`, `PrescribedClothing`, `CleaningScheduleDay`. See `src/server/apollo/schema.graphql`.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
