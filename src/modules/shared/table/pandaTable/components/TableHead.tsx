import type { Table } from '@tanstack/react-table'
import type { FC } from 'react'

import { ColumnHeader } from './ColumnHeader'

interface Props {
  enableColumnReordering: boolean
  tableId: string
  enableFiltering: boolean
  table: Table<any>
  data?: any
  manualFiltering: boolean
}

export const TableHead: FC<Props> = ({
  enableColumnReordering,
  table,
  data,
  enableFiltering,
  manualFiltering,
  tableId
}) => (
  <thead className="bg-gray-50 border-b">
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => {
          const noHeader = header.column.columnDef.meta?.noHeader
          if (noHeader) {
            return null
          }
          return (
            <ColumnHeader
              key={header.id}
              tableId={tableId}
              enableColumnReordering={enableColumnReordering}
              enableFiltering={enableFiltering}
              manualFiltering={manualFiltering}
              table={table}
              header={header}
              data={data}
            />
          )
        })}
      </tr>
    ))}
  </thead>
)
