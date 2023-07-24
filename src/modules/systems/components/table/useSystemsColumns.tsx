import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'

import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { useSubsystems } from '../../hooks/useSubsystems'
import type { SystemDetail } from '../../types/responses'
// eslint-disable-next-line
import { SystemNameCell } from './cells/SystemNameCell'

//TODO: fix typing
export const useSystemsColumns = ({ tableId, hideButtons }: { tableId: string; hideButtons?: boolean }) => {
  const { setUid, pending } = useSubsystems(tableId)
  const canEdit = usePermission([ROLE.SYSTEM_EDIT])

  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        header: 'Name',
        accessorFn: row => row.name,
        id: 'name',
        size: 400,
        meta: { sticky: true },
        enableHiding: false,
        cell: props => (
          <SystemNameCell {...props} setUid={setUid} canEdit={canEdit} hideButtons={hideButtons} tableId={tableId} />
        )
      },
      { header: 'System Code', accessorFn: row => row.systemCode, id: 'systemCode', size: 150 },
      { header: 'System Alias', accessorFn: row => row.systemAlias, id: 'systemAlias', size: 150 },
      {
        header: 'System Type',
        accessorFn: row => row.systemType?.name,
        id: 'systemType',
        size: 150
      },
      { header: 'Zone', accessorFn: row => row.zone?.name, id: 'zone', size: 150 },
      {
        header: 'Location',
        accessorFn: row => row.location?.name,
        id: 'location',
        size: 150
      },
      { header: 'Owner', accessorFn: row => row.owner?.name, id: 'owner', size: 150 },
      {
        header: 'Description',
        accessorFn: row => row.description,
        id: 'description',
        size: 150,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <InformationCircleIcon
                className="h-6 w-6 flex-shrink-0"
                data-tooltip-id="tooltip"
                data-tooltip-content={getValue()}
              />
            )}
          </Fragment>
        )
      },
      { header: 'Responsible', accessorFn: row => row.responsible?.name, id: 'responsible', size: 150 },
      { header: 'Importance', accessorFn: row => row.importance?.name, id: 'importance', size: 150 },
      {
        header: 'Sub Systems Count',
        accessorFn: row => row.statistics?.subsystemsCount,
        id: 'subsystemsCount',
        size: 200
      },
      {
        header: 'Spare Parts Count',
        accessorFn: row => row.statistics?.sparePartsCount,
        id: 'sparePartsCount',
        size: 200
      },

      {
        header: 'Item Usage',
        accessorFn: row => row.physicalItem?.itemUsage?.name,
        id: 'itemUsage',
        size: 150
      },
      {
        header: 'Price',
        accessorFn: row => row.physicalItem?.price,
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
        accessorFn: row => row.physicalItem?.eun,
        id: 'eun',
        size: 150
      },
      {
        header: 'Serial Number',
        accessorFn: row => row.physicalItem?.serialNumber,
        id: 'serialNumber',
        size: 150
      },
      {
        header: 'Catalogue Name',
        accessorFn: row => row.physicalItem?.catalogueItem?.name,
        id: 'catalogueName',
        size: 150
      },
      {
        header: 'Part Number',
        accessorFn: row => row.physicalItem?.catalogueItem?.catalogueNumber,
        id: 'partNumber',
        size: 150
      },
      {
        header: 'Catalogue Description',
        accessorFn: row => row.physicalItem?.catalogueItem?.description,
        id: 'catalogueDescription',
        size: 200,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <InformationCircleIcon
                className="h-6 w-6 flex-shrink-0"
                data-tooltip-id="tooltip"
                data-tooltip-content={getValue()}
              />
            )}
          </Fragment>
        )
      },
      {
        header: 'Catalogue Category',
        accessorFn: row => row.physicalItem?.catalogueItem?.category?.name,
        id: 'catalogueCategory',
        size: 170
      },
      {
        header: 'Supplier',
        accessorFn: row => row.physicalItem?.catalogueItem?.supplier,
        id: 'supplier',
        size: 150
      }
    ],
    [setUid, canEdit, hideButtons, tableId]
  )

  const columnsForAssign = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        header: 'Name',
        accessorFn: row => row.name,
        id: 'name',
        size: 400,
        cell: props => (
          <SystemNameCell {...props} setUid={setUid} canEdit={canEdit} hideButtons={hideButtons} tableId={tableId} />
        )
      },
      {
        header: 'Catalogue Name',
        accessorFn: row => row.physicalItem?.catalogueItem?.name,
        id: 'catalogueName',
        size: 150
      },
      {
        header: 'Catalogue Category',
        accessorFn: row => row.physicalItem?.catalogueItem?.category?.name,
        id: 'catalogueCategory',
        size: 170
      },
      {
        header: 'Supplier',
        accessorFn: row => row.physicalItem?.catalogueItem?.supplier,
        id: 'supplier',
        size: 150
      },
      {
        header: 'Part Number',
        accessorFn: row => row.physicalItem?.catalogueItem?.catalogueNumber,
        id: 'partNumber',
        size: 150
      },
      {
        header: 'Serial Number',
        accessorFn: row => row.physicalItem?.serialNumber,
        id: 'serialNumber',
        size: 150
      },
      {
        header: 'Eun',
        accessorFn: row => row.physicalItem?.eun,
        id: 'eun',
        size: 150
      },
      {
        header: 'Item Usage',
        accessorFn: row => row.physicalItem?.itemUsage?.name,
        id: 'itemUsage',
        size: 150
      },
      {
        header: 'Price',
        accessorFn: row => row.physicalItem?.price,
        id: 'price',
        size: 150,
        cell: ({ getValue, row: { original } }) => (
          <span className="whitespace-nowrap">
            {getValue()} <span className="font-medium">{original.physicalItem?.currency}</span>
          </span>
        )
      },
      {
        header: 'Catalogue Description',
        accessorFn: row => row.physicalItem?.catalogueItem?.description,
        id: 'catalogueDescription',
        size: 200,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <InformationCircleIcon
                className="h-6 w-6 flex-shrink-0"
                data-tooltip-id="tooltip"
                data-tooltip-content={getValue()}
              />
            )}
          </Fragment>
        )
      },
      { header: 'System Code', accessorFn: row => row.systemCode, id: 'systemCode', size: 150 },
      { header: 'System Alias', accessorFn: row => row.systemAlias, id: 'systemAlias', size: 150 },
      {
        header: 'System Type',
        accessorFn: row => row.systemType?.name,
        id: 'systemType',
        size: 150
      },
      { header: 'Zone', accessorFn: row => row.zone?.name, id: 'zone', size: 150 },
      {
        header: 'Location',
        accessorFn: row => row.location?.name,
        id: 'location',
        size: 150
      },
      { header: 'Owner', accessorFn: row => row.owner?.name, id: 'owner', size: 150 },
      {
        header: 'Description',
        accessorFn: row => row.description,
        id: 'description',
        size: 150,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <InformationCircleIcon
                className="h-6 w-6 flex-shrink-0"
                data-tooltip-id="tooltip"
                data-tooltip-content={getValue()}
              />
            )}
          </Fragment>
        )
      },
      { header: 'Responsible', accessorFn: row => row.responsible?.name, id: 'responsible', size: 150 },
      { header: 'Importance', accessorFn: row => row.importance?.name, id: 'importance', size: 150 },
      {
        header: 'Sub Systems Count',
        accessorFn: row => row.statistics?.subsystemsCount,
        id: 'subsystemsCount',
        size: 200
      },
      {
        header: 'Spare Parts Count',
        accessorFn: row => row.statistics?.sparePartsCount,
        id: 'sparePartsCount',
        size: 200
      }
    ],
    [setUid, canEdit, hideButtons, tableId]
  )

  return { columns: tableId === 'systems' ? columns : columnsForAssign, pending }
}
