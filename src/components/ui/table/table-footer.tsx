import { flexRender } from '@tanstack/react-table'
import React from 'react'

import { cn } from '@/lib/utils'

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
      className={cn(
        'bg-muted/50 border-t border-border',
        'relative z-20',
        footerClassName
      )}
    >
      {table.getFooterGroups().map(footerGroup => (
        <tr key={footerGroup.id} className="border-t border-border">
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
              zIndex: isPinned ? 21 : 20
            }

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={cn(
                  'px-4 py-2 text-left font-medium text-muted-foreground',
                  'whitespace-nowrap',
                  // Add border and backdrop-blur with overlay for pinned columns
                  isPinned === 'left'
                    ? 'border-r border-border backdrop-blur-sm before:absolute before:inset-0 before:bg-background/30 before:pointer-events-none before:z-[-1] relative'
                    : '',
                  isPinned === 'right'
                    ? 'border-l border-border backdrop-blur-sm before:absolute before:inset-0 before:bg-background/30 before:pointer-events-none before:z-[-1] relative'
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
