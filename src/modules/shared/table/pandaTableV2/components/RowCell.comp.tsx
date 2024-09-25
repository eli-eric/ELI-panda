import type { Cell, Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import type { FC } from 'react'
import { useMemo } from 'react'

import { classNames } from '@/utils'

import styles from './RowCell.module.css'

interface Props {
  cell: Cell<any, unknown>
  row: Row<any>
  loading: boolean
  index: number
}
export const RowCellComponent: FC<Props> = ({ cell, row, loading, index }) => {
  const stickyCellsSize = useMemo(() => {
    let size = 0
    for (let i = 0; i < index; i++) {
      const cell = row.getAllCells()[i]
      if (cell.column.columnDef.meta?.sticky) {
        size += cell.column.getSize()
      }
    }
    return size
  }, [index, row])

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
        'border-r border-b border-gray-400 pl-3 pr-3',
        cell.column.columnDef.meta?.sticky
          ? 'sticky z-30 backdrop-blur-2xl backdrop-filter border-r pt-1 pb-1'
          : '',
        loading ? 'opacity-50' : '',
        styles.cell,
        cell.column.columnDef.meta?.className
      )}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
}
