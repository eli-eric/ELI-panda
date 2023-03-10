import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { InputWithError } from '@/components/form/Input'
import { CategoryFormType, Group } from '@/types/catalogue/categoryFormTypes'

import PropertyList from './PropertyList'

interface groupProps {
  name: `groups.${number}`
  remove: (index: number) => void
  index: number

  errors: FieldErrors<Group> | undefined
}

const Group = ({ name, remove, index, errors }: groupProps) => {
  const { register } = useFormContext<CategoryFormType>()
  const handleRemoveGroup = () => {
    remove(index)
  }
  return (
    <div className=" flex flex-1 flex-col justify-between">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <InputWithError
              register={register}
              name={`${name}.name`}
              placeholder="group name"
              isError={!!errors?.name?.message}
              rounded="rounded-l-md"
            />
            <Button rounded="rounded-r-md" onClick={handleRemoveGroup}>
              <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
            </Button>
          </span>
        </div>
      </div>
      <div className="relative px-3">
        <div className="w-full flex-1">
          <PropertyList name={name} errors={errors && errors} />
        </div>
      </div>
    </div>
  )
}

const GroupList = () => {
  const { control, formState } = useFormContext<CategoryFormType>()
  const { fields, append, remove } = useFieldArray({ control, name: 'groups' })

  const handleAddGroup = () => {
    append({
      name: '',
      properties: [{ name: '', typeUID: '', unitUID: '', defaultValue: '' }]
    })
  }

  return (
    <div className="flex-1">
      <div className="flex-1">
        {fields.length > 0 && (
          <ul role="list">
            {fields.map((field, index) => (
              <li key={field.id} className="flex py-2 ">
                <Group
                  remove={remove}
                  index={index}
                  errors={
                    formState.errors.groups &&
                    (formState.errors.groups[index] as FieldErrors<Group> | undefined)
                  }
                  name={`groups.${index}`}
                  key={field.id}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <Button onClick={handleAddGroup}>
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GroupList
