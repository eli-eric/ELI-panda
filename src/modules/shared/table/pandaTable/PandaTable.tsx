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

import { ColumnHeader } from './components/ColumnHeader'
import { ColumnHidingDisclosure } from './components/ColumnHidingDisclosure'
import { DraggableColumnHeader } from './components/DraggableColumnHeader'
import { TableBody } from './components/TableBody'
import { TableFoot } from './components/TableFoot'
import { useColumnOrder } from './hooks/useColumnOrder'
import { useColumnVisibility } from './hooks/useColumnVisibility'
import { useExpanding } from './hooks/useExpanding'
import { useSorting } from './hooks/useSorting'

type PandaTableSettings = {
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
  loading?: boolean
  className?: string
  getSubRows?: (row: T, index: number) => T[]
  getRowProps?: (row: Row<T>) => React.HTMLAttributes<HTMLTableRowElement>
  settings?: PandaTableSettings
}

const defaultPropGetter = () => ({})

//TODO: I was not able to type this comp without using any
const PandaTable = forwardRef<ReactTable<any> | undefined, Props<any>>(function Table<T extends object>(
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
    withFooter = false,
    enableColumnHiding = false,
    enableColumnReordering = false,
    enableSorting = false,
    enableQueryURL = false,
    enableRowSelection = false
  } = settings || {}

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(tableId)
  const [columnOrder, setColumnOrder] = useColumnOrder(tableId, columns)
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
    manualSorting: true,
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
      {enableColumnHiding && <ColumnHidingDisclosure table={table} />}
      <div className={classNames('h-full flex flex-col border-t border-gray-300 pb-4', className)}>
        <div className="inline-block min-w-full align-middle">
          <div className="shadow ring-1 ring-black ring-opacity-5 ">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 border-b">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <Fragment key={header.id}>
                        {enableColumnReordering ? (
                          <DraggableColumnHeader key={header.id} table={table} header={header} />
                        ) : (
                          <ColumnHeader header={header} />
                        )}
                      </Fragment>
                    ))}
                  </tr>
                ))}
              </thead>
              {data && (
                <Fragment>
                  <TableBody getRowModel={table.getRowModel} getRowProps={getRowProps} loading={loading} />
                  {withFooter && <TableFoot getFooterGroups={table.getFooterGroups} />}
                </Fragment>
              )}
            </table>
          </div>
          {loading && !data && <ProgressBarComponent />}
          {data?.length === 0 && (
            <div className="flex align-middle justify-center mt-10">
              <EmptyResults />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
})

export default PandaTable
