import { Combobox as HUICombobox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { type CodebookFilter, type CodebookType, useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

import { CodebookTreeModal } from './shared/CodebookTreeModal'

type ComboboxPropsT = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    codebook?: CODEBOOK
    isObject?: boolean
    position?: 'top' | 'bottom'
    limit?: number
    showAddButton?: boolean
    filter?: CodebookFilter[]
    customLabel?: string
    onSelect?: (item?: any) => void
    isFilter?: boolean
  }

export const ComboboxTree = ({
  codebook,
  name,
  placeholder,
  customLabel,
  label,
  disabled,
  className,
  limit = 10,
  filter,
  position = 'bottom',
  rounded = 'rounded-md',
  onSelect,
  isFilter
}: ComboboxPropsT) => {
  const { control, setValue } = useFormContext()
  const { formatMessage: fm } = useIntl()

  const [open, setOpen] = useState(false)

  const [query, setQuery] = useState<string>('')
  const { data: options } = useCodebook(codebook, { limit, filter, searchText: query })

  const handleClear = () => {
    setQuery('')
    setValue(name, null)
    onSelect && onSelect(null)
  }

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState: { error } }) => (
          <HUICombobox
            as="div"
            {...field}
            onChange={value => {
              field.onChange(value)
              onSelect && onSelect(value)
            }}
            disabled={disabled}
            className={classNames('relative flex flex-col w-full mt-auto', className)}
          >
            {(label || customLabel) && (
              <HUICombobox.Label className="block text-sm font-medium text-gray-900">
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
                  'px-3 py-2 border placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm block w-full appearance-none text-left truncate',
                  field.value && !disabled ? 'pr-14' : 'pr-9',
                  rounded,
                  error ? 'border-red-500' : 'border-gray-300',
                  disabled ? 'bg-gray-100' : '',
                  isFilter ? field.value && 'border-2 border-lime-500' : ''
                )}
              />
              {field.value && !disabled && (
                <div
                  onClick={handleClear}
                  className="absolute mr-7 inset-y-0 right-0 flex items-center rounded-r-md px-1 focus:outline-none cursor-pointer text-gray-200  hover:text-red-500"
                >
                  <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                <ChevronDownIcon
                  className="h-4 w-4 text-gray-500"
                  aria-hidden="true"
                  onClick={() => {
                    setOpen(true)
                  }}
                />
              </div>
            </div>

            {options?.data && options.data.length > 0 && (
              <HUICombobox.Options
                className={classNames(
                  'absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                  position === 'top' ? 'bottom-full' : 'top-full'
                )}
              >
                {options.data.map(item => (
                  <HUICombobox.Option
                    key={item.uid}
                    value={item}
                    defaultValue={''}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-primary-500 text-white' : 'text-gray-900'
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <Fragment>
                        <span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>
                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-primary-500'
                            )}
                          >
                            <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        )}
                      </Fragment>
                    )}
                  </HUICombobox.Option>
                ))}
              </HUICombobox.Options>
            )}
          </HUICombobox>
        )}
      />
      <CodebookTreeModal onSubmit={onSelect} codebook={codebook} open={open} setOpen={setOpen} name={name} />
    </Fragment>
  )
}
