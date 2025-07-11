import { flexRender } from '@tanstack/react-table'
import React from 'react'

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
              'border-b border-gray-200 dark:border-gray-700 last:border-0',
              rowIndex % 2 === 0
                ? 'bg-white dark:bg-gray-900'
                : 'bg-gray-50 dark:bg-gray-800',
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
                        className="h-6 bg-blue-200 dark:bg-blue-700 rounded-md"
                        style={{ width: colIndex === 0 ? '70%' : '85%' }}
                      ></div>
                    </div>
                  ) : (
                    /* For the last column (status), show a badge-like skeleton */
                    <div className="animate-pulse flex justify-center">
                      <div className="h-6 w-20 bg-green-200 dark:bg-green-700 rounded-full"></div>
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
            className="p-6 text-center text-gray-500 dark:text-gray-400"
          >
            No data available
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
          rowIndex % 2 === 0
            ? 'bg-white dark:bg-gray-900'
            : 'bg-gray-50 dark:bg-gray-800'

        return (
          <tr
            key={row.id}
            {...customRowProps}
            className={cn(
              'border-b border-gray-200 dark:border-gray-700 last:border-0',
              'transition-colors duration-150 hover:bg-gray-100 hover:dark:bg-gray-600',
              'text-gray-900 dark:text-gray-300',
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
                background: 'inherit',
                opacity: 0.9,
                backdropFilter: 'blur(4px)',
                zIndex: isPinned ? 21 : 20
              }

              return (
                <td
                  key={cell.id}
                  style={style}
                  className={cn(
                    'p-2 px-4',
                    // Apply both backdrop-blur and background color for better compatibility
                    // Add border styles for pinned columns
                    isPinned === 'left'
                      ? 'border-r border-gray-200/50 dark:border-gray-700/50'
                      : '',
                    isPinned === 'right'
                      ? 'border-l border-gray-200/50 dark:border-gray-700/50'
                      : '',
                    // Zajistíme, aby se obsah buněk mohl správně zalamovat
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
