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
}

export const ComboboxInput = ({ value, placeholder, disabled, error, onChange, rounded }: Props) => (
  <Combobox.Input
    onChange={onChange}
    displayValue={(item: CodebookType) => item?.name}
    placeholder={placeholder}
    autoComplete="off"
    className={classNames(
      'px-3 py-2 border placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm block w-full appearance-none text-left truncate',
      value && !disabled ? 'pr-14' : 'pr-9',
      rounded,
      error ? 'border-red-500' : 'border-gray-300',
      disabled ? 'bg-gray-100' : ''
    )}
  />
)
