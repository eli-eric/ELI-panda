import { Combobox as HUICombobox } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import React, { useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { useCodebook } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import type { CodebookFilter, CodebookType } from '@/types/responses/codebook'
import { cx } from '@/utils'

import { PlusButton } from '../Buttons'
import { ComboboxButton } from './components/ComboboxButton'
import { ComboboxInput } from './components/ComboboxInput'
import { ComboboxOption } from './components/ComboboxOption'
import { FormXMarkIcon } from './components/FormXMarkIcon'
import useAddCodebookValue from './shared/useAddCodebookValue'

const messages = message.common

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
    hasClientFilter?: boolean
  }

const Combobox = ({
  codebook,
  hasClientFilter = false,
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
  codebookResponse,
  showAddButton = false,
  onClickIcon,
  onChange,
  onSelect,
  isFilter
}: ComboboxPropsT) => {
  const { control, setValue } = useFormContext()
  const { formatMessage: fm } = useIntl()

  const [query, setQuery] = useState<string>('')
  const codebookResponseData = useMemo(
    () => codebookResponse && { data: codebookResponse, metadata: undefined },
    [codebookResponse]
  )

  const { data: response } = useCodebook(codebook, {
    limit,
    filter,
    searchText: hasClientFilter ? undefined : query
  })

  const options = useMemo(() => {
    const data = codebookResponseData || response
    if (!data) return { data: [], metadata: undefined }
    if (query === '') return data
    if (hasClientFilter) {
      return {
        data: data.data.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
        ),
        metadata: codebookResponseData?.metadata
      }
    } else {
      return data
    }
  }, [hasClientFilter, query, codebookResponseData, response])

  const { getFormModal, setOpen } = useAddCodebookValue(options?.metadata)
  const { data: session } = useSession()

  const hasAddPermission =
    showAddButton &&
    options?.metadata?.roleEdit &&
    session?.user?.roles?.includes(options.metadata.roleEdit)

  const handleClear = () => {
    setQuery('')
    setValue(name, null)
    onSelect && onSelect(null)
  }

  const handleChange = e => {
    setQuery(e.target.value)
    onChange && onChange(e)
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState: { error } }) => (
          <>
            <HUICombobox
              as="div"
              {...field}
              onChange={value => {
                field.onChange(value)
                onSelect && onSelect(value)
              }}
              disabled={disabled}
              className={cx('relative flex flex-col w-full', className)}
            >
              {(label || customLabel) && (
                <HUICombobox.Label className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                  {customLabel ? customLabel : fm({ id: label })}
                </HUICombobox.Label>
              )}
              <div className="relative">
                <button
                  type="button"
                  className="relative h-full w-full"
                  onClick={onClickIcon}
                >
                  <ComboboxInput
                    {...{
                      value: field.value,
                      isFilter,
                      error,
                      placeholder,
                      disabled,
                      rounded,
                      onChange: handleChange
                    }}
                  />
                </button>

                {field.value && !disabled && (
                  <FormXMarkIcon onClick={handleClear} />
                )}
                <ComboboxButton onClick={onClickIcon} />
              </div>

              {options?.data && (
                <HUICombobox.Options
                  className={cx(
                    'absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                    position === 'top' ? 'bottom-full' : 'top-full'
                  )}
                >
                  {options.data.map(item => (
                    <ComboboxOption
                      key={item.uid}
                      item={item}
                      selected={field.value?.uid === item.uid}
                    />
                  ))}
                  {options.data.length === 0 && (
                    <span className="block px-4 py-2 text-gray-700 dark:text-gray-300">
                      {fm({ id: messages.noResults })}
                    </span>
                  )}
                </HUICombobox.Options>
              )}
            </HUICombobox>
            {hasAddPermission && (
              <PlusButton
                primary
                buttonSize="large"
                className="ml-1 px-[10px] py-[10px] self-end"
                type="button"
                onClick={() => setOpen(true)}
              />
            )}
          </>
        )}
      />
      {getFormModal()}
    </>
  )
}
export default Combobox
