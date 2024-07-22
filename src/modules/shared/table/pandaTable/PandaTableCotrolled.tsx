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

  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 43,
    overscan: 20
  })

  const totalSize = virtualizer.getTotalSize()

  console.log('table render ', totalSize)

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
        ref={parentRef}
        className={classNames(
          'h-full flex flex-col border-t border-gray-300 pb-4 text-sm',
          className
        )}
      >
        <div
          className="inline-block min-w-full align-middle"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          <table className="min-w-full divide-y divide-gray-300">
            <TableHead table={table} />
            {data && (
              <Fragment>
                <TableBody
                  virtualizer={virtualizer}
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
