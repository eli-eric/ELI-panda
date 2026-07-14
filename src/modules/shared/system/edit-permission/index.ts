// Per-system edit permission: the client-side gate for otherwise unguarded
// GraphQL system patches. Shared by systemHierarchy (inline edit) and the
// shared "Edit System" sheet.
export { SystemEditRestrictionBanner } from './components/SystemEditRestrictionBanner.comp'
export type {
    SystemCanEditResponse,
    SystemResponsible,
} from './hooks/useSystemCanEdit'
export {
    ensureSystemCanEdit,
    normalizeCanEditResponse,
    SYSTEM_CAN_EDIT_QUERY_KEY,
    useSystemCanEdit,
} from './hooks/useSystemCanEdit'
export type {
    SystemEditPermission,
    SystemEditPermissionStatus,
} from './hooks/useSystemEditPermission'
export {
    formatResponsibleName,
    useSystemEditPermission,
} from './hooks/useSystemEditPermission'
export { guardSystemEdit } from './utils/guardSystemEdit'
