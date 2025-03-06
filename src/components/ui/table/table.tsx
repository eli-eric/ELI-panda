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

  // Setup TanStack table
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

  return (
    <div className={cx('rounded-md border overflow-hidden', className)}>
      {/* Kontejner s fixní výškou, pokud je nastavena */}
      <div
        className="w-full"
        style={fixedHeight ? { height: fixedHeight } : undefined}
      >
        {/* Scrollovatelný kontejner pro tabulku */}
        <div
          className={cx(
            'w-full',
            fixedHeight ? 'overflow-auto' : 'overflow-visible'
          )}
          style={
            fixedHeight ? { maxHeight: '100%', height: '100%' } : undefined
          }
        >
          <table className="w-full caption-bottom text-sm">
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

      {/* Pagination vždy mimo scrollovací oblast */}
      {enablePagination && (
        <div className={cx({ 'border-t': !!fixedHeight })}>
          <TablePagination table={table} />
        </div>
      )}
    </div>
  )
}
