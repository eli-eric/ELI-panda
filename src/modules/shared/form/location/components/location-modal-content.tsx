import { type ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ExpandableNameCell } from '@/components/form/shared/ExpandableNameCell'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
import useTableStateStore from '@/store/useTableStateStore'
import type { CodebookType } from '@/types/responses/codebook'
import { highlightText } from '@/utils'

import { useLocationModal } from '../hooks/useLocationModal'

const messages = message.common.buttons

export type Codebooktree = {
  name: string
  uid: string
  code?: string
  children?: Codebooktree[]
  isExpandable?: boolean
}

interface CodebookTreeModalProps {
  onSelect: (item: CodebookType | null) => void
}

// The actual modal content, rendered by the global modal system
export function CodebookTreeModalGraphqlContent(
  props: CodebookTreeModalProps & {
    onClose?: () => void
  }
) {
  const { onSelect, onClose } = props
  const tableId = 'location-tree'

  const { codebooktree, fetchChildren, loading, error } = useLocationModal()

  const [item, setItem] = useState<Codebooktree | null>(null)
  const { instances } = useTableStateStore()
  const filter = useMemo(
    () => instances[tableId]?.columnFilter,
    [instances, tableId]
  )
  const filterName = filter?.find(item => item.id === 'name')?.value as string

  const filterCode = filter?.find(item => item.id === 'code')?.value as string

  const columns = useMemo((): ColumnDef<Codebooktree, any>[] => {
    const columns: ColumnDef<Codebooktree, string>[] = [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        filterFn: 'fuzzy',
        size: 300,
        meta: { filter: { type: 'string', enableColumnFilter: true } },
        cell: ({ row, getValue }) => (
          <ExpandableNameCell
            {...{ row, getValue, fetchChildren, filterName }}
          />
        )
      },
      {
        header: 'Code',
        accessorKey: 'code',
        id: 'code',
        cell: ({ getValue }) =>
          highlightText(getValue() || '', (filterCode as string) || ''),
        meta: { filter: { type: 'string', enableColumnFilter: true } }
      }
    ]

    return columns
  }, [fetchChildren, filterName, filterCode])

  const table = usePandaTable<Codebooktree>({
    tableId,
    columns,
    data: codebooktree,
    settings: {
      enableRowSelection: true,
      enableFiltering: true,
      manualFiltering: true
    },
    getSubRows: row => row?.children || []
  })

  const { toggleAllRowsExpanded } = table

  useEffect(() => {
    if (filter && filter?.length > 0) {
      toggleAllRowsExpanded(true)
    }
    if (!filter || filter.length === 0) {
      toggleAllRowsExpanded(false)
    }
    return () => {
      setItem(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  // Instead of ModalButtons, use a simple footer with actions
  return (
    <div className={cn('max-h-[300px]', loading && ' opacity-70')}>
      <PandaTableControlled
        tableId={tableId}
        data={codebooktree}
        table={table}
        loading={loading}
        settings={{
          enableRowSelection: true,
          enableFiltering: true,
          manualFiltering: true
        }}
        className={
          'relative overflow-y-auto h-[300px] border-l border-b border-gray-400'
        }
        getRowProps={row => ({
          onClick: () => {
            if (!row.original.isExpandable) {
              setItem({
                uid: row.original.uid,
                name:
                  row.original.name +
                  (row.original.code ? ` (${row.original.code})` : ''),
                code: row.original?.code
              })
            }
          },
          className: cn(
            item?.uid === row.original.uid &&
              'bg-orange-200 dark:bg-orange-600 hover:bg-orange-200 dark:hover:bg-orange-600',
            'cursor-pointer'
          )
        })}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          onClick={() => {
            if (onClose) onClose()
          }}
        >
          <FormattedMessage id={message.common.buttons.close} />
        </Button>
        <Button
          type="button"
          disabled={!item}
          onClick={() => {
            console.log('Selected item:', item, onSelect)
            onSelect && onSelect(item)
            if (onClose) onClose()
          }}
        >
          <FormattedMessage id={message.common.buttons.continue} />
        </Button>
      </div>
    </div>
  )
}
