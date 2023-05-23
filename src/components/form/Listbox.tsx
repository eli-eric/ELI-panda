import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Controller, type FieldValues, type Path, type UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'
import { type CodebookType, useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'

type ListBoxProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<T>
    codebook?: CODEBOOK
    isObject?: boolean
    position?: 'top' | 'bottom'
    emptyOption?: boolean
    emptyOptionName?: string
  }

const ListBox = <T extends FieldValues>({
  codebook,
  label,
  isError,
  disabled,
  placeholder,
  emptyOptionName = 'none',
  emptyOption = false,
  position = 'bottom',
  name,
  className,
  rounded = 'rounded-md'
}: ListBoxProps<T>) => {
  const codebookOptions = useCodebook(codebook)
  const [selectedOption, setSelectedOption] = useState<CodebookType | undefined>({ uid: '', name: emptyOptionName })

  // get form context
  const {
    control,
    formState: { defaultValues }
  } = useFormContext<T>()

  // add empty option if needed
  const codebookOption = useMemo(() => {
    if (emptyOption && codebookOptions) {
      const emptyOption = { uid: '', name: emptyOptionName }
      setSelectedOption(emptyOption)
      return [emptyOption, ...codebookOptions]
    }
    return codebookOptions
  }, [emptyOption, codebookOptions, setSelectedOption, emptyOptionName])

  // set default value
  useEffect(() => {
    if (defaultValues && defaultValues[name]) {
      if (codebookOption) {
        setSelectedOption(defaultValues[name])
      }
    }
  }, [codebookOption]) // eslint-disable-line

  useEffect(() => {}, [selectedOption])

  return (
    <Fragment>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { onChange } }) => (
          <Listbox
            as={'div'}
            value={selectedOption}
            onChange={item => {
              onChange(item)
              setSelectedOption(item)
            }}
            disabled={disabled}
            className={classNames(
              'block relative w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
              className
            )}
          >
            {(
              { open } // eslint-disable-line
            ) => (
              <>
                {label && <Listbox.Label className="block text-sm font-medium text-gray-900">{label}</Listbox.Label>}
                <div className="relative">
                  <div className="w-full">
                    <Listbox.Button className={classNames('w-full')}>
                      <span
                        className={classNames(
                          'px-3 py-2 pb-2 border placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm block w-full h-[38px] appearance-none text-left',
                          rounded,
                          className,
                          isError ? 'border-red-500' : 'border-gray-300',
                          disabled ? 'bg-gray-100' : ''
                        )}
                      >
                        {selectedOption?.name || placeholder}
                      </span>
                      <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                      </div>
                    </Listbox.Button>
                  </div>
                  {codebookOption && codebookOption.length > 0 && (
                    <Listbox.Options
                      className={classNames(
                        'absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                        position === 'top' ? 'bottom-full' : 'top-full' // určení pozice výběrového seznamu
                      )}
                    >
                      {codebookOption.map(item => (
                        <Listbox.Option
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
                              <span className={classNames('block truncate', selected && 'font-semibold')}>
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
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  )}
                </div>
              </>
            )}
          </Listbox>
        )}
      />
    </Fragment>
  )
}

export default ListBox
