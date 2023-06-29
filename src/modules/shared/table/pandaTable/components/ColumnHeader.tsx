import type { Header } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import classNames from 'classnames'

interface ColumnHeaderProps {
  header: Header<any, any>
}

export const ColumnHeader = ({ header }: ColumnHeaderProps) => (
  <th
    key={header.id}
    //scope="col"
    colSpan={header.colSpan}
    style={{
      width: header.getSize()
    }}
    className={classNames(
      'whitespace-nowrap border-b border-r bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6',
      header.column.columnDef.meta?.sticky
        ? 'sticky left-0 top-0 text-ellipsis z-20 backdrop-blur-2xl backdrop-filter border-r'
        : 'sticky top-0 z-10'
    )}
  >
    <div
      {...{
        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
        onClick: header.column.getToggleSortingHandler(),
        style: {
          width: header.getSize()
        }
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{
        asc: ' 🔼',
        desc: ' 🔽'
      }[header.column.getIsSorted() as string] ?? null}
    </div>
  </th>
)
