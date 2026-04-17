import { message } from '@/i18n/src/messages'
import type {
    ChangeValue,
    CodebookSnapshot,
    FieldChangeEntry,
    FieldChangeType,
} from '@/modules/systemItem/types/responses'

// GraphQL field names that represent codebook relationships
const CODEBOOK_FIELDS: ReadonlySet<string> = new Set([
    'location',
    'zone',
    'systemType',
    'responsible',
    'responsibleTeam',
    'owner',
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
