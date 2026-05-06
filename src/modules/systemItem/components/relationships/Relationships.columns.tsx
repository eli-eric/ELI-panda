import type { ColumnDef } from '@tanstack/react-table'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { DeleteRelationshipButton } from '@/modules/systemHierarchy/components/relationships/DeleteRelationshipButton.comp'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import { PATH } from '@/types/constants/paths'

import type { RelationshipTableRow } from './types'

export const useRelationshipsColumns = (canEdit: boolean, currentSystemUid: string | undefined) => {
    const { formatMessage: fm } = useIntl()

    return useMemo((): ColumnDef<RelationshipTableRow, any>[] => {
        const columns: ColumnDef<RelationshipTableRow, any>[] = [
            {
                id: 'icon',
                header: 'Icon',
                size: 20,
                cell: ({ row: { original } }) => <IconCell itemUsageUid={original.itemUsage} />,
            },
            {
                id: 'direction',
                header: 'Direction',
                size: 60,
                accessorKey: 'direction',
                cell: ({ row: { original } }) => {
                    const isInbound = original.direction === 'inbound'
                    const tooltipId = isInbound
                        ? message.systemHierarchy.relationships.inbound
                        : message.systemHierarchy.relationships.outbound
                    return (
                        <Tooltip content={fm({ id: tooltipId })}>
                            <span className="inline-flex">
                                {isInbound ? (
                                    <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                )}
                            </span>
                        </Tooltip>
                    )
                },
            },
            {
                id: 'relationship',
                header: 'Relationship',
                accessorKey: 'directionLabel',
                cell: ({ getValue, row: { original } }) => (
                    <span className="font-medium" style={{ color: original.color }}>
                        {getValue()}
                    </span>
                ),
            },
            {
                id: 'name',
                header: 'System Name',
                accessorFn: row => row.nodeName,
                cell: ({ getValue, row: { original } }) => (
                    <Button
                        variant="link"
                        type="button"
                        title={getValue()}
                        size="sm"
                        className="text-inherit hover:underline h-4 font-sm cursor-pointer p-0"
                        asChild
                    >
                        <Link href={PATH.SYSTEM + '/' + original.nodeUid}>{getValue()}</Link>
                    </Button>
                ),
            },
            {
                id: 'systemCode',
                header: 'System Code',
                accessorKey: 'nodeSystemCode',
            },
            {
                id: 'systemType',
                header: 'System Type',
                accessorKey: 'nodeSystemTypeName',
            },
        ]

        if (canEdit && currentSystemUid) {
            columns.push({
                id: 'actions',
                header: 'Actions',
                size: 40,
                enableSorting: false,
                meta: { className: 'text-right' },
                cell: ({ row: { original } }) => (
                    <DeleteRelationshipButton
                        currentSystemUid={currentSystemUid}
                        relatedSystemUid={original.nodeUid}
                        relationshipType={original.relationship}
                        direction={original.direction}
                    />
                ),
            })
        }

        return columns
    }, [fm, canEdit, currentSystemUid])
}
