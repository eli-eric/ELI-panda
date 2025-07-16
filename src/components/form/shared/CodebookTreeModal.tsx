import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ColumnDef, Table } from '@tanstack/react-table'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import useTableStateStore from '@/store/useTableStateStore'
import type { ModalButtons } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'
import { queryFetcher } from '@/utils/fetcher'

import { ExpandableNameCell } from './ExpandableNameCell'

const messages = message.common.buttons

type Codebooktree = {
  name: string
  uid: string
  children?: Codebooktree[]
}

interface CodebookTreeModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  codebook?: string
  name: string
  onSubmit?: (item?: any) => void
}

export const CodebookTreeModal = ({
  open,
  setOpen,
  codebook,
  name,
  onSubmit
}: CodebookTreeModalProps) => {
  const tableId = 'codebook'

  const [item, setItem] = useState<CodebookType | undefined>(undefined)

  const { setValue } = useFormContext()
  const { reset } = useTableStateStore()

  const [filterState] = useFilters(tableId, false, false)

  const search = filterState[0]?.value as string

  const tableRef = useRef<Table<Codebooktree>>(null)

  useEffect(() => {
    startTransition(() => {
      if (tableRef.current) {
        const filter = tableRef.current.getState().columnFilters
        if (filter.length > 0) tableRef.current.toggleAllRowsExpanded(true)
        if (filter.length === 0) tableRef.current.toggleAllRowsExpanded(false)
      }
    })
    return () => {
      setItem(undefined)
    }
  }, [search])

  const { data: response, isLoading: loading } = useQuery({
    queryKey: [
      'codebookTree',
      { codebook, query: { columnFilter: JSON.stringify(filterState) } }
    ],
    queryFn: queryFetcher<Codebooktree[]>('codebookTree'),
    placeholderData: keepPreviousData
  })

  const columns = useMemo(
    (): ColumnDef<Codebooktree, string>[] => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        size: 300,
        meta: {
          filter: {
            enableColumnFilter: true,
            type: 'string'
          }
        },
        cell: ({ row, getValue, table: { getState } }) => (
          <ExpandableNameCell {...{ row, getValue, getState }} />
        )
      }
    ],
    []
  )

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.save,
      type: 'button',
      disabled: !item,
      onClick: () => {
        onSubmit && onSubmit(item)
        setValue(name, item)
        setOpen(false)
        setItem(undefined)
        reset(tableId)
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
      <div className="max-h-[300px]">
        <PandaTable
          ref={tableRef}
          tableId={tableId}
          loading={loading}
          columns={columns}
          data={response}
          getSubRows={row => row.children}
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
              setItem({ uid: row.original.uid, name: row.original.name })
            },
            className: cn(
              item?.uid === row.original.uid
                ? 'bg-orange-200 dark:bg-orange-500 hover:bg-orange-200 dark:hover:bg-orange-500'
                : '',
              'cursor-pointer'
            )
          })}
        />
      </div>
    </ModalComponent>
  )
}
