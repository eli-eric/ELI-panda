import { flexRender } from '@tanstack/react-table'
import React from 'react'

import { cx } from '@/utils'

import { SortIndicator } from './sort-indicator'
import type { TableHeaderProps } from './types'

/**
 * The header section of the table.
 * Contains column headers with sorting functionality.
 */
export function TableHeader<T extends object>({
  table,
  enableSorting,
  headerClassName
}: TableHeaderProps<T>) {
  // Check if the header should be sticky based on passed classNames
  const isSticky = headerClassName?.includes('sticky') || false

  return (
    <thead className={cx('bg-gray-100 dark:bg-gray-800', headerClassName)}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr
          key={headerGroup.id}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          {headerGroup.headers.map(header => {
            // Get width from column definition if available
            const width = header.column.getSize()
              ? header.column.getSize()
              : undefined

            // Generate column style with width if provided
            const style: React.CSSProperties = {
              width: width ? `${width}px` : undefined,
              minWidth: width ? `${width}px` : '50px',
              maxWidth: width ? undefined : '1000px',
              // Ensure each cell maintains position during scroll
              position: isSticky ? 'sticky' : undefined,
              top: isSticky ? 0 : undefined
            }

            return (
              <th
                key={header.id}
                className={cx(
                  'h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400',
                  'hover:bg-gray-200 dark:hover:bg-gray-700',
                  'whitespace-nowrap overflow-hidden',
                  // Apply sticky styles directly to th elements when sticky header is enabled
                  isSticky
                    ? 'sticky top-0 bg-gray-100 dark:bg-gray-800 z-10'
                    : '',
                  // Add shadow when sticky to visually separate from content
                  isSticky ? 'shadow-sm' : '',
                  enableSorting && header.column.getCanSort()
                    ? 'cursor-pointer select-none'
                    : ''
                )}
                onClick={header.column.getToggleSortingHandler()}
                style={style}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {enableSorting && <SortIndicator column={header.column} />}
                </div>
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}
