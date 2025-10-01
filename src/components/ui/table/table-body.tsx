import { flexRender } from '@tanstack/react-table'
import React from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import type { TableBodyProps } from './types'

/**
 * The body section of the table.
 * Renders rows and cells with data, and handles loading state.
 */
export function TableBody<T extends object>({
  table,
  columns,
  loading,
  rowClassName,
  getRowProps,
  skipEmptyMessage
}: TableBodyProps<T>) {
  const { formatMessage: fm } = useIntl()
  // Check if there are any rows to display
  const rows = loading ? [] : table.getRowModel().rows

  if (loading) {
    // Create skeleton rows that match the structure of actual data rows
    return (
      <tbody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <tr
            key={`skeleton-row-${rowIndex}`}
            className={cn(
              'border-b border-border last:border-0',
              rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/50',
              rowClassName
            )}
          >
            {columns.map((column, colIndex) => {
              // Get header from table to access column width
              const headerGroup = table.getHeaderGroups()[0]
              const header = headerGroup?.headers[colIndex]

              // Get width from column definition if available
              const width = header?.column.getSize
                ? header.column.getSize()
                : undefined

              return (
                <td
                  key={`skeleton-cell-${rowIndex}-${colIndex}`}
                  className="p-2 px-4 whitespace-nowrap overflow-hidden"
                  style={{
                    width: width ? `${width}px` : undefined,
                    minWidth: width ? `${width}px` : '50px',
                    maxWidth: width ? undefined : '1000px'
                  }}
                >
                  {/* For most columns, show a basic skeleton */}
                  {colIndex !== columns.length - 1 ? (
                    <div className="animate-pulse">
                      <div
                        className="h-6 bg-primary/20 rounded-md"
                        style={{ width: colIndex === 0 ? '70%' : '85%' }}
                      ></div>
                    </div>
                  ) : (
                    /* For the last column (status), show a badge-like skeleton */
                    <div className="animate-pulse flex justify-center">
                      <div className="h-6 w-20 bg-primary/20 rounded-full"></div>
                    </div>
                  )}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    )
  }

  if (rows.length === 0 && !skipEmptyMessage) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="p-6 text-center text-muted-foreground"
          >
            {fm({ id: message.common.ui.noDataAvailable })}
          </td>
        </tr>
      </tbody>
    )
  }

  // Standardní renderování pro všechny počty řádků
  return (
    <tbody>
      {rows.map((row, rowIndex) => {
        const customRowProps = getRowProps
          ? getRowProps(row.original, rowIndex)
          : {}

        // Determine row background color
        const defaultBgClass =
          rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/50'

        return (
          <tr
            key={row.id}
            {...customRowProps}
            className={cn(
              'border-b border-border last:border-0',
              'transition-colors duration-150 hover:bg-accent',
              'text-foreground',
              defaultBgClass,
              rowClassName,
              customRowProps.className
            )}
          >
            {row.getVisibleCells().map((cell, cellIndex) => {
              // Get width from column definition if available
              const width = cell.column.getSize()
                ? cell.column.getSize()
                : undefined

              // Get pinning information
              const isPinned = cell.column.getIsPinned()

              // Calculate left position for pinned left columns
              let leftOffset = 0
              if (isPinned === 'left') {
                row
                  .getVisibleCells()
                  .slice(0, cellIndex)
                  .forEach(c => {
                    if (c.column.getIsPinned() === 'left') {
                      leftOffset += c.column.getSize() || 0
                    }
                  })
              }

              // Calculate right position for pinned right columns
              let rightOffset = 0
              if (isPinned === 'right') {
                row
                  .getVisibleCells()
                  .slice(cellIndex + 1)
                  .forEach(c => {
                    if (c.column.getIsPinned() === 'right') {
                      rightOffset += c.column.getSize() || 0
                    }
                  })
              }

              // Generate cell style with width and pinning if provided
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
                <td
                  key={cell.id}
                  style={style}
                  className={cn(
                    'p-2 px-4',
                    // Add backdrop-blur and overlay for pinned columns using ::before
                    isPinned === 'left'
                      ? 'border-r border-border backdrop-blur-sm before:absolute before:inset-0 before:bg-background/20 before:pointer-events-none before:z-[-1] relative'
                      : '',
                    isPinned === 'right'
                      ? 'border-l border-border backdrop-blur-sm before:absolute before:inset-0 before:bg-background/20 before:pointer-events-none before:z-[-1] relative'
                      : '',
                    // Allow text wrapping for all columns with defined width
                    'whitespace-normal break-words',
                    cell.column.columnDef.meta?.className
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
