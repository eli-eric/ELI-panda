# Managing system people

## What this is for

Assign and update the people accountable for a system on the **Persons** tab: the responsible person, the responsible team, the (read-only) owner, plus the *Authorized Operators* and *Maintained By* tables. These assignments drive accountability today and — once Phase 2 ships — the technical edit permissions for the system's subtree.

## Who can do this

✏️ **Editor / Admin** — requires the `systems-edit` role to make changes. Viewers see the Persons tab but cannot modify it.

> 🔮 *Coming soon — Phase 1:* changes to systems at `SYSTEM_DOMAIN` and `TECHNOLOGY_UNIT` levels (where responsibility decisions are most consequential) will be admin-only.

> 🔮 *Coming soon — Phase 2:* responsible-team membership will technically gate edits to a system and its subtree. **Today this is policy only — the application does not enforce it.**

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have a system selected and the **Persons** tab is open in the detail view.
- You know which employee or team to assign.
- See [Key concepts](../README.md#key-concepts) for terminology (responsible person, responsible team, owner, operators, maintained by).

## Steps

### Single-person fields

The top of the tab shows three single-employee fields. All save on blur (toast: *Saving…* → *Saved successfully*).

`[SCREENSHOT PLACEHOLDER: top of the Persons tab showing Responsible Person, Owner (greyed out), and Team (responsible team) as inline combobox fields]`

| Field | Editor | Notes |
|---|---|---|
| **Responsible Person** | searchable combobox (employee codebook) | Single value. The person ultimately accountable for the system. |
| **Owner** | read-only | Computed by the system; not directly editable. |
| **Team** (responsible team) | searchable combobox (team codebook) | Single value. **High-impact field** — see below. |

1. **Set the Responsible Person.** Click the *Responsible Person* field, type to search the employee codebook, pick the result. The field saves as soon as you blur it.

2. **Set the Responsible Team.** Same pattern with the *Team* field. Read the warning below before changing this on an established subtree.

3. **Owner is informational only.** It reflects an ownership computation and cannot be edited from this UI.

> ⚠️ **Changing the responsible team is a high-impact change.**
> The responsible team determines who *should* be allowed to edit this system and its subtree (per documented policy today, technically enforced in Phase 2). Reassigning the team can move edit-rights for the entire subtree from one team to another. Make sure the new team is aware before changing this.

### Operators and Maintained-By tables

The lower portion of the tab shows two employee-list tables: **Authorized Operators** and **Maintained By**. They behave identically.

> **Note:** these tables are only shown when the system level is **not** `SUBSYSTEMS_AND_PARTS`. At the lowest level of the hierarchy individual operator/maintainer assignments aren't tracked here — they roll up from a higher-level system.

`[SCREENSHOT PLACEHOLDER: Authorized Operators and Maintained By tables stacked, each showing 2-3 employee rows with a delete icon on the right and a "+" button in the table header]`

4. **Add an employee to a table.** Click the **+** button in the table header. A modal opens with a searchable list of employees; employees already on the table are excluded so you cannot add duplicates.

5. **Pick an employee** from the modal. The row appears in the table immediately.

6. **Remove an employee.** Click the delete icon at the right of a row. A confirmation appears (*Remove <employee name>?*); confirming removes the row.

7. **The + and delete controls are hidden** for users without the `systems-edit` role. Read-only users see the assignment list but no add or remove affordances.

`[VIDEO PLACEHOLDER: 30s — open the Persons tab on a key system, change the Responsible Person inline, then click + on Authorized Operators, pick two employees from the modal, remove one of them via the delete icon and confirm the dialog]`

## Tips & gotchas

- **Search the codebook by typing.** All three single-person fields and the operator/maintained-by modals search on free text — type a partial last name to narrow down quickly.
- **Each system has at most one responsible person and one responsible team.** Operators and maintained-by are multi-value lists.
- **The Persons tab feeds the *Quick Info* sidebar** — assignment changes show up there immediately on the right.
- **Operator and maintained-by changes are mid-impact.** They affect day-to-day operation and on-call rotas; mention any change to the affected employees.
- **When the operator/maintained-by tables don't appear,** check the system level — they are intentionally hidden at `SUBSYSTEMS_AND_PARTS`.

## Related

- [Editing system details](./editing-system-details.md) — for non-people fields on the Detail tab.
- [Managing relationships](./managing-relationships.md) — engineering links between systems.
- [Viewing change history](./viewing-change-history.md) — all assignment changes (responsible person/team, operators, maintained-by) appear in the system's history feed.
