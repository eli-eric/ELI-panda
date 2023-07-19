import type { ColumnDef, Row, Table as ReactTable } from '@tanstack/react-table'
import { getSortedRowModel } from '@tanstack/react-table'
import { getFilteredRowModel } from '@tanstack/react-table'
import { getExpandedRowModel } from '@tanstack/react-table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { Ref } from 'react'
import { forwardRef, Fragment, useImperativeHandle } from 'react'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/helpers'

import { TableBody } from './components/TableBody'
import { TableFoot } from './components/TableFoot'
import { TableHead } from './components/TableHead'
import { TableSettings } from './components/TableSettings'
import { useExpanding } from './hooks/useExpanding'
import { useOrdering } from './hooks/useOrdering'
import { useSorting } from './hooks/useSorting'
import { useVisibility } from './hooks/useVisibility'

export type PandaTableSettings = {
  enableSorting?: boolean
  enableFooter?: boolean
  enableQueryURL?: boolean
  enableRowSelection?: boolean
  enableColumnHiding?: boolean
  enableColumnReordering?: boolean
  manualSorting?: boolean
}

interface Props<T extends object> {
  data?: T[]
  tableId: string
  columns: ColumnDef<T, any>[]
  loading?: boolean
  className?: string
  getSubRows?: (original: T, index: number) => T[]
  getRowProps?: (row: Row<T>) => React.HTMLAttributes<HTMLTableRowElement>
  settings?: PandaTableSettings
}

const defaultPropGetter = () => ({})

//TODO: I was not able to type this comp without using any
export const PandaTable = forwardRef<ReactTable<any> | undefined, Props<any>>(function Table<T extends object>(
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
) {
  const {
    enableFooter = false,
    enableColumnHiding = false,
    enableColumnReordering = false,
    enableSorting = false,
    enableQueryURL = false,
    enableRowSelection = false,
    manualSorting = true
  } = settings || {}

  const [columnVisibility, setColumnVisibility] = useVisibility(tableId)
  const [columnOrder, setColumnOrder] = useOrdering(tableId, columns)
  const [sorting, setSorting] = useSorting(tableId, enableQueryURL)
  const [expanded, setExpanded] = useExpanding(tableId)

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
    manualSorting: manualSorting,
    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: false,
    enableSubRowSelection: true,
    state: { sorting, expanded, columnOrder, columnVisibility }
  })

  useImperativeHandle(ref, () => ({
    ...table
  }))

  return (
    <Fragment>
      {enableColumnHiding && <TableSettings table={table} />}
      <div className={classNames('h-full flex flex-col border-t border-gray-300 pb-4', className)}>
        <div className="inline-block min-w-full align-middle">
          <div className="shadow ring-1 ring-black ring-opacity-5 ">
            <table className="min-w-full divide-y divide-gray-300">
              <TableHead table={table} enableColumnReordering={enableColumnReordering} />
              {data && (
                <Fragment>
                  <TableBody getRowModel={table.getRowModel} getRowProps={getRowProps} loading={loading} />
                  {enableFooter && <TableFoot getFooterGroups={table.getFooterGroups} />}
                </Fragment>
              )}
            </table>
          </div>
          {loading && !data && <ProgressBarComponent />}
          {data?.length === 0 && <EmptyResults />}
        </div>
      </div>
    </Fragment>
  )
})
