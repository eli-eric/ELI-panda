import type { ColumnDef, Table } from '@tanstack/react-table'
import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import useFetch from '@/hooks/fetch/useFetch'
import useQueryManager from '@/hooks/useQueryManager'
import { message } from '@/i18n/src/messages'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import useTableStateStore from '@/store/useTableStateStore'
import type { ModalButtons } from '@/types/form'

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

export const CodebookTreeModal = ({ open, setOpen, codebook, name, onSubmit }: CodebookTreeModalProps) => {
  const tableId = 'codebook'

  const [item, setItem] = useState<CodebookType | undefined>(undefined)

  const { setValue } = useFormContext()
  const { reset } = useTableStateStore()

  useEffect(
    () => () => {
      setItem(undefined)
    },
    []
  )

  const { query } = useQueryManager(tableId)

  const search = JSON.parse(query.columnFilter || '[]')[0]?.value

  const tableRef = useRef<Table<Codebooktree>>(null)

  useEffect(() => {
    if (tableRef.current) {
      const filter = tableRef.current.getState().columnFilters
      if (filter.length > 0) tableRef.current.toggleAllRowsExpanded(true)
      if (filter.length === 0) tableRef.current.toggleAllRowsExpanded(false)
    }
  }, [query.columnFilter])

  const { response, loading } = useFetch<Codebooktree[]>({
    url: `/codebook/${codebook}/tree` + '?' + 'columnFilter=' + query.columnFilter,
    config: {
      suspense: false,
      keepPreviousData: true
    }
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
        cell: ({ row, getValue }) => <ExpandableNameCell {...{ row, getValue, filterName: search }} />
      }
    ],
    [search]
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
          className={'relative overflow-y-auto h-[300px] border-l border-b border-gray-400'}
          getRowProps={row => ({
            onClick: () => {
              !row.original?.children && setItem({ uid: row.original.uid, name: row.original.name })
            },
            className: classNames(
              item?.uid === row.original.uid ? 'bg-primary-200 dark:bg-primary-500 hover:bg-primary-200' : '',
              'cursor-pointer'
            )
          })}
        />
      </div>
    </ModalComponent>
  )
}
