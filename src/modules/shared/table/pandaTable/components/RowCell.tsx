import { flexRender } from '@tanstack/react-table'
import classNames from 'classnames'
import type { FC } from 'react'
import { useId } from 'react'

interface Props {
  row: any
  cell: any
  loading?: boolean
}

export const RowCell: FC<Props> = ({ row, cell, loading }) => {
  const id = useId()

  return (
    <td
      key={cell.id}
      id={id}
      className={classNames(
        'text-xs sm:pl-6 sm:pr-6 border-r border-b  border-gray-400',
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
