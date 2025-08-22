import { type ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-hot-toast'

import { ExpandableNameCell } from '@/components/form/shared/ExpandableNameCell'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
import useTableStateStore from '@/store/useTableStateStore'
import type { CodebookType } from '@/types/responses/codebook'
import { highlightText } from '@/utils'

import { useSystemTypeGroups } from '../hooks/useSystemTypeGroups'

export type Codebooktree = {
  name: string
  uid: string
  code?: string
  children?: Codebooktree[]
  isExpandable?: boolean
}

interface SystemTypeModalProps {
  loading?: boolean
  enableFiltering?: boolean
  tableId?: string
  selectParent?: boolean
  manualFiltering?: boolean
  onSelect: (item: CodebookType | null) => void
}

// The actual modal content, rendered by the global modal system
export function SystemTypeModalContent(
  props: SystemTypeModalProps & {
    onClose?: () => void
  }
) {
  const {
    tableId = 'system-type-tree',
    onSelect,
    onClose,
    selectParent = false,
    manualFiltering = false,
    enableFiltering = true
  } = props

  const { systemTypeGroups, filter, loading, error } = useSystemTypeGroups()

  const [item, setItem] = useState<Codebooktree | null>(null)
  const { instances } = useTableStateStore()
  const tableFilter = useMemo(
    () => instances[tableId]?.columnFilter,
    [instances, tableId]
  )
  const filterName = tableFilter?.find(item => item.id === 'name')?.value as string
  const filterCode = tableFilter?.find(item => item.id === 'code')?.value as string

  if (error) {
    toast.error('Failed to load system types')
  }

  const treeData = useMemo(() => {
    if (!systemTypeGroups) return []
    return systemTypeGroups?.map(group => ({
      name: group.name,
      uid: group.uid,
      isExpandable: group?.systemTypes?.length > 0,
      children: group.systemTypes.map(systemType => ({
        name: systemType.name,
        code: systemType.code,
        uid: systemType.uid
      }))
    }))
  }, [systemTypeGroups])

  const columns = useMemo((): ColumnDef<Codebooktree, any>[] => {
    const columns: ColumnDef<Codebooktree, string>[] = [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        filterFn: 'fuzzy',
        size: 300,
        meta: enableFiltering
          ? { filter: { type: 'string', enableColumnFilter: true } }
          : undefined,
        cell: ({ row, getValue }) => (
          <ExpandableNameCell
            {...{ row, getValue, filterName }}
          />
        )
      },
      {
        header: 'Code',
        accessorKey: 'code',
        id: 'code',
        filterFn: 'fuzzy',
        cell: ({ getValue }) =>
          highlightText(getValue() || '', (filterCode as string) || ''),
        meta: enableFiltering
          ? { filter: { type: 'string', enableColumnFilter: true } }
          : undefined
      }
    ]

    return columns
  }, [enableFiltering, filterName, filterCode])

  const table = usePandaTable<Codebooktree>({
    tableId,
    columns,
    data: treeData,
    settings: {
      enableRowSelection: true,
      enableFiltering: enableFiltering,
      manualFiltering: manualFiltering
    },
    getSubRows: row => row?.children || []
  })

  const { toggleAllRowsExpanded } = table

  useEffect(() => {
    if (tableFilter && tableFilter?.length > 0) {
      toggleAllRowsExpanded(true)
    }
    if (!tableFilter || tableFilter.length === 0) {
      toggleAllRowsExpanded(false)
    }
    return () => {
      setItem(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableFilter])

  return (
    <div>
      <div className={cn('max-h-[300px]', loading && ' opacity-70')}>
        <PandaTableControlled
          tableId={tableId}
          data={treeData}
          table={table}
          loading={loading}
          settings={{
            enableRowSelection: true,
            enableFiltering: enableFiltering,
            manualFiltering: manualFiltering
          }}
          className={
            'relative overflow-y-auto h-[300px] border-l border-b border-gray-400'
          }
          getRowProps={row => ({
            onClick: () => {
              if (selectParent) {
                setItem({
                  uid: row.original.uid,
                  name:
                    row.original.name +
                    (row.original.code ? ` (${row.original.code})` : ''),
                  code: row.original?.code
                })
              }
              if (!row.original.isExpandable && !selectParent) {
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
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          variant={'outline'}
          onClick={() => {
            onClose?.()
          }}
        >
          <FormattedMessage id={message.common.buttons.close} />
        </Button>
        <Button
          type="button"
          disabled={!item}
          onClick={() => {
            onSelect(item)
            onClose?.()
          }}
        >
          <FormattedMessage id={message.common.buttons.continue} />
        </Button>
      </div>
    </div>
  )
}