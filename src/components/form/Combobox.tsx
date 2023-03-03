import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { CodebookType, useCodebook } from '@/hooks/useCodebook'
import { CODEBOOK } from '@/types/constants/codebook'
import { FieldProps } from '@/types/form'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type ComboboxProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<T>
    codebook?: CODEBOOK
  }

const ComboboxComponent = <T extends FieldValues>({
  codebook,
  register,
  label,
  isError,
  placeholder,
  name,
  className,
  rounded = 'rounded-md'
}: ComboboxProps<T>) => {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<CodebookType | null>(null)
  const data = useCodebook(codebook, `?searchText=${query}&limit=10`, true)

  return (
    <Fragment>
      <Combobox
        as="div"
        value={selectedItem}
        onChange={(item: CodebookType | null) => {
          setSelectedItem(item)
        }}
        className={`${className} block z-20 relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
      >
        {label && (
          <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Combobox.Label>
        )}
        <div className="relative">
          <Combobox.Input
            {...register(name as Path<T>)}
            autoComplete="off"
            placeholder={placeholder}
            className={classNames(
              className,
              rounded,
              isError ? 'border-red-500' : 'border-gray-300',
              'px-3 py-2 border placeholder-gray-400  focus:border-primary-500 mt-2 focus:outline-none focus:ring-primary-500 sm:text-sm',
              'block w-full appearance-none'
            )}
            onChange={event => setQuery(event.target.value)}
            displayValue={(item: CodebookType) => item?.name}
          />
          <input
            {...register(name as Path<T>)}
            type="hidden"
            defaultValue={selectedItem?.uid}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {data && data.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                      <span
                        className={classNames(
                          'block truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {item.name}
                      </span>

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
