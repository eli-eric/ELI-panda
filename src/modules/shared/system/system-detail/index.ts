// REST read model + write hooks + inline field sections for a single system.
// Consumed by the Systems Explorer (systemHierarchy) and the Edit System sheet.
export { CataloguePropertiesList } from './components/CataloguePropertiesList.comp'
export { CataloguePropertiesSection } from './components/CataloguePropertiesSection.cont'
export { PhysicalItemFields } from './components/PhysicalItemFields.cont'
export { PhysicalItemOrdersSection } from './components/PhysicalItemOrdersSection.cont'
export type { SpareRelationsMode } from './components/SpareRelationsSection.cont'
export { SpareRelationsSection } from './components/SpareRelationsSection.cont'
export { SubsystemsSection } from './components/SubsystemsSection.cont'
export type {
    AncestorClickHint,
    ParentPathItem,
    SelectAncestorHandler,
} from './components/SystemBreadcrumbs.comp'
export { SystemBreadcrumbs } from './components/SystemBreadcrumbs.comp'
export { SystemCodeActions } from './components/SystemCodeActions.cont'
export {
    SystemClassificationFields,
    SystemDescriptionField,
    SystemNameField,
} from './components/SystemDetailFields.cont'
export { SystemImagePanel } from './components/SystemImagePanel.comp'
export { hasEmployeeAssignments, SystemPeopleFields } from './components/SystemPeopleFields.cont'
export { SystemTitleField } from './components/SystemTitleField.cont'
export * from './history'
export { useCreateSystem } from './hooks/mutations/useCreateSystem'
export type { DeleteRelationshipParams } from './hooks/mutations/useDeleteSystemRelationship'
export { useDeleteSystemRelationship } from './hooks/mutations/useDeleteSystemRelationship'
export { useGenerateSystemCode } from './hooks/mutations/useGenerateSystemCode'
export { usePhysicalItemPatch } from './hooks/mutations/usePhysicalItemPatch'
export { useSystemPatch } from './hooks/mutations/useSystemPatch'
export { getSystemMutationScope } from './hooks/mutations/useSystemScopedWrite'
export { usePhysicalItemCatalogueProperties } from './hooks/queries/usePhysicalItemCatalogueProperties'
export { usePhysicalItemOrders } from './hooks/queries/usePhysicalItemOrders'
export {
    getCachedSystemDetail,
    getSystemDetailQueryKey,
    useSystemDetail,
} from './hooks/queries/useSystemDetail'
export { useSystemSpareParts } from './hooks/queries/useSystemSpareParts'
export { useSystemSubsystems } from './hooks/queries/useSystemSubsystems'
export { useSystemFieldSave } from './hooks/useSystemFieldSave'
export * from './types'
export type { OptimisticSystemHint } from './utils/primeSystemDetailCache'
export { primeSystemDetailCache } from './utils/primeSystemDetailCache'
export {
    refreshAfterSystemWrite,
    refreshParentOfChange,
    refreshSystemStructure,
} from './utils/refreshAfterSystemWrite'
export {
    isDuplicateSystemCodeConflict,
    isNotFoundError,
    isStaleConflict,
} from './utils/systemErrors'
