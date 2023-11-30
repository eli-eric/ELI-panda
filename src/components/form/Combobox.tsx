import { Combobox as HUICombobox } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { type CodebookFilter, type CodebookType, useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'
import { classNames } from '@/utils'

import { PlusButton } from '../Buttons'
import { ComboboxButton } from './components/ComboboxButton'
import { ComboboxInput } from './components/ComboboxInput'
import { ComboboxOption } from './components/ComboboxOption'
import { FormXMarkIcon } from './components/FormXMarkIcon'
import useAddCodebookValue from './shared/useAddCodebookValue'

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
    onSelect?: (item: CodebookType) => void
  }

const Combobox = ({
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
  codebookResponse,
  showAddButton = false,
  onClickIcon,
  onChange,
  onSelect
}: ComboboxPropsT) => {
  const { control, setValue } = useFormContext()
  const { formatMessage: fm } = useIntl()

  const [query, setQuery] = useState<string>('')
  const codebookResponseData = useMemo(() => ({ data: codebookResponse, metadata: undefined }), [codebookResponse])

  const { data } = useCodebook(codebook, { limit, filter, searchText: query })

  const options = useMemo(() => (data ? data : codebookResponseData), [data, codebookResponseData])
  const { getFormModal, setOpen } = useAddCodebookValue(options?.metadata)
  const [hasAddPermission, setHasAddPermission] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (showAddButton && options?.metadata?.roleEdit && session?.user?.roles) {
      const hasTargetPermission = session.user.roles.includes(options.metadata.roleEdit)
      setHasAddPermission(hasTargetPermission)
    }
  }, [options, session, showAddButton])

  const handleClear = () => {
    setQuery('')
    setValue(name, null)
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
              className={classNames('relative flex flex-col w-full', className)}
            >
              {(label || customLabel) && (
                <HUICombobox.Label className="block text-sm font-medium text-gray-900">
                  {customLabel ? customLabel : fm({ id: label })}
                </HUICombobox.Label>
              )}
              <div className="relative">
                <ComboboxInput
                  {...{
                    value: field.value,
                    error,
                    placeholder,
                    disabled,
                    rounded,
                    onChange: handleChange
                  }}
                />

                {field.value && !disabled && <FormXMarkIcon onClick={handleClear} />}
                <ComboboxButton onClick={onClickIcon} />
              </div>

              {options?.data && options.data.length > 0 && (
                <HUICombobox.Options
                  className={classNames(
                    'absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                    position === 'top' ? 'bottom-full' : 'top-full'
                  )}
                >
                  {options.data.map(item => (
                    <ComboboxOption key={item.uid} item={item} selected={field.value?.uid === item.uid} />
                  ))}
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
