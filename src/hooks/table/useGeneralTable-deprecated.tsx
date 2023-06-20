import type { SortingState } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import { Fragment, useEffect } from 'react'
import { type Cell, type Column, type HeaderGroup, type Row, useSortBy, useTable } from 'react-table'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/helpers'
import useTableStateStore from '@/store/useTableStateStore'

interface UseTableType<T extends object> {
  data?: T[]
  tableId: string
  columns: Array<Column<T>>
  loading?: boolean
  className?: string
  isSortable?: boolean
  withFooter?: boolean
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
  withFooter = false,
  uriSortBy = false,
  className,
  getHeaderGroupProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  isSortable = false,
  tableId
}: UseTableType<T>) => {
  const { setSortBy, setSortByQueryString } = useTableStateStore()
  //const sortByInstance = instances[tableId]?.sortBy
  const [sortByQuery, setSortByQuery] = useQueryState('sortBy', { history: 'replace' })

  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    toggleHideColumn,
    footerGroups,
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
      autoResetSortBy: false
    },
    useSortBy
  )

  // intialize sortBy from router
  useEffect(() => {
    if (uriSortBy) {
      if (sortBy.length === 0) {
        if (sortByQuery) {
          const sortByParsed = JSON.parse(sortByQuery)
          setSortBy(tableId, sortByParsed)
          setSortByQueryString(tableId, sortByQuery)
          setSortByTable(sortByParsed)
        }
      }
    }
  }, [sortByQuery]) // eslint-disable-line

  //TODO: need to handle seeting sortBy to router empty [] in some cases it disapears from URL
  // set sortBy to store and router.query.sortBy
  useEffect(() => {
    const sortConfigQuery = JSON.stringify(sortBy)
    setSortBy(tableId, sortBy as SortingState)
    setSortByQueryString(tableId, sortBy.length === 0 ? undefined : sortConfigQuery)
    if (uriSortBy) {
      if (sortBy.length !== 0) {
        setSortByQuery(sortConfigQuery)
      } else {
        setSortByQuery(null)
      }
    }
  }, [tableId, sortBy, uriSortBy]) // eslint-disable-line

  const getTable = () => (
    <Fragment>
      <div className={classNames('h-full flex flex-col border-t border-gray-300 pb-4', className)}>
        <div className="inline-block min-w-full align-middle">
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
                <Fragment>
                  <tbody className="bg-white" {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                      prepareRow(row)
                      const { key, className, ...restRowProps } = row.getRowProps({
                        ...getRowProps(row)
                      })
                      return (
                        <tr
                          {...restRowProps}
                          key={key}
                          className={classNames(
                            index % 2 === 0 ? undefined : 'bg-gray-100',
                            'hover:bg-gray-200 z-0',
                            className
                          )}
                        >
                          {row.cells.map(cell => {
                            const { key, className, ...restCellProps } = cell.getCellProps({ ...getCellProps(cell) })

                            return (
                              <td
                                {...restCellProps}
                                key={key}
                                className={classNames('text-sm sm:pl-6 sm:pr-6 text-gray-500', className)}
                              >
                                {cell.render('Cell')}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                  {withFooter && (
                    <tfoot>
                      {footerGroups.map(group => {
                        const { key, ...restFooterGroupProps } = group.getFooterGroupProps()
                        return (
                          <tr key={key} {...restFooterGroupProps} className={classNames('bg-gray-50')}>
                            {group.headers.map(column => {
                              const { key, ...restFooterProps } = column.getFooterProps()
                              return (
                                <td
                                  key={key}
                                  {...restFooterProps}
                                  className={classNames('text-sm sm:pl-6 sm:pr-6 text-gray-500', className)}
                                >
                                  {column.render('Footer')}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
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

  return { getTable, toggleHideColumn }
}

export default useGeneralTable
