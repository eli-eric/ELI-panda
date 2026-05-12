# Creating and editing a room card

## What this is for

Bring a new cleanroom or technical hall into PANDA, or amend an existing one. The room card is the single source of truth for a space's cleanroom requirements (purity class, prescribed clothing, cleaning schedule), its utility envelope (cooling water, indoor environment, compressed air, nitrogen, max pressure — both facility-side and client-side), and its admin metadata (status, additional requirements, HVAC tent entry).

Operational State is gated separately — see [Managing operational state](./managing-operational-state.md). Contacts, teams, and linked locations have their own workflows.

## Who can do this

✏️ **Room-Card Editor** — requires the `room-cards-edit` role.

Viewers can open the detail page but every field is disabled and *Save* is hidden.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `room-cards-edit`.
- The locations you will link to the room card already exist in the location codebook. If not, create them first (see [Codebooks](../../codebooks/README.md) or the [user guide index](../../README.md)).
- See [Key concepts](../README.md#key-concepts) for terminology (status, purity class, prescribed clothing, facility-side vs client-side utilities).

## Steps

### Create a new room card

1. **Click *Add Room Card*** in the top toolbar of the Room Cards list page. The detail page opens in create mode.

   `[SCREENSHOT PLACEHOLDER: empty room card detail page in create mode — Info card with Name input blank, Status placeholder "Select Status", Operational State placeholder "Select Operational State" (disabled hint visible), Save and Save & Exit in the header]`

2. **Fill the *Info* card.**
   - **Name** (required) — display label for the card. Appears in the list and on every cross-reference.
   - **Status** (required) — *Clean mode*, *Dirty mode*, or *In preparation mode*. Drives the badge colour on the list.
   - **Operational State** — leave blank for now; see [Managing operational state](./managing-operational-state.md). Setting OS at creation time requires Area-Manager permission.

3. **Save the card.** Click *Save*. The URL updates with the new UID and the right-hand cards (*Contacts*, *Locations*) become operable. Some affordances are explicit about needing the initial save — the tooltips read *Save the Room Card first to add locations*, *Save the Room Card first to add contacts*, *Save the Room Card first to add teams*.

4. **Fill the *CleanRooms* card.**
   - **Purity Class** — `ISO_5`, `ISO_6`, `ISO_7`, or `ISO_8`. Drives the badge on the list.
   - **Prescribed Clothing** — multi-select of garment requirements: *Cap*, *Coat*, *Gloves ISO 5*, *Boots ISO 5*, *Hood*, *Gown ISO 5*, *Beard cover*, etc. Tick every garment that must be worn entering the space.
   - **Cleaning Schedule** — tick the days of the week the cleaning is performed (*Monday* through *Sunday*) and set the next-cleaning *date*.
   - **Entry to HVAC tent** — free text describing entry procedure.
   - **Additional Requirements** — free-text catch-all for room-specific notes (PPE exceptions, training requirements, access constraints).

   `[SCREENSHOT PLACEHOLDER: CleanRooms card open with Purity Class set to ISO_6, four clothing items ticked, Cleaning Schedule showing Mon / Wed / Fri checked plus a next date, Entry to HVAC tent and Additional Requirements text-areas filled]`

5. **Fill the *Building Maintenance* card.** Two columns:
   - *Facility-side parameters* — what the building provisions: **Cooling Water**, **Indoor Environment Quality**, **Compressed Air Distribution**, **Nitrogen Central Distribution**, **Max Pressure In Cold Distribution**. Each is a text / structured input (capture the range / nominal value as appropriate).
   - *Client-side requirements* — the same five fields again from the experimental client's point of view (what the team using the space *needs*). Mismatches between facility-side and client-side surface gaps that need to be resolved with the engineering team.

6. **Attach files** in the file manager block at the bottom of the page. Drawings, SOPs, photos of the space, calibration certificates. Tag for easy filter later.

7. **Save again.** Click *Save* (stays on the page) or *Save & Exit* (returns to the list). A toast confirms.

### Edit an existing room card

1. **Open the card** from the list — click the *Name* link.

2. **Edit any field.** All form sections are inline-editable. The Operational State field requires Area-Manager permission (see [Managing operational state](./managing-operational-state.md)).

3. **Save.** Same as creation. Changes propagate to every list / report view.

### Delete a room card

1. **Hover the row in the list** and click the row's delete affordance. A confirmation modal asks: *Are you sure you want to delete room card "{name}"?*

2. **Confirm.** Deletion is blocked if linked physical Locations or recorded operational-state history would be orphaned in an undesirable way; the toast lists any blocker.

`[VIDEO PLACEHOLDER: 75s — Add Room Card → fill Name and Status → Save → fill Purity Class + Clothing → Cleaning Schedule (Mon/Thu, next date) → Entry text → Building Maintenance facility-side and client-side fields → Save → return to list to confirm the new badge stack on the row]`

## What gets created / changed

**✅ Affected by this workflow:**
- Room card record with name, status, purity class, prescribed clothing, cleaning schedule + days, HVAC text, additional requirements text, facility- and client-side utility fields.
- File attachments on the card.
- Last update audit (timestamp + user).

**❌ Not affected:**
- Operational State — captured in its own workflow with audit history. See [Managing operational state](./managing-operational-state.md).
- Linked contacts and teams — managed in [Managing contacts and teams](./managing-contacts.md).
- Linked locations — managed in [Managing linked locations](./managing-locations.md).
- Systems located in this room's locations — they are read-only here; system attributes are edited in the [System Hierarchy](../../systemHierarchy/README.md).

## Limitations

- **Multi-section affordances need the initial save.** Locations, contacts, teams cannot be added in create mode — save the card first.
- **Facility / client side fields are free text.** Numeric validation (units, ranges) is not enforced today. Adopt a team convention for entry format.
- **No copy-from-existing.** New room cards are filled from scratch. For similarly-configured spaces, copy values manually from another card's detail page.
- **Operational State is gated separately.** A non-Area-Manager editor sees the field but cannot change it; the tooltip reads *Only Area Managers can edit this field*.

## Tips & gotchas

- **Status vs Operational State.** Two badges that read as similar but are not. *Status* (Clean / Dirty / In preparation) is the everyday mode. *Operational State* (OS1–OS6) is the safety / shutdown stage. Both matter; both render on the list.
- **Cleaning Schedule has both days and date.** The day checkboxes describe the *recurrence*; the date describes the *next* scheduled cleaning. Update the date after each cleaning so the next one is calendared.
- **Facility-side vs client-side utility fields are intentional duplication.** The pair documents the gap between provisioning and demand. Filling only one side defeats the purpose.
- **Save before adding contacts.** Tooltips remind you, but it is easy to fill the Contacts card in create mode and lose the data. Save the card first, then add contacts.
- **Use Additional Requirements for unusual conditions.** PPE exceptions, training prerequisites, restricted-access notes — write them here so the next shift sees them on the card.

## Related

- [Managing operational state](./managing-operational-state.md)
- [Managing contacts and teams](./managing-contacts.md)
- [Managing linked locations](./managing-locations.md)
- [Browsing room cards](./browsing.md)
- Locations codebook → see the [user guide index](../../README.md).
