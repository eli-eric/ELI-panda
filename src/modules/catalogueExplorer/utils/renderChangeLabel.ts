import { message } from '@/i18n/src/messages'
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

const ENTITY_TYPE_I18N_KEY: Record<ChangeEntryEntity['type'], string> = {
    category: message.catalogue.category.entityCategory,
    group: message.catalogue.category.entityGroup,
    property: message.catalogue.category.entityProperty,
    physicalProperty: message.catalogue.category.entityPhysicalProperty,
}

/** i18n message id for the badge label of a change entry's entity type. */
export const getEntityTypeI18nKey = (entry: FieldChangeEntry): string | null => {
    if (!isEntityEntry(entry)) return null
    return ENTITY_TYPE_I18N_KEY[entry.entity.type]
}
