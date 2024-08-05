import type { Row, Table } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'

import PaginationComponent from '@/components/table/Pagination.comp'
import { classNames } from '@/utils'

import { TableFoot } from '../pandaTable/components/TableFoot'
import { TableSettings } from '../pandaTable/components/TableSettings'
import {
  defaultPropGetter,
  type GetRowPropsReturnType,
  type PandaTableSettings
} from '../pandaTable/PandaTable'
import { HeaderCellComponent } from './components/HeaderCell.comp'
import { TableRowComponent } from './components/TableRow.comp'

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

export const PandaTablev2 = ({
  data,
  table,
  loading = false,
  settings,
  tableHeading,
  className,
  tableId,
  getRowProps = defaultPropGetter
}: Props) => {
  const {
    enableFooter = false,
    enableColumnHiding = false,
    enablePagination = false
  } = settings || {}

  const { rows } = table.getRowModel()

  //The virtualizers need to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 49, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 20
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

  //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
  let virtualPaddingLeft: number | undefined
  let virtualPaddingRight: number | undefined

  return (
    <>
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
          'overflow-auto relative h-full text-sm border-t',
          className
        )}
      >
        <table className="grid">
          <thead className="grid sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr className="flex w-full" key={headerGroup.id}>
                {headerGroup.headers.map((header, headerIndex) => {
                  return (
                    <HeaderCellComponent
                      key={header.id}
                      header={header}
                      headerIndex={headerIndex}
                      columns={table.getAllColumns()}
                    />
                  )
                })}
                {virtualPaddingRight ? (
                  //fake empty column to the right for virtualization scroll padding
                  <div
                    style={{ display: 'flex', width: virtualPaddingRight }}
                  />
                ) : null}
              </tr>
            ))}
          </thead>
          <tbody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
              position: 'relative' //needed for absolute positioning of rows
            }}
          >
            {virtualRows.map(virtualRow => {
              const row = rows[virtualRow.index] as Row<any>
              return (
                <TableRowComponent
                  key={virtualRow.key}
                  row={row}
                  getRowProps={getRowProps}
                  virtualRow={virtualRow}
                  measureElement={rowVirtualizer.measureElement}
                  loading={loading}
                />
              )
            })}
          </tbody>
          {enableFooter && (
            <TableFoot getFooterGroups={table.getFooterGroups} />
          )}
        </table>
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
    </>
  )
}
