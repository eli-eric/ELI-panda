import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'

import type { CategoryFormType } from '../../types'
import PropertyItem from './PropertyItem'

interface Props {
  name: `groups.${number}`
}

const PropertyList = ({ name }: Props) => {
  const { control } = useFormContext<CategoryFormType>()
  const groupName = useWatch({ control, name: `${name}.name` })
  const { fields, append, remove, move } = useFieldArray<CategoryFormType>({
    control,
    name: `${name}.properties`
  })

  const handleAddProp = () => {
    append({
      name: '',
      type: null,
      unit: null,
      defaultValue: ''
    })
  }

  const handleMoveDown = index => {
    if (index < fields.length - 1) move(index, index + 1)
  }
  const handleMoveUp = index => {
    if (index > 0) move(index, index - 1)
  }
  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">Group properties</div>

      {fields.length > 0 && (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <PropertyItem
              key={field.id}
              removeProp={remove}
              index={index}
              name={`${name}.properties.${index}`}
              length={fields.length}
              moveDown={handleMoveDown}
              moveUp={handleMoveUp}
              lenght={fields.length}
            />
          ))}
        </div>
      )}

      <Tooltip
        content={`Add property to group: ${groupName || 'Unnamed Group'}`}
      >
        <Button
          type="button"
          onClick={handleAddProp}
          variant="outline"
          size="sm"
          className="w-full border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </Tooltip>
    </div>
  )
}

export default PropertyList
