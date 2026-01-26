import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { formatDate } from '@/utils/formatters'

import { GrantActionsCell } from './components/grant-actions.comp'
import type { Grant } from './types/grant.types'

export const useGrantColumns = () => {
  const columns = useMemo(
    (): ColumnDef<Grant, any>[] => [
      {
        id: 'name',
        header: 'Name',
        accessorFn: row => row.name,
        size: 450,
        meta: { sticky: true },
        cell: GrantActionsCell
      },
      {
        id: 'code',
        header: 'Code',
        accessorFn: row => row.code,
        size: 150
      },
      {
        id: 'grantGroup',
        header: 'Grant Group',
        accessorFn: row => row.grantGroup?.name,
        size: 350
      },
      {
        id: 'updatedAt',
        header: 'Updated',
        accessorFn: row => row.updatedAt,
        size: 320,
        cell: ({ getValue }) => {
          const value = getValue()
          return value ? formatDate(value) : ''
        }
      }
    ],
    []
  )

  return columns
}
