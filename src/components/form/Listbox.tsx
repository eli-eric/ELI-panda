import { Listbox as HUIListbox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import uuid from 'react-uuid'

import { type CodebookType, useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

import { FormXMarkIcon } from './components/FormXMarkIcon'

export type ListboxPropsT = FieldProps & {
  codebook?: CODEBOOK
  position?: 'top' | 'bottom'
  allowEmptyOption?: boolean
  emptyOption?: string
  optionsSize?: 'sm' | 'md' | 'lg'
  customOptions?: string[]
  unit?: string
  customLabel?: string
  codebookResponse?: CodebookType[]
  onChange?: (value: any) => void
  className?: string
  defaultValue?: CodebookType[] | string | null
  onClickIcon?: () => void
  //name: Path<any>
}

const Listbox = ({
  codebook,
  optionsSize = 'md',
  defaultValue = null,
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
  customLabel,
  codebookResponse,
  placeholder,
  onChange,
  onClickIcon
}: ListboxPropsT) => {
  const { control, setValue } = useFormContext()
  const intl = useIntl()

  const { data: codebookOptions } = useCodebook(codebook)

  const options = useMemo(() => {
    const targetOptions: CodebookType[] = []
    if (allowEmptyOption) {
      targetOptions.push({ uid: '', name: emptyOption })
    }
    if (customOptions) {
      targetOptions.push(...customOptions.map(item => ({ uid: item, name: item })))
    }
    if (codebookOptions?.data) {
      targetOptions.push(...codebookOptions.data)
    }
    if (codebookResponse) {
      targetOptions.push(...codebookResponse)
    }
    return targetOptions
  }, [allowEmptyOption, emptyOption, codebookOptions, customOptions, codebookResponse])

  const handleChange = (value: any) => (value?.uid === '' ? null : customOptions ? value.uid : value)

  const handleClear = () => {
    setValue(name, null)
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <HUIListbox
          as="div"
          {...field}
          onChange={v => {
            field.onChange(handleChange(v))
            onChange && onChange(v)
          }}
          disabled={disabled}
          className={classNames('relative flex flex-col w-full', className)}
        >
          {(customLabel || label) && (
            <HUIListbox.Label className="block text-sm font-medium text-gray-900">
              {customLabel ? customLabel : intl.formatMessage({ id: label })}
            </HUIListbox.Label>
          )}
          <div className="relative">
            <HUIListbox.Button
              className={classNames(
                'px-3 py-2 pb-2 border placeholder-gray-400 bg-white  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm block w-full h-[38px] appearance-none text-left',
                field.value && !disabled ? 'pr-14' : 'pr-9',
                rounded,
                error ? 'border-red-500' : 'border-gray-300',
                disabled ? 'bg-gray-100' : ''
              )}
              placeholder={placeholder}
            >
              <span className="block truncate">
                {field?.value?.name || field?.value || (customOptions && allowEmptyOption && emptyOption)}
              </span>
              {!disabled && allowEmptyOption && <FormXMarkIcon onClick={handleClear} />}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                {unit && <span className="text-gray-400 sm:text-sm">{unit}</span>}
                <ChevronDownIcon onClick={onClickIcon} className="h-4 w-4 text-gray-500" aria-hidden="true" />
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
              {options.map(item => (
                <HUIListbox.Option
                  key={item.uid || uuid()}
                  value={customOptions ? item : item.uid === '' ? null : item}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-primary-500 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active }) => {
                    const selected = customOptions ? field.value === item.uid : field.value?.uid === item.uid
                    return (
                      <>
                        <span className={classNames('block truncate', selected && 'font-semibold')}>{item?.name}</span>

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
