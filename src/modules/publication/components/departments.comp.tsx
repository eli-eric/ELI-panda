import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
const { form } = message.publication

export const DepartmentsComponent = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'authorsDepartments',
    rules: { required: 'This field is required', minLength: 1 }
  })

  const { setValue, control } = useFormContext()
  const authorsDepartments = useWatch({ control, name: 'authorsDepartments' })

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
        <div key={item.id} className="flex w-full gap-2 pt-2">
          <Department key={item.id} name={`authorsDepartments.${index}`} />
          <button
            className="text-red-600 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-600 self-end pb-2"
            onClick={() => handleRemove(index)}
            disabled={fields.length === 1}
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      ))}
      <button
        className="text-gray-600 text-sm dark:text-gray-400 hover:text-primary-400  dark:hover:text-primary-600 pt-2 pl-2"
        onClick={handleAppend}
      >
        + Add Another Eli Department
      </button>
    </div>
  )
}

const Department = ({ name }) => {
  const { formatMessage: fm } = useIntl()
  return (
    <div className="flex w-full gap-2 pt-2">
      <Listbox
        name={`${name}.department`}
        label={form.department.label}
        placeholder={form.department.placeholder}
        codebook={CODEBOOK.DEPARTMENT}
      />
      <Input
        name={`${name}.authorsCount`}
        rounded="rounded-md"
        label={fm({ id: form.authorsCount.label })}
        type="number"
      />
    </div>
  )
}
