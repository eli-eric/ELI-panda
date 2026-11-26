// Per-system responsibility ("soft lock"): editing a system the user is not
// responsible for is allowed, but asks for a one-time confirmation per system and
// session. The API records the same fact as `outsideResponsibility` in history.
export { SystemEditRestrictionBanner } from './components/SystemEditRestrictionBanner.comp'
export type { SystemCanEditResponse, SystemResponsible } from './hooks/useSystemCanEdit'
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
export { formatResponsibleName, useSystemEditPermission } from './hooks/useSystemEditPermission'
export { useSystemEditConfirmationStore } from './store/useSystemEditConfirmationStore'
export {
    buildOutsideResponsibilityNote,
    confirmSystemEdit,
    getOutsideResponsibilityNote,
    isSystemEditCancelled,
    markSystemEditConfirmed,
    SystemEditCancelledError,
} from './utils/confirmSystemEdit'
