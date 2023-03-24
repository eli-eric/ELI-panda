import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { InputWithError } from '@/components/form/Input'
import { CategoryFormType, Group } from '@/types/catalogue/categoryFormTypes'

import MoveButtons from './MoveButtons'
import PropertyList from './PropertyList'

interface groupProps {
  name: `groups.${number}`
  remove: (index: number) => void
  index: number
  lenght: number

  errors: FieldErrors<Group> | undefined

  moveUp: (index: number) => void
  moveDown: (index: number) => void
}

const Group = ({ name, remove, index, errors, moveDown, moveUp, lenght }: groupProps) => {
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
            <MoveButtons moveDown={moveDown} moveUp={moveUp} lenght={lenght} index={index} />
            <InputWithError
              register={register}
              name={`${name}.name`}
              placeholder="group name"
              isError={!!errors?.name?.message}
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
  const { fields, append, remove, move } = useFieldArray({ control, name: 'groups' })

  const handleAddGroup = () => {
    append({
      name: '',
      properties: [{ name: '', typeUID: '', unitUID: '', defaultValue: '' }]
    })
  }

  const handleMoveDown = index => {
    if (index < fields.length - 1) move(index, index + 1)
  }
  const handleMoveUp = index => {
    if (index > 0) move(index, index - 1)
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
                  errors={formState.errors.groups && (formState.errors.groups[index] as FieldErrors<Group> | undefined)}
                  name={`groups.${index}`}
                  key={field.id}
                  moveUp={handleMoveUp}
                  moveDown={handleMoveDown}
                  lenght={fields.length}
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
