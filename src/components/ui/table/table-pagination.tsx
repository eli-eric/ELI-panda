import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import React from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
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
  const { formatMessage: fm } = useIntl()
  // Default page size options
  const pageSizeOptions = [10, 25, 50, 100]

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background">
      <div className="flex items-center gap-2">
        <button
          className={cn(
            'p-1 rounded-md border border-border',
            'text-muted-foreground',
            'hover:bg-accent transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className={cn(
            'p-1 rounded-md border border-border',
            'text-muted-foreground',
            'hover:bg-accent transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm text-foreground">
          {fm({ id: message.common.ui.page })}{' '}
          <span className="font-medium">
            {table.getState().pagination.pageIndex + 1}
          </span>{' '}
          {fm({ id: message.common.ui.of })}{' '}
          <span className="font-medium">{table.getPageCount() || 1}</span>
        </span>
        <button
          className={cn(
            'p-1 rounded-md border border-border',
            'text-muted-foreground',
            'hover:bg-accent transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          className={cn(
            'p-1 rounded-md border border-border',
            'text-muted-foreground',
            'hover:bg-accent transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">
          {fm({ id: message.common.ui.rowsPerPage })}
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
