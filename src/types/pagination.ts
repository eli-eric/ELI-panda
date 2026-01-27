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
  pageSizeDefault?: number
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

/**
 * Page item type for pagination display
 * Can be a page number or ellipsis indicator
 */
export type PageItem = number | 'ellipsis'

/**
 * Generate array of page numbers with ellipsis for pagination display
 *
 * Pattern: Always show first page, last page, and ±siblings around current page
 * Ellipsis appears when gap between ranges is > 1
 *
 * Examples:
 * - Page 1 of 15: [1, 2, 3, 4, 'ellipsis', 15]
 * - Page 7 of 15: [1, 'ellipsis', 4, 5, 6, 7, 8, 9, 10, 'ellipsis', 15]
 * - Page 15 of 15: [1, 'ellipsis', 12, 13, 14, 15]
 * - Page 3 of 5: [1, 2, 3, 4, 5] (no ellipsis needed)
 *
 * @param currentPage - Current active page (1-indexed)
 * @param totalPages - Total number of pages
 * @param siblingsCount - Number of pages to show on each side of current page (default 3)
 * @returns Array of page numbers and ellipsis indicators
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  siblingsCount: number = 3
): PageItem[] {
  // Handle edge case: no pages or single page
  if (totalPages <= 1) {
    return totalPages === 1 ? [1] : []
  }

  const pages: PageItem[] = []

  // Calculate the range around current page
  const leftBound = Math.max(2, currentPage - siblingsCount)
  const rightBound = Math.min(totalPages - 1, currentPage + siblingsCount)

  // Always add first page
  pages.push(1)

  // Add left ellipsis if there's a gap
  if (leftBound > 2) {
    pages.push('ellipsis')
  }

  // Add middle range (excluding first and last page which are added separately)
  for (let i = leftBound; i <= rightBound; i++) {
    pages.push(i)
  }

  // Add right ellipsis if there's a gap
  if (rightBound < totalPages - 1) {
    pages.push('ellipsis')
  }

  // Always add last page (if different from first)
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}
