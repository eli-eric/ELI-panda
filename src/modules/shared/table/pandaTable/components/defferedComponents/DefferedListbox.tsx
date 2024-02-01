import { Listbox as HUIListbox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { useDeferredValue, useEffect, useState } from 'react'

import { type CodebookType, useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import { classNames } from '@/utils'

export type ListboxPropsT = {
  codebook?: CODEBOOK
  position?: 'top' | 'bottom'
  allowEmptyOption?: boolean
  emptyOption?: string
  optionsSize?: 'sm' | 'md' | 'lg'
  unit?: string
  customLabel?: string
  codebookResponse?: CodebookType[]
  onChange: (value: any) => void
  className?: string
  value?: CodebookType
  //name: Path<any>
}

export const DefferedListbox = ({
  codebook,
  value: initialValue,
  optionsSize = 'md',
  allowEmptyOption = true,
  position = 'bottom',
  className,
  unit,
  onChange
}: ListboxPropsT) => {
  const { data } = useCodebook(codebook)
  const options = data?.data || []

  const [value, setValue] = useState<CodebookType | undefined>(initialValue)
  const defferedValue = useDeferredValue(value)

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValue(undefined)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (defferedValue === value) onChange(value)
  }, [defferedValue, value, onChange])

  return (
    <HUIListbox
      as="div"
      onChange={(v: CodebookType) => {
        setValue(v)
      }}
      className={classNames('relative flex flex-col w-full mt-auto', className)}
    >
      <div className="relative">
        <HUIListbox.Button
          className={classNames(
            'px-3 py-2 pb-2 border rounded-md placeholder-gray-300 border-gray-300  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm block w-full h-[38px] appearance-none text-left',
            value ? 'pr-14' : 'pr-9'
          )}
        >
          <span className="block truncate">{value?.name}</span>
          {value && value?.uid?.length > 0 && allowEmptyOption && (
            <div
              onClick={handleClear}
              className="absolute mr-7 inset-y-0 right-0 flex items-center rounded-r-md px-1 focus:outline-none cursor-pointer text-gray-200  hover:text-red-500"
            >
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            </div>
          )}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {unit && <span className="text-gray-400 sm:text-sm">{unit}</span>}
            <ChevronDownIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
          </div>
        </HUIListbox.Button>
      </div>
      {options?.length > 0 && (
        <HUIListbox.Options
          className={classNames(
            'absolute z-20 mt-1 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
            position === 'top' ? 'bottom-full' : 'top-full',
            optionsSize === 'sm' ? 'max-h-40' : optionsSize === 'lg' ? 'max-h-64' : 'max-h-60'
          )}
        >
          {options?.map((item, index) => (
            <HUIListbox.Option
              key={item.uid + index}
              value={item}
              className={({ active }) =>
                classNames(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-primary-500 text-white' : 'text-gray-900 dark:text-gray-200'
                )
              }
            >
              {({ active }) => {
                const selected = value?.uid === item.uid || (!value?.uid && item.uid === '')
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
                        <CheckIcon
                          className="h-4 w-4

"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </>
                )
              }}
            </HUIListbox.Option>
          ))}
        </HUIListbox.Options>
      )}
    </HUIListbox>
  )
}
