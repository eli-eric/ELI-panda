import { message } from '@/i18n/src/messages'

import type {
    ChangeValue,
    CodebookSnapshot,
    FieldChangeEntry,
    FieldChangeType,
} from '../types/history'

// GraphQL field names that represent codebook relationships
const CODEBOOK_FIELDS: ReadonlySet<string> = new Set([
    'location',
    'zone',
    'systemType',
    'responsible',
    'responsibleTeam',
    'owner',
    'itemUsage',
    'conditionStatus',
])

// Map GraphQL field name -> i18n message key for the label shown in history
export const FIELD_MESSAGE_KEYS: Record<string, string> = {
    name: message.systemHierarchy.fields.name,
    description: message.systemHierarchy.fields.description,
    systemCode: message.systemHierarchy.fields.systemCode,
    systemLevel: message.systemHierarchy.fields.systemLevel,
    systemType: message.systemHierarchy.fields.systemType,
    location: message.systemHierarchy.fields.location,
    zone: message.systemHierarchy.fields.zone,
    responsible: message.systemHierarchy.persons.responsible,
    owner: message.systemHierarchy.persons.owner,
    responsibleTeam: message.systemHierarchy.fields.team,
    serialNumber: message.systemsPage.systemDetail.form.physicalItem.serialNumber.label,
    notes: message.systemsPage.systemDetail.form.physicalItem.notes.label,
    itemUsage: message.systemsPage.systemDetail.form.physicalItem.itemUsage.label,
    conditionStatus: message.systemsPage.systemDetail.form.physicalItem.conditionStatus.label,
}

export const getFieldType = (field: string): FieldChangeType => {
    if (CODEBOOK_FIELDS.has(field)) return 'codebook'
    return 'string'
}

export const getFieldLabelKey = (field: string): string | undefined => FIELD_MESSAGE_KEYS[field]

export const buildChangeEntry = (args: {
    field: string
    oldValue: ChangeValue | null
    newValue: ChangeValue | null
}): FieldChangeEntry => ({
    field: args.field,
    type: getFieldType(args.field),
    oldValue: args.oldValue,
    newValue: args.newValue,
})

export const buildCodebookSnapshot = (
    value: { uid: string; name?: string | null; code?: string | null } | null | undefined,
): CodebookSnapshot | null => {
    if (!value?.uid || !value?.name) return null
    const snapshot: CodebookSnapshot = { uid: value.uid, name: value.name }
    if (value.code) snapshot.code = value.code
    return snapshot
}
