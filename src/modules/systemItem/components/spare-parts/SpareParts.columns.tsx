import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { PATH } from '@/types/constants/paths'
import type { SystemInterfaceSparePartsRelationship } from '@/types/gql/graphql'

import { SparePartsActionsCell } from './SparePartsActionsCell'

export const useSparePartsColumns = () => {
  const columns = useMemo((): ColumnDef<
    SystemInterfaceSparePartsRelationship,
    string
  >[] => {
    const columns: ColumnDef<SystemInterfaceSparePartsRelationship, string>[] =
      [
        {
          id: 'icon',
          header: 'Icon',
          size: 20,
          cell: ({
            row: {
              original: {
                node: { physicalItem }
              }
            }
          }) => (
            <IconCell
              itemUsageUid={physicalItem?.itemUsage?.uid as ITEM_USAGE}
            />
          )
        },
        {
          id: 'name',
          header: 'System Name',
          accessorFn: row => row.node.name,
          cell: ({
            getValue,
            row: {
              original: {
                node: { parentPath, uid }
              }
            }
          }) => (
            <Tooltip
              content={parentPath?.map(v => v?.name).join(' > ')}
              placement="top"
            >
              <Link href={PATH.SYSTEM + '/' + uid}>
                <LinkDecorator>{getValue()}</LinkDecorator>
              </Link>
            </Tooltip>
          )
        },
        {
          header: 'location',
          id: 'location',
          accessorFn: row =>
            row.node.location?.name
              ? row.node.location?.name +
                ' - ' +
                (row.node.location?.code || '')
              : ''
        },
        {
          id: 'coverage',
          header: 'SP Coverage',
          meta: {
            className: 'text-right'
          },
          accessorFn: row => String(Number(row?.coverage).toFixed(2))
        },
        {
          id: 'partNumber',
          header: 'Part Number',
          accessorFn: row =>
            row?.node.physicalItem?.catalogueItem?.catalogueNumber as string
        },
        {
          id: 'eun',
          header: 'EUN',
          accessorFn: row => row?.node.physicalItem?.eun as string
        },
        {
          id: 'actions',
          header: 'Actions',
          size: 20,
          cell: SparePartsActionsCell
        }
      ]

    return columns
  }, [])

  return columns
}
