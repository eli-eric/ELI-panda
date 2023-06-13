import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import { Fragment, useEffect, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/helpers'
import useTableStateStore from '@/store/useTableStateStore'

interface Props<T extends object> {
  data?: T[]
  tableId: string
  columns: ColumnDef<T, string>[]
  loading?: boolean
  className?: string
  enableSorting?: boolean
  withFooter?: boolean
  enableQueryURL?: boolean
}

const Table = <T extends object>({
  data,
  columns,
  loading = false,
  withFooter = false,
  enableQueryURL = true,
  className,
  enableSorting = true,
  tableId
}: Props<T>) => {
  // zustand table instance store
  const { setSortBy, setSortByQueryString, instances } = useTableStateStore()
  const sortByInstance = instances[tableId]?.sortBy || []
  const sortByStringInstance = instances[tableId]?.sortByQueryString || null
  // query state
  const [sortByQuery, setSortByQuery] = useQueryState('sortBy', { history: 'replace' })
  // table state
  const [sorting, setSorting] = useState<SortingState>(sortByInstance)
  // react-table
  const table = useReactTable<T>({
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    data: data || [],
    enableSorting,
    manualSorting: true,
    state: { sorting: sorting },
    enableSortingRemoval: true,
    onSortingChange: setSorting
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
                          'whitespace-nowrap sticky top-0 z-10 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6',
                          className
                        )}
                      >
                        <div
                          {...{
                            className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽'
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
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
                        {row.getAllCells().map(cell => (
                          <td key={cell.id} className={classNames('text-sm sm:pl-6 sm:pr-6 text-gray-500', className)}>
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
          {loading && <ProgressBarComponent />}
          {data?.length === 0 && (
            <div className="flex align-middle justify-center mt-10">
              <EmptyResults />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default Table
