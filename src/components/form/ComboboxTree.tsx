import React from 'react'

import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'

import { ModalSelect } from './ModalSelect'
import { openCodebookTreeModal } from './shared/CodebookTreeModal'

type ComboboxPropsT = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    codebook?: CODEBOOK
    isObject?: boolean
    position?: 'top' | 'bottom'
    onSelect?: (item?: any) => void
    isFilter?: boolean
  }

export const ComboboxTree = ({
  codebook,
  name,
  placeholder = 'Click to select',
  label,
  disabled,
  className,
  onSelect,
  isFilter
}: ComboboxPropsT) => {
  return (
    <ModalSelect
      name={name}
      onChange={onSelect}
      isFilter={isFilter}
      className={className}
      disabled={disabled}
      placeholder={placeholder}
      label={label}
      onClick={() => {
        openCodebookTreeModal({
          codebook,
          name,
          onSubmit: onSelect
        })
      }}
    />
  )
}
