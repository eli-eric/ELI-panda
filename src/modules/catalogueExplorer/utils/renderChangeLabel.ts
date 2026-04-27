import type { ChangeEntryEntity, FieldChangeEntry } from '@/modules/systemItem/types/responses'

export interface EntityChangeEntry extends FieldChangeEntry {
    entity: ChangeEntryEntity
}

export const isEntityEntry = (e: FieldChangeEntry): e is EntityChangeEntry => !!e.entity

/**
 * Returns the display-friendly label for a change entry.
 *
 * - Legacy flat audit (item/system): just the bare field, server already provides
 *   display-friendly value (e.g. "supplier", "Voltage").
 * - Entity-scoped audit (category groups/properties post #410): prefixed with
 *   `${entity.name}: ${field}` so users see which group/property changed.
 */
export const renderChangeLabel = (entry: FieldChangeEntry): string => {
    if (isEntityEntry(entry)) {
        return `${entry.entity.name}: ${entry.field}`
    }
    return entry.field
}
