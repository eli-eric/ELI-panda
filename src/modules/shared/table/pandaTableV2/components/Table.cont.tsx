import type { Table } from '@tanstack/react-table'
import { type FC, Fragment, type PropsWithChildren } from 'react'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import PaginationComponent from '@/components/table/Pagination.comp'
import { cn } from '@/lib/utils'

import { TableSettings } from '../../pandaTable/components/TableSettings'

interface Props {
  table: Table<any>
  isLoading?: boolean
  isEmpty?: boolean
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
  itemsTotalCount,
  isLoading,
  isEmpty
}) => {
  return (
    <Fragment>
      {tableHeading && (
        <div
          id="table-heading"
          className="items-center w-full py-[2px] px-4 text-center shadow-sm text-primary bg-background border-b border-border"
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
        className={cn(
          'overflow-auto relative h-full min-w-full text-sm border-t',
          className
        )}
      >
        <table className="min-w-full">{children}</table>
        {isLoading && <ProgressBarComponent />}
        {isEmpty && <EmptyResults />}
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
