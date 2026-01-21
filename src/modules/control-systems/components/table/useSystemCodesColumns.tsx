import type { ColumnDef, Row } from '@tanstack/react-table'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'
import { useSystemStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import { useSystemDelete } from '@/modules/systems/hooks/useSystemDelete'
import { PATH } from '@/types/constants/paths'
import type { SystemDetail } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'

import type { SystemCodeResult } from '../../types'

interface UseSystemCodesColumnsProps {
  queryKey: QueryFetcherKey
}

interface SystemCodeCellProps {
  row: Row<SystemCodeResult>
  queryKey: QueryFetcherKey
}

const SystemCodeCell = ({ row, queryKey }: SystemCodeCellProps) => {
  const { code, uid, name } = row.original
  const { setUID } = useSystemStore()
  const openEdit = useSystemEditSheet(uid)
  const { deleteSystem } = useSystemDelete({
    system: { uid, name } as SystemDetail,
    queryKey: queryKey.length === 2 ? queryKey : undefined
  })

  const handleCodeClick = () => {
    if (uid) {
      setUID(uid)
      openEdit()
    }
  }

  const codeElement = (
    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{code}</code>
  )

  return (
    <div className="flex w-full items-center justify-between">
      <Button variant="link" className="h-auto p-0" onClick={handleCodeClick}>
        {codeElement}
      </Button>

      {uid && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`${PATH.SYSTEM}/${uid}`}
                target="_blank"
                className="flex items-center cursor-pointer"
              >
                <Edit className="h-4 w-4 mr-2" />
                <FormattedMessage
                  id={message.systemsPage.systemActions.viewDetail}
                />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteSystem()}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <FormattedMessage
                id={message.systemsPage.systemActions.deleteSystem}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export const useSystemCodesColumns = ({ queryKey }: UseSystemCodesColumnsProps) => {
  const { formatMessage: fm } = useIntl()

  const columns = useMemo(
    (): ColumnDef<SystemCodeResult>[] => [
      {
        header: fm({ id: message.controlSystems.columns.systemCode }),
        accessorKey: 'code',
        id: 'code',
        size: 200,
        enableSorting: true,
        cell: ({ row }) => <SystemCodeCell row={row} queryKey={queryKey} />
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
    [fm, queryKey]
  )

  return { columns }
}
