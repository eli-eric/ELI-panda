import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

import { ModalSelect } from './ModalSelect'
import { useCodebookTreeModal } from './shared/hooks/useCodebookTreeModal'

type ComboboxPropsT = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    codebook?: CODEBOOK
    isObject?: boolean
    position?: 'top' | 'bottom'
    onSelect?: (item?: CodebookType | null) => void
    isFilter?: boolean
    customLabel?: string
    modalTitle?: string
  }

export const ComboboxTree = ({
  codebook,
  name,
  placeholder = 'Click to select',
  label,
  disabled,
  className,
  onSelect,
  isFilter,
  customLabel,
  modalTitle
}: ComboboxPropsT) => {
  const { setValue } = useFormContext()
  const { openCodebookTreeModal } = useCodebookTreeModal()

  const handleCodebookSelect = useCallback(
    (value?: CodebookType | null | undefined) => {
      setValue(name, value)
      onSelect?.(value)
    },
    [setValue, name, onSelect]
  )

  const displayLabel = customLabel || label
  const displayTitle = modalTitle || displayLabel || 'Select Item'

  const handleOpenModal = () => {
    openCodebookTreeModal({
      codebook,
      name,
      title: displayTitle,
      onSubmit: handleCodebookSelect
    })
  }

  return (
    <ModalSelect
      name={name}
      onChange={onSelect}
      isFilter={isFilter}
      className={className}
      disabled={disabled}
      placeholder={placeholder}
      label={displayLabel}
      onClick={handleOpenModal}
    />
  )
}
