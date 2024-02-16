import type { Table } from '@tanstack/react-table'
import type { FC } from 'react'

import { ColumnHeader } from './ColumnHeader'

interface Props {
  table: Table<any>
}

export const TableHead: FC<Props> = ({ table }) => (
  <thead className="bg-gray-50 border-b">
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => {
          const noHeader = header.column.columnDef.meta?.noHeader
          if (noHeader) {
            return null
          }
          return <ColumnHeader key={header.id} table={table} header={header} />
        })}
      </tr>
    ))}
  </thead>
)
