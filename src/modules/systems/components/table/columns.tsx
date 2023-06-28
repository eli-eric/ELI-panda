import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { useSubsystems } from '../../hooks/useSubsystems'
import type { SystemDetail } from '../../types/responses'
import { SystemNameCell } from './cells/SystemNameCell'

//TODO: fix typing
export const useSystemsColumns = (hideButtons?: boolean) => {
  const { setUid, pending } = useSubsystems()
  const canEdit = usePermission([ROLE.SYSTEM_EDIT])

  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        size: 300,
        cell: props => <SystemNameCell {...props} setUid={setUid} canEdit={canEdit} hideButtons={hideButtons} />
      },
      { header: 'systemCode', accessorKey: 'systemCode', id: 'systemCode', size: 150 },
      { header: 'systemAlias', accessorKey: 'systemAlias', id: 'systemAlias', size: 150 },
      {
        header: 'systemType',
        accessorKey: 'systemType',
        id: 'systemType',
        size: 150,
        cell: ({ getValue }) => getValue()?.name
      },
      { header: 'zone', accessorKey: 'zone', id: 'zone', size: 150, cell: ({ getValue }) => getValue()?.name },
      {
        header: 'location',
        accessorKey: 'location',
        id: 'location',
        size: 150,
        cell: ({ getValue }) => getValue()?.name
      },
      { header: 'owner', accessorKey: 'owner', id: 'owner', size: 150, cell: ({ getValue }) => getValue()?.name }
    ],
    [setUid, canEdit, hideButtons]
  )

  return { columns, pending }
}
