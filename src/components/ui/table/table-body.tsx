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
              return (
                <td
                  key={`skeleton-cell-${rowIndex}-${colIndex}`}
                  className="p-2 px-4"
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

        // Get custom row props if provided
        const customRowProps = getRowProps
          ? getRowProps(originalRow, index)
          : {}

        // Default row props with correct className
        const defaultRowProps = {
          className: cx(
            'border-b border-gray-200 dark:border-gray-700 last:border-0',
            row.index % 2 === 0
              ? 'bg-white dark:bg-gray-900'
              : 'bg-gray-50 dark:bg-gray-800',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            customRowProps.onClick ? 'cursor-pointer' : '',
            rowClassName
          )
        }

        // Merge custom props with defaults, prioritizing custom values
        // but ensuring className is properly merged
        const mergedProps = {
          ...defaultRowProps,
          ...customRowProps,
          className: cx(defaultRowProps.className, customRowProps.className)
        }

        return (
          <tr key={row.id} {...mergedProps}>
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="p-2 px-4 text-gray-700 dark:text-gray-300"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        )
      })}
    </tbody>
  )
}
