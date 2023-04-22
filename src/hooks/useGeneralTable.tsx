import { Fragment, useEffect } from 'react'
import { Column, Row, useSortBy, useTable } from 'react-table'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/helpers'
import useTableStateStore from '@/store/useTableStateStore'

import useQueryString from './useQueryString'

interface UseTableType {
  data?: {}[]
  tableId: string
  columns: Array<Column>
  loading?: boolean
  className?: string
  isSortable?: boolean
  getColumnProps?: () => {}
  getRowProps?: (row: Row<{}>) => {}
  getCellProps?: () => {}
  getHeaderGroupProps?: () => {}
}
const defaultPropGetter = () => ({})

const useGeneralTable = ({
  data,
  columns,
  loading = false,
  className,
  getHeaderGroupProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  isSortable = false,
  tableId
}: UseTableType) => {
  const { instances, setSortBy, setSortByQueryString } = useTableStateStore()

  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    state: { sortBy }
  } = useTable(
    {
      columns,
      data: data || [],
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      initialState: { sortBy: instances[tableId]?.sortBy || [] }
    },
    useSortBy
  )
  const sortConfigQuery = useQueryString(sortBy)

  useEffect(() => {
    setSortBy(tableId, sortBy)
    setSortByQueryString(tableId, sortConfigQuery)
  }, [setSortBy, setSortByQueryString, tableId, sortBy, sortConfigQuery])

  const getTable = () => (
    <Fragment>
      <div className={classNames('h-full flex flex-col border-t border-gray-300 pb-4', className)}>
        <div className="-my-2  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5 ">
              <table className="min-w-full divide-y divide-gray-300" {...getTableProps()}>
                <thead className="bg-gray-50">
                  {headerGroups.map(headerGroup => {
                    const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps({
                      ...getHeaderGroupProps()
                    })
                    return (
                      <tr key={key} {...restHeaderGroupProps}>
                        {headerGroup.headers.map(column => {
                          const sortProps = isSortable ? column.getSortByToggleProps() : {}
                          const { key, ...restHeaderProps } = column.getHeaderProps(sortProps)
                          return (
                            <th
                              key={key}
                              scope="col"
                              className={classNames(
                                'whitespace-nowrap sticky top-0 z-20 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6'
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
                            'hover:bg-primary-200',
                            className
                          )}
                          {...restRowProps}
                        >
                          {row.cells.map(cell => {
                            const { key, className, ...restCellProps } = cell.getCellProps({ ...getCellProps() })
                            return (
                              <td
                                key={key}
                                className={classNames(
                                  className,
                                  'whitespace-nowrap text-sm  sm:pl-6 sm:pr-6 text-gray-500'
                                )}
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
