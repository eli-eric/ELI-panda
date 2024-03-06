import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import type { ColumnOrderState, Header, Table } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import React, { type FC, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { classNames } from '@/utils'

import { PandaTableContext } from '../PandaTableCotrolled'
import { Filter } from './Filter'
import styles from './RowCell.module.css'
const reorderColumn = (draggedColumnId: string, targetColumnId: string, columnOrder: string[]): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  )
  console
  return [...columnOrder]
}

interface ColumnHeader {
  header: Header<any, any>
  table: Table<any>
  index: number

  data?: any
}

export const ColumnHeader: FC<ColumnHeader> = ({ header, table, index: headerIndex }) => {
  const { getState, setColumnOrder } = table
  const { columnOrder } = getState()
  const { column } = header
  const HeaderElement = column.columnDef.meta?.headerElement
  const { settings } = useContext(PandaTableContext)

  const { enableColumnReordering, enableFiltering, manualFiltering = false } = settings

  const [, dropRef] = useDrop<Header<any, any>>({
    accept: 'column',
    drop: draggedColumn => {
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder)
      setColumnOrder(newColumnOrder)
    }
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    item: () => column,
    type: 'column'
  })
  const stickyCellsSize = table.getAllColumns().reduce((acc, col, index) => {
    if (index < headerIndex) {
      if (header.column.columnDef.meta?.sticky) {
        return acc + col.getSize() + 45
      }
    }
    return acc
  }, 0)

  return (
    <th
      ref={dropRef}
      colSpan={header.colSpan}
      style={
        {
          opacity: isDragging ? 0.5 : 1,
          width: header.getSize(),
          '--left': header.column.columnDef.meta?.sticky ? `${headerIndex === 0 ? 0 : stickyCellsSize}px` : undefined
        } as React.CSSProperties
      }
      className={classNames(
        'whitespace-nowrap border-r border-b dark:bg-gray-900 border-gray-400 bg-opacity-75 py-2 pl-3 pr-3 text-left text-xs font-semibold text-gray-900 dark:text-gray-200 backdrop-blur backdrop-filter sm:pl-6 sm:pr-5',
        header.column.columnDef.meta?.sticky
          ? 'sticky top-0 text-ellipsis z-40 backdrop-blur-2xl backdrop-filter border-r'
          : 'sticky top-0 z-10',
        styles.cell
      )}
    >
      <div
        ref={previewRef}
        {...{
          className: classNames('flex items-center justify-between', header.column.columnDef.meta?.headerClassName),
          style: {
            width: header.getSize()
          }
        }}
      >
        {/* center header */}
        <div className="flex items-center">
          <div
            className={classNames(
              header.column.getCanSort() ? 'cursor-pointer select-none' : '',
              'items-center',
              header.column.getIsFiltered() ? 'text-primary-500' : ''
            )}
            onClick={header.column.getToggleSortingHandler()}
          >
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            {{
              asc: ' 🔼',
              desc: ' 🔽'
            }[header.column.getIsSorted() as string] ?? null}
          </div>
          {enableColumnReordering && (
            <button ref={dragRef} className="ml-2">
              <ArrowsRightLeftIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        {HeaderElement}
      </div>
      {enableFiltering && header.column.getCanFilter() ? (
        <Filter manualFiltering={manualFiltering} column={header.column} table={table} />
      ) : null}
    </th>
  )
}
