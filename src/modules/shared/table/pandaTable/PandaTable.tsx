import type { RankingInfo } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn, Row, Table as ReactTable } from '@tanstack/react-table'
import {
    getCoreRowModel,
    getExpandedRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import type { Ref } from 'react'
import { forwardRef, useImperativeHandle, useState } from 'react'

import { useExpanding } from './hooks/useExpanding'
import { useFilters } from './hooks/useFilters'
import { useOrdering } from './hooks/useOrdering'
import { useSorting } from './hooks/useSorting'
import { useVisibility } from './hooks/useVisibility'
import { PandaTableControlled } from './PandaTableCotrolled'
import { fuzzyFilter } from './utils'

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

export type PandaTableSettings<T> = {
    enableSorting?: boolean
    enableFooter?: boolean
    enableQueryURL?: boolean
    enableRowSelection?: boolean | ((row: Row<T>) => boolean) | undefined
    enableColumnHiding?: boolean
    enableColumnReordering?: boolean
    manualSorting?: boolean
    enableFiltering?: boolean
    enablePagination?: boolean
    manualFiltering?: boolean
    enableMultiRowSelection?: boolean | ((row: Row<T>) => boolean) | undefined
    defaultColumnOrder?: string[]
}

export interface GetRowPropsReturnType extends React.HTMLAttributes<HTMLTableRowElement> {
    dropsettings?: { accept: string; onDropHandler: (from: any, to: any) => void }
}

interface Props<T extends object> {
    data?: T[]
    tableId: string
    columns: ColumnDef<T, any>[]
    loading?: boolean
    className?: string
    getSubRows?: (original: T, index: number) => T[]
    getRowProps?: (row: Row<any>) => GetRowPropsReturnType

    settings?: PandaTableSettings<T>
}

export const defaultPropGetter = () => ({})

/** @deprecated use PandaTableV2 or src/components/ui/table instead */
export const PandaTable = forwardRef<ReactTable<any> | undefined, Props<any>>(
    <T extends object>(
        {
            data,
            columns,
            loading = false,
            settings,
            className,
            tableId,
            getSubRows,
            getRowProps = defaultPropGetter,
        }: Props<T>,
        ref?: Ref<ReactTable<T> | undefined>,
    ) => {
        const {
            enableSorting = false,
            enableColumnReordering = true,
            enableQueryURL = false,
            enableRowSelection = false,
            manualSorting = true,
            enableFiltering = false,
            manualFiltering = true,
            enableMultiRowSelection = false,
        } = settings || {}

        const [columnVisibility, setColumnVisibility] = useVisibility(tableId)
        const [columnOrder, setColumnOrder] = useOrdering(tableId, settings?.defaultColumnOrder)
        const [sorting, setSorting] = useSorting(tableId, enableQueryURL)
        const [expanded, setExpanded] = useExpanding(tableId)
        const [columnFilters, setColumnFilters] = useFilters(tableId, enableQueryURL)
        const [rowSelection, setRowSelection] = useState({})

        // react-table hook
        const table = useReactTable<T>({
            getCoreRowModel: getCoreRowModel(),
            getExpandedRowModel: getExpandedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFacetedRowModel: getFacetedRowModel(),
            getFacetedUniqueValues: getFacetedUniqueValues(),
            getFacetedMinMaxValues: getFacetedMinMaxValues(),
            getSubRows,
            onExpandedChange: setExpanded,
            onSortingChange: setSorting,
            onColumnOrderChange: enableColumnReordering ? setColumnOrder : undefined,
            onColumnVisibilityChange: setColumnVisibility,
            onColumnFiltersChange: setColumnFilters,
            onRowSelectionChange: setRowSelection,
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
            enableColumnFilters: enableFiltering,
            enableSubRowSelection: true,
            state: {
                sorting,
                expanded,
                columnOrder: enableColumnReordering ? columnOrder : undefined,
                columnVisibility,
                columnFilters,
                rowSelection,
            },
        })

        useImperativeHandle(ref, () => ({
            ...table,
        }))

        return (
            <PandaTableControlled
                {...{
                    className,
                    data,
                    table,
                    getRowProps,
                    loading,
                    settings: settings || {},
                    tableId,
                }}
            />
        )
    },
)

PandaTable.displayName = 'PandaTable'
