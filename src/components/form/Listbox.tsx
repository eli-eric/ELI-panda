import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { FieldValues, Path, PathValue, useFormContext, UseFormRegister } from 'react-hook-form'

import { classNames } from '@/helpers'
import { CodebookType, useCodebook } from '@/hooks/useCodebook'
import { CODEBOOK } from '@/types/constants/codebook'
import { FieldProps } from '@/types/form'

type ListBoxProps<T extends FieldValues> = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegister<T>
    codebook?: CODEBOOK
    isObject?: boolean
    position?: 'top' | 'bottom'
    emptyOption?: boolean
  }

const ListBox = <T extends FieldValues>({
  codebook,
  label,
  isError,
  disabled,
  placeholder,
  emptyOption = false,
  position = 'bottom',
  name,
  className,
  rounded = 'rounded-md'
}: ListBoxProps<T>) => {
  const {
    setValue,
    formState: { defaultValues }
  } = useFormContext<T>()
  const codebookOptions = useCodebook(codebook)
  const [selectedOption, setSelectedOption] = useState<CodebookType | null>(null)

  const codebookOption = useMemo(() => {
    if (emptyOption && codebookOptions) {
      const emptyOption: CodebookType = { uid: '', name: 'none' }
      setSelectedOption(emptyOption)
      setValue(name as Path<T>, null as PathValue<T, Path<T>>)
      return [emptyOption, ...codebookOptions]
    }
    return codebookOptions
  }, [emptyOption, codebookOptions, name, setValue])

  useEffect(() => {
    if (codebookOption && !emptyOption) {
      setSelectedOption(codebookOption[0])
      setValue(name as Path<T>, codebookOption[0] as PathValue<T, Path<T>>)
    }
  }, [codebookOption, name]) // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeHandler = (item: CodebookType | null) => {
    setSelectedOption(item)
    if (item?.uid === '') {
      setValue(name as Path<T>, null as PathValue<T, Path<T>>)
    } else {
      setValue(name as Path<T>, item as PathValue<T, Path<T>>)
    }
  }

  useEffect(() => {
    if (codebookOption && codebookOption.length > 0) {
      if (defaultValues && defaultValues[name]) {
        setSelectedOption(defaultValues[name] as CodebookType)
        setValue(name as Path<T>, defaultValues[name] as PathValue<T, Path<T>>)
      }
    }
  }, [defaultValues, name, setValue, codebookOption])

  return (
    <Fragment>
      <Listbox
        as={'div'}
        value={selectedOption}
        onChange={onChangeHandler}
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
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              )}
            </div>
          </>
        )}
      </Listbox>
    </Fragment>
  )
}

export default ListBox
