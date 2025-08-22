import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { useSystemTypeSelectionModal } from '@/modules/shared/form/systemType/hooks/useSystemTypeSelectionModal'
import type { FieldProps } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

import { InlineEditModalSelect } from './InlineEditModalSelect'

interface InlineEditSystemTypeProps extends FieldProps {
  onChange?: (value?: any) => void
}

export const InlineEditSystemType = ({
  name,
  label,
  disabled,
  onChange
}: InlineEditSystemTypeProps) => {
  const formContext = useFormContext()
  const { openSystemTypeModal } = useSystemTypeSelectionModal()

  const handleSystemTypeChange = useCallback(
    (value: CodebookType | null) => {
      console.log('Selected system type:', value)
      formContext.setValue(name, value)
      onChange?.(value)
    },
    [onChange, name, formContext]
  )

  const handleOpenModal = () => {
    openSystemTypeModal(handleSystemTypeChange)
  }

  return (
    <InlineEditModalSelect
      name={name}
      label={label}
      disabled={disabled}
      onClick={handleOpenModal}
      onClear={() => handleSystemTypeChange(null)}
      placeholder="Click to select system type"
    />
  )
}
