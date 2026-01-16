import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'

import type { SystemCodeResult } from '../../types'

export const useSystemCodesColumns = () => {
  const { formatMessage: fm } = useIntl()

  const columns = useMemo(
    (): ColumnDef<SystemCodeResult>[] => [
      {
        header: fm({ id: message.controlSystems.columns.systemCode }),
        accessorKey: 'code',
        id: 'code',
        size: 150,
        enableSorting: true
      },
      {
        header: fm({ id: message.controlSystems.columns.name }),
        accessorKey: 'name',
        id: 'name',
        size: 300,
        enableSorting: true,
        cell: ({ row }) => (
          <Tooltip content={row.original.name}>
            <span className="truncate">{row.original.name}</span>
          </Tooltip>
        )
      },
      {
        header: fm({ id: message.controlSystems.columns.location }),
        accessorFn: row => row.location?.name,
        id: 'location',
        size: 200,
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
        }
      },
      {
        header: fm({ id: message.controlSystems.columns.zone }),
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
        }
      },
      {
        header: fm({ id: message.controlSystems.columns.updatedBy }),
        accessorKey: 'updatedBy',
        id: 'updatedBy',
        size: 250
      },
      {
        header: fm({ id: message.controlSystems.columns.createdBy }),
        accessorKey: 'createdBy',
        id: 'createdBy',
        size: 250
      }
    ],
    [fm]
  )

  return { columns }
}
