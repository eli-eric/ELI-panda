import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { PATH } from '@/types/constants/paths'

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
          <Button
            variant={'link'}
            type="button"
            title={getValue()}
            size={'sm'}
            className={cn(
              original?.sp_coverage != null &&
                original.sp_coverage < 1 &&
                'text-red-500 dark:text-red-500',
              'text-inherit hover:underline h-4 font-sm cursor-pointer'
            )}
            asChild
          >
            <Link href={PATH.SYSTEM + '/' + original.uid}>{getValue()}</Link>
          </Button>
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
