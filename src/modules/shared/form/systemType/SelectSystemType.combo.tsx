import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo, useState } from 'react'

import Listbox from '@/components/form/Listbox'
import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'
import { highlightText } from '@/utils'

import { useSystemTypeGroups } from './hooks/useSystemTypeGroups'

export const SystemTypeComboBox = ({
  systemTypeField,
  className,
  clickIcon
}: {
  systemTypeField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
  className?: string
  clickIcon?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const { systemTypeGroups, filter } = useSystemTypeGroups()

  const additionalColumn: ColumnDef<Codebooktree, string> = useMemo(
    () => ({
      header: 'Code',
      accessorKey: 'code',
      filterFn: 'fuzzy',
      cell: ({ getValue }) => highlightText(getValue() || '', (filter?.code as string) || ''),
      meta: {
        filter: {
          type: 'string',
          enableColumnFilter: true
        }
      }
    }),
    [filter.code]
  )

  return (
    <Fragment>
      {clickIcon ? (
        <Listbox
          {...systemTypeField}
          className={className}
          onClickIcon={() => {
            setOpen(true)
          }}
        />
      ) : (
        <Listbox
          {...systemTypeField}
          className={className}
          onClick={() => {
            setOpen(true)
          }}
        />
      )}
      <CodebookTreeModalGraphql
        tableId="systemType-tree"
        data={systemTypeGroups?.map(group => ({
          name: group.name,
          uid: group.uid,
          isExpandable: group?.systemTypes?.length > 0,
          children: group.systemTypes.map(systemType => ({
            name: systemType.name,
            code: systemType.code,
            uid: systemType.uid
          }))
        }))}
        additionalColumn={additionalColumn}
        enableFiltering={true}
        manualFiltering={false}
        open={open}
        selectParent={false}
        setOpen={setOpen}
        name={systemTypeField.name}
      />
    </Fragment>
  )
}
