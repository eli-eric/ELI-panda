import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { Cell, Column, HeaderGroup, Row, useSortBy, useTable } from 'react-table'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/helpers'
import useTableStateStore from '@/store/useTableStateStore'

import useQueryString from './useQueryString'

interface UseTableType<T extends object> {
  data?: T[]
  tableId: string
  columns: Array<Column<T>>
  loading?: boolean
  className?: string
  isSortable?: boolean
  uriSortBy?: boolean
  getRowProps?: (row: Row<T>) => {}
  getCellProps?: (cell: Cell<T, any>) => {}
  getColumnProps?: (column: HeaderGroup<T>) => {}
  getHeaderGroupProps?: () => {}
}
const defaultPropGetter = () => ({})

const useGeneralTable = <T extends object>({
  data,
  columns,
  loading = false,
  uriSortBy = false,
  className,
  getHeaderGroupProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  isSortable = false,
  tableId
}: UseTableType<T>) => {
  const { instances, setSortBy, setSortByQueryString } = useTableStateStore()
  const router = useRouter()
  const routerSortBy = router.query.sortBy as string
  const sortByInstance = instances[tableId]?.sortBy

  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    state: { sortBy },
    setSortBy: setSortByTable
  } = useTable<T>(
    {
      columns,
      data: data || [],
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      initialState: { sortBy: sortByInstance || [] }
    },
    useSortBy
  )

  const sortConfigQuery = useQueryString(sortBy)

  // intialize sortBy from router
  useEffect(() => {
    if (uriSortBy) {
      if (sortBy.length === 0) {
        if (routerSortBy) {
          const sortByParsed = JSON.parse(routerSortBy)
          setSortBy(tableId, sortByParsed)
          setSortByQueryString(tableId, routerSortBy)
          setSortByTable(sortByParsed)
        }
      }
    }
  }, [routerSortBy]) // eslint-disable-line

  // set sortBy to store and router.query.sortBy
  useEffect(() => {
    setSortBy(tableId, sortBy)
    setSortByQueryString(tableId, JSON.stringify(sortBy))
    if (uriSortBy) {
      const newQuery = { ...router.query }
      if (sortBy.length !== 0) {
        newQuery.sortBy = JSON.stringify(sortBy)
      } else {
        delete newQuery.sortBy
      }
      router.replace({ query: newQuery })
    }
  }, [tableId, sortBy, sortConfigQuery, uriSortBy]) // eslint-disable-line

  const getTable = () => (
    <Fragment>
      <div className={classNames('h-full flex flex-col border-t border-gray-300 pb-4', className)}>
        <div className="-my-2  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle pl-8">
            <div className="shadow ring-1 ring-black ring-opacity-5 ">
              <table className="min-w-full divide-y divide-gray-300" {...getTableProps()}>
                <thead className="bg-gray-50 border-b">
                  {headerGroups.map(headerGroup => {
                    const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps({
                      ...getHeaderGroupProps()
                    })
                    return (
                      <tr key={key} {...restHeaderGroupProps}>
                        {headerGroup.headers.map(column => {
                          const sortProps = isSortable ? column.getSortByToggleProps() : {}
                          const props = { ...sortProps, ...getColumnProps(column) }
                          const { key, className, ...restHeaderProps } = column.getHeaderProps(props)
                          return (
                            <th
                              key={key}
                              scope="col"
                              className={classNames(
                                'whitespace-nowrap sticky top-0 z-10 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6',
                                className
                              )}
                              {...restHeaderProps}
                            >
                              {column.render('Header')}
                              <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                            </th>
                          )
                        })}
                      </tr>
                    )
                  })}
                </thead>
                {data && (
                  <tbody className="bg-white" {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                      prepareRow(row)
                      const { key, className, ...restRowProps } = row.getRowProps({
                        ...getRowProps(row)
                      })
                      return (
                        <tr
                          key={key}
                          className={classNames(
                            index % 2 === 0 ? undefined : 'bg-gray-100',
                            'hover:bg-primary-200 z-0',
                            className
                          )}
                          {...restRowProps}
                        >
                          {row.cells.map(cell => {
                            const { key, className, ...restCellProps } = cell.getCellProps({ ...getCellProps(cell) })

                            return (
                              <td
                                key={key}
                                className={classNames(className, 'text-sm z-0 sm:pl-6 sm:pr-6 text-gray-500')}
                                {...restCellProps}
                              >
                                {cell.render('Cell')}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          {loading && <ProgressBarComponent />}
        </div>
        {data?.length === 0 && (
          <div className="flex align-middle justify-center mt-10">
            <EmptyResults />
          </div>
        )}
      </div>
    </Fragment>
  )

  return { getTable }
}

export default useGeneralTable
