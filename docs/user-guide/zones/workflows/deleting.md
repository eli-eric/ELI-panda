# Deleting zones

## What this is for

Remove a zone from the registry. Deletion takes the zone out of every picker and filter across the app; existing records that referenced it keep their UID link, which becomes orphaned (the picker label disappears in subsequent views).

In almost every case **renaming** or **re-parenting** is preferable to deleting. Delete only when the zone was a mistake, a duplicate of another, or genuinely no longer needed and the orphan-reference impact is acceptable.

## Who can do this

✏️ **Zone Editor / Admin** — requires the `zones-edit` role.

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

- You have `zones-edit`.
- You have confirmed the zone is not heavily referenced. Spot-check downstream modules:
  - [Systems Overview](../../systems/README.md) filtered by *Zone* to count system assignments.
  - [Control Systems](../../controlSystems/README.md) Overview filtered by Zone to count generated system codes.
  - [Room Cards](../../roomCards/README.md) that mention the zone's locations in their *Locations* card.
- If the zone is a **parent** zone, its subzones will have their *Parent Zone* cleared by the delete — they remain as root zones.

## Steps

1. **Locate the row** in the Zones list.

2. **Open the per-row dropdown** in the *Actions* column.

3. **Click *Delete***. A confirmation modal asks: *Are you sure you want to delete this zone?*

   `[SCREENSHOT PLACEHOLDER: Zones row with the action dropdown open showing Edit and Delete entries; the confirmation modal in front asking to confirm the deletion]`

4. **Confirm in the modal.** Toast progression:
   - *Deleting…* — request in flight.
   - *Deleted* — success; the row is gone.
   - *Delete failed* — server-side block; the toast surfaces the cause.

5. **Verify the impact.** Open the affected downstream pickers (e.g. the [Systems Overview](../../systems/README.md) *Zone* filter) and confirm the deleted zone no longer appears as a candidate.

## What gets removed / preserved

**✅ Removed:**
- The Zone record.
- The zone's appearance in every picker, filter, and combobox across PANDA.

**✅ Preserved (with side-effects):**
- Subzones whose *Parent Zone* was this zone — they remain but become root zones. Re-parent them manually if that is not the desired outcome.
- Existing system records, control-system codes, room cards, and order lines that referenced the zone — they keep their UID reference. The picker label resolution may render blank or a stale name fallback depending on the surface.

**❌ Not affected:**
- Other zones.
- The [System Type](../../systemTypeEdit/README.md) mask templates — they still substitute `{ZC}` using the (now orphan) UID for legacy records.

## Limitations

- **No "where used" view in the Zones page.** PANDA does not list downstream references before delete. Audit through the consuming modules' filter sheets.
- **No undo.** Deletion is final. Re-creating a zone with the same name and code does *not* restore the UID — past records remain orphaned.
- **No soft-delete / retire.** Today delete is hard. A *retire* state (hide from new pickers, keep for history) is on the roadmap.
- **Bulk delete is not supported today.** Each zone is deleted one at a time. Roadmap.

## Tips & gotchas

- **Audit before deleting.** The combined picture from [Systems Overview](../../systems/README.md), [Control Systems](../../controlSystems/README.md), and [Room Cards](../../roomCards/README.md) is the quickest sanity check.
- **Prefer rename or re-parent.** Renaming preserves the UID; the label updates everywhere. Re-parenting (setting *Parent Zone* to *None (root zone)* or to a different parent) preserves connections too. Both are non-destructive.
- **Re-parent subzones first** if the zone you delete is a parent. Otherwise the subzones float up to root and you have to clean up downstream.
- **Recreating with the same code is not the same zone.** A new UID means past records still point at the old, deleted UID. Downstream picker labels stay broken even after recreation.
- **Delete the dummy before bulk import.** When seeding a fresh environment with a CSV import, delete sample / placeholder zones beforehand to avoid mixed populations.

## Related

- [Browsing zones](./browsing.md)
- [Creating and editing zones](./creating-and-editing.md)
- [Importing zones from CSV](./importing-csv.md)
- Downstream consumers → see the [Systems Overview](../../systems/README.md), [Control Systems](../../controlSystems/README.md), [Room Cards](../../roomCards/README.md), and *Editing system details* in the [System Hierarchy](../../systemHierarchy/README.md).
