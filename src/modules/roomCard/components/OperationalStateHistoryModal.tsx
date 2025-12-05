import type { ColumnDef } from '@tanstack/react-table'
import type { FC } from 'react'
import { useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'

import {
  type ParsedHistoryItem,
  useOperationalStateHistory
} from '../hooks/useOperationalStateHistory'
import { formatDateTime } from '../utils'

const messages = message.roomCardsPage.operationalStateHistory

type HistoryItem = ParsedHistoryItem

interface Props {
  title?: string
  roomCardUid?: string
  onClose?: () => void
}

export const OperationalStateHistoryModal: FC<Props> = ({
  roomCardUid,
  onClose
}) => {
  const { formatMessage: fm } = useIntl()
  const { history, loading } = useOperationalStateHistory(roomCardUid)

  const columns: ColumnDef<HistoryItem, any>[] = useMemo(
    () => [
      {
        id: 'changedAt',
        accessorKey: 'changedAt',
        header: fm({ id: messages.dateTime }),
        size: 200,
        cell: ({ getValue }) => formatDateTime(getValue() as string)
      },
      {
        id: 'previousState',
        accessorKey: 'previousState',
        header: fm({ id: messages.previousState }),
        size: 200,
        cell: ({ getValue }) => getValue() || '-'
      },
      {
        id: 'newState',
        accessorKey: 'newState',
        header: fm({ id: messages.newState }),
        size: 200,
        cell: ({ getValue }) => getValue() || '-'
      },
      {
        id: 'changedBy',
        accessorFn: row => `${row.changedBy.firstName} ${row.changedBy.lastName}`,
        header: fm({ id: messages.changedBy }),
        size: 200
      }
    ],
    [fm]
  )

  const table = usePandaTable({
    tableId: 'operational-state-history',
    columns,
    data: history || [],
    settings: {
      enableSorting: false,
      enableQueryURL: false,
      enableColumnHiding: false,
      enableColumnReordering: false,
      manualSorting: false
    }
  })

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex-1 overflow-hidden">
        {history.length === 0 && !loading ? (
          <div className="text-center py-8 text-gray-500">
            <FormattedMessage id={messages.noHistory} />
          </div>
        ) : (
          <PandaTableV2
            table={table}
            loading={loading}
            tableId="operational-state-history"
            data={history}
            skeletonRowCount={5}
            className="relative overflow-y-scroll scrollbar-style"
            settings={{
              enableQueryURL: false,
              enableColumnHiding: false,
              enableColumnReordering: false,
              enableSorting: false,
              manualSorting: false
            }}
          />
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose} variant="outline">
          <FormattedMessage id={messages.close} />
        </Button>
      </div>
    </div>
  )
}
