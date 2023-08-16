import type { Table } from '@tanstack/react-table'
import type { FC } from 'react'

import { ColumnHeader } from './ColumnHeader'

interface Props {
  enableColumnReordering: boolean
  table: Table<any>
  data?: any
}

export const TableHead: FC<Props> = ({ enableColumnReordering, table, data }) => (
  <thead className="bg-gray-50 border-b">
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <ColumnHeader
            key={header.id}
            enableColumnReordering={enableColumnReordering}
            table={table}
            header={header}
            data={data}
          />
        ))}
      </tr>
    ))}
  </thead>
)
