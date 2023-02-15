import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { PlusIconButton } from '@/components/ui/Buttons'
import { CatalogueFormType, Group } from '@/types/catalogue/catalogueTypes'

import PropertyItem from './PropertyItem'

interface Props {
  name: `groups.${number}`
  errors: FieldErrors<Group> | undefined
}

const PropertyList = ({ name, errors }: Props) => {
  const { control } = useFormContext<CatalogueFormType>()
  const { fields, append, remove } = useFieldArray<CatalogueFormType>({
    control,
    name: `${name}.properties`
  })

  const handleAddProp = () => {
    append({ name: '', typeUID: '', unitUID: '', default: '' })
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
              errors={errors?.properties && errors?.properties[index]}
            />
          </li>
        ))}
      </ul>
      <PlusIconButton onClickAction={handleAddProp} />
    </div>
  )
}

export default PropertyList
