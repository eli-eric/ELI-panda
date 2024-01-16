import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { PATH } from '@/types/constants/paths'
import type { System } from '@/types/gql/graphql'

export const useSubsystemsColumns = () => {
  const columns = useMemo(
    (): ColumnDef<System, string>[] => [
      {
        header: 'System Name',
        accessorKey: 'name',
        id: 'name',
        cell: ({ getValue, row }) => (
          <Link href={PATH.SYSTEM + '/' + row.original.uid}>
            <LinkDecorator>{getValue()}</LinkDecorator>
          </Link>
        )
      },
      {
        header: 'System Level',
        accessorKey: 'systemLevel',
        id: 'systemLevel'
      },
      {
        header: 'location',
        accessorFn: row => row.location?.name || ''
      }
    ],
    []
  )

  return columns
}
