import type { Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import type { FC } from 'react'

import { classNames } from '@/helpers'

interface Props {
  getRowModel()
  loading?: boolean
  getRowProps: (row: Row<any>) => React.HTMLAttributes<HTMLTableRowElement>
}
export const TableBody: FC<Props> = ({ getRowModel, loading, getRowProps }) => (
  <tbody className="bg-white">
    {getRowModel().rows.map((row, index) => (
      <tr
        key={row.id}
        {...getRowProps(row)}
        className={classNames(
          index % 2 === 0 ? undefined : 'bg-gray-100',
          'hover:bg-gray-200 z-0',
          getRowProps(row)?.className
        )}
      >
        {row.getVisibleCells().map(cell => (
          <td
            key={cell.id}
            className={classNames(
              'text-xs sm:pl-6 sm:pr-6 text-gray-500 border-r border-b  border-gray-400',
              row.getIsSelected() ? 'text-white' : '',
              cell.column.columnDef.meta?.sticky
                ? 'sticky sm:left-0 z-30 backdrop-blur-2xl backdrop-filter border-r'
                : '',
              loading ? 'opacity-50' : '',
              cell.column.columnDef.meta?.className
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
)
