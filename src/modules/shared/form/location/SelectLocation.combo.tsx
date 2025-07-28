import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ModalSelect } from '@/components/form/ModalSelect'
import type { CodebookType } from '@/types/responses/codebook'

import { useLocationSelectionModal } from './hooks/useLocationSelectionModal'

export const SelectLocationCombo = ({
  locationField,
  className,
  disabled,
  onSelect,
  isFilter = false
}: {
  locationField: any
  disabled?: boolean
  className?: string
  onSelect?: (item?: CodebookType | null) => void
  isFilter?: boolean
}) => {
  const formContext = useFormContext()
  const { openLocationModal } = useLocationSelectionModal()

  const handleLocationSelect = useCallback(
    (value: CodebookType | null) => {
      if (formContext && locationField.name) {
        formContext.setValue(locationField.name, value)
      }
      onSelect?.(value)
    },
    [formContext, locationField.name, onSelect]
  )

  const handleOpenModal = () => {
    openLocationModal(handleLocationSelect)
  }

  return (
    <ModalSelect
      {...locationField}
      onSelect={onSelect}
      className={className}
      disabled={disabled}
      onClick={handleOpenModal}
      isFilter={isFilter}
    />
  )
}
