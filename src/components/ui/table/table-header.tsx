import { flexRender } from '@tanstack/react-table'
import React from 'react'

import { cx } from '@/utils'

import { FilterDropdown } from './filter-dropdown'
import { PinIndicator } from './pin-indicator'
import { SortIndicator } from './sort-indicator'
import type { TableHeaderProps } from './types'

/**
 * The header section of the table.
 * Contains column headers with sorting functionality.
 */
export function TableHeader<T extends object>({
  table,
  enableSorting,
  enableFiltering,
  headerClassName
}: TableHeaderProps<T>) {
  // Check if the header should be sticky based on passed classNames
  const isSticky = headerClassName?.includes('sticky') || false

  return (
    <thead
      className={cx(
        'bg-gray-100 dark:bg-gray-800 rounded-t-md',
        headerClassName,
        'relative z-30'
      )}
    >
      {table.getHeaderGroups().map(headerGroup => (
        <tr
          key={headerGroup.id}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          {headerGroup.headers.map((header, headerIndex) => {
            // Get width from column definition if available
            const width = header.column.getSize()
              ? header.column.getSize()
              : undefined

            const canSort =
              enableSorting &&
              !header.isPlaceholder &&
              header.column.getCanSort()
            const canFilter =
              enableFiltering &&
              !header.isPlaceholder &&
              header.column.getCanFilter() &&
              header.column.columnDef.enableColumnFilter !== false

            // Get pinning information from column meta
            const isPinned = header.column.getIsPinned()

            // Calculate left position for pinned left columns
            let leftOffset = 0
            if (isPinned === 'left') {
              headerGroup.headers.slice(0, headerIndex).forEach(h => {
                if (h.column.getIsPinned() === 'left') {
                  leftOffset += h.column.getSize() || 0
                }
              })
            }

            const noHeader = header.column.columnDef.meta?.noHeader

            // Calculate right position for pinned right columns
            let rightOffset = 0
            if (isPinned === 'right') {
              headerGroup.headers.slice(headerIndex + 1).forEach(h => {
                if (h.column.getIsPinned() === 'right') {
                  rightOffset += h.column.getSize() || 0
                }
              })
            }

            // Generate column style with width and pinning if provided
            const style: React.CSSProperties = {
              width: width ? `${width}px` : undefined,
              minWidth: width ? `${width}px` : '50px',
              maxWidth: width ? undefined : '1000px',
              // Ensure each cell maintains position during scroll
              position: isPinned ? 'sticky' : isSticky ? 'sticky' : undefined,
              top: isSticky ? 0 : undefined,
              left: isPinned === 'left' ? `${leftOffset}px` : undefined,
              right: isPinned === 'right' ? `${rightOffset}px` : undefined,
              zIndex: isPinned ? 31 : isSticky ? 30 : undefined
            }

            return (
              <th
                key={header.id}
                className={cx(
                  'h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400',
                  'hover:bg-gray-200 dark:hover:bg-gray-700',
                  'whitespace-nowrap',
                  // Apply sticky styles directly to th elements when sticky header is enabled
                  isSticky
                    ? 'sticky top-0 bg-gray-100 dark:bg-gray-800 z-10'
                    : '',
                  // Add shadow when sticky to visually separate from content
                  isSticky ? 'shadow-sm' : '',
                  // Add border and background styles for pinned columns
                  isPinned === 'left'
                    ? 'border-r border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'
                    : '',
                  isPinned === 'right'
                    ? 'border-l border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'
                    : '',
                  isPinned && 'z-30'
                )}
                onClick={
                  canSort ? header.column.getToggleSortingHandler() : undefined
                }
                style={style}
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <div className="flex items-center gap-2 w-full">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {canSort && <SortIndicator column={header.column} />}
                  </div>

                  <div className="flex items-center gap-1">
                    {header.column.getCanPin() && (
                      <PinIndicator column={header.column} position="left" />
                    )}
                    {canFilter && (
                      <div onClick={e => e.stopPropagation()}>
                        <FilterDropdown
                          column={header.column}
                          onFilterChange={value => {
                            header.column.setFilterValue(value)
                          }}
                          currentFilter={
                            (header.column.getFilterValue() as string) || ''
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}
