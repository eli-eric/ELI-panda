import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ModalComponent from '@/components/modal/modal.comp'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import useFetch from '@/hooks/fetch/useFetch'
import { message } from '@/i18n/src/messages'
import PandaTable from '@/modules/shared/table/pandaTable/PandaTable'
import type { ModalButtons } from '@/types/form'

const messages = message.common.buttons

type Codebooktree = {
  name: string
  uid: string
  children?: Codebooktree[]
}

interface CodebookTreeModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  codebook: string
  name: string
}

export const CodebookTreeModal = ({ open, setOpen, codebook, name }: CodebookTreeModalProps) => {
  const [item, setItem] = useState<CodebookType | undefined>(undefined)

  const { setValue } = useFormContext()

  useEffect(
    () => () => {
      setItem(undefined)
    },
    []
  )

  const { response } = useFetch<Codebooktree[]>({
    url: `/codebook/${codebook}/tree`,
    config: {
      suspense: false
    }
  })
  const columns = useMemo(
    (): ColumnDef<Codebooktree, string>[] => [
      {
        header: 'Categories',
        accessorKey: 'name',
        id: 'name',
        size: 300,
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`
            }}
            className={classNames('cursor-pointer my-1 flex items-center')}
            onClick={() => {
              row.getToggleExpandedHandler()()
            }}
          >
            <div className={classNames(!row.original?.children && 'font-bold', 'flex items-center')}>
              {row.getCanExpand() && (
                <button
                  {...{
                    style: { cursor: 'pointer' }
                  }}
                >
                  {row.getIsExpanded() ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )}
                </button>
              )}
              {'  '}
              <span className="ml-2">{getValue()}</span>
            </div>
          </div>
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
      <PandaTable
        tableId="codebook"
        columns={columns}
        data={response}
        getSubRows={row => row.children}
        settings={{
          enableRowSelection: true
        }}
        className={'relative overflow-x-auto'}
        getRowProps={row => ({
          onClick: () => {
            !row.original?.children && setItem({ uid: row.original.uid, name: row.original.name })
          },
          className: classNames(
            item?.uid === row.original.uid ? 'bg-primary-200 hover:bg-primary-200' : '',
            'cursor-pointer'
          )
        })}
      />
    </ModalComponent>
  )
}
