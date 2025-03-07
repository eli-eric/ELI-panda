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
        footerClassName
      )}
    >
      {table.getFooterGroups().map(footerGroup => (
        <tr
          key={footerGroup.id}
          className="border-t border-gray-200 dark:border-gray-700"
        >
          {footerGroup.headers.map(header => {
            // Get width from column definition if available
            const width = header.column.getSize()
              ? header.column.getSize()
              : undefined

            // Generate column style with width if provided
            const style: React.CSSProperties = {
              width: width ? `${width}px` : undefined,
              minWidth: width ? `${width}px` : '50px',
              maxWidth: width ? undefined : '1000px'
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

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={cx(
                  'px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400',
                  'whitespace-nowrap'
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
