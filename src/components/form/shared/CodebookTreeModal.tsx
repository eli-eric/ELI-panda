import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ColumnDef, Table } from '@tanstack/react-table'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import useTableStateStore from '@/store/useTableStateStore'
import type { CodebookType } from '@/types/responses/codebook'
import { queryFetcher } from '@/utils/fetcher'

import { ExpandableNameCell } from './ExpandableNameCell'

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

// The actual modal content, rendered by the global modal system
export function CodebookTreeModalContent(
  props: Omit<CodebookTreeModalProps, 'open' | 'setOpen' | 'onSubmit'> & {
    onClose?: () => void
    onSelect?: (item?: any) => void
    title?: string
  }
) {
  const { codebook, onSelect, onClose } = props

  const tableId = 'codebook'
  const [item, setItem] = useState<CodebookType | undefined>(undefined)
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

  return (
    <div className="flex flex-col h-[300px] pt-4">
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
          'relative overflow-y-auto flex-1 border-l border-b border-gray-400'
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
      <div className="flex justify-end gap-2 mt-6 flex-shrink-0">
        <Button
          type="button"
          variant="outline"
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
            onSelect?.(item)
            if (onClose) onClose()
            setItem(undefined)
            reset(tableId)
          }}
        >
          <FormattedMessage id={message.common.buttons.continue} />
        </Button>
      </div>
    </div>
  )
}
