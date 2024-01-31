import type { Cell, Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import classNames from 'classnames'
import type { FC } from 'react'
import { useId } from 'react'

interface Props {
  row: Row<any>
  cell: Cell<any, unknown>
  loading?: boolean
}

export const RowCell: FC<Props> = ({ row, cell, loading }) => {
  const id = useId()

  return (
    <td
      key={cell.id}
      id={id}
      style={{ width: cell.column.getSize() }}
      className={classNames(
        'text-xs sm:pl-6 sm:pr-6 border-r border-b  border-gray-400 dark:text-gray-100',
        row.getIsSelected() ? 'text-white' : '',
        cell.column.columnDef.meta?.sticky
          ? 'sticky sm:left-0 z-30 backdrop-blur-2xl backdrop-filter border-r pt-1 pb-1'
          : '',
        loading ? 'opacity-50' : '',
        cell.column.columnDef.meta?.className
      )}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
}
