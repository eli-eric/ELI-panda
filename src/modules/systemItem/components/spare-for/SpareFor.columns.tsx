import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { PATH } from '@/types/constants/paths'
import type { System } from '@/types/gql/graphql'

export const useSpareForColumns = (tableId?: string) => {
  const columns = useMemo((): ColumnDef<System, string>[] => {
    const columns: ColumnDef<System, string>[] = [
      {
        id: 'icon',
        size: 20,
        header: 'Icon',
        cell: ({
          row: {
            original: { physicalItem }
          }
        }) => (
          <IconCell itemUsageUid={physicalItem?.itemUsage?.uid as ITEM_USAGE} />
        )
      },
      {
        header: 'System Name',
        accessorKey: 'name',
        id: 'name',
        cell: ({ getValue, row: { original } }) => (
          <Tooltip
            content={original.parentPath?.map(v => v?.name).join(' > ')}
            placement="top"
          >
            <Link href={PATH.SYSTEM + '/' + original.uid}>
              <LinkDecorator>{getValue()}</LinkDecorator>
            </Link>
          </Tooltip>
        )
      },
      {
        header: 'location',
        accessorFn: row =>
          row.location?.name
            ? row.location?.name + ' - ' + (row.location?.code || '')
            : ''
      }
    ]
    if (tableId === 'spareParts') {
      columns.push({
        header: 'EUN',
        accessorFn: row => row?.physicalItem?.eun as string,
        id: 'eun'
      })
    }
    if (tableId === 'sparePartFor') {
      columns.push({
        header: 'Part Number',
        accessorFn: row =>
          row?.physicalItem?.catalogueItem.catalogueNumber || '',
        id: 'partNumber'
      })
    }

    return columns
  }, [tableId])

  return columns
}
