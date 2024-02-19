import type { ColumnDef } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

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
}

export const usePandaTable = <T>({ tableId, columns, settings, data, getSubRows }: Props<T>) => {
  const {
    enableSorting = false,
    enableQueryURL = false,
    enableRowSelection = false,
    manualSorting = true,
    enableFiltering = false,
    manualFiltering = true,
    enableMultiRowSelection = false
  } = settings || {}

  const [columnVisibility, setColumnVisibility] = useVisibility(tableId)
  const [columnOrder, setColumnOrder] = useOrdering(tableId, columns)
  const [sorting, setSorting] = useSorting(tableId, enableQueryURL)
  const [expanded, setExpanded] = useExpanding(tableId)
  const [columnFilters, setColumnFilters] = useFilters(tableId, enableQueryURL)
  const [rowSelection, setRowSelection] = useRowSelection(tableId)

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
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection || {},
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    data: data || [],
    enableSorting,
    manualSorting,
    manualFiltering,
    enableRowSelection,
    enableMultiRowSelection,
    enableColumnFilters: enableFiltering,
    enableSubRowSelection: true,
    state: { sorting, expanded, columnOrder, columnVisibility, columnFilters, rowSelection }
  })

  return table
}
