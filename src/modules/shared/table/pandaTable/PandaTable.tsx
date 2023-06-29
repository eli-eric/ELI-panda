import type { ColumnDef, Row, Table as ReactTable } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import type { Ref } from 'react'
import { forwardRef, Fragment, useImperativeHandle } from 'react'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/helpers'

import { ColumnHeader } from './components/ColumnHeader'
import { ColumnHidingDisclosure } from './components/ColumnHidingDisclosure'
import { DraggableColumnHeader } from './components/DraggableColumnHeader'
import type { PandaTableSettings } from './hooks/usePandaTable'
import { usePandaTable } from './hooks/usePandaTable'

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
  const { withFooter = false, enableColumnHiding = false, enableColumnReordering = false } = settings || {}
  const table = usePandaTable<T>({ tableId, columns, data, getSubRows, settings })
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
                  <tbody className="bg-white">
                    {table.getRowModel().rows.map((row, index) => (
                      <tr
                        key={row.id}
                        {...getRowProps(row)}
                        className={classNames(
                          index % 2 === 0 ? undefined : 'bg-gray-100',
                          'hover:bg-gray-200 z-0',
                          getRowProps(row)?.className
                        )}
                      >
                        {row.getVisibleCells().map(cell => (
                          <td
                            key={cell.id}
                            className={classNames(
                              'text-sm sm:pl-6 sm:pr-6 text-gray-500 border-r border-b',
                              row.getIsSelected() ? 'text-white' : '',
                              cell.column.columnDef.meta?.sticky
                                ? 'sticky left-0 z-30 backdrop-blur-2xl backdrop-filter border-r'
                                : '',
                              loading ? 'opacity-50' : ''
                            )}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  {withFooter && (
                    <tfoot>
                      {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id} className={classNames('bg-gray-50')}>
                          {footerGroup.headers.map(header => (
                            <td key={header.id} className={classNames('text-sm sm:pl-6 sm:pr-6 text-gray-500')}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.footer, header.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tfoot>
                  )}
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
