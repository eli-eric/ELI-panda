import type { ColumnDef, PaginationState, Row } from '@tanstack/react-table'
import {
    getCoreRowModel,
    getExpandedRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import type { PandaTableSettings } from '../PandaTable'
import { fuzzyFilter } from '../utils'
import { useExpanding } from './useExpanding'
import { useFilters } from './useFilters'
import { useOrdering } from './useOrdering'
import { useRowSelection } from './useRowSelection'
import { useSorting } from './useSorting'
import { useVisibility } from './useVisibility'

interface Props<T> {
    tableId: string
    columns: ColumnDef<T, any>[]
    settings?: PandaTableSettings<T>
    data?: T[]

    getSubRows?: (original: T, index: number) => T[]
    getRowId?: (originalRow: T, index: number, parent?: Row<T>) => string
}

export const usePandaTable = <T>({
    tableId,
    columns,
    settings,
    data,
    getSubRows,
    getRowId,
}: Props<T>) => {
    const {
        enableSorting = false,
        enableQueryURL = false,
        enableRowSelection = false,
        manualSorting = true,
        enablePagination = false,
        enableFiltering = false,
        manualFiltering = true,
        enableMultiRowSelection = false,
        enableColumnReordering = false,
    } = settings || {}

    const [columnVisibility, setColumnVisibility] = useVisibility(tableId)
    const [columnOrder, setColumnOrder] = useOrdering(tableId, settings?.defaultColumnOrder)
    const [sorting, setSorting] = useSorting(tableId, enableQueryURL)
    const [expanded, setExpanded] = useExpanding(tableId)
    const [columnFilters, setColumnFilters] = useFilters(tableId, enableQueryURL)
    const [rowSelection, setRowSelection] = useRowSelection(tableId)
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 50,
    })

    // react-table hook
    const table = useReactTable<T>({
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getSubRows,
        getRowId,
        onExpandedChange: setExpanded,
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection || {},
        onPaginationChange: setPagination,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        data: data || [],
        enableSorting,
        manualSorting,
        manualFiltering,
        enableRowSelection,
        enableMultiRowSelection,
        manualPagination: !enablePagination,
        enableColumnFilters: enableFiltering,
        enableSubRowSelection: true,
        state: {
            sorting,
            expanded,
            columnOrder: enableColumnReordering ? columnOrder : undefined,
            columnVisibility,
            columnFilters,
            rowSelection,
            pagination,
        },
    })

    return table
}
