import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { SystemPathTooltip } from '@/components/system/SystemPathTooltip.comp'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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
                        original: { physicalItem },
                    },
                }) => <IconCell itemUsageUid={physicalItem?.itemUsage?.uid as ITEM_USAGE} />,
            },
            {
                header: 'System Name',
                accessorKey: 'name',
                id: 'name',
                cell: ({ getValue, row: { original } }) => (
                    <SystemPathTooltip parentPath={original.parentPath}>
                        <Button
                            variant={'link'}
                            title={getValue()}
                            size={'sm'}
                            className={cn(
                                original?.sp_coverage != null &&
                                    original.sp_coverage < 1 &&
                                    'text-red-500 dark:text-red-500',
                                'text-inherit hover:underline h-4 font-sm cursor-pointer',
                            )}
                            asChild
                        >
                            <Link href={PATH.SYSTEM + '/' + original.uid}>{getValue()}</Link>
                        </Button>
                    </SystemPathTooltip>
                ),
            },
            {
                header: 'System Code',
                accessorKey: 'systemCode',
                id: 'systemCode',
            },
            {
                header: 'location',
                accessorFn: row =>
                    row.location?.name
                        ? row.location?.name + ' - ' + (row.location?.code || '')
                        : '',
            },
        ]
        if (tableId === 'spareParts') {
            columns.push({
                header: 'EUN',
                accessorFn: row => row?.physicalItem?.eun as string,
                id: 'eun',
            })
        }
        if (tableId === 'sparePartFor') {
            columns.push({
                header: 'Part Number',
                accessorFn: row => row?.physicalItem?.catalogueItem.catalogueNumber || '',
                id: 'partNumber',
            })
        }

        return columns
    }, [tableId])

    return columns
}
