import { TrashIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import { Input } from '@/components/form/inputs'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { usePublicationFields } from '../hooks/usePublicationFields'
import { DepartmentListbox } from './department.listbox'
const { form, addDepartmentButton } = message.publication

export const DepartmentsComponent = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'authorsDepartments',
    rules: { required: 'This field is required', minLength: 1 }
  })
  const disabled = !useAccessControl(ROLE.PUBLICATIONS_EDIT)()

  const { setValue, control } = useFormContext()
  const authorsDepartments = useWatch({ control, name: 'authorsDepartments' })

  const { eliAuthorsCount } = usePublicationFields()

  useEffect(() => {
    const eliAuthorsCountSum = authorsDepartments.reduce((acc, curr) => {
      return Number(acc) + Number(curr['authorsCount'])
    }, 0)
    setValue('eliAuthorsCount', eliAuthorsCountSum)
  }, [authorsDepartments, setValue])

  const handleAppend = () => {
    append({ department: null, authorsCount: '' })
  }

  const handleRemove = (index: number) => {
    remove(index)
  }

  return (
    <div className="w-full">
      {fields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-12 w-full gap-2 pt-2">
          <Department
            key={item.id}
            name={`authorsDepartments.${index}`}
            disabled={disabled}
          />
          {!disabled && (
            <div className="col-span-1">
              <button
                className="text-red-600 dark:text-gray-400 justify-end hover:text-orange-400 dark:hover:text-orange-600 self-end pt-6"
                onClick={() => handleRemove(index)}
                disabled={fields.length === 1}
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="grid grid-cols-12 pt-2">
        {!disabled && (
          <div className="col-span-6 items-center">
            <button
              className="text-gray-600 underline text-sm dark:text-gray-400 hover:text-orange-400  dark:hover:text-orange-600 pt-2 pl-2"
              onClick={handleAppend}
            >
              <FormattedMessage id={addDepartmentButton} />
            </button>
          </div>
        )}
        <Input {...eliAuthorsCount} className="col-span-12 pt-4" />
      </div>
    </div>
  )
}

type DepartmentProps = {
  name: string
  disabled: boolean
}

const Department = ({ name, disabled }: DepartmentProps) => {
  const { formatMessage: fm } = useIntl()
  return (
    <Fragment>
      <DepartmentListbox name={`${name}.department`} disabled={disabled} />
      <Input
        name={`${name}.authorsCount`}
        rounded="rounded-md"
        label={fm({ id: form.authorsCount.label })}
        type="number"
        disabled={disabled}
        className="col-span-5"
      />
    </Fragment>
  )
}
