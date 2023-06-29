import type { ColumnDef, ColumnOrderState, ExpandedState, SortingState, VisibilityState } from '@tanstack/react-table'
import { getSortedRowModel } from '@tanstack/react-table'
import { getFilteredRowModel } from '@tanstack/react-table'
import { getExpandedRowModel } from '@tanstack/react-table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import { useEffect, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

export type PandaTableSettings = {
  enableSorting?: boolean
  withFooter?: boolean
  enableQueryURL?: boolean
  enableRowSelection?: boolean
  enableColumnHiding?: boolean
  enableColumnReordering?: boolean
}

interface Props<T extends object> {
  data?: T[]
  tableId: string
  columns: ColumnDef<T, any>[]
  getSubRows?: (row: T, index: number) => T[]
  settings?: PandaTableSettings
}

export const usePandaTable = <T extends object>({ tableId, columns, getSubRows, data, settings }: Props<T>) => {
  const { enableSorting = false, enableQueryURL = false, enableRowSelection = false } = settings || {}

  // zustand table instance store
  const { setSortBy, setSortByQueryString, instances } = useTableStateStore()
  const sortByInstance = instances[tableId]?.sortBy || []
  const sortByStringInstance = instances[tableId]?.sortByQueryString || null
  // query state
  const [sortByQuery, setSortByQuery] = useQueryState('sortBy', { history: 'replace' })
  // table state
  const [sorting, setSorting] = useState<SortingState>(sortByInstance)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
  )

  // react-table
  const table = useReactTable<T>({
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getSubRows,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    columns: columns,
    data: data || [],
    enableSorting: enableSorting,
    manualSorting: true,
    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: false,
    enableSubRowSelection: true,
    state: { sorting, expanded, columnOrder, columnVisibility }
  })

  const isFirstRender = useIsFirstRender()

  // initialize update table state and query state and instance on first render
  useEffect(() => {
    if (isFirstRender) {
      if (enableQueryURL) {
        // check if sortByQuery is set
        if (sortByQuery) {
          const parsed = JSON.parse(sortByQuery)
          setSorting(parsed)
          setSortBy(tableId, parsed)
          setSortByQueryString(tableId, parsed.length === 0 ? undefined : sortByQuery)
          // check if sortByStringInstance is set
        } else if (sortByStringInstance) {
          setSortByQuery(sortByStringInstance)
        }
      }
    }
  }, [
    isFirstRender,
    tableId,
    sortByQuery,
    sortByStringInstance,
    enableQueryURL,
    setSortBy,
    setSortByQueryString,
    setSortByQuery
  ])

  // update effect
  useEffect(() => {
    if (!isFirstRender) {
      setSortBy(tableId, sorting)
      setSortByQueryString(tableId, sorting.length === 0 ? undefined : JSON.stringify(sorting))
      if (enableQueryURL) {
        setSortByQuery(sorting.length === 0 ? null : JSON.stringify(sorting))
      }
    }
    // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, sorting, enableQueryURL, setSortByQuery, setSortBy, setSortByQueryString])

  return table
}
