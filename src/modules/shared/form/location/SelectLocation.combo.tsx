import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ModalSelect } from '@/components/form/ModalSelect'
import type { CodebookType } from '@/types/responses/codebook'

import { openCodebookTreeModalGraphql } from './components/openLocationModal'

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

  const setValue = useCallback(
    () => (value: CodebookType | null) => {
      console.log('SelectLocationCombo setValue called with:', value)
      console.log('formContext exists:', !!formContext)
      console.log('locationField.name:', locationField.name)
      formContext?.setValue(locationField.name, value)
    },
    [formContext, locationField.name]
  )
  const handleOpenModal = () => {
    openCodebookTreeModalGraphql({
      onSelect: setValue,
      manualFiltering: true,
      enableFiltering: true,
      name: locationField.name
    })
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
