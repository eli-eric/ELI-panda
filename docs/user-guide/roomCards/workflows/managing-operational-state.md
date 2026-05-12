# Managing operational state

## What this is for

Set or change the room's *Operational State* — the governance-grade indicator of where in the safety / shutdown ladder the space currently sits. Operational state is the field on a room card that drives the everyday "what mode is the hall in" question (planned shutdown, in-operation, safe-state for an experiment) and the *only* field on the card that carries a full change-history audit log: every transition is recorded with the previous state, the new state, the timestamp, and the user who made the change.

The field is **gated separately** from the rest of the form: ordinary Room-Card Editors can read it but cannot change it; only **Area Managers** for the card's scope can transition the state.

## Who can do this

🛡️ **Area Manager** — required to *change* the Operational State.

| Action | Required permission |
|---|---|
| View the current state and the history | `room-cards-view` |
| Edit the card's other fields | `room-cards-edit` |
| **Change the Operational State** | `room-cards-edit` *plus* Area-Manager scope for the card |

Editors without Area-Manager scope see the field but the dropdown is disabled; the tooltip reads *Only Area Managers can edit this field*.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- The room card already exists. See [Creating and editing a room card](./creating-and-editing.md).
- You have Area-Manager scope for the room card.
- You have a clear reason for the transition — the change is logged with timestamp and user, and audited.

## The six operational states

The Operational State dropdown surfaces six values, in a typical ladder from full operation down to power shutdown:

| Value | Label | Typical meaning |
|---|---|---|
| `OS1` | *OS1: In operation* | Normal operating mode |
| `OS2` | *OS2: Overnight standby* | Reduced load between shifts |
| `OS3` | *OS3: Experimental Technology Standby* | Experiment paused, technology not actively running |
| `OS4` | *OS4: Experimental Technology Safe State* | Experiment safed; access more permissive |
| `OS5` | *OS5: All Technology Shutdown* | All in-room technology down; broader access |
| `OS6` | *OS6: Power Shutdown* | Power off; full shutdown |

The exact procedural meaning of each value at your facility lives in the facility's safety documentation — PANDA records *which* state the space is in; the SOP defines the consequences.

## Steps

### Change the Operational State

1. **Open the room card** from the list. The Info card at the top shows the current Operational State as a badge and the timestamp under *Last updated:*.

   `[SCREENSHOT PLACEHOLDER: Info card on the room card detail page showing Operational State dropdown set to OS1: In operation, Last updated: timestamp line below, View History button to the right of the dropdown]`

2. **Click the Operational State dropdown.** Pick the new value from the six options. If the dropdown is disabled, you do not have Area-Manager scope for this card — the tooltip surfaces the reason.

3. **Save the card.** Click *Save* (or *Save & Exit*). The change is committed; an audit entry is written to the operational-state history. A toast confirms.

4. **Verify in the history.** Click *View History* next to the dropdown to confirm the new entry — see *View the change history* below.

### View the change history

1. **Click *View History*** on the Info card. A modal opens — *Operational State History*.

2. **Read the entries** in reverse-chronological order. Each row shows:
   - *Date/Time* — when the change occurred.
   - *Previous State* — the state before the change.
   - *New State* — the state after the change.
   - *Changed By* — the user who made the change.

   If no entry exists, the empty-state reads *No history available* — most often on a freshly-created card whose OS field was never set.

   `[SCREENSHOT PLACEHOLDER: Operational State History modal — title "Operational State History", a table with four rows showing different transitions over the past week, each with timestamp / previous / new / user, Close button at the bottom]`

3. **Close** the modal with the *Close* button or the modal close affordance.

`[VIDEO PLACEHOLDER: 40s — open the room card → see OS1 in the Info card → change to OS3 via the dropdown → Save → toast confirms → click View History → see the new entry at the top with previous OS1, new OS3, timestamp and user → Close]`

## What gets created / changed

**✅ Affected:**
- The room card's *Operational State* field.
- A new entry in the operational-state history (timestamp, previous state, new state, user).
- The badge on the Room Cards list updates to the new OS code.

**❌ Not affected:**
- Other fields on the room card (status, purity class, contacts, utilities, locations).
- Other room cards. State transitions are per-card.
- Systems located in the room. Operational state lives on the room card, not on the systems inside.
- Audit history entries from before. The history is append-only — there is no edit or delete affordance for past entries.

## Limitations

- **No state-transition validation.** Any state can transition to any other state. The facility SOP defines which transitions are valid in real life; PANDA does not enforce a graph.
- **No reason / comment field on a transition.** The audit captures *what* changed and *who* changed it, not *why*. Note the reason elsewhere (e.g. on a related order, on the card's additional-requirements, in a separate logbook) when context matters.
- **No bulk transition today.** Changing state on many cards (e.g. a facility-wide planned shutdown) is a one-card-at-a-time operation. Bulk is on the roadmap.
- **No alerting today.** Transitions to OS4 / OS5 / OS6 do not trigger notifications or pages. Coordinate handoffs separately.

## Tips & gotchas

- **Save after every transition.** The dropdown is part of the form — changing it without clicking *Save* discards the change. The toast is the confirmation that the change is committed and the history is written.
- **Operational State is governance-grade.** Treat it like a CI change record. The audit is reviewable; mistakes are visible.
- **Use the history modal as a status board for the past day.** Sorting reverse-chronologically gives you a quick "what happened in this room recently" view without leaving the card.
- **Pair OS changes with Cleaning Schedule updates.** When transitioning into a shutdown state (OS5 / OS6), the cleaning schedule typically needs a one-off adjustment — update the next-cleaning date at the same time.
- **Editors without Area-Manager scope** can still help by filling everything else on the card, then asking an Area Manager to set the state and save.

## Related

- [Creating and editing a room card](./creating-and-editing.md)
- [Managing contacts and teams](./managing-contacts.md)
- [Managing linked locations](./managing-locations.md)
- [Browsing room cards](./browsing.md)
