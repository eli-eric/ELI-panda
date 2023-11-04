import { Combobox as HUICombobox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { useDeferredValue, useEffect, useState } from 'react'

import { classNames } from '@/utils'
import { type CodebookType, useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'

type ComboboxPropsT = {
  codebook?: CODEBOOK
  position?: 'top' | 'bottom'
  emptyOption?: string
  placeholder?: string
  onChange: (value: any) => void
  className?: string
  value?: CodebookType
}

export const DefferedCombobox = ({
  codebook,
  value: initialValue,
  placeholder,
  position = 'bottom',
  className,
  onChange
}: ComboboxPropsT) => {
  const [query, setQuery] = useState<string>(initialValue?.name || '')
  const defferedQuery = useDeferredValue(query)
  const { data } = useCodebook(codebook, { searchText: defferedQuery, limit: 20 })

  const options = data?.data || []

  const [value, setValue] = useState<CodebookType | undefined>(initialValue)
  const defferedValue = useDeferredValue(value)

  const handleClear = () => {
    setValue(undefined)
    setQuery('')
  }
  useEffect(() => {
    setValue(initialValue)
    setQuery(initialValue?.name || '')
  }, [initialValue])

  useEffect(() => {
    if (defferedValue === value) onChange(value)
  }, [defferedValue, value, onChange])

  return (
    <HUICombobox
      as="div"
      value={value}
      onChange={(v: CodebookType) => {
        setValue(v)
        setQuery(v?.name || '')
      }}
      className={classNames('relative flex flex-col w-full mt-auto', className)}
    >
      <div className="relative">
        <HUICombobox.Input
          onChange={e => {
            setQuery(e.target.value)
          }}
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          className={classNames(
            'px-3 py-2 pb-2 border rounded-md placeholder-gray-300 border-gray-300  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm block w-full h-[38px] appearance-none text-left',
            value ? 'pr-14' : 'pr-9'
          )}
        />
        {value && (
          <div
            onClick={handleClear}
            className="absolute mr-7 inset-y-0 right-0 flex items-center rounded-r-md px-1 focus:outline-none cursor-pointer text-gray-200  hover:text-red-500"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
        <HUICombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon className="h-4 w-4text-gray-500" aria-hidden="true" />
        </HUICombobox.Button>
      </div>

      {options && options.length > 0 && (
        <HUICombobox.Options
          className={classNames(
            'absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
            position === 'top' ? 'bottom-full' : 'top-full'
          )}
        >
          {options?.map(item => (
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
              {({ active }) => {
                const selected = value?.uid === item.uid
                return (
                  <>
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
                  </>
                )
              }}
            </HUICombobox.Option>
          ))}
        </HUICombobox.Options>
      )}
    </HUICombobox>
  )
}
