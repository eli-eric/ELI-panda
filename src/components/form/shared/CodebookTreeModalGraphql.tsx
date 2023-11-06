import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ModalComponent from '@/components/modal/modal.comp'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import type { ModalButtons } from '@/types/form'

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
  name: string
  fetchChildren: (uid: string) => void
  additionalColumn?: ColumnDef<Codebooktree, string>
}

export const CodebookTreeModalGraphql = ({
  open,
  setOpen,
  data,
  name,
  fetchChildren,
  additionalColumn,
  enableFiltering,
  loading
}: CodebookTreeModalProps) => {
  const [item, setItem] = useState<CodebookType | undefined>(undefined)
  const { setValue } = useFormContext()
  useEffect(
    () => () => {
      setItem(undefined)
    },
    []
  )

  const columns = useMemo((): ColumnDef<Codebooktree, string>[] => {
    const columns: ColumnDef<Codebooktree, string>[] = [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        size: 300,
        meta: enableFiltering ? { filter: { type: 'string', enableColumnFilter: true } } : undefined,
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`
            }}
            className={classNames('my-1 flex items-center')}
            onClick={() => {
              if (row.original.isExpandable) {
                fetchChildren(row.original.uid)
                row.toggleExpanded()
              }
            }}
          >
            {row.original.isExpandable ? (
              <div className={classNames('flex items-center', 'cursot-pointer hover:text-gray-400')}>
                <button>
                  {row.getIsExpanded() && row.original.children?.length !== 0 ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )}
                </button>

                <span className="ml-2">{getValue()}</span>
              </div>
            ) : (
              <span className="ml-2">{getValue()}</span>
            )}
          </div>
        )
      }
    ]
    if (additionalColumn) columns.push(additionalColumn)
    return columns
  }, [fetchChildren, additionalColumn, enableFiltering])

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.save,
      type: 'button',
      disabled: !item,
      onClick: () => {
        setValue(name, item)
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
        <PandaTable
          tableId="codebook-tree"
          columns={columns}
          data={data}
          getSubRows={row => row.children}
          settings={{
            enableRowSelection: true,
            enableFiltering: enableFiltering,
            manualFiltering: true
          }}
          className={'relative overflow-y-auto h-[300px] border-l border-b border-gray-400'}
          getRowProps={row => ({
            onClick: () => {
              setItem({
                uid: row.original.uid,
                name: row.original.name + (row.original.code ? ` (${row.original.code})` : '')
              })
            },
            className: classNames(
              item?.uid === row.original.uid ? 'bg-primary-200 hover:bg-primary-200' : '',
              'cursor-pointer'
            )
          })}
        />
      </div>
    </ModalComponent>
  )
}
