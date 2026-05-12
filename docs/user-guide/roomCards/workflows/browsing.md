# Browsing room cards

## What this is for

Find a room card — by name, by current status, by operational state, by linked locations, by purity class, by prescribed clothing. The list is the daily scoreboard for facility operations: which halls are clean-mode vs in-preparation, which spaces are in OS3 (experiment standby), how the purity classes are distributed.

## Who can do this

👁️ All personas — list browsing and detail-page viewing are available with `room-cards-view`.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You are on the **Room Cards** page (sidebar entry *Room Cards*).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

The list is a single sortable table; search and filter affordances live in the top toolbar.

1. **Scan the list.** The default pagination is 50 rows per page. Columns at a glance:

   | Column | What it shows |
   |---|---|
   | **Name** (sticky) | The room card's display name — link to the detail page |
   | **Status** | Badge: *Clean mode*, *Dirty mode*, *In preparation mode* |
   | **Operational State** | Badge: OS1–OS6 |
   | **Locations** | Chip stack of location codes the card covers |
   | **Purity Class** | Badge: *ISO 5*, *ISO 6*, *ISO 7*, *ISO 8* |
   | **Prescribed Clothing** | Badge stack of garment requirements |

   `[SCREENSHOT PLACEHOLDER: Room Cards list with eight rows visible — each showing the badge stack across Status / Operational State / Locations / Purity Class / Prescribed Clothing; one row is hovered showing the action affordance]`

2. **Search.** Type into the search field in the top toolbar to narrow the table by name (partial match).

3. **Sort.** Click any column header to sort. Common triage sorts: *Operational State* (group by OS to spot OS5 / OS6 shutdowns), *Status* (clean / dirty groupings), *Purity Class* (find ISO_5 cleanrooms).

4. **Open a card.** Click the *Name* link in any row. The URL takes the form `/room-card/<uid>`; the detail page loads with all six section cards. The browser back button returns to the list with sort and search preserved.

5. **Refresh.** Use the *Refresh* button in the toolbar if another user has just changed something — the list is not pushed automatically.

`[VIDEO PLACEHOLDER: 30s — open Room Cards → see list → search a partial name → sort by Operational State → notice OS5 rows clustered → click one row's name → land on the detail page → browser back to confirm state preservation]`

## Badge legend

The list relies on colour-coded badges; learn them to triage at a glance.

- **Status**
  - *Clean mode* — green-ish, normal cleanroom operation.
  - *Dirty mode* — red-ish, the space is not currently a controlled cleanroom.
  - *In preparation mode* — amber-ish, between modes; controlled access only.

- **Operational State** — see [Managing operational state](./managing-operational-state.md) for the meaning of each OS code.

- **Purity Class** — `ISO_5` (strictest) through `ISO_8` (least strict). Most cleanrooms in PANDA sit at ISO 7 or ISO 8.

- **Prescribed Clothing** — short-form badges for each garment. Order in the badge stack mirrors the order they were ticked on the card.

## Tips & gotchas

- **Status vs Operational State.** Two badges that read as similar but tell different stories — *Status* is the everyday mode, *Operational State* is the safety / shutdown stage. Use both in triage.
- **Locations stack signals scope.** A card linked to many locations covers a large physical area — useful to spot when operational changes will affect a lot of downstream systems.
- **Clothing stack is the gate at the door.** Counting the clothing badges quickly tells you the *complexity* of entering a hall.
- **No filter sheet today.** Search is by name only; filter by status / OS / purity is via column sort and visual scan. A multi-field filter sheet is on the roadmap.
- **Refresh after a state change.** Operational State transitions by another user do not push to your view; click *Refresh* to pick up the new badges.
- **The list is the dashboard.** Bookmark this URL — it is the most-used entry point to the module.

## Related

- [Creating and editing a room card](./creating-and-editing.md)
- [Managing operational state](./managing-operational-state.md)
- [Managing contacts and teams](./managing-contacts.md)
- [Managing linked locations](./managing-locations.md)
