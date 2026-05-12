# Managing linked locations

## What this is for

Tie the room card to one or more *Locations* in the facility location codebook. A room card represents an operational space (a cleanroom, a hall); a location is a codebook row used facility-wide to anchor physical things (orders, items, systems, attachments). Linking them tells PANDA "this room card *covers* these physical locations" — which means systems and items located in those codebook rows are operationally governed by this room card's purity, schedule, and contacts.

Use this workflow when commissioning a new room card (after the initial save), when a room is subdivided / extended, or when a location is reassigned to a different room card.

## Who can do this

✏️ **Room-Card Editor** — requires the `room-cards-edit` role.

Viewers can read the location list but the *Add Location* and per-row delete affordances are disabled.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- The room card already exists and has been saved at least once. In create mode the *Add Location* button is inactive with the tooltip *Save the Room Card first to add locations*.
- The locations you intend to link already exist in the location codebook. (Managed in [Codebooks](../../codebooks/README.md) or the location admin — see the [user guide index](../../README.md).)
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

### Add a location

1. **Scroll to the *Locations* card** on the room card detail page.

   `[SCREENSHOT PLACEHOLDER: Locations card showing two existing rows with their location codes and names, plus an Add Location button at the bottom of the list]`

2. **Click *Add Location*.** A picker opens over the location codebook.

3. **Pick the location** from the picker. Once selected, the row is appended to the list. Toast progression: *Adding location…* → *Location added*.

   If the location is already linked to *this* room card, the request is rejected with *Location already exists*. If it is linked to *another* room card, today PANDA still allows the link (locations are not exclusive to a single room card by enforcement) — but operationally most facilities treat the link as 1-to-1.

4. **Repeat** for any additional locations.

### Remove a location

1. **Hover the row** in the *Locations* card. The delete affordance appears at the end of the row.

2. **Click the delete affordance.** A confirmation modal asks *Are you sure you want to remove this item?*

3. **Confirm.** Toast progression: *Removing…* → *Item removed* (or *Failed to remove item*).

   The location codebook row itself is **not** deleted — only the connection between this room card and the location is dropped. Systems and items anchored at the location continue to exist; they just no longer fall under this room card's operational envelope.

`[VIDEO PLACEHOLDER: 40s — open a saved room card → scroll to Locations card → click Add Location → search and pick a location → see the row appear → try adding the same one again, see the "Location already exists" toast → remove a different row with the delete affordance and confirmation]`

## What gets created / changed

**✅ Affected:**
- The connection between the room card and the picked location. The connection is a graph link; disconnect-on-remove cleanly severs it.
- The list of locations on the card.

**❌ Not affected:**
- The location codebook row. It remains available for linking to other cards / surfaces.
- Systems, items, orders anchored at the location. They continue to reference the location as their physical anchor.
- The room card's other fields.

## Limitations

- **Locations are not enforced exclusive to a single room card.** PANDA does not reject linking a location to two room cards. Operationally this is rarely correct; treat the link as 1-to-1 by convention.
- **No bulk add / remove.** Locations are added one at a time through the picker.
- **No drag-and-drop reordering.** Rows render in connection order.
- **Removal is immediate.** The confirmation modal is the only safeguard; no undo.
- **Location codebook management lives elsewhere.** If the location you need does not exist, add it to the codebook first — adding it inline from this card is not supported.

## Tips & gotchas

- **Maintain 1-to-1 by convention.** A location belonging to two room cards splits operational ownership and confuses downstream reports. Pick the room card that genuinely *governs* the location.
- **Subdivided rooms.** When a single physical space is treated as two cleanroom zones, model it as two locations (one per zone) and link each to its respective room card. Avoid sharing one location across two cards.
- **Linking a location is a strong claim.** It says the room card's purity class, prescribed clothing, cleaning schedule, and contacts apply to anything anchored at that location. Spot-check that the systems and items at the location actually belong under those constraints.
- **Removing a location does not delete underlying records.** Systems at the location keep their anchor; only the operational umbrella is removed. If you remove a location by mistake, re-link it and the umbrella is restored.
- **Cross-check with the [Zones](../../zones/README.md) module.** Zones and locations are different codebooks but often correspond at the physical level. Zone assignments on systems (via Systems Overview) plus location links on room cards together describe "what is in this room" from two angles.

## Related

- [Creating and editing a room card](./creating-and-editing.md)
- [Managing operational state](./managing-operational-state.md)
- [Managing contacts and teams](./managing-contacts.md)
- [Browsing room cards](./browsing.md)
- Location codebook → see the [user guide index](../../README.md).
- Zones overview → see the [Zones](../../zones/README.md) module (planned).
