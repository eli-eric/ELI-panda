/**
 * Global Search Module
 * Provides global search functionality with CMD+K / CTRL+K keyboard shortcut
 */

export { GlobalSearchCommand } from './components/GlobalSearchCommand.comp'
export { GlobalSearchCommandContainer } from './components/GlobalSearchCommand.cont'
export { useGlobalSearch } from './hooks/useGlobalSearch'
export { useGlobalSearchShortcut } from './hooks/useGlobalSearchShortcut'
export { useGlobalSearchStore } from './store/useGlobalSearchStore'
export type {
  GlobalSearchItem,
  GlobalSearchQuery,
  GlobalSearchResponse,
  NodeType,
  NodeTypeConfig
} from './types'
export { getNodeTypeConfig } from './utils/getNodeTypeConfig'
export { getRedirectPath } from './utils/getRedirectPath'
export { mapNavBarToQuickNav } from './utils/mapNavBarToQuickNav'
export type { QuickNavItem } from './utils/mapNavBarToQuickNav'
