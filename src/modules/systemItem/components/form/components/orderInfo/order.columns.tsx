import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { Badge } from '@/components/visuals/Badge'

export type OrderColumns = {
  type: string
  name: string
  uid: string
  description: string
  orderDate: string
  isDelivered: boolean
}

export const useSystemOrderColumns = () => {
  return useMemo(
    (): ColumnDef<OrderColumns, string>[] => [
      {
        id: 'type',
        header: 'Type',
        accessorKey: 'type',
        cell: ({ getValue }) => <Badge>{getValue()}</Badge>
      },
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name'
      },
      {
        id: 'orderDate',
        header: 'Order Date',
        accessorKey: 'orderDate'
      },
      {
        id: 'isDelivered',
        header: 'Is Delivered',
        accessorKey: 'isDelivered',
        cell: ({ getValue }) => (getValue() ? 'Yes' : 'No')
      }
    ],
    []
  )
}
