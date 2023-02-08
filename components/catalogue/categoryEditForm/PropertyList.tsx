import { PlusIcon } from '@heroicons/react/24/outline'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CatalogueFormType } from 'types/catalogue'

import PropertyItem from './PropertyItem'

interface Props {
  name: `groups.${number}`
}

const PropertyList = ({ name }: Props) => {
  const { control } = useFormContext<CatalogueFormType>()
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.props` as 'groups.0.props' })

  // useEffect(() => {
  //   append({ name: '', typeUID: '', unitUID: '', default: '' })
  //   return () => remove(0)
  // }, [append, remove])

  const removeProp = (index: number) => {
    remove(index)
  }
  const handleAddProp = () => {
    append({ name: '', typeUID: '', unitUID: '', default: '' })
  }
  return (
    <div className="flex-1">
      <ul>
        {fields.map((field, index) => (
          <li key={field.id} className="border-b px-2 py-2">
            <PropertyItem
              removeProp={removeProp}
              index={index}
              name={`${name}.props.${index}`}
              length={fields.length}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="relative mt-1 inline-flex text-sm items-center rounded-md border border-gray-300  px-4 py-2 hover:bg-gray-50"
        onClick={handleAddProp}
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export default PropertyList
