import { message } from '@/i18n/src/messages'

// Audit `ChangeEntry.field` (as written by the API) -> i18n key of the label shown in history.
export const FIELD_MESSAGE_KEYS: Record<string, string> = {
    name: message.systemHierarchy.fields.name,
    description: message.systemHierarchy.fields.description,
    systemCode: message.systemHierarchy.fields.systemCode,
    systemLevel: message.systemHierarchy.fields.systemLevel,
    systemType: message.systemHierarchy.fields.systemType,
    location: message.systemHierarchy.fields.location,
    zone: message.systemHierarchy.fields.zone,
    importance: message.systemHierarchy.fields.importance,
    responsible: message.systemHierarchy.persons.responsible,
    owner: message.systemHierarchy.persons.owner,
    responsibleTeam: message.systemHierarchy.fields.team,
    operators: message.systemHierarchy.persons.authorizedOperators,
    maintainedBy: message.systemHierarchy.persons.maintainedBy,
    minimalSpareParstCount: message.systemsPage.systemDetail.form.minimalSpareParstCount.label,
    serialNumber: message.systemsPage.systemDetail.form.physicalItem.serialNumber.label,
    notes: message.systemsPage.systemDetail.form.physicalItem.notes.label,
    itemUsage: message.systemsPage.systemDetail.form.physicalItem.itemUsage.label,
    conditionStatus: message.systemsPage.systemDetail.form.physicalItem.conditionStatus.label,
}

export const getFieldLabelKey = (field: string): string | undefined => FIELD_MESSAGE_KEYS[field]
