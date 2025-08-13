import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { openCodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'
import { highlightText } from '@/utils'

import { useSystemTypeGroups } from '@/modules/shared/form/systemType/hooks/useSystemTypeGroups'
import { InlineEditModalSelect } from './InlineEditModalSelect'

interface InlineEditSystemTypeProps extends FieldProps {
  className?: string
  clickIcon?: boolean
  onChange?: (value?: any) => void
  systemTypeField?: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
}

export const InlineEditSystemType = ({
  name,
  label,
  disabled,
  className,
  clickIcon,
  onChange,
  systemTypeField
}: InlineEditSystemTypeProps) => {
  const { systemTypeGroups, filter, loading, error } = useSystemTypeGroups()
  
  const formContext = useFormContext()
  const setValue = formContext?.setValue

  const onValueChange = (value?: any) => {
    if (setValue) {
      setValue(systemTypeField?.name || name, value)
    }
    onChange?.(value)
  }

  if (error) {
    toast.error('Failed to load system types')
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

  const handleOpenDialog = () => {
    openCodebookTreeModalGraphql({
      tableId: 'systemType-tree',
      onSelect: onValueChange,
      data: treeData,
      additionalColumn,
      enableFiltering: true,
      manualFiltering: false,
      loading,
      selectParent: false,
      name: systemTypeField?.name || name
    })
  }

  return (
    <InlineEditModalSelect
      name={systemTypeField?.name || name}
      label={systemTypeField?.label || label}
      disabled={systemTypeField?.disabled || disabled}
      onClick={handleOpenDialog}
      placeholder="Click to select system type"
    />
  )
}