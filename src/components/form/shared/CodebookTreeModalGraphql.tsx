import { type ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import useTableStateStore from '@/store/useTableStateStore'
import type { CodebookType } from '@/types/responses/codebook'

import { ExpandableNameCell } from './ExpandableNameCell'

export type Codebooktree = {
  name: string
  uid: string
  code?: string
  children?: Codebooktree[]
  isExpandable?: boolean
}

interface CodebookTreeModalProps {
  loading?: boolean
  enableFiltering?: boolean
  data?: Codebooktree[]
  name?: string
  fetchChildren?: (uid: string) => void
  additionalColumn?: ColumnDef<Codebooktree, string>
  tableId?: string
  selectParent?: boolean
  manualFiltering?: boolean
  customSetValue?: (value?: Codebooktree) => void
  onSelect?: (item?: CodebookType | null) => void
}

/**
 * Opens the CodebookTreeModalGraphql as a Dialog via the global modal system.
 * Usage: openCodebookTreeModalGraphql({ ...props })
 */
export function openCodebookTreeModalGraphql(props: CodebookTreeModalProps) {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useModalGlobalStore.getState()
  openModal('dialog2', {
    component: CodebookTreeModalGraphqlContent,
    props,
    onClose:
      typeof props.onSelect === 'function'
        ? () => {
            props.onSelect?.(undefined)
          }
        : undefined
  })
}

// The actual modal content, rendered by the global modal system
export function CodebookTreeModalGraphqlContent(
  props: CodebookTreeModalProps & {
    onClose?: () => void
  }
) {
  const {
    data,
    name,
    fetchChildren,
    additionalColumn,
    enableFiltering,
    loading = false,
    tableId = 'codebook-tree',
    selectParent = true,
    manualFiltering,
    customSetValue,
    onSelect,
    onClose
  } = props

  const [item, setItem] = useState<Codebooktree | undefined>(undefined)
  const { instances } = useTableStateStore()
  const filter = useMemo(
    () => instances[tableId]?.columnFilter,
    [instances, tableId]
  )
  const filterName = filter?.find(item => item.id === 'name')?.value as string

  // Use optional chaining for formContext to handle case when there's no FormProvider
  const formContext = useFormContext()
  const setValue = formContext?.setValue

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
            {...{ row, getValue, fetchChildren, filterName }}
          />
        )
      }
    ]
    if (additionalColumn) columns.push(additionalColumn)
    return columns
  }, [fetchChildren, additionalColumn, enableFiltering, filterName])

  const table = usePandaTable<Codebooktree>({
    tableId,
    columns,
    data,
    settings: {
      enableRowSelection: true,
      enableFiltering: enableFiltering,
      manualFiltering: manualFiltering
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
      setItem(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  // Instead of ModalButtons, use a simple footer with actions
  return (
    <div>
      <div className={cn('max-h-[300px]', loading && ' opacity-70')}>
        <PandaTableControlled
          tableId={tableId}
          data={data}
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
                    (row.original.code && !customSetValue
                      ? ` (${row.original.code})`
                      : ''),
                  code: row.original?.code
                })
              }
              if (!row.original.isExpandable && !selectParent) {
                setItem({
                  uid: row.original.uid,
                  name:
                    row.original.name +
                    (row.original.code && !customSetValue
                      ? ` (${row.original.code})`
                      : ''),
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
            if (customSetValue) {
              customSetValue(item)
            } else if (name && setValue) {
              setValue(name, item)
            }
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
