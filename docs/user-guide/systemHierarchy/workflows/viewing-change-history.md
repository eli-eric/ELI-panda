# Viewing change history

## What this is for

See a chronological feed of every change that has ever been made to a system: who made the change, when, what kind of change, and the exact field values before and after. The History tab is the audit trail for the system — useful for figuring out why a system is in its current state, who reassigned a responsible team, or when a physical item was moved.

## Who can do this

👁️ **All personas** — viewing history requires only the `systems-view` role. There is no "edit history" — entries are written automatically as side effects of other actions.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have a system selected and the **History** tab is open in the detail view.
- See [Key concepts](../README.md#key-concepts) for terminology (system, physical item, responsible team).

## What the History tab shows

The History tab is a vertically scrolling timeline of events. Each entry shows:

- **User** — who made the change.
- **Action badge** — color-coded by event type (see *Event types* below).
- **Message** — the human-readable description of what happened, with the changed field and its values inline.
- **Timestamp** — right-aligned, when the change happened.

`[SCREENSHOT PLACEHOLDER: History tab with the filter bar at the top (action-type radio group + user dropdown), and below it a vertical feed of 4-5 history entries showing user, action badge, change message, and timestamp]`

### Event types

The action badge maps to one of four types:

| Type | Meaning |
|---|---|
| **General** | Any change to system attributes (name, code, level, location, zone, type, description, importance, persons, etc.). |
| **Item Changes** | Edits to the physical item attached to this system (condition, usage, notes, etc.). |
| **System Moves** | This system was moved to a different parent in the hierarchy. |
| **Item Moves** | The physical item attached to this system was moved (assigned to a different system). |

### Field-change message format

Most *General* and *Item Changes* entries describe a specific field that changed. The message format follows one of three patterns:

| Situation | Message |
|---|---|
| Value was **set** (previously empty) | *set **<field>** to **<newValue>*** |
| Value was **changed** | *changed **<field>** from **<oldValue>** to **<newValue>*** |
| Value was **cleared** | *cleared **<field>*** |

Empty values are rendered as **(empty)** in the message — useful when distinguishing "field was set to blank" from "field was unchanged".

## Steps

### Browsing the timeline

1. **Open the History tab.** The most recent entries appear at the top. Scroll down to see older entries.

2. **Read the message** to understand what changed. Bolded values are the field name and the before/after values. The user shown is whoever was logged in when the change was made.

3. **Hover the timestamp** if you need finer time precision than the rendered format.

### Filtering by action type

4. **Use the *Filter by action type*** radio group at the top of the tab to narrow to one event class:

   - **All** (default) — all event types.
   - **General** — system-attribute edits.
   - **Item Changes** — physical-item edits.
   - **System Moves** — hierarchy moves of this system.
   - **Item Moves** — moves of the physical item that was on this system.

   `[SCREENSHOT PLACEHOLDER: filter bar with the action-type radio group expanded showing All / General / Item Changes / System Moves / Item Moves options]`

### Filtering by user

5. **Use the *Filter by user*** dropdown next to the action-type filter. The dropdown is populated from the users who appear in the history of *this specific system* — so you only see relevant users, not the entire workforce.

6. **Pick *All users*** to clear the user filter without resetting the action-type filter.

### Reading move events

7. **System Moves** entries describe a move of this system itself: *"<user> moved this system from <oldParent> to <newParent>"* (paraphrased — exact wording depends on the data).

8. **Item Moves** entries record when the physical item attached to this system was reassigned — note the lifecycle: an item that *moves out* of this system stops contributing to its history afterwards.

`[VIDEO PLACEHOLDER: 30s — open the History tab, scroll the timeline, filter to "General" and watch the feed shrink, then add a user filter and watch it shrink further, then reset filters]`

## Tips & gotchas

- **History is per-system.** When you select a different system, the timeline resets to that system's events. Move events are only recorded once — on the system that moved.
- **History does not include relationship changes** the same way it includes attribute changes — relationship create/delete shows up under *General* but with less granular detail than field-by-field diffs.
- **Filtering does not affect what's loaded** — the feed loads the full history and filters in place. For very long-lived systems with many edits, scrolling is the only navigation; there is no pagination.
- **Empty history** shows *No history available*. This happens for very new systems, or for systems where all changes happened before history tracking was introduced.
- **The timeline is read-only.** You cannot edit, undo, or annotate entries here. To revert a bad change, edit the field again on the appropriate tab — the revert itself becomes a new history entry.
- **Use this tab when troubleshooting.** "Who set the responsible team?" / "When was this moved into TRASH?" / "When did the spare swap happen?" are all answered fastest from here.

## Related

- [Editing system details](./editing-system-details.md) — every Detail-tab edit shows up under *General*.
- [Managing system people](./managing-system-people.md) — every Persons-tab change shows up under *General*.
- [Managing relationships](./managing-relationships.md) — relationship create/delete events.
- [Managing physical items](./managing-physical-items.md) — item assignment and move events appear under *Item Changes* and *Item Moves*.
