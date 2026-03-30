import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import type { SystemLevel } from '@/types/gql/graphql'
import { getBadgeVariantBySystemLevel } from '@/utils/systemLevel'

import type { SystemLeaf } from '../../types'

export const useLeavesColumns = () => {
    const { formatMessage: fm } = useIntl()

    const columns = useMemo(
        (): ColumnDef<SystemLeaf>[] => [
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
                ),
            },
            {
                header: fm({ id: message.systemHierarchy.columns.systemCode }),
                accessorKey: 'systemCode',
                id: 'systemCode',
                size: 160,
                enableSorting: true,
                cell: ({ row }) => (
                    <Badge
                        variant="outline"
                        className={cn(
                            'text-xs',
                            getBadgeVariantBySystemLevel(
                                row.original.systemLevel as SystemLevel,
                            ),
                        )}
                    >
                        {row.original.systemCode}
                    </Badge>
                ),
            },
            {
                header: fm({ id: message.systemHierarchy.columns.systemPath }),
                accessorFn: row =>
                    row.parentPath?.map(p => p.name).join(' → '),
                id: 'systemPath',
                size: 300,
                cell: ({ row }) => {
                    const parentPath = row.original.parentPath
                    if (!parentPath?.length) return null
                    const fullPath = parentPath
                        .map(p => p.name)
                        .join(' → ')
                    return (
                        <Tooltip content={fullPath}>
                            <div className="flex items-center gap-1 overflow-hidden">
                                {parentPath.map((item, index) => (
                                    <Fragment key={item.uid}>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                'text-xs shrink-0 px-1.5 py-0',
                                                getBadgeVariantBySystemLevel(
                                                    item.systemLevel as SystemLevel,
                                                ),
                                            )}
                                        >
                                            {item.name}
                                        </Badge>
                                        {index < parentPath.length - 1 && (
                                            <span className="text-muted-foreground shrink-0">
                                                {fm({
                                                    id: message.common.system.arrow,
                                                })}
                                            </span>
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                        </Tooltip>
                    )
                },
            },
            {
                header: fm({ id: message.systemHierarchy.columns.name }),
                accessorKey: 'name',
                id: 'name',
                size: 250,
                enableSorting: true,
                cell: ({ row }) => (
                    <Tooltip content={row.original.name}>
                        <span className="truncate">{row.original.name}</span>
                    </Tooltip>
                ),
            },
            {
                header: fm({ id: message.systemHierarchy.columns.systemType }),
                accessorFn: row => row.systemType?.name,
                id: 'systemType',
                size: 150,
                cell: ({ row }) => row.original.systemType?.name ?? null,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.location }),
                accessorFn: row => row.location?.name,
                id: 'location',
                size: 180,
                cell: ({ row }) => {
                    const location = row.original.location
                    if (!location) return null
                    const displayText = location.code
                        ? `${location.name} (${location.code})`
                        : location.name
                    return (
                        <Tooltip content={displayText}>
                            <span className="truncate">{displayText}</span>
                        </Tooltip>
                    )
                },
            },
            {
                header: fm({ id: message.systemHierarchy.columns.zone }),
                accessorFn: row => row.zone?.name,
                id: 'zone',
                size: 120,
                cell: ({ row }) => {
                    const zone = row.original.zone
                    if (!zone) return null
                    return (
                        <Tooltip content={zone.name}>
                            <span>{zone.code || zone.name}</span>
                        </Tooltip>
                    )
                },
            },
            {
                header: fm({ id: message.systemHierarchy.columns.importance }),
                accessorFn: row => row.importance?.name,
                id: 'importance',
                size: 120,
                cell: ({ row }) => row.original.importance?.name ?? null,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.sparesIn }),
                accessorKey: 'sparesIn',
                id: 'sparesIn',
                size: 90,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.sparesOut }),
                accessorKey: 'sparesOut',
                id: 'sparesOut',
                size: 90,
            },
        ],
        [fm],
    )

    return { columns }
}
