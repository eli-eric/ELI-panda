# Managing contacts and teams

## What this is for

Maintain the **people side** of a room card — the hall contacts (per-role employees responsible for a space), the department contacts (the wider org responsible for the space's function), and the assigned teams. These tables on the *Contacts* card answer "who do I call when something is wrong with this room" and "which team owns this hall."

Use this workflow when staffing changes, when a team is added or removed from a hall's responsibility, or when a new role assignment needs to be reflected on the card.

## Who can do this

✏️ **Room-Card Editor** — requires the `room-cards-edit` role.

Viewers can read all three contact tables but cannot add or remove entries.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- The room card already exists and has been saved at least once. The contact tables tell you so directly when they are empty in create mode — *Save the Room Card first to add contacts*, *Save the Room Card first to add teams*.
- The employees, roles, and teams you need already exist in their codebooks (managed in [Codebooks](../../codebooks/README.md), employee and team admin in the [user guide index](../../README.md)).
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

The Contacts card on the detail page contains three independent sub-tables side by side. The interactions are similar for all three but the entry shape differs.

### Add a hall contact

A hall contact is **role-based** — the entry pairs an *employee* with a *role* on the card (e.g. *Area Manager*, *Cleanroom Operator*, *Safety Officer*).

1. **Scroll to the *Contacts* card** on the room card detail page.

2. **Click *Add* in the *Contact - Hall* table.** A row form appears with two pickers.

   `[SCREENSHOT PLACEHOLDER: Contacts card with three sub-tables visible; the Contact - Hall table is expanded with an Add row showing role and employee dropdowns side by side]`

3. **Pick the *Role*** from the dropdown. The dropdown is the *Contact Person Role* codebook (managed elsewhere). Placeholder text: *Select role*.

4. **Pick the *Employee***. Picker over the employee codebook. Placeholder text: *Select employee*. The selected employee's phones populate the row automatically.

5. **Confirm the row.** A toast confirms the connect: *Adding contact…* → *Contact added*.

### Add a department contact

A department contact is **employee-only** — no role pairing.

1. **Click *Add* in the *Contact - Dept.* table.**

2. **Pick the *Employee***. Same picker as for hall contacts.

3. **Confirm.** A toast confirms.

### Add a team

A *team* is a separate codebook from employees. Assigning a team to a room card says "this team owns this hall."

1. **Click *Add* in the *Team* table.**

2. **Pick the *Team*** from the dropdown. Placeholder text: *Select team*.

3. **Confirm.** A toast confirms.

### Remove a contact, employee, or team

1. **Hover the row** in the relevant sub-table. A delete affordance appears at the end of the row.

2. **Click the delete affordance.** A confirmation modal asks *Are you sure you want to remove this item?*

3. **Confirm.** Toast progression: *Removing…* → *Item removed* (or *Failed to remove item* on error). The row is gone; the connection in the underlying graph is disconnected.

`[VIDEO PLACEHOLDER: 50s — open a saved room card → scroll to Contacts card → Add a Hall contact (pick role then employee) → Add a Dept contact (just employee) → Add a Team → remove one Hall contact → see toast confirmations through the flow]`

## What gets created / changed

**✅ Affected:**
- The connection between the room card and the chosen employee / role / team. The connection is graph-level (disconnect-on-remove), not a copy.
- Each section's row appears or disappears on the card.

**❌ Not affected:**
- The employee, role, or team records themselves. They are codebooks shared facility-wide; adding them to a room card does not modify them.
- Other room cards' contacts. Adding *Alice* as the Area Manager on Hall A does not change her contact status on Hall B.
- The room card's other sections (Info, CleanRooms, Building Maintenance, Locations).

## Limitations

- **Hall contact requires both role and employee.** A role without an employee or vice versa is rejected.
- **No reordering of contacts.** Rows render in the order they were added.
- **No per-contact notes today.** Use the *Additional Requirements* text on the CleanRooms card for context-specific notes (e.g. "Alice is on holiday until 12 May, defer to Bob").
- **No mass copy from another room card.** Each card maintains its own contact tables.
- **Removal is immediate.** The confirmation modal is the only safeguard; no undo.

## Tips & gotchas

- **Match the role to the codebook value.** The *Contact Person Role* codebook is what drives the role dropdown. If the role you need is missing, add it to the codebook first.
- **Use department contacts sparingly.** A room card with 20 department contacts is noise; pick the two or three actually consulted on the room.
- **A team assignment is a stronger signal than a contact.** Teams imply ownership and on-call responsibility; individual contacts are operational entry points. Use teams for who *owns* the room and contacts for who *operates* it.
- **Phones come from the employee record.** PANDA reads the phone numbers from the employee codebook. To fix a wrong phone, update the employee record (in the user / employee admin), not the room card.
- **Removed contacts do not appear in the operational-state history.** The audit log on a room card is for state transitions, not contact churn. Track staffing changes outside PANDA if you need that audit.

## Related

- [Creating and editing a room card](./creating-and-editing.md)
- [Managing operational state](./managing-operational-state.md)
- [Managing linked locations](./managing-locations.md)
- Employees and teams admin → see [Codebooks](../../codebooks/README.md) and [Administration](../../administration/README.md).
