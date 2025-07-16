import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import React from 'react'

import { cn } from '@/lib/utils'

import { PageSizeDropdown } from './page-size-dropdown'
import type { TablePaginationProps } from './types'

/**
 * The pagination section of the table.
 * Includes navigation buttons and page size selector.
 */
export function TablePagination<T extends object>({
  table
}: TablePaginationProps<T>) {
  // Default page size options
  const pageSizeOptions = [10, 25, 50, 100]

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <button
          className={cn(
            'p-1 rounded-md border border-gray-300 dark:border-gray-600',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </button>
        <button
          className={cn(
            'p-1 rounded-md border border-gray-300 dark:border-gray-600',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page{' '}
          <span className="font-medium">
            {table.getState().pagination.pageIndex + 1}
          </span>{' '}
          of <span className="font-medium">{table.getPageCount() || 1}</span>
        </span>
        <button
          className={cn(
            'p-1 rounded-md border border-gray-300 dark:border-gray-600',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
        <button
          className={cn(
            'p-1 rounded-md border border-gray-300 dark:border-gray-600',
            'text-gray-500 dark:text-gray-400',
            'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Rows per page
        </span>
        <PageSizeDropdown
          value={table.getState().pagination.pageSize}
          onChange={value => table.setPageSize(value)}
          pageSizeOptions={pageSizeOptions}
        />
      </div>
    </div>
  )
}
