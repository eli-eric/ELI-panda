/**
 * Pagination System Types
 *
 * This module provides typed pagination state management to replace
 * the legacy JSON string format used in the store.
 */

/**
 * Typed pagination state
 */
export interface PaginationState {
  page: number
  pageSize: number
}

/**
 * Default page size options available in the selector
 */
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const
export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number]

/**
 * Default pagination configuration
 */
export const DEFAULT_PAGINATION: PaginationState = {
  page: 1,
  pageSize: 50
}

/**
 * Pagination settings passed to components
 */
export interface PaginationSettings {
  enableQueryURL?: boolean
  total?: number
  pageSizeDefault?: PageSizeOption
  pageSizeOptions?: readonly number[]
}

/**
 * Return type for the usePagination hook
 */
export interface UsePaginationReturn {
  /** Current pagination state */
  pagination: PaginationState
  /** Go to previous page */
  goToPreviousPage: () => void
  /** Go to next page */
  goToNextPage: () => void
  /** Go to specific page */
  goToPage: (page: number) => void
  /** Change page size (resets to page 1) */
  setPageSize: (size: number) => void
  /** Reset pagination to defaults */
  resetPagination: () => void
  /** Computed: total number of pages */
  totalPages: number
  /** Computed: is on first page */
  isFirstPage: boolean
  /** Computed: is on last page */
  isLastPage: boolean
  /** Computed: "from" item number for display */
  fromItem: number
  /** Computed: "to" item number for display */
  toItem: number
}

/**
 * Parse legacy JSON string format to PaginationState
 * Used for backward compatibility during migration
 *
 * @param jsonString - Legacy pagination string like '{"page":1,"pageSize":50}'
 * @param defaults - Default values if parsing fails
 * @returns Typed PaginationState
 */
export function parseLegacyPagination(
  jsonString: string | undefined,
  defaults: PaginationState = DEFAULT_PAGINATION
): PaginationState {
  if (!jsonString) return defaults
  try {
    const parsed = JSON.parse(jsonString)
    return {
      page: typeof parsed.page === 'number' && parsed.page > 0 ? parsed.page : defaults.page,
      pageSize:
        typeof parsed.pageSize === 'number' && parsed.pageSize > 0
          ? parsed.pageSize
          : defaults.pageSize
    }
  } catch {
    return defaults
  }
}

/**
 * Convert PaginationState to legacy JSON string format
 * Used for backward compatibility during migration
 *
 * @param state - Typed pagination state
 * @returns JSON string in legacy format
 */
export function toLegacyPagination(state: PaginationState): string {
  return JSON.stringify({ page: state.page, pageSize: state.pageSize })
}

/**
 * Clamp page number to valid range
 *
 * @param page - Requested page number
 * @param totalPages - Total number of pages available
 * @returns Valid page number within bounds
 */
export function clampPage(page: number, totalPages: number): number {
  return Math.max(1, Math.min(page, Math.max(1, totalPages)))
}

/**
 * Calculate total pages from total items and page size
 *
 * @param total - Total number of items
 * @param pageSize - Items per page
 * @returns Total number of pages (minimum 1)
 */
export function calculateTotalPages(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize))
}

/**
 * Calculate display range for "Showing X to Y of Z"
 *
 * @param page - Current page number (1-indexed)
 * @param pageSize - Items per page
 * @param total - Total number of items
 * @returns Object with from and to values
 */
export function calculateDisplayRange(
  page: number,
  pageSize: number,
  total: number
): { from: number; to: number } {
  if (total === 0) {
    return { from: 0, to: 0 }
  }
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  return { from, to }
}
