import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'

export const useLeavesColumns = () => {
    const { formatMessage: fm } = useIntl()

    const columns = useMemo(
        (): ColumnDef<SystemLeaf>[] => [
            {
                header: fm({ id: message.systemHierarchy.columns.systemCode }),
                accessorKey: 'systemCode',
                id: 'systemCode',
                size: 160,
                enableSorting: true,
                cell: ({ row }) => (
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        {row.original.systemCode}
                    </code>
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
