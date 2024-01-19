import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn, Row, Table as ReactTable } from '@tanstack/react-table'
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
import type { Ref } from 'react'
import { forwardRef, Fragment, useDeferredValue, useImperativeHandle } from 'react'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/utils'

import { TableBody } from './components/TableBody'
import { TableFoot } from './components/TableFoot'
import { TableHead } from './components/TableHead'
import { TableSettings } from './components/TableSettings'
import { useExpanding } from './hooks/useExpanding'
import { useFilters } from './hooks/useFilters'
import { useOrdering } from './hooks/useOrdering'
import { useSorting } from './hooks/useSorting'
import { useVisibility } from './hooks/useVisibility'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export type PandaTableSettings = {
  enableSorting?: boolean
  enableFooter?: boolean
  enableQueryURL?: boolean
  enableRowSelection?: boolean
  enableColumnHiding?: boolean
  enableColumnReordering?: boolean
  manualSorting?: boolean
  enableFiltering?: boolean
  manualFiltering?: boolean
}

export interface GetRowPropsReturnType extends React.HTMLAttributes<HTMLTableRowElement> {
  dropSettings?: { accept: string; onDropHandler: (from: any, to: any) => void }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Don't filter parent if child is matched
  let parentPassed = false
  row.subRows?.forEach(subRow => {
    const itemRank = rankItem(subRow.getValue('name'), value)
    if (itemRank.passed) {
      parentPassed = true
      return
    }
  })
  if (parentPassed) {
    return true
  }

  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

interface Props<T extends object> {
  data?: T[]
  tableId: string
  columns: ColumnDef<T, any>[]
  loading?: boolean
  className?: string
  getSubRows?: (original: T, index: number) => T[]
  getRowProps?: (row: Row<any>) => GetRowPropsReturnType

  settings?: PandaTableSettings
}

const defaultPropGetter = () => ({})

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
      getRowProps = defaultPropGetter
    }: Props<T>,
    ref?: Ref<ReactTable<T> | undefined>
  ) => {
    const {
      enableFooter = false,
      enableColumnHiding = false,
      enableColumnReordering = false,
      enableSorting = false,
      enableQueryURL = false,
      enableRowSelection = false,
      manualSorting = true,
      enableFiltering = false,
      manualFiltering = true
    } = settings || {}

    const [columnVisibility, setColumnVisibility] = useVisibility(tableId)
    const [columnOrder, setColumnOrder] = useOrdering(tableId, columns)
    const [sorting, setSorting] = useSorting(tableId, enableQueryURL)
    const [expanded, setExpanded] = useExpanding(tableId)
    const [columnFilters, setColumnFilters] = useFilters(tableId, enableQueryURL)

    const defferedData = useDeferredValue(data)

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
      columns,
      filterFns: {
        fuzzy: fuzzyFilter
      },
      data: defferedData || [],
      enableSorting,
      manualSorting,
      manualFiltering,
      enableRowSelection,
      enableMultiRowSelection: false,
      enableColumnFilters: enableFiltering,
      enableSubRowSelection: true,
      state: { sorting, expanded, columnOrder, columnVisibility, columnFilters }
    })

    useImperativeHandle(ref, () => ({
      ...table
    }))

    return (
      <Fragment>
        {enableColumnHiding && <TableSettings table={table} />}
        <div className={classNames('h-full flex flex-col border-t border-gray-300 pb-4', className)}>
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <TableHead
                table={table}
                tableId={tableId}
                enableColumnReordering={enableColumnReordering}
                data={defferedData}
                enableFiltering={enableFiltering}
                manualFiltering={manualFiltering}
              />
              {defferedData && (
                <Fragment>
                  <TableBody
                    getRowModel={table.getRowModel}
                    getRowProps={getRowProps}
                    loading={loading}
                    tableId={tableId}
                  />
                  {enableFooter && <TableFoot getFooterGroups={table.getFooterGroups} />}
                </Fragment>
              )}
            </table>
            {loading && !defferedData && <ProgressBarComponent />}
            {defferedData?.length === 0 && <EmptyResults />}
          </div>
        </div>
      </Fragment>
    )
  }
)

PandaTable.displayName = 'PandaTable'
