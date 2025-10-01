import type { ColumnDef } from '@tanstack/react-table'
import { Info } from 'lucide-react'
import Image from 'next/image'
import { Fragment, useMemo } from 'react'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import usePermission from '@/hooks/usePermission'
import { useShowDeviceStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { FALLBACK_IMAGE } from '@/types/constants/common'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { SystemDetail } from '@/types/responses/systems'
import { truncateString } from '@/utils'

import { useSubsystems } from '../../hooks/useSubsystems'
import { useSystems } from '../../hooks/useSystems'
import type { ITEM_USAGE } from '../../types/constants'
import { IconCell } from './cells/IconCell'
// eslint-disable-next-line
import { SystemNameCell } from './cells/SystemNameCell'

interface SystemsColumnsProps {
  tableId: string
  hideButtons?: boolean
  enableDragAndDrop?: boolean
}

export const useSystemsColumns = ({
  tableId,
  hideButtons,
  enableDragAndDrop
}: SystemsColumnsProps) => {
  const { setUid, pending } = useSubsystems(tableId)
  const canEdit = usePermission([ROLE.SYSTEM_EDIT])
  const { queryKey } = useSystems(tableId)
  const { setUID, setOpenDeviceInfo } = useShowDeviceStore()

  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        id: 'miniImageUrl',
        size: 57,
        header: '',
        meta: {
          sticky: true
        },
        accessorFn: row => row?.miniImageUrl?.[0],
        cell: ({ getValue, row: { original } }) => {
          return (
            <Tooltip content="Show device info">
              <button
                onClick={() => {
                  if (tableId === 'systems') {
                    setUID(original.uid)
                    setOpenDeviceInfo(true)
                  }
                }}
                className={`group ${
                  tableId === 'systems' ? 'cursor-pointer' : 'cursor-default'
                }`}
                disabled={tableId !== 'systems'}
              >
                <Image
                  src={getValue() || FALLBACK_IMAGE.url}
                  unoptimized
                  alt="img"
                  width={50}
                  height={50}
                  className={`rounded-full w-7 h-7 min-w-8 object-cover justify-center transition-all duration-200 ${
                    tableId === 'systems'
                      ? 'hover:scale-110 group-hover:shadow-lg hover:outline hover:outline-link/60 hover:outline-offset-1'
                      : ''
                  }`}
                />
              </button>
            </Tooltip>
          )
        }
      },
      {
        id: 'icon',
        header: '',
        size: 41,
        meta: { sticky: true },
        cell: ({ row: { original } }) => (
          <div>
            <IconCell
              itemUsageUid={original.physicalItem?.itemUsage?.uid as ITEM_USAGE}
            />
          </div>
        )
      },
      {
        header: 'Name',
        accessorFn: row => row.name,
        id: 'name',
        size: tableId === 'systemsItem' ? 400 : 480,
        meta: tableId === 'systemsItem' ? { sticky: true } : { sticky: true },
        enableHiding: false,
        cell: props => (
          <SystemNameCell
            {...props}
            setUid={setUid}
            canEdit={canEdit}
            queryKey={queryKey}
            hideButtons={hideButtons}
            tableId={tableId}
            enableDragAndDrop={enableDragAndDrop}
          />
        )
      },
      {
        header: 'System Code',
        accessorFn: row => row.systemCode,
        id: 'systemCode',
        size: 150
      },
      {
        header: 'System Type',
        accessorFn: row => row.systemType?.name,
        id: 'systemType',
        size: 240
      },
      {
        header: 'CS Zone',
        accessorFn: row => row.zone,
        id: 'zone',
        size: 120,
        meta: { className: 'text-right' },
        cell: ({ getValue }) => {
          const value = getValue()
          return (
            value && (
              <div className="flex justify-end">
                <Tooltip content={value?.name}>
                  <p>{value?.code}</p>
                </Tooltip>
              </div>
            )
          )
        }
      },
      {
        header: 'Location',
        accessorFn: row => {
          return row.location
            ? row.location.name +
                (row.location.code ? ' (' + row.location.code + ')' : '')
            : ''
        },
        id: 'location',
        size: 150
      },
      {
        header: 'Responsible',
        accessorFn: row => row.responsible?.name,
        id: 'responsible',
        size: 150
      },
      {
        header: 'Description',
        accessorFn: row => row.description,
        id: 'description',
        size: 150,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <Info className="h-5 w-5 pr- shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        )
      },
      {
        header: 'Importance',
        accessorFn: row => row.importance?.name,
        id: 'importance',
        size: 150
      },
      {
        header: 'Sub Systems Count',
        accessorFn: row => row.statistics?.subsystemsCount,
        id: 'statistics.subsystemsCount',
        size: 200
      },
      {
        header: 'SP Requirement',
        accessorFn: row => row.statistics?.minimalSpareParstCount,
        id: 'statistics.minimalSpareParstCount',
        size: 200
      },
      {
        header: 'SP Coverage',
        accessorFn: row =>
          row.statistics?.sp_coverage &&
          (
            parseFloat(Number(row.statistics?.sp_coverage).toFixed(2)) * 100
          ).toString() + '%',
        id: 'statistics.sp_coverage',
        size: 200
      },
      {
        header: 'Price',
        accessorFn: row => row.physicalItem?.price,
        id: 'physicalItem.price',
        size: 150,
        meta: { className: 'text-right' },
        cell: ({ getValue, row: { original } }) => (
          <span className="whitespace-nowrap">
            {getValue()}{' '}
            <span className="font-medium">
              {original.physicalItem?.currency}
            </span>
          </span>
        )
      },
      {
        header: 'Eun',
        accessorFn: row => row.physicalItem?.eun,
        id: 'physicalItem.eun',
        size: 150
      },
      {
        header: 'Serial Number',
        accessorFn: row => row.physicalItem?.serialNumber,
        id: 'physicalItem.serialNumber',
        size: 150
      },
      {
        header: 'Catalogue Name',
        accessorFn: row => row.physicalItem?.catalogueItem?.name,
        id: 'physicalItem.catalogueItem.name',
        size: 300,
        cell: ({ getValue, row: { original } }) => (
          <Tooltip content={getValue()}>
            <div>
              <NewTabLink
                href={
                  PATH.CATALOGUE_ITEM +
                  '/' +
                  original.physicalItem?.catalogueItem?.uid
                }
                value={truncateString(getValue(), 30)}
              />
            </div>
          </Tooltip>
        )
      },
      {
        header: 'Part Number',
        accessorFn: row => row.physicalItem?.catalogueItem?.catalogueNumber,
        id: 'physicalItem.catalogueItem.partNumber',
        size: 200
      },
      {
        header: 'Catalogue Description',
        accessorFn: row => row.physicalItem?.catalogueItem?.description,
        id: 'physicalItem.catalogueItem.description',
        size: 200,
        cell: ({ getValue }) => (
          <Fragment>
            {getValue() && (
              <Tooltip content={getValue()}>
                <Info className="h-6 w-6 shrink-0" />
              </Tooltip>
            )}
          </Fragment>
        )
      },
      {
        header: 'Catalogue Category',
        accessorFn: row => row.physicalItem?.catalogueItem?.category?.name,
        id: 'physicalItem.catalogueItem.category',
        cell: ({ getValue }) => (
          <Tooltip content={getValue()}>
            <div>{truncateString(getValue(), 17)}</div>
          </Tooltip>
        ),
        size: 170
      },
      {
        header: 'Supplier',
        accessorFn: row => row.physicalItem?.catalogueItem?.supplier?.name,
        id: 'physicalItem.catalogueItem.supplier',
        cell: ({ getValue }) => (
          <Tooltip content={getValue()}>
            <div>{truncateString(getValue(), 17)}</div>
          </Tooltip>
        ),
        size: 200
      },
      {
        header: 'Order Number',
        accessorFn: row => row.physicalItem?.orderUid,
        cell: ({ getValue, row: { original } }) => {
          if (!getValue()) return null
          return (
            <NewTabLink
              href={PATH.ORDER + '/' + getValue()}
              value={original.physicalItem?.orderNumber || 'Order ->'}
            />
          )
        },
        id: 'physicalItem.orderNumber',
        size: 150
      }
    ],
    [
      setUid,
      canEdit,
      hideButtons,
      tableId,
      enableDragAndDrop,
      queryKey,
      setUID,
      setOpenDeviceInfo
    ]
  )

  return { columns, pending }
}
