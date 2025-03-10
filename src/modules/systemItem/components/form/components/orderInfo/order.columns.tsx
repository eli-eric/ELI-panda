import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { Badge } from '@/components/visuals/Badge'
import { PATH } from '@/types/constants/paths'

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
        accessorKey: 'name',
        cell: ({ getValue, row }) => {
          const uid = row.original.uid
          return uid ? (
            <Link
              href={`${PATH.ORDER}/${uid}`}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              {getValue()}
            </Link>
          ) : (
            getValue()
          )
        }
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
