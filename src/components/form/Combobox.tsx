import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'
import { FieldValues, Path, PathValue, useFormContext, UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'
import { CodebookType, useCodebook } from '@/hooks/useCodebook'
import { CODEBOOK } from '@/types/constants/codebook'
import { FieldProps } from '@/types/form'

type ComboboxProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<T>
    codebook?: CODEBOOK
    isObject?: boolean
    position?: 'top' | 'bottom'
    limit?: number
  }

const ComboboxComponent = <T extends FieldValues>({
  codebook,
  register,
  label,
  isObject = false,
  isError,
  placeholder,
  name,
  className,
  disabled,
  limit = 10,
  position = 'bottom',
  rounded = 'rounded-md'
}: ComboboxProps<T>) => {
  const {
    setValue,
    formState: { defaultValues }
  } = useFormContext<T>()
  const [query, setQuery] = useState(defaultValues?.[name] || '')
  const [selectedItem, setSelectedItem] = useState<CodebookType | null>(null)
  const data = useCodebook(codebook, `?searchText=${query}&limit=${limit}`, true)

  useEffect(() => {
    if (defaultValues && defaultValues[name]) {
      setQuery(defaultValues[name] as string)
      setSelectedItem(defaultValues[name] as CodebookType)
    }
  }, [defaultValues, name])

  const clear = () => {
    setQuery('')
    setSelectedItem(null)
    setValue(name as Path<T>, isObject ? ({} as PathValue<T, Path<T>>) : ('' as PathValue<T, Path<T>>))
  }

  const restProps = isObject ? {} : { ...register(name as Path<T>) }

  return (
    <Fragment>
      <Combobox
        as="div"
        value={selectedItem}
        onChange={(item: CodebookType | null) => {
          setSelectedItem(item)
          if (isObject) {
            setValue(name as Path<T>, item as PathValue<T, Path<T>>)
          }
        }}
        disabled={disabled}
        className={`${className} block relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
      >
        {label && <Combobox.Label className="block text-sm font-medium text-gray-900">{label}</Combobox.Label>}
        <div className="relative">
          <div className="w-full">
            <Combobox.Button className="w-full">
              <Combobox.Input
                {...restProps}
                autoComplete="off"
                placeholder={placeholder}
                className={classNames(
                  'px-3 py-2 pb-2 border placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
                  'block w-full appearance-none',
                  rounded,
                  className,
                  isError ? 'border-red-500' : 'border-gray-300',
                  disabled ? 'bg-gray-100' : ''
                )}
                value={selectedItem?.name || query}
                onChange={event => setQuery(event.target.value)}
                displayValue={(item: CodebookType) => item?.name}
              />
              {!isObject && <input {...register(name as Path<T>)} type="hidden" value={selectedItem?.uid || ''} />}
              <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>

              {selectedItem && !disabled && (
                <div
                  onClick={() => {
                    clear()
                  }}
                  className="absolute pr-8 inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-200  hover:text-red-500" aria-hidden="true" />
                </div>
              )}
            </Combobox.Button>
          </div>

          {data && data.length > 0 && (
            <Combobox.Options
              className={classNames(
                'absolute',
                position === 'top' ? 'bottom-full' : 'top-full', // určení pozice výběrového seznamu
                'z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              )}
            >
              {data.map(item => (
                <Combobox.Option
                  key={item.uid}
                  value={item}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-primary-500 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active, selected }) => (
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
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </Fragment>
  )
}

export default ComboboxComponent
