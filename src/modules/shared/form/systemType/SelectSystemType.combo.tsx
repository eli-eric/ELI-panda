import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { ModalSelect } from '@/components/form/ModalSelect'
import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'
import { highlightText } from '@/utils'

import { useSystemTypeGroups } from './hooks/useSystemTypeGroups'

export const SystemTypeComboBox = ({
  systemTypeField,
  className,
  clickIcon,
  onChange,
  isFilter
}: {
  systemTypeField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
  className?: string
  clickIcon?: boolean
  onChange?: (value?: any) => void
  isFilter?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const { systemTypeGroups, filter, loading, error } = useSystemTypeGroups()

  if (error && open) {
    toast.error('Failed to load system types')
    setOpen(false)
  }

  const additionalColumn: ColumnDef<Codebooktree, string> = useMemo(
    () => ({
      header: 'Code',
      accessorKey: 'code',
      filterFn: 'fuzzy',
      cell: ({ getValue }) =>
        highlightText(getValue() || '', (filter?.code as string) || ''),
      meta: {
        filter: {
          type: 'string',
          enableColumnFilter: true
        }
      }
    }),
    [filter.code]
  )

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

  return (
    <Fragment>
      {clickIcon ? (
        <ModalSelect
          {...systemTypeField}
          className={className}
          onChange={onChange}
          onClick={() => {
            setOpen(true)
          }}
          isFilter={isFilter}
        />
      ) : (
        <ModalSelect
          {...systemTypeField}
          className={className}
          onChange={onChange}
          onClick={() => {
            setOpen(true)
          }}
          isFilter={isFilter}
        />
      )}
      <CodebookTreeModalGraphql
        tableId="systemType-tree"
        onSelect={onChange}
        data={treeData}
        additionalColumn={additionalColumn}
        enableFiltering={true}
        manualFiltering={false}
        open={open}
        loading={loading}
        selectParent={false}
        setOpen={setOpen}
        name={systemTypeField.name}
      />
    </Fragment>
  )
}
