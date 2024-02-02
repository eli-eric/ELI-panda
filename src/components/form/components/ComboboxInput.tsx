import { Combobox } from '@headlessui/react'
import type { FieldError } from 'react-hook-form'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { classNames } from '@/utils'

interface Props {
  value?: any
  placeholder?: string
  onChange?: (e: any) => void
  disabled?: boolean
  error?: FieldError | undefined
  rounded?: string
  isFilter?: boolean
}

export const ComboboxInput = ({ value, placeholder, disabled, error, onChange, rounded, isFilter }: Props) => (
  <Combobox.Input
    onChange={onChange}
    displayValue={(item: CodebookType) => item?.name}
    placeholder={placeholder}
    autoComplete="off"
    className={classNames(
      'form-field ',
      value && !disabled ? 'pr-14' : 'pr-9',
      rounded,
      error ? 'border-red-500' : 'border-gray-300',
      disabled ? 'bg-gray-100' : '',
      isFilter ? value && 'border-2 border-lime-500' : ''
    )}
  />
)
