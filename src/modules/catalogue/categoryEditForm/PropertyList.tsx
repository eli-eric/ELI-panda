import { PlusIcon } from '@heroicons/react/24/outline'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { CategoryFormType, Group, Property } from '@/types/catalogue/categoryFormTypes'

import PropertyItem from './PropertyItem'

interface Props {
  name: `groups.${number}`
  errors: FieldErrors<Group> | undefined
}

const PropertyList = ({ name, errors }: Props) => {
  const { control } = useFormContext<CategoryFormType>()
  const { fields, append, remove } = useFieldArray<CategoryFormType>({
    control,
    name: `${name}.properties`
  })

  const handleAddProp = () => {
    append({ name: '', typeUID: '', unitUID: '', defaultValue: '' })
  }
  return (
    <div className="flex-1">
      <ul className="mb-2">
        {fields.map((field, index) => (
          <li key={field.id} className="border-b px-2 py-2">
            <PropertyItem
              removeProp={remove}
              index={index}
              name={`${name}.properties.${index}`}
              length={fields.length}
              errors={
                errors?.properties &&
                (errors?.properties[index] as FieldErrors<Property> | undefined)
              }
            />
          </li>
        ))}
      </ul>
      <Button onClick={handleAddProp}>
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  )
}

export default PropertyList
