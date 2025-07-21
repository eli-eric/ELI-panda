import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Input } from '@/components/form/inputs'

import type { CategoryFormType } from '../../types'
import MoveButtons from './MoveButtons'
import PropertyList from './PropertyList'

interface groupProps {
  name: `groups.${number}`
  remove: (index: number) => void
  index: number
  lenght: number

  moveUp: (index: number) => void
  moveDown: (index: number) => void
}

const Group = ({
  name,
  remove,
  index,
  moveDown,
  moveUp,
  lenght
}: groupProps) => {
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
            <MoveButtons
              moveDown={moveDown}
              moveUp={moveUp}
              lenght={lenght}
              index={index}
            />
            <Input name={`${name}.name`} placeholder="Group Name" />
            <Button onClick={handleRemoveGroup}>
              <Trash2 className="h-4 w-4 text-red-600" aria-hidden="true" />
            </Button>
          </span>
        </div>
      </div>
      <div className="relative px-3">
        <div className="w-full flex-1">
          <PropertyList name={name} />
        </div>
      </div>
    </div>
  )
}

const GroupList = () => {
  const { control } = useFormContext<CategoryFormType>()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'groups'
  })

  const handleAddGroup = () => {
    append({
      name: '',
      properties: [{ name: '', type: null, unit: null, defaultValue: '' }]
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
          <Button type="button" onClick={handleAddGroup}>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GroupList
