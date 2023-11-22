import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { Badge } from '@/components/visuals/Badge'
import type { User } from '@/types/gql/graphql'

import { UserNameCell } from './UserNameCell'

export const useRoomCardsColumns = () => {
  const columns = useMemo(
    (): ColumnDef<User, any>[] => [
      {
        header: 'User Name',
        accessorFn: row => row?.username,
        cell: UserNameCell,
        id: 'username',
        size: 300,
        meta: { sticky: true }
      },
      {
        header: 'Facility',
        accessorFn: row => row?.facility?.name,
        id: 'facility',
        size: 200
      },
      {
        header: 'First Name',
        accessorFn: row => row?.firstName,
        id: 'firstName',
        size: 100
      },
      {
        header: 'Last Name',
        accessorFn: row => row?.lastName,
        id: 'lastName',
        size: 100
      },
      {
        header: 'Is enabled',
        accessorFn: row => row?.isEnabled,
        id: 'isEnabled'
      },
      {
        header: 'Roles',
        accessorFn: row => row?.roles,
        id: 'roles',
        cell: ({ getValue }) => <div>{getValue()?.map(role => <Badge key={role.uid}>{role.code}</Badge>)}</div>,
        size: 500
      },
      {
        header: 'uid',
        accessorFn: row => row?.uid,
        id: 'purityClass'
      }
    ],
    []
  )

  return columns
}
