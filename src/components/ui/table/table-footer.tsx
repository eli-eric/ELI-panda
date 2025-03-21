import { flexRender } from '@tanstack/react-table'
import React from 'react'

import { cx } from '@/utils'

import type { TableFooterProps } from './types'

/**
 * The footer section of the table.
 * Renders footer content for each column if defined.
 */
export function TableFooter<T extends object>({
  table,
  footerClassName
}: TableFooterProps<T>) {
  // Don't render the footer if no footers defined in columns or no data
  const hasFooters = table
    .getAllColumns()
    .some(column => !!column.columnDef.footer)
  const hasData = table.getRowModel().rows.length > 0

  if (!hasFooters || !hasData) {
    return null
  }

  // Store the filtered rows separately from paginated rows for calculations
  // This ensures footers can access ALL filtered rows, not just the current page
  const allFilteredRows = table.getFilteredRowModel().rows

  return (
    <tfoot
      className={cx(
        'bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700',
        'relative z-20',
        footerClassName
      )}
    >
      {table.getFooterGroups().map(footerGroup => (
        <tr
          key={footerGroup.id}
          className="border-t border-gray-200 dark:border-gray-700"
        >
          {footerGroup.headers.map((header, headerIndex) => {
            // Get width from column definition if available
            const width = header.column.getSize()
              ? header.column.getSize()
              : undefined

            // Get pinning information
            const isPinned = header.column.getIsPinned()
            // Calculate left position for pinned left columns
            let leftOffset = 0
            if (isPinned === 'left') {
              footerGroup.headers.slice(0, headerIndex).forEach(h => {
                if (h.column.getIsPinned() === 'left') {
                  leftOffset += h.column.getSize() || 0
                }
              })
            }

            // Calculate right position for pinned right columns
            let rightOffset = 0
            if (isPinned === 'right') {
              footerGroup.headers.slice(headerIndex + 1).forEach(h => {
                if (h.column.getIsPinned() === 'right') {
                  rightOffset += h.column.getSize() || 0
                }
              })
            }

            // Create an enhanced context object with access to both
            // paginated rows and all filtered rows
            const context = {
              ...header.getContext(),
              table: {
                ...header.getContext().table,
                getAllFilteredRows: () => allFilteredRows
              }
            }

            // Generate column style with width and pinning if provided
            const style: React.CSSProperties = {
              width: width ? `${width}px` : undefined,
              minWidth: width ? `${width}px` : '50px',
              maxWidth: width ? undefined : '1000px',
              position: isPinned ? 'sticky' : undefined,
              left: isPinned === 'left' ? `${leftOffset}px` : undefined,
              right: isPinned === 'right' ? `${rightOffset}px` : undefined,
              zIndex: isPinned ? 21 : 20,
              background: 'inherit',
              opacity: 0.9,
              backdropFilter: 'blur(4px)'
            }

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={cx(
                  'px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400',
                  'whitespace-nowrap',
                  // Add border and background styles for pinned columns
                  isPinned === 'left'
                    ? 'border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    : '',
                  isPinned === 'right'
                    ? 'border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    : ''
                )}
                style={style}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, context)}
              </th>
            )
          })}
        </tr>
      ))}
    </tfoot>
  )
}
