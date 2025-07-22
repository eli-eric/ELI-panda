import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { ModalSelect } from '@/components/form/ModalSelect'
import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { CodebookTreeModalGraphqlContent } from '@/components/form/shared/CodebookTreeModalGraphql'
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
  const { systemTypeGroups, filter, loading, error } = useSystemTypeGroups()
  const { openModal } =
    require('@/store/useModalGlobalStore').useModalGlobalStore.getState()
  const formContext = useFormContext()
  const setValue = formContext?.setValue

  const onValueChange = (value?: any) => {
    if (setValue) {
      setValue(systemTypeField.name, value)
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
    openModal('dialog1', {
      component: (props: any) => (
        <CodebookTreeModalGraphqlContent
          {...props}
          tableId="systemType-tree"
          onSelect={onValueChange}
          data={treeData}
          additionalColumn={additionalColumn}
          enableFiltering={true}
          manualFiltering={false}
          loading={loading}
          selectParent={false}
          name={systemTypeField.name}
        />
      ),
      props: {},
      onClose: undefined
    })
  }

  return (
    <Fragment>
      <ModalSelect
        {...systemTypeField}
        className={className}
        onChange={onChange}
        onClick={handleOpenDialog}
        isFilter={isFilter}
      />
    </Fragment>
  )
}
