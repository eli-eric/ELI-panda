import { Combobox as HUICombobox } from '@headlessui/react'
import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { type CodebookFilter, type CodebookType, useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

import { ComboboxOption } from './components/ComboboxOption'
import { FormXMarkIcon } from './components/FormXMarkIcon'
import { ChevronDown } from './Icons'
import { CodebookTreeModal } from './shared/CodebookTreeModal'

type ComboboxPropsT = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    codebook?: CODEBOOK
    codebookResponse?: CodebookType[]
    position?: 'top' | 'bottom'
    limit?: number
    showAddButton?: boolean
    filter?: CodebookFilter[]
    customLabel?: string
    onClickIcon?: () => void
    onSelect?: (item?: CodebookType | null) => void
    isFilter?: boolean
    value?: CodebookType
    onChange: (v?: CodebookType | null) => void
  }

export const ComboboxTreeControlled = ({
  codebook,
  name,
  placeholder,
  value,
  customLabel,
  label,
  disabled,
  className,
  limit = 10,
  filter,
  position = 'bottom',
  rounded = 'rounded-md',
  codebookResponse,
  onChange,
  isFilter
}: ComboboxPropsT) => {
  const { formatMessage: fm } = useIntl()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState<string>('')
  const codebookResponseData = useMemo(() => ({ data: codebookResponse, metadata: undefined }), [codebookResponse])

  const { data } = useCodebook(codebook, { limit, filter, searchText: query })

  const options = useMemo(() => (data ? data : codebookResponseData), [data, codebookResponseData])

  const handleClear = () => {
    setQuery('')
    onChange(null)
  }

  return (
    <HUICombobox
      as="div"
      name={name}
      value={value}
      onChange={value => {
        onChange(value)
        setQuery(value?.name || '')
      }}
      disabled={disabled}
      className={classNames('relative flex flex-col w-full', className)}
    >
      {(label || customLabel) && (
        <HUICombobox.Label className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          {customLabel ? customLabel : fm({ id: label })}
        </HUICombobox.Label>
      )}
      <div className="relative">
        <HUICombobox.Input
          onChange={e => setQuery(e.target.value)}
          displayValue={(item: CodebookType) => item?.name}
          placeholder={placeholder}
          autoComplete="off"
          className={classNames(
            'form-field',
            value && !disabled ? 'pr-14' : 'pr-9',
            rounded,
            'border-gray-300',
            disabled ? 'bg-gray-100' : '',
            isFilter ? value && 'border-2 border-lime-500' : ''
          )}
        />

        {value && !disabled && <FormXMarkIcon onClick={handleClear} />}
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-2"
          onClick={() => {
            setOpen(true)
          }}
        >
          <ChevronDown />
        </button>
      </div>
      {options?.data && options.data.length > 0 && (
        <HUICombobox.Options
          className={classNames(
            'absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
            position === 'top' ? 'bottom-full' : 'top-full'
          )}
        >
          {options.data.map(item => (
            <ComboboxOption key={item.uid} item={item} selected={value?.uid === item.uid} />
          ))}
        </HUICombobox.Options>
      )}{' '}
      <CodebookTreeModal onSubmit={onChange} codebook={codebook} open={open} setOpen={setOpen} name={name} />
    </HUICombobox>
  )
}
