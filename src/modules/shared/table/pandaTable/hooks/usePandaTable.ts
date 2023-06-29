import type { ColumnDef, ColumnOrderState, ExpandedState, SortingState, VisibilityState } from '@tanstack/react-table'
import { getSortedRowModel } from '@tanstack/react-table'
import { getFilteredRowModel } from '@tanstack/react-table'
import { getExpandedRowModel } from '@tanstack/react-table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import { useEffect, useMemo, useState } from 'react'
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts'

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
  const { setSortBy, setSortByQueryString, instances, setOrder, setExpand, setVisibility } = useTableStateStore()
  const sortByInstance = instances[tableId]?.sortBy || []
  const sortByStringInstance = instances[tableId]?.sortByQueryString || null
  const columnVisibilityInstance = useMemo(() => instances[tableId]?.columnVisibility, [instances, tableId])
  const columnOrderInstance = instances[tableId]?.columnOrder
  const expandedInstance = instances[tableId]?.expanded || {}
  // query state
  const [sortByQuery, setSortByQuery] = useQueryState('sortBy', { history: 'replace' })
  // table state
  const [sorting, setSorting] = useState<SortingState>(sortByInstance)

  const isFirstRender = useIsFirstRender()

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [storedVisibility, setStoredVisibility] = useLocalStorage<VisibilityState>(
    'columnVisibility',
    columnVisibilityInstance || {}
  )

  // set column visibility on first render
  useEffect(() => {
    if (isFirstRender) {
      columnVisibilityInstance ? setColumnVisibility(columnVisibilityInstance) : setColumnVisibility(storedVisibility)
    }
  }, [isFirstRender, columnVisibilityInstance, storedVisibility])

  // update column visibility
  useEffect(() => {
    if (!isFirstRender) {
      setVisibility(tableId, columnVisibility)
      setStoredVisibility(columnVisibility)
    }
  }, [columnVisibility, setVisibility, tableId, setStoredVisibility, isFirstRender])

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [storedOrder, setStoredOrder] = useLocalStorage<ColumnOrderState>(
    'columnOrder',
    columns.map(column => column.id as string)
  )

  // set column order on first render
  useEffect(() => {
    if (isFirstRender) {
      columnOrderInstance ? setColumnOrder(columnOrderInstance) : setColumnOrder(storedOrder)
    }
  }, [isFirstRender, columnOrderInstance, storedOrder])

  // update column order
  useEffect(() => {
    if (!isFirstRender) {
      setOrder(tableId, columnOrder)
      setStoredOrder(columnOrder)
    }
  }, [columnOrder, setOrder, tableId, setStoredOrder, isFirstRender])

  const [expanded, setExpanded] = useState<ExpandedState>(expandedInstance)
  useEffect(() => {
    setExpand(tableId, expanded)
  }, [expanded, setExpand, tableId])

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
    setSortByQuery,
    setColumnVisibility,
    setColumnOrder
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
