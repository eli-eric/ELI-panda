import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

import type { SystemCodeResult } from '../../types'

export type PreviewRow = SystemCodeResult & {
    isPreview: boolean
}

export const usePreviewTableColumns = () => {
    const { formatMessage: fm } = useIntl()

    return useMemo<ColumnDef<PreviewRow>[]>(
        () => [
            {
                accessorKey: 'status',
                header: fm({ id: message.controlSystems.columns.status }),
                cell: ({ row }) => (
                    <Badge variant={row.original.isPreview ? 'secondary' : 'default'}>
                        {row.original.isPreview
                            ? fm({ id: message.controlSystems.preview.badge })
                            : fm({ id: message.controlSystems.preview.createdBadge })}
                    </Badge>
                ),
                size: 100,
            },
            {
                accessorKey: 'code',
                header: fm({ id: message.controlSystems.columns.systemCode }),
                cell: ({ row, getValue }) => {
                    const code = getValue<string>()
                    const uid = row.original.uid

                    const codeElement = (
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{code}</code>
                    )

                    if (uid) {
                        return (
                            <Button variant="link" className="h-auto p-0" asChild>
                                <Link href={`${PATH.SYSTEM}/${uid}`} target="_blank">
                                    {codeElement}
                                </Link>
                            </Button>
                        )
                    }

                    return codeElement
                },
                size: 150,
            },
            {
                accessorKey: 'name',
                header: fm({ id: message.controlSystems.columns.name }),
                size: 200,
            },
            {
                accessorKey: 'zone',
                header: fm({ id: message.controlSystems.columns.zone }),
                cell: ({ row }) => row.original.zone?.name ?? '-',
                size: 150,
            },
            {
                id: 'parentPath',
                header: fm({ id: message.controlSystems.columns.parentPath }),
                accessorFn: row => row.parentPath?.map(item => item.name).join(' / ') ?? '',
                cell: ({ row }) => {
                    const parentPath = row.original.parentPath
                    if (!parentPath || parentPath.length === 0) return null
                    const fullPath = parentPath.map(item => item.name).join(' / ')
                    return (
                        <Tooltip content={fullPath}>
                            <span className="block truncate">{fullPath}</span>
                        </Tooltip>
                    )
                },
                size: 250,
            },
        ],
        [fm],
    )
}
