import { Fragment, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ModalSelect } from '@/components/form/ModalSelect'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

import { useSystemTypeSelectionModal } from './hooks/useSystemTypeSelectionModal'

export const SystemTypeComboBox = ({
  systemTypeField,
  className,
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
  const formContext = useFormContext()
  const { trigger, setValue } = formContext
  const { openSystemTypeModal } = useSystemTypeSelectionModal()

  const handleSystemTypeChange = useCallback(
    (value: CodebookType | null) => {
      if (setValue) {
        setValue(systemTypeField.name, value)
        trigger(systemTypeField.name)
      }
      onChange?.(value)
    },
    [setValue, systemTypeField.name, onChange, trigger]
  )

  const handleOpenDialog = () => {
    openSystemTypeModal(handleSystemTypeChange)
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
