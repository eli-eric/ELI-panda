import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { InputWithError } from 'src/components/ui/form/Input'

import { Button } from '@/components/ui/Buttons'
import { CatalogueFormType, Group } from '@/types/catalogue/catalogueTypes'

import PropertyList from './PropertyList'

interface groupProps {
  name: `groups.${number}`
  remove: (index: number) => void
  index: number

  errors: FieldErrors<Group> | undefined
}

const Group = ({ name, remove, index, errors }: groupProps) => {
  const { register } = useFormContext<CatalogueFormType>()
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
          <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <InputWithError
              register={register}
              name={`${name}.name`}
              placeholder="group name"
              isError={!errors?.name?.message}
              rounded="rounded-l-md"
            />
            <Button onClickAction={handleRemoveGroup}>
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
  const { control, formState } = useFormContext<CatalogueFormType>()
  const { fields, append, remove } = useFieldArray({ control, name: 'groups' })

  const handleAddGroup = () => {
    append({
      name: '',
      properties: [{ name: '', typeUID: '', unitUID: '', default: '' }],
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
                    formState.errors.groups && formState.errors.groups[index]
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
          <Button onClickAction={handleAddGroup}>
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GroupList
