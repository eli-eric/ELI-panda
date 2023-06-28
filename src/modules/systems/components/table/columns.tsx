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
      { header: 'System Code', accessorKey: 'systemCode', id: 'systemCode', size: 150 },
      { header: 'System Alias', accessorKey: 'systemAlias', id: 'systemAlias', size: 150 },
      {
        header: 'System Type',
        accessorKey: 'systemType.name',
        id: 'systemType',
        size: 150
      },
      { header: 'Zone', accessorKey: 'zone.name', id: 'zone', size: 150 },
      {
        header: 'Location',
        accessorKey: 'location.name',
        id: 'location',
        size: 150
      },
      { header: 'Owner', accessorKey: 'owner.name', id: 'owner', size: 150 },
      { header: 'Description', accessorKey: 'description', id: 'description', size: 150 },
      { header: 'Responsible', accessorKey: 'responsible', id: 'responsible', size: 150 },
      { header: 'Importance', accessorKey: 'importance', id: 'importance', size: 150 },
      {
        header: 'Item Usage',
        accessorKey: 'physicalItem.itemUsage.name',
        id: 'itemUsage',
        size: 150
      },
      {
        header: 'Price',
        accessorKey: 'physicalItem.price',
        id: 'price',
        size: 150,
        cell: ({ getValue, row: { original } }) => (
          <span className="whitespace-nowrap">
            {getValue()} <span className="font-medium">{original.physicalItem?.currency}</span>
          </span>
        )
      },
      {
        header: 'Eun',
        accessorKey: 'physicalItem.eun',
        id: 'eun',
        size: 150
      },
      {
        header: 'Serial Number',
        accessorKey: 'physicalItem.serialNumber',
        id: 'serialNumber',
        size: 150
      },
      {
        header: 'Catalogue Name',
        accessorKey: 'physicalItem.catalogueItem.name',
        id: 'catalogueName',
        size: 150
      },
      {
        header: 'Part Number',
        accessorKey: 'physicalItem.catalogueItem.catalogueNumber',
        id: 'partNumber',
        size: 150
      },
      {
        header: 'Catalogue Description',
        accessorKey: 'physicalItem.catalogueItem.description',
        id: 'catalogueDescription',
        size: 150
      },
      {
        header: 'Catalogue Category',
        accessorKey: 'physicalItem.catalogueItem.category.name',
        id: 'catalogueCategory',
        size: 150
      },
      {
        header: 'Supplier',
        accessorKey: 'physicalItem.catalogueItem.supplier.name',
        id: 'supplier',
        size: 150
      }
    ],
    [setUid, canEdit, hideButtons]
  )

  return { columns, pending }
}
