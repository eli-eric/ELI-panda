import type { Row, Table } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'

import { TableFoot } from '../pandaTable/components/TableFoot'
import {
  defaultPropGetter,
  type GetRowPropsReturnType,
  type PandaTableSettings
} from '../pandaTable/PandaTable'
import { HeaderCellComponent } from './components/HeaderCell.comp'
import { HeaderCellDNDComponent } from './components/HeaderCell.dnd'
import { TableContainer } from './components/Table.cont'
import { TableRowComponent } from './components/TableRow.comp'
import { TableRowDNDComponent } from './components/TableRow.dnd'

interface Props<T> {
  settings?: PandaTableSettings<T>
  tableHeading?: string
  className?: string
  data?: T[]
  loading?: boolean
  getRowProps?: (row: Row<T>) => GetRowPropsReturnType

  tableId: string
  table: Table<T>
}

export function PandaTableV2<T>({
  data,
  table,
  loading = false,
  settings,
  tableHeading,
  className,
  tableId,
  getRowProps = defaultPropGetter
}: Props<T>) {
  const {
    enableFooter = false,
    enableColumnHiding = false,
    enablePagination = false,
    enableColumnReordering = false
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

  return (
    <TableContainer
      table={table}
      tableHeading={tableHeading}
      className={className}
      enableColumnHiding={enableColumnHiding}
      tableContainerRef={tableContainerRef}
      enablePagination={enablePagination}
      itemsTotalCount={data?.length}
      isLoading={loading && !data}
      isEmpty={data?.length === 0}
    >
      <thead className="sticky top-0 z-10 dark:bg-gray-900  bg-opacity-75  backdrop-blur backdrop-filter">
        {table.getHeaderGroups().map(headerGroup => {
          return (
            <tr className="flex w-full" key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => {
                if (enableColumnReordering) {
                  return (
                    <HeaderCellDNDComponent
                      key={header.id}
                      header={header}
                      headerIndex={headerIndex}
                      columns={table.getAllColumns()}
                      setColumnOrder={table.setColumnOrder}
                      columnOrder={table.getState().columnOrder}
                    />
                  )
                }

                return (
                  <HeaderCellComponent
                    key={header.id}
                    header={header}
                    headerIndex={headerIndex}
                    columns={table.getAllColumns()}
                  />
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody
        style={{
          display: 'grid',
          height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
          position: 'relative' //needed for absolute positioning of rows
        }}
      >
        {data &&
          virtualRows.map(virtualRow => {
            const row = rows[virtualRow.index] as Row<any>
            return getRowProps(row).dropsettings ? (
              <TableRowDNDComponent
                key={virtualRow.key}
                row={row}
                getRowProps={getRowProps}
                virtualRow={virtualRow}
                measureElement={rowVirtualizer.measureElement}
                loading={loading}
                tableId={tableId}
              />
            ) : (
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
      {enableFooter && <TableFoot getFooterGroups={table.getFooterGroups} />}
    </TableContainer>
  )
}
