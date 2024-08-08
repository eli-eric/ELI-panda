import type { Table } from '@tanstack/react-table'
import { type FC, Fragment, type PropsWithChildren } from 'react'

import PaginationComponent from '@/components/table/Pagination.comp'
import { classNames } from '@/utils'

import { TableSettings } from '../../pandaTable/components/TableSettings'

interface Props {
  table: Table<any>
  tableHeading?: string
  className?: string
  enableColumnHiding?: boolean
  tableContainerRef?: any
  enablePagination?: boolean
  itemsTotalCount?: number
}

export const TableContainer: FC<PropsWithChildren<Props>> = ({
  children,
  table,
  tableHeading,
  className,
  enableColumnHiding,
  tableContainerRef,
  enablePagination,
  itemsTotalCount
}) => {
  return (
    <Fragment>
      {tableHeading && (
        <div
          id="table-heading"
          className="items-center w-full py-[2px] px-4 text-center shadow-sm  text-primary-600 bg-white dark:bg-gray-800  "
        >
          <span>{tableHeading}</span>
        </div>
      )}
      {enableColumnHiding && (
        <TableSettings
          getAllLeafColumns={table.getAllLeafColumns}
          getIsAllColumnsVisible={table.getIsAllColumnsVisible}
          getToggleAllColumnsVisibilityHandler={
            table.getToggleAllColumnsVisibilityHandler
          }
        />
      )}
      <div
        ref={tableContainerRef}
        className={classNames(
          'overflow-auto relative h-full min-w-full text-sm border-t',
          className
        )}
      >
        <table className="min-w-full">{children}</table>
      </div>
      {enablePagination && (
        <PaginationComponent
          page={table.getState().pagination.pageIndex + 1}
          pageSize={50}
          pageNumbers={table.getPageCount()}
          itemsTotalCount={itemsTotalCount}
          nextPageHandler={() => {
            table.nextPage()
          }}
          previousPageHandler={() => {
            table.previousPage()
          }}
        />
      )}
    </Fragment>
  )
}
