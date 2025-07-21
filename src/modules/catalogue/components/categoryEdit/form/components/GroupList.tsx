import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
  const { control } = useFormContext<CategoryFormType>()

  const handleRemoveGroup = () => {
    remove(index)
  }

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base w-full mr-2">
            <Input
              name={`${name}.name`}
              placeholder="Group name"
              className="w-full"
              label="Group name"
            />
          </CardTitle>
          <div className="flex items-center gap-2">
            <MoveButtons
              moveDown={moveDown}
              moveUp={moveUp}
              lenght={lenght}
              index={index}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemoveGroup}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2"></div>
      </CardHeader>
      <CardContent>
        <PropertyList name={name} />
      </CardContent>
    </Card>
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
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={handleAddGroup}
          variant="outline"
          className="border-dashed border-2 hover:border-solid"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>
      {fields.length > 0 && (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Group
              key={field.id}
              remove={remove}
              index={index}
              name={`groups.${index}`}
              moveUp={handleMoveUp}
              moveDown={handleMoveDown}
              lenght={fields.length}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default GroupList
