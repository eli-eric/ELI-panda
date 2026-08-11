import type { ColumnDef } from '@tanstack/react-table'
import { Info } from 'lucide-react'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { NewTabLink } from '@/components/decorators'
import { Tooltip } from '@/components/Tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { formatCoverage } from '@/modules/shared/system/coverage'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { FALLBACK_IMAGE } from '@/types/constants/common'
import { PATH } from '@/types/constants/paths'
import type { SystemLevel } from '@/types/gql/graphql'
import { truncateString } from '@/utils'
import { getBadgeVariantBySystemLevel } from '@/utils/systemLevel'

import type { SystemLeaf } from '../../types'
import { getPathBelow } from '../../utils/relativePath'

interface UseLeavesColumnsArgs {
    /** Node currently selected in the tree — the point the System Path column is relative to. */
    parentUid?: string | null
    parentName?: string | null
    parentSystemLevel?: string | null
}

export const useLeavesColumns = ({
    parentUid,
    parentName,
    parentSystemLevel,
}: UseLeavesColumnsArgs = {}) => {
    const { formatMessage: fm } = useIntl()

    const columns = useMemo(
        (): ColumnDef<SystemLeaf, any>[] => [
            {
                id: 'miniImageUrl',
                header: '',
                size: 57,
                meta: { sticky: true },
                accessorFn: row => row.miniImageUrl?.[0],
                cell: ({ getValue, row: { original } }) => (
                    <Avatar className="w-7 h-7 min-w-7">
                        <AvatarImage src={getValue() || FALLBACK_IMAGE.url} alt={original.name} />
                        <AvatarFallback>{original.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                ),
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
                ),
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
                            getBadgeVariantBySystemLevel(row.original.systemLevel as SystemLevel),
                        )}
                    >
                        {row.original.systemCode}
                    </Badge>
                ),
            },
            {
                header: fm({ id: message.systemHierarchy.columns.systemPath }),
                // Mirrors the cell: the visible text is the segment below the selected
                // node, falling back to that node's own name when nothing sits between.
                accessorFn: row => {
                    const below = getPathBelow(row.parentPath, parentUid)
                    return below.length
                        ? below.map(p => p.name).join(' → ')
                        : (parentName ?? undefined)
                },
                id: 'systemPath',
                size: 300,
                cell: ({ row }) => {
                    const parentPath = row.original.parentPath
                    if (!parentPath?.length) return null

                    // Tooltip keeps the absolute path, so trimming the cell hides nothing.
                    const fullPath = parentPath.map(p => p.name).join(' → ')
                    const below = getPathBelow(parentPath, parentUid)

                    // Nothing between the selected node and this system. Naming the node
                    // reads as "hangs right here" and keeps the column a constant width;
                    // while the parent detail is still loading there is no name to show yet.
                    const segments = below.length
                        ? below
                        : parentName
                          ? [
                                {
                                    uid: parentUid ?? 'selected-parent',
                                    name: parentName,
                                    systemLevel: parentSystemLevel,
                                },
                            ]
                          : []
                    if (!segments.length) return null

                    return (
                        <Tooltip content={fullPath}>
                            <div className="flex items-center gap-1 overflow-hidden">
                                {segments.map((item, index) => (
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
                                        {index < segments.length - 1 && (
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
                header: fm({ id: message.systemHierarchy.columns.systemType }),
                accessorFn: row => row.systemType?.name,
                id: 'systemType',
                size: 150,
                cell: ({ row }) => row.original.systemType?.name ?? null,
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
                header: fm({ id: message.systemHierarchy.columns.responsible }),
                accessorFn: row => row.responsible?.name,
                id: 'responsible',
                size: 150,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.description }),
                accessorFn: row => row.description,
                id: 'description',
                size: 150,
                cell: ({ getValue }) => (
                    <Fragment>
                        {getValue() && (
                            <Tooltip content={getValue()}>
                                <Info className="h-5 w-5 shrink-0" />
                            </Tooltip>
                        )}
                    </Fragment>
                ),
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
            {
                header: fm({ id: message.systemHierarchy.columns.subsystemsCount }),
                accessorFn: row => row.statistics?.subsystemsCount,
                id: 'statistics.subsystemsCount',
                size: 200,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.spRequirement }),
                accessorFn: row => row.statistics?.minimalSpareParstCount,
                id: 'statistics.minimalSpareParstCount',
                size: 200,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.spCoverage }),
                accessorFn: row => formatCoverage(row.statistics?.sp_coverage) ?? undefined,
                id: 'statistics.sp_coverage',
                size: 200,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.price }),
                accessorFn: row => row.physicalItem?.price,
                id: 'physicalItem.price',
                size: 150,
                meta: { className: 'text-right' },
                cell: ({ getValue, row: { original } }) => (
                    <span className="whitespace-nowrap">
                        {getValue()}{' '}
                        <span className="font-medium">{original.physicalItem?.currency}</span>
                    </span>
                ),
            },
            {
                header: fm({ id: message.systemHierarchy.columns.eun }),
                accessorFn: row => row.physicalItem?.eun,
                id: 'physicalItem.eun',
                size: 150,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.serialNumber }),
                accessorFn: row => row.physicalItem?.serialNumber,
                id: 'physicalItem.serialNumber',
                size: 150,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.catalogueName }),
                accessorFn: row => row.physicalItem?.catalogueItem?.name,
                id: 'physicalItem.catalogueItem.name',
                size: 300,
                cell: ({ getValue, row: { original } }) => {
                    const catalogueUid = original.physicalItem?.catalogueItem?.uid
                    if (!getValue() || !catalogueUid) return null
                    return (
                        <Tooltip content={getValue()}>
                            <div>
                                <NewTabLink
                                    href={PATH.CATALOGUE_ITEM + '/' + catalogueUid}
                                    value={truncateString(getValue(), 30)}
                                />
                            </div>
                        </Tooltip>
                    )
                },
            },
            {
                header: fm({ id: message.systemHierarchy.columns.partNumber }),
                accessorFn: row => row.physicalItem?.catalogueItem?.catalogueNumber,
                id: 'physicalItem.catalogueItem.partNumber',
                size: 200,
            },
            {
                header: fm({ id: message.systemHierarchy.columns.catalogueDescription }),
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
                ),
            },
            {
                header: fm({ id: message.systemHierarchy.columns.catalogueCategory }),
                accessorFn: row => row.physicalItem?.catalogueItem?.category?.name,
                id: 'physicalItem.catalogueItem.category',
                size: 170,
                cell: ({ getValue }) => (
                    <Tooltip content={getValue()}>
                        <div>{truncateString(getValue(), 17)}</div>
                    </Tooltip>
                ),
            },
            {
                header: fm({ id: message.systemHierarchy.columns.supplier }),
                accessorFn: row => row.physicalItem?.catalogueItem?.supplier?.name,
                id: 'physicalItem.catalogueItem.supplier',
                size: 200,
                cell: ({ getValue }) => (
                    <Tooltip content={getValue()}>
                        <div>{truncateString(getValue(), 17)}</div>
                    </Tooltip>
                ),
            },
            {
                header: fm({ id: message.systemHierarchy.columns.orderNumber }),
                accessorFn: row => row.physicalItem?.orderUid,
                id: 'physicalItem.orderNumber',
                size: 150,
                cell: ({ getValue, row: { original } }) => {
                    if (!getValue()) return null
                    return (
                        <NewTabLink
                            href={PATH.ORDER + '/' + getValue()}
                            value={
                                original.physicalItem?.orderNumber ||
                                fm({ id: message.systemHierarchy.columns.orderLink })
                            }
                        />
                    )
                },
            },
        ],
        [fm, parentUid, parentName, parentSystemLevel],
    )

    return { columns }
}
