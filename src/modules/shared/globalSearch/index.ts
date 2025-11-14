/**
 * Global Search Module
 * Provides global search functionality with CMD+K / CTRL+K keyboard shortcut
 */

export { GlobalSearchCommandContainer } from './components/GlobalSearchCommand.cont'
export { GlobalSearchCommand } from './components/GlobalSearchCommand.comp'
export { useGlobalSearch } from './hooks/useGlobalSearch'
export { useGlobalSearchShortcut } from './hooks/useGlobalSearchShortcut'
export { getNodeTypeConfig } from './utils/getNodeTypeConfig'
export { getRedirectPath } from './utils/getRedirectPath'
export type {
  GlobalSearchItem,
  GlobalSearchQuery,
  GlobalSearchResponse,
  NodeType,
  NodeTypeConfig
} from './types'
