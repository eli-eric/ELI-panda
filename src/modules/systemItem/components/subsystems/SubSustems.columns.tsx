import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { PATH } from '@/types/constants/paths'
import type { System } from '@/types/gql/graphql'
import { cx } from '@/utils'

export const useSubSystemsColumns = () => {
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
              <LinkDecorator
                className={cx(
                  original?.sp_coverage != null &&
                    original.sp_coverage < 1 &&
                    'text-red-500 dark:text-red-500'
                )}
              >
                {getValue()}
              </LinkDecorator>
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
      },
      {
        header: 'SP Coverage',
        id: 'sp_coverage',
        accessorFn: ({ sp_coverage }) =>
          sp_coverage ? sp_coverage.toFixed(2) : '',
        meta: {
          className: 'text-right'
        }
      },
      {
        header: 'SP Count',
        accessorKey: 'minimalSpareParstCount',
        id: 'minimalSpareParstCount',
        meta: {
          className: 'text-right'
        }
      }
    ]

    return columns
  }, [])

  return columns
}
