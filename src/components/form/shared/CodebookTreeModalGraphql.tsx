import { type ColumnDef } from '@tanstack/react-table'
import { startTransition, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import type { CodebookType } from '@/types/responses/codebook'

import { message } from '@/i18n/src/messages'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
import useTableStateStore from '@/store/useTableStateStore'
import type { ModalButtons } from '@/types/form'
import { classNames } from '@/utils'

import { ExpandableNameCell } from './ExpandableNameCell'

const messages = message.common.buttons

export type Codebooktree = {
  name: string
  uid: string
  code?: string
  children?: Codebooktree[]
  isExpandable?: boolean
}

interface CodebookTreeModalProps {
  open: boolean
  loading?: boolean
  enableFiltering?: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
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

export const CodebookTreeModalGraphql = ({
  open,
  setOpen,
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
  onSelect
}: CodebookTreeModalProps) => {
  const [item, setItem] = useState<Codebooktree | undefined>(undefined)

  const { instances } = useTableStateStore()
  const filter = useMemo(
    () => instances[tableId]?.columnFilter,
    [instances, tableId]
  )
  const filterName = filter?.find(item => item.id === 'name')?.value as string
  const { setValue } = useFormContext()
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
    startTransition(() => {
      if (filter && filter?.length > 0) toggleAllRowsExpanded(true)
      if (!filter || filter.length === 0) toggleAllRowsExpanded(false)
    })
    return () => {
      setItem(undefined)
    }
  }, [filter, toggleAllRowsExpanded])

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.save,
      type: 'button',
      disabled: !item,
      onClick: () => {
        customSetValue ? customSetValue(item) : name && setValue(name, item)
        onSelect && onSelect(item)
        setOpen(false)
        setItem(undefined)
      }
    },
    goBack: {
      text: messages.close,
      type: 'button',
      onClick: () => {
        setOpen(false)
      }
    }
  }

  return (
    <ModalComponent open={open} setOpen={setOpen} buttons={modalButtons}>
      <div className={classNames('max-h-[300px]', loading && ' opacity-70')}>
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
            className: classNames(
              item?.uid === row.original.uid &&
                'bg-primary-200 dark:bg-primary-600 hover:bg-primary-200 dark:hover:bg-primary-600',
              'cursor-pointer'
            )
          })}
        />
      </div>
    </ModalComponent>
  )
}
