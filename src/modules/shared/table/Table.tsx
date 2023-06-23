import type { ColumnDef, ExpandedState, SortingState, Table as ReactTable } from '@tanstack/react-table'
import { getSortedRowModel } from '@tanstack/react-table'
import { getFilteredRowModel } from '@tanstack/react-table'
import { getExpandedRowModel } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { Ref } from 'react'
import { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/helpers'
import useTableStateStore from '@/store/useTableStateStore'

interface Props<T extends object> {
  data?: T[]
  tableId: string
  columns: ColumnDef<T, any>[]
  loading?: boolean
  className?: string
  getSubRows?: (row: T) => T[]
  settings?: {
    enableSorting?: boolean
    withFooter?: boolean
    enableQueryURL?: boolean
  }
}

//TODO: I was not able to type this comp without using any
const PandaTable = forwardRef<ReactTable<any> | undefined, Props<any>>(function Table<T extends object>(
  { data, columns, loading = false, settings, className, tableId, getSubRows }: Props<T>,
  ref?: Ref<ReactTable<T> | undefined>
) {
  const { enableSorting = false, withFooter = false, enableQueryURL = false } = settings || {}
  // zustand table instance store
  const { setSortBy, setSortByQueryString, instances } = useTableStateStore()
  const sortByInstance = instances[tableId]?.sortBy || []
  const sortByStringInstance = instances[tableId]?.sortByQueryString || null
  // query state
  const [sortByQuery, setSortByQuery] = useQueryState('sortBy', { history: 'replace' })
  // table state
  const [sorting, setSorting] = useState<SortingState>(sortByInstance)
  const [expanded, setExpanded] = useState<ExpandedState>({})

  // react-table
  const table = useReactTable<T>({
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getSubRows,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    columns: columns,
    data: data || [],
    enableSorting: enableSorting,
    manualSorting: true,
    state: { sorting, expanded }
  })

  useImperativeHandle(ref, () => ({
    ...table
  }))

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
  // update
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

  return (
    <Fragment>
      <div className={classNames('h-full flex flex-col border-t border-gray-300 pb-4', className)}>
        <div className="inline-block min-w-full align-middle">
          <div className="shadow ring-1 ring-black ring-opacity-5 ">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 border-b">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        //scope="col"
                        colSpan={header.colSpan}
                        style={{
                          width: header.getSize()
                        }}
                        className={classNames(
                          'whitespace-nowrap  bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6',
                          className,
                          header.column.columnDef.meta?.sticky
                            ? 'sticky left-0 top-0 text-ellipsis z-20 backdrop-blur-2xl backdrop-filter border-r'
                            : 'sticky top-0 z-10'
                        )}
                      >
                        <div
                          {...{
                            className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                            onClick: header.column.getToggleSortingHandler(),
                            style: {
                              width: header.getSize()
                            }
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽'
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </th>
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
                        className={classNames(
                          index % 2 === 0 ? undefined : 'bg-gray-100',
                          'hover:bg-gray-200 z-0',
                          className
                        )}
                      >
                        {row.getVisibleCells().map(cell => (
                          <td
                            key={cell.id}
                            className={classNames(
                              'text-sm sm:pl-6 sm:pr-6 text-gray-500',
                              className,
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
                            <td
                              key={header.id}
                              className={classNames('text-sm sm:pl-6 sm:pr-6 text-gray-500', className)}
                            >
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

/* function Filter({ column }: { column: Column<any, any>; table: Table<any> }) {
  const [filterValue, setFilterValue] = useState(column.getFilterValue())
  const [pending, startTransition] = useTransition()

  const columnFilterValue = column.getFilterValue()

  useEffect(() => {
    column.setFilterValue(filterValue)
  }, [column, filterValue])

  return (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => startTransition(() => setFilterValue(e.target.value))}
      placeholder={`Search...`}
      className="w-full h-6 border shadow rounded"
    />
  )
} */
