import {
    type ColumnFiltersState,
    type ColumnPinningState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type PaginationState,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'

import { isDefined, isUndefined } from '@/lib/predicates/type-guards'
import { cn } from '@/lib/utils'

import { TableBody } from './table-body'
import { TableFooter } from './table-footer'
import { TableHeader } from './table-header'
import { TablePagination } from './table-pagination'
import type { TableProps } from './types'
import { fuzzyFilter, scrollClasses, widthClasses } from './utils'

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
    footerClassName,
    enableSorting = true,
    enableFiltering = false,
    enablePagination = false,
    enableFooter = false,
    enablePinning = false,
    defaultPageSize = 10,
    paginationResetKey,
    loading = false,
    skeletonRowCount = 5,
    skipEmptyMessage = false,
    emptyMessage = 'No data available',
    fixedHeight,
    getRowProps,
}: TableProps<T>) {
    // Ensure data is always an array
    const tableData = Array.isArray(data) ? data : []

    // Distinguish between initial load and refetching
    // Initial load: data is undefined (not yet loaded) - show skeleton
    // Refetching: data exists (array, even if empty) AND currently loading - show dimming + pulse
    const isInitialLoad = isUndefined(data)
    const isRefetching = isDefined(data) && loading

    // Sorting state
    const [sorting, setSorting] = useState<SortingState>([])

    // Filtering state
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    // Column pinning state
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({})

    // Pagination state
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: defaultPageSize,
    })

    // Initialize column pinning from column meta
    useEffect(() => {
        if (!enablePinning) return

        const leftPinned: string[] = []
        const rightPinned: string[] = []

        columns.forEach((column: any) => {
            const columnId = column.accessorKey || column.id
            if (columnId && column.meta?.sticky === 'right') {
                rightPinned.push(columnId)
            } else if (columnId && column.meta?.sticky === 'left') {
                leftPinned.push(columnId)
            }
        })

        // Always set the pinning state, even if empty arrays
        setColumnPinning({
            left: leftPinned,
            right: rightPinned,
        })

        // Debug log (remove in production)
        // if (rightPinned.length > 0 || leftPinned.length > 0) {
        //   console.log('Column pinning set:', { left: leftPinned, right: rightPinned })
        // }
    }, [columns, enablePinning])

    // Reset to first page when filters change (but not when data changes)
    useEffect(() => {
        if (enablePagination) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }))
        }
    }, [columnFilters, enablePagination, paginationResetKey])

    // Apply column-specific filter functions
    const columnsWithFiltering = React.useMemo(() => {
        if (!enableFiltering) return columns

        // Return columns with filtering enabled
        return columns.map(col => ({
            ...col,
            enableColumnFilter: col.enableColumnFilter !== false,
        }))
    }, [columns, enableFiltering])

    // Setup TanStack table with column sizing
    const table = useReactTable({
        data: tableData,
        columns: columnsWithFiltering,
        state: {
            sorting,
            pagination,
            columnFilters,
            columnPinning,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        onColumnPinningChange: setColumnPinning,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        // Enable column resizing with fixed-width priority
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        // Configure column sorting separately from filtering
        enableSorting: enableSorting,
        enableFilters: enableFiltering,
        enableColumnFilters: enableFiltering,
        // Enable column pinning
        enablePinning: enablePinning,
        // Enable three-state sorting (unsorted -> asc -> desc -> unsorted)
        enableMultiSort: false,
        enableSortingRemoval: true,
        sortDescFirst: false,
        defaultColumn: {
            minSize: 50, // Minimum column width
            maxSize: 1000, // Maximum column width
            enableSorting: enableSorting,
            enableColumnFilter: enableFiltering,
            filterFn: 'fuzzy', // Default filter function
        },
        autoResetPageIndex: false, // Prevent automatic page reset when data changes
    })

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
                !widthClasses.some(widthCls => cls === widthCls),
        )
        .join(' ')

    return (
        // Main container - sets the width constraint on the table
        <div className={cn('rounded-md border border-border overflow-hidden', filteredClassName)}>
            {/* Container with fixed height if specified */}
            <div
                className="w-full rounded-md"
                style={fixedHeight ? { height: fixedHeight } : undefined}
            >
                {/* Scrollable container for both horizontal and vertical scrolling */}
                <div
                    className={cn(
                        // Base styles for scrolling
                        'overflow-auto',
                        // Apply any extracted scroll classes from props
                        extractedScrollClasses,
                        // Apply width classes
                        extractedWidthClasses,
                    )}
                    style={fixedHeight ? { maxHeight: '100%', height: '100%' } : undefined}
                >
                    {/* The table itself - use table-fixed to respect column sizes */}
                    <table
                        className={cn(
                            'w-full min-w-full caption-bottom text-sm table-fixed',
                            isRefetching && 'opacity-60 animate-pulse',
                        )}
                    >
                        <TableHeader
                            table={table}
                            enableSorting={enableSorting}
                            enableFiltering={enableFiltering}
                            headerClassName={cn(headerClassName, fixedHeight ? 'sticky' : '')}
                        />
                        <TableBody
                            table={table}
                            columns={columns}
                            loading={isInitialLoad}
                            skeletonRowCount={skeletonRowCount}
                            rowClassName={rowClassName}
                            getRowProps={getRowProps}
                            skipEmptyMessage={skipEmptyMessage}
                            emptyMessage={emptyMessage}
                        />
                        {enableFooter && (
                            <TableFooter table={table} footerClassName={footerClassName} />
                        )}
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {enablePagination && (
                <div className={cn({ 'border-t': !!fixedHeight })}>
                    <TablePagination table={table} />
                </div>
            )}
        </div>
    )
}
