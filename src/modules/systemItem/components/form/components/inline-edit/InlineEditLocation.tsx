import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { useLocationSelectionModal } from '@/modules/shared/form/location/hooks/useLocationSelectionModal'
import type { FieldProps } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

import { InlineEditModalSelect } from './InlineEditModalSelect'

interface InlineEditLocationProps extends FieldProps {
  className?: string
  onSelect?: (item?: CodebookType | null) => void
  locationField?: any
}

export const InlineEditLocation = ({
  name,
  label,
  disabled,
  className,
  onSelect,
  locationField
}: InlineEditLocationProps) => {
  const formContext = useFormContext()
  const { openLocationModal } = useLocationSelectionModal()

  const handleLocationSelect = useCallback(
    (value: CodebookType | null) => {
      if (formContext && (locationField?.name || name)) {
        formContext.setValue(locationField?.name || name, value)
      }
      onSelect?.(value)
    },
    [formContext, locationField?.name, name, onSelect]
  )

  const handleOpenModal = () => {
    openLocationModal(handleLocationSelect)
  }

  return (
    <InlineEditModalSelect
      name={locationField?.name || name}
      label={locationField?.label || label}
      disabled={locationField?.disabled || disabled}
      onClick={handleOpenModal}
      onClear={() => handleLocationSelect(null)}
      placeholder="Click to select location"
    />
  )
}