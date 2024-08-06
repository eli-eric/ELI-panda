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
    >
      <thead className="sticky top-0 z-10 dark:bg-gray-900  bg-opacity-75  backdrop-blur backdrop-filter">
        {table.getHeaderGroups().map(headerGroup => (
          <tr className="flex w-full" key={headerGroup.id}>
            {headerGroup.headers.map((header, headerIndex) => {
              return (
                <>
                  {enableColumnReordering ? (
                    <HeaderCellDNDComponent
                      key={header.id}
                      header={header}
                      headerIndex={headerIndex}
                      columns={table.getAllColumns()}
                      setColumnOrder={table.setColumnOrder}
                      columnOrder={table.getState().columnOrder}
                    />
                  ) : (
                    <HeaderCellComponent
                      key={header.id}
                      header={header}
                      headerIndex={headerIndex}
                      columns={table.getAllColumns()}
                    />
                  )}
                </>
              )
            })}
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
      {enableFooter && <TableFoot getFooterGroups={table.getFooterGroups} />}
    </TableContainer>
  )
}
