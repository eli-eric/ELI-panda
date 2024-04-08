import type { Cell, Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import classNames from 'classnames'
import type { FC } from 'react'
import React, { useId } from 'react'

import styles from './RowCell.module.css'

interface Props {
  row: Row<any>
  cell: Cell<any, unknown>
  loading?: boolean
}

export const RowCell: FC<Props> = ({ row, cell, loading }) => {
  const id = useId()
  const rowIndex = row.getAllCells().indexOf(cell)

  const stickyCellsSize = row.getAllCells().reduce((acc, cell, index) => {
    if (index < rowIndex) {
      if (cell.column.columnDef.meta?.sticky) {
        return acc + cell.column.getSize() + 45
      }
    }
    return acc
  }, 0)

  return (
    <td
      key={cell.id}
      id={id}
      style={
        {
          width: cell.column.getSize(),
          '--left': cell.column.columnDef.meta?.sticky ? `${rowIndex === 0 ? 0 : stickyCellsSize}px` : undefined
        } as React.CSSProperties
      }
      className={classNames(
        'sm:pl-6 sm:pr-6 border-r border-b border-gray-400 dark:text-gray-100',
        cell.column.columnDef.meta?.sticky ? 'sticky z-30 backdrop-blur-2xl backdrop-filter border-r pt-1 pb-1' : '',
        loading ? 'opacity-50' : '',
        cell.column.columnDef.meta?.className,
        styles.cell
      )}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
}
