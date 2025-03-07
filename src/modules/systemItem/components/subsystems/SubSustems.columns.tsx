import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { PATH } from '@/types/constants/paths'
import { cx } from '@/utils'

import type { TableSystem } from './types'

export const useSubSystemsColumns = () => {
  const columns = useMemo((): ColumnDef<TableSystem, any>[] => {
    const columns: ColumnDef<TableSystem, any>[] = [
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
          <Link href={PATH.SYSTEM + '/' + original.uid}>
            <LinkDecorator
              title={getValue()}
              className={cx(
                original?.statistics?.sp_coverage != null &&
                  original.statistics.sp_coverage < 1 &&
                  'text-red-500 dark:text-red-500',
                'truncate'
              )}
            >
              {getValue()}
            </LinkDecorator>
          </Link>
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
        accessorFn: ({ statistics }) =>
          statistics?.sp_coverage ? statistics.sp_coverage.toFixed(2) : '',
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
