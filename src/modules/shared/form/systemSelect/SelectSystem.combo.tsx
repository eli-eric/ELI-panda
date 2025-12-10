import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ModalSelect } from '@/components/form/ModalSelect'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'
import type { SystemDetail } from '@/types/responses/systems'

import { useSystemSelectionModal } from './hooks/useSystemSelectionModal'

export const SelectSystemComboBox = ({
  selectSystemField,
  className,
  disabled,
  onChange,
  onSelect,
  onSystemDetailChange,
  isFilter = false
}: {
  selectSystemField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
  className?: string
  disabled?: boolean
  onChange?: (value?: any) => void
  onSelect?: (item?: CodebookType | null) => void
  onSystemDetailChange?: (system: SystemDetail) => void
  isFilter?: boolean
}) => {
  const formContext = useFormContext()
  const { openSystemModal } = useSystemSelectionModal()

  const handleSystemSelect = useCallback(
    (value: CodebookType | null) => {
      if (formContext && selectSystemField.name) {
        formContext.setValue(selectSystemField.name, value)
      }
      onChange?.(value)
      onSelect?.(value)
    },
    [formContext, selectSystemField.name, onChange, onSelect]
  )

  const handleOpenModal = () => {
    openSystemModal(handleSystemSelect, onSystemDetailChange)
  }

  return (
    <ModalSelect
      {...selectSystemField}
      onChange={onChange}
      className={className}
      disabled={disabled}
      onClick={handleOpenModal}
      isFilter={isFilter}
    />
  )
}
