import type { Row, Table } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import React, { createContext, Fragment } from 'react'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import PaginationComponent from '@/components/table/Pagination.comp'
import { classNames } from '@/utils'

import { TableBody } from './components/TableBody'
import { TableFoot } from './components/TableFoot'
import { TableHead } from './components/TableHead'
import { TableSettings } from './components/TableSettings'
import {
  defaultPropGetter,
  type GetRowPropsReturnType,
  type PandaTableSettings
} from './PandaTable'

type PandaTableContextType = {
  settings: PandaTableSettings<any>
  tableId: string
  loading: boolean
}
export const PandaTableContext = createContext<PandaTableContextType>({
  settings: {},
  tableId: '',
  loading: false
})

interface Props {
  settings?: PandaTableSettings<any>
  tableHeading?: string
  className?: string
  data: any
  loading?: boolean
  getRowProps?: (row: Row<any>) => GetRowPropsReturnType

  tableId: string
  table: Table<any>
}
export const PandaTableControlled = ({
  settings,
  className,
  data,
  table,
  loading = false,
  tableId,
  getRowProps = defaultPropGetter,
  tableHeading
}: Props) => {
  const {
    enableFooter = false,
    enableColumnHiding = false,
    enablePagination = false
  } = settings || {}

  const { rows } = table.getRowModel()

  const visibleColumns = table.getVisibleLeafColumns()

  //The virtualizers need to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  //we are using a slightly different virtualization strategy for columns (compared to virtual rows) in order to support dynamic row heights
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: index => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3 //how many columns to render on each side off screen each way (adjust this for performance)
  })

  //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 43, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5
  })

  const virtualColumns = columnVirtualizer.getVirtualItems()
  const virtualRows = rowVirtualizer.getVirtualItems()

  return (
    <PandaTableContext.Provider
      value={{
        settings: settings || {},
        tableId,
        loading
      }}
    >
      {tableHeading && (
        <div
          id="table-heading"
          className="items-center w-full py-[2px] px-4 text-center shadow-sm  text-primary-600 bg-white dark:bg-gray-800  "
        >
          <span>{tableHeading}</span>
        </div>
      )}
      {enableColumnHiding && <TableSettings table={table} />}

      <div
        ref={tableContainerRef}
        className={classNames(
          'h-full flex flex-col border-t border-gray-300 pb-4 text-sm',
          className
        )}
      >
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <TableHead table={table} />
            {data && (
              <Fragment>
                <TableBody
                  virtualizer={rowVirtualizer}
                  getRowProps={getRowProps}
                  rows={rows}
                />
                {enableFooter && (
                  <TableFoot getFooterGroups={table.getFooterGroups} />
                )}
              </Fragment>
            )}
          </table>
          {loading && !data && <ProgressBarComponent />}
          {data?.length === 0 && <EmptyResults />}
        </div>
      </div>
      {enablePagination && (
        <PaginationComponent
          page={table.getState().pagination.pageIndex + 1}
          pageSize={50}
          pageNumbers={table.getPageCount()}
          itemsTotalCount={data?.length}
          nextPageHandler={() => {
            table.nextPage()
          }}
          previousPageHandler={() => {
            table.previousPage()
          }}
        />
      )}
    </PandaTableContext.Provider>
  )
}
