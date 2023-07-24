import { Listbox as HUIListbox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { classNames } from '@/helpers'
import { type CodebookType, useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'

export type ListboxPropsT = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    codebook?: CODEBOOK
    position?: 'top' | 'bottom'
    allowEmptyOption?: boolean
    emptyOption?: string
    optionsSize?: 'sm' | 'md' | 'lg'
    customOptions?: CodebookType[]
    unit?: string
    customLabel?: string
    useFirstRender?: boolean
    //name: Path<any>
  }

const Listbox = ({
  codebook,
  optionsSize = 'md',
  name,
  label,
  disabled,
  allowEmptyOption = false,
  emptyOption = 'None',
  position = 'bottom',
  className,
  rounded = 'rounded-md',
  unit,
  customOptions,
  customLabel
}: ListboxPropsT) => {
  const { control, setValue } = useFormContext()
  const intl = useIntl()

  const codebookOptions = useCodebook(codebook)

  const options = useMemo(() => {
    if (customOptions) return customOptions
    const targetOptions: CodebookType[] = []
    if (allowEmptyOption) {
      targetOptions.push({ uid: '', name: emptyOption })
    }
    if (codebookOptions?.data) {
      targetOptions.push(...codebookOptions.data)
    }
    return targetOptions
  }, [allowEmptyOption, emptyOption, codebookOptions, customOptions])

  const handleChange = (value: any) => (value?.uid === '' ? null : value)

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValue(name, null)
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState: { error } }) => (
        <HUIListbox
          as="div"
          {...field}
          onChange={v => field.onChange(handleChange(v))}
          disabled={disabled}
          className={classNames('relative flex flex-col w-full mt-auto', className)}
        >
          {(customLabel || label) && (
            <HUIListbox.Label className="block text-sm font-medium text-gray-900">
              {customLabel ? customLabel : intl.formatMessage({ id: label })}
            </HUIListbox.Label>
          )}
          <div className="relative">
            <HUIListbox.Button
              className={classNames(
                'px-3 py-2 pb-2 border placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm block w-full h-[38px] appearance-none text-left',
                field.value && !disabled ? 'pr-14' : 'pr-9',
                rounded,
                error ? 'border-red-500' : 'border-gray-300',
                disabled ? 'bg-gray-100' : ''
              )}
            >
              <span className="block truncate">{customOptions ? field.value : field?.value?.name || emptyOption}</span>
              {field.value?.uid?.length > 0 && !disabled && allowEmptyOption && (
                <div
                  onClick={handleClear}
                  className="absolute mr-7 inset-y-0 right-0 flex items-center rounded-r-md px-1 focus:outline-none cursor-pointer text-gray-200  hover:text-red-500"
                >
                  <XMarkIcon className="h-5 w-5 " aria-hidden="true" />
                </div>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                {unit && <span className="text-gray-400 sm:text-sm">{unit}</span>}
                <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
            </HUIListbox.Button>
          </div>
          {options?.length > 0 && (
            <HUIListbox.Options
              className={classNames(
                'absolute z-20 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                position === 'top' ? 'bottom-full' : 'top-full',
                optionsSize === 'sm' ? 'max-h-40' : optionsSize === 'lg' ? 'max-h-64' : 'max-h-60'
              )}
            >
              {options.map((item, index) => (
                <HUIListbox.Option
                  key={item.uid + index}
                  value={customOptions ? item.uid : item.uid === '' ? null : item}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-primary-500 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active }) => {
                    const selected = field.value?.uid === item.uid || (!field.value?.uid && item.uid === '')
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
      )}
    />
  )
}

export default Listbox
