import { flexRender } from '@tanstack/react-table'
import React from 'react'

import { cn } from '@/lib/utils'

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
      className={cn(
        'bg-muted/50 rounded-t-md',
        headerClassName,
        'relative z-30'
      )}
    >
      {table.getHeaderGroups().map(headerGroup => {
        // Filter out headers with noHeader: true from rendering
        const visibleHeaders = headerGroup.headers.filter(
          header => !header.column.columnDef.meta?.noHeader
        )

        // Don't render the row at all if all headers are hidden
        if (visibleHeaders.length === 0) {
          return null
        }

        return (
          <tr key={headerGroup.id} className="border-b border-border">
            {visibleHeaders.map((header, headerIndex) => {
              // Check if this is a group header (has subcolumns)
              const isGroupHeader = header.column.columns?.length > 0

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
                visibleHeaders.slice(0, headerIndex).forEach(h => {
                  if (h.column.getIsPinned() === 'left') {
                    leftOffset += h.column.getSize() || 0
                  }
                })
              }

              // Calculate right position for pinned right columns
              let rightOffset = 0
              if (isPinned === 'right') {
                visibleHeaders.slice(headerIndex + 1).forEach(h => {
                  if (h.column.getIsPinned() === 'right') {
                    rightOffset += h.column.getSize() || 0
                  }
                })
              }

              // Generate column style with width and pinning if provided
              const style: React.CSSProperties = {
                // Use width calculation based on column definition
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
                  style={style}
                  className={cn(
                    'h-10 px-4 text-left align-middle font-medium text-muted-foreground',
                    'hover:bg-accent',
                    'whitespace-nowrap',
                    // Apply sticky styles directly to th elements when sticky header is enabled
                    isSticky ? 'sticky top-0 bg-muted/50 z-10' : '',
                    // Add shadow when sticky to visually separate from content
                    isSticky ? 'shadow-sm' : '',
                    // Add border and backdrop-blur with overlay for pinned columns
                    isPinned === 'left'
                      ? 'border-r border-border backdrop-blur-sm before:absolute before:inset-0 before:bg-background/30 before:pointer-events-none before:z-[-1] relative'
                      : '',
                    isPinned === 'right'
                      ? 'border-l border-border backdrop-blur-sm before:absolute before:inset-0 before:bg-background/30 before:pointer-events-none before:z-[-1] relative'
                      : '',
                    isPinned && 'z-30',
                    // Use meta className from column definition
                    header.column.columnDef.meta?.className
                  )}
                  onClick={
                    canSort
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  colSpan={header.colSpan}
                >
                  <div
                    className={cn(
                      'flex items-center justify-between gap-2',
                      // For group headers, ensure the content can fill available space
                      isGroupHeader ? 'w-full' : ''
                    )}
                  >
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
        )
      })}
    </thead>
  )
}
