import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable
} from '@tanstack/react-table'
import React, { useState } from 'react'

import { cx } from '@/utils'

import { TableBody } from './table-body'
import { TableHeader } from './table-header'
import { TablePagination } from './table-pagination'
import type { TableProps } from './types'
import { fuzzyFilter } from './utils'

/**
 * A reusable table component built on top of TanStack Table.
 * Features include sorting, pagination, dark mode support, and loading states.
 */
export function Table<T extends object>({
  columns,
  data,
  className,
  headerClassName,
  rowClassName,
  enableSorting = true,
  enablePagination = false,
  defaultPageSize = 10,
  loading = false,
  emptyMessage = 'No data available',
  fixedHeight,
  getRowProps
}: TableProps<T>) {
  // Ensure data is always an array
  const tableData = Array.isArray(data) ? data : []

  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([])

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize
  })

  // Setup TanStack table with column sizing
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      pagination
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    // Enable column resizing with fixed-width priority
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    defaultColumn: {
      minSize: 50, // Minimum column width
      maxSize: 1000 // Maximum column width
    }
  })

  // If there's no data and not loading, show empty message
  if (tableData.length === 0 && !loading) {
    return (
      <div className="w-full flex items-center justify-center p-8 text-gray-500 dark:text-gray-400 border rounded-md">
        {emptyMessage}
      </div>
    )
  }

  // Extract scroll-related classes from className
  const scrollClasses = [
    'overflow-auto',
    'overflow-x-auto',
    'overflow-y-auto',
    'overflow-hidden',
    'overflow-x-hidden',
    'overflow-y-hidden',
    'overflow-visible',
    'overflow-x-visible',
    'overflow-y-visible',
    'overflow-scroll',
    'overflow-x-scroll',
    'overflow-y-scroll'
  ]

  // Extract min/max width classes
  const widthClasses = [
    'min-w-0',
    'min-w-full',
    'min-w-min',
    'min-w-max',
    'max-w-0',
    'max-w-none',
    'max-w-xs',
    'max-w-sm',
    'max-w-md',
    'max-w-lg',
    'max-w-xl',
    'max-w-2xl',
    'max-w-3xl',
    'max-w-4xl',
    'max-w-5xl',
    'max-w-6xl',
    'max-w-7xl',
    'max-w-full',
    'max-w-min',
    'max-w-max',
    'max-w-prose',
    'max-w-screen-sm',
    'max-w-screen-md',
    'max-w-screen-lg',
    'max-w-screen-xl',
    'max-w-screen-2xl'
  ]

  // Filter className to find scroll and width related classes
  const extractedScrollClasses =
    className
      ?.split(' ')
      .filter(cls => scrollClasses.some(scrollCls => cls.startsWith(scrollCls)))
      .join(' ') || ''

  const extractedWidthClasses =
    className
      ?.split(' ')
      .filter(cls => widthClasses.some(widthCls => cls === widthCls))
      .join(' ') || ''

  // Remove these classes from the main className
  const filteredClassName = className
    ?.split(' ')
    .filter(
      cls =>
        !scrollClasses.some(scrollCls => cls.startsWith(scrollCls)) &&
        !widthClasses.some(widthCls => cls === widthCls)
    )
    .join(' ')

  return (
    // Main container - sets the width constraint on the table
    <div className={cx('rounded-md border overflow-hidden', filteredClassName)}>
      {/* Container with fixed height if specified */}
      <div
        className="w-full"
        style={fixedHeight ? { height: fixedHeight } : undefined}
      >
        {/* Scrollable container for both horizontal and vertical scrolling */}
        <div
          className={cx(
            // Base styles for scrolling
            'overflow-auto',
            // Apply any extracted scroll classes from props
            extractedScrollClasses,
            // Apply width classes
            extractedWidthClasses
          )}
          style={
            fixedHeight ? { maxHeight: '100%', height: '100%' } : undefined
          }
        >
          {/* The table itself - use table-fixed to respect column sizes */}
          <table className="w-full min-w-full caption-bottom text-sm table-fixed">
            <TableHeader
              table={table}
              enableSorting={enableSorting}
              headerClassName={cx(headerClassName, fixedHeight ? 'sticky' : '')}
            />
            <TableBody
              table={table}
              columns={columns}
              loading={loading}
              rowClassName={rowClassName}
              getRowProps={getRowProps}
            />
          </table>
        </div>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className={cx({ 'border-t': !!fixedHeight })}>
          <TablePagination table={table} />
        </div>
      )}
    </div>
  )
}
