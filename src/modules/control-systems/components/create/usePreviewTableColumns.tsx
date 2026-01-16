import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'

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
        size: 100
      },
      {
        accessorKey: 'code',
        header: fm({ id: message.controlSystems.columns.systemCode }),
        cell: ({ getValue }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            {getValue<string>()}
          </code>
        ),
        size: 150
      },
      {
        accessorKey: 'name',
        header: fm({ id: message.controlSystems.columns.name }),
        size: 200
      },
      {
        accessorKey: 'zone',
        header: fm({ id: message.controlSystems.columns.zone }),
        cell: ({ row }) => row.original.zone?.name ?? '-',
        size: 150
      }
    ],
    [fm]
  )
}
