import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { ModalSelect } from '@/components/form/ModalSelect'
import { cn } from '@/lib/utils'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

export const SelectSystemComboBox = ({
  selectSystemField,
  className,
  onChange,
  isFilter = false
}: {
  selectSystemField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
  className?: string
  onChange?: (value?: any) => void
  isFilter?: boolean
}) => {
  const [selectedSystem, setSelectedSystem] = useState<CodebookType | null>(
    null
  )
  const { setValue } = useFormContext()
  const { openModal, closeModal } = useModalGlobalStore()

  const openSystemSelectModal = () => {
    setSelectedSystem(null)
    openModal('dialog2', {
      component: () => (
        <SystemsTable
          tableId={'systemSelect'}
          hideButtons={true}
          className={'overflow-y-auto relative h-[423px]'}
          settings={{
            enableRowSelection: true
          }}
          getRowProps={row => ({
            onClick: () => {
              setSelectedSystem({
                name: row.original.name,
                uid: row.original.uid
              })
            },
            className: cn(
              selectedSystem?.uid === row.original.uid
                ? 'bg-orange-200 hover:bg-orange-200 dark:bg-orange-600 dark:hover:bg-orange-600'
                : '',
              'cursor-pointer'
            )
          })}
        />
      ),
      props: {
        title: 'Select System',
        size: 'l'
      },
      onSubmit: () => {
        if (selectedSystem) {
          setValue(selectSystemField.name, selectedSystem)
          onChange?.(selectedSystem)
          closeModal('dialog1')
        }
      }
    })
  }

  return (
    <ModalSelect
      {...selectSystemField}
      className={className}
      onChange={onChange}
      onClick={openSystemSelectModal}
      isFilter={isFilter}
    />
  )
}
