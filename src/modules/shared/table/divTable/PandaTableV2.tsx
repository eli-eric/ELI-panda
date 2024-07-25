import type { Row, Table } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'

import { classNames } from '@/utils'

import { TableSettings } from '../pandaTable/components/TableSettings'
import type {
  GetRowPropsReturnType,
  PandaTableSettings
} from '../pandaTable/PandaTable'
import styles from './RowCell.module.css'

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
  loading,
  settings,
  tableHeading,
  tableId
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
        className="overflow-auto relative max-h-screen text-sm"
      >
        <table className="grid">
          <thead className="grid sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr className="flex w-full" key={headerGroup.id}>
                {virtualPaddingLeft ? (
                  //fake empty column to the left for virtualization scroll padding
                  <th style={{ display: 'flex', width: virtualPaddingLeft }} />
                ) : null}
                {headerGroup.headers.map((header, index) => {
                  const stickyCellsSize =
                    table.getAllColumns().reduce((acc, col, index) => {
                      if (index < index) {
                        if (header.column.columnDef.meta?.sticky) {
                          return acc + col.getSize()
                        }
                      }
                      return acc
                    }, 0) +
                    1 * index
                  return (
                    <th
                      className={classNames(
                        'flex',
                        'whitespace-nowrap border-r outline-offset-0 dark:bg-gray-900 border-gray-400 bg-opacity-75 p-2 text-left font-semibold text-gray-900 dark:text-gray-200 backdrop-blur backdrop-filter',
                        header.column.columnDef.meta?.sticky
                          ? 'sticky top-0 text-ellipsis z-40 backdrop-blur-2xl backdrop-filter border-r'
                          : 'sticky top-0 z-10'
                      )}
                      key={header.id}
                      style={
                        {
                          width: header.getSize(),
                          '--left': header.column.columnDef.meta?.sticky
                            ? `${index === 0 ? 0 : stickyCellsSize}px`
                            : null
                        } as React.CSSProperties
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
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
              const visibleCells = row.getVisibleCells()

              return (
                <tr
                  className={classNames(
                    'min-h-[49px]',
                    'flex border-t border-gray-300 group',
                    virtualRow.index % 2 === 0
                      ? 'dark:bg-gray-800'
                      : 'bg-gray-100 dark:bg-gray-700',
                    'group hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 z-0'
                  )}
                  key={row.id}
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                    width: '100%'
                  }}
                >
                  {virtualPaddingLeft ? (
                    //fake empty column to the left for virtualization scroll padding
                    <td
                      style={{ display: 'flex', width: virtualPaddingLeft }}
                    />
                  ) : null}
                  {visibleCells.map((cell, index) => {
                    const stickyCellsSize =
                      row.getAllCells().reduce((acc, cell, index) => {
                        if (index < index) {
                          if (cell.column.columnDef.meta?.sticky) {
                            return acc + cell.column.getSize()
                          }
                        }
                        return acc
                      }, 0) +
                      1 * index
                    return (
                      <td
                        key={cell.id}
                        style={
                          {
                            width: cell.column.getSize(),
                            '--left': cell.column.columnDef.meta?.sticky
                              ? `${index === 0 ? 0 : stickyCellsSize}px`
                              : undefined
                          } as React.CSSProperties
                        }
                        className={classNames(
                          'flex items-center',
                          ' border-r border-b border-gray-400 dark:text-gray-100 pl-3 pr-3 ',
                          cell.column.columnDef.meta?.sticky
                            ? 'sticky z-30 backdrop-blur-2xl backdrop-filter border-r pt-1 pb-1'
                            : '',
                          loading ? 'opacity-50' : '',
                          styles.cell,
                          cell.column.columnDef.meta?.className
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
