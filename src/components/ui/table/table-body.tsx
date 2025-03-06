import { flexRender } from '@tanstack/react-table'
import React from 'react'

import { cx } from '@/utils'

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
  getRowProps
}: TableBodyProps<T>) {
  if (loading) {
    // Create skeleton rows that match the structure of actual data rows
    return (
      <tbody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <tr
            key={`skeleton-row-${rowIndex}`}
            className={cx(
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

  // Check if there are any rows to display
  const rows = table.getRowModel().rows

  if (rows.length === 0) {
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

  return (
    <tbody>
      {rows.map((row, index) => {
        // Get the original row data
        const originalRow = row.original as T

        // Get custom row props if provided - similar to PandaTableV2
        const customRowProps = getRowProps
          ? getRowProps(originalRow, index)
          : {}

        // Extract className from custom props for proper merging
        const { className: customClassName, ...restProps } = customRowProps
        console.log('customClassName', customClassName)

        // Default background colors based on even/odd row
        const defaultBgClass =
          row.index % 2 === 0
            ? 'bg-white dark:bg-gray-900'
            : 'bg-gray-50 dark:bg-gray-800'

        return (
          <tr
            key={row.id}
            className={cx(
              // Base styling always applied
              'border-b border-gray-200 dark:border-gray-700 last:border-0 group',
              // Only apply default background if custom style doesn't define one
              !customClassName?.includes('bg-') ? defaultBgClass : '',
              // Apply hover effect
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              // Apply custom className from props and default rowClassName
              customClassName,
              rowClassName
            )}
            {...restProps}
          >
            {row.getVisibleCells().map(cell => {
              // Get width from column definition if available
              const width = cell.column.getSize()

              // Get column metadata
              const meta = cell.column.columnDef.meta as
                | Record<string, any>
                | undefined
              const cellClasses = meta?.className || ''

              return (
                <td
                  key={cell.id}
                  className={cx(
                    'p-2 px-4 text-gray-700 dark:text-gray-300',
                    'whitespace-nowrap overflow-hidden',
                    cellClasses
                  )}
                  style={{
                    width: width ? `${width}px` : undefined,
                    minWidth: width ? `${width}px` : '50px',
                    maxWidth: width ? undefined : '1000px'
                  }}
                >
                  <div className="overflow-hidden text-ellipsis truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
