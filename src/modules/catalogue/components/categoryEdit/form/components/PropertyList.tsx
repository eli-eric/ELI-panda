import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'

import type { CategoryFormType } from '../../types'
import PropertyItem from './PropertyItem'

interface Props {
  name: `groups.${number}`
}

const PropertyList = ({ name }: Props) => {
  const { control } = useFormContext<CategoryFormType>()
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
            <div key={field.id} className="p-3 border rounded-lg bg-muted/30">
              <PropertyItem
                removeProp={remove}
                index={index}
                name={`${name}.properties.${index}`}
                length={fields.length}
                moveDown={handleMoveDown}
                moveUp={handleMoveUp}
                lenght={fields.length}
              />
            </div>
          ))}
        </div>
      )}

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
    </div>
  )
}

export default PropertyList
