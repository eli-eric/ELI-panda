import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'

import {
  defaultBoolOptions,
  PROPERTY_INPUT_TYPE,
  PROPERTY_TYPE
} from '@/types/catalogue/constants'
import { CODEBOOK } from '@/types/constants/codebook'
import type { CategoryFormType } from '../../types'
import MoveButtons from './MoveButtons'

//TODO: fix bugs

//eslint-disable-next-line
const ValueItem = ({ removeValue, index, name }) => {
  const handleRemoveValue = () => {
    removeValue(index)
  }

  return (
    <div className="flex">
      <Input
        rounded="rounded-l-md"
        name={`${name}.value`}
        placeholder="Value"
      />
      <Button rounded="rounded-r-md" onClick={handleRemoveValue}>
        <TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" />
      </Button>
    </div>
  )
}
interface Props {
  name:
    | `groups.${number}.properties.${number}`
    | `physicalItemProperties.${number}`
  removeProp: (index: number) => void
  index: number
  length: number
  lenght: number
  moveDown: (index: number) => void

  moveUp: (index: number) => void
}

const PropertyItem = ({
  name,
  removeProp,
  index,
  moveDown,
  moveUp,
  lenght
}: Props) => {
  const { watch, control, unregister } = useFormContext<CategoryFormType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.listOfValues`
  })

  const handleRemoveProp = () => {
    removeProp(index)
  }
  const handleAddValue = () => {
    append({ value: '' })
  }
  const type = useWatch({ control, name: `${name}.type` })

  //eslint-disable-next-line
  const listOfValues = watch(`${name}.listOfValues`) || []

  /* const getDefaultOption = (name, disabled = false) => ({
    value: '',
    name,
    disabled
  }) */

  useEffect(() => {
    if (type?.uid !== PROPERTY_TYPE.LIST && listOfValues.length !== 0) {
      unregister(`${name}.listOfValues`)
    }
  }, [type, unregister, name, listOfValues])

  const getDefaultField = (type?: PROPERTY_TYPE | string) => {
    switch (type) {
      case PROPERTY_TYPE.LIST:
        return (
          <Listbox
            rounded="rounded-l-md"
            name={`${name}.defaultValue`}
            allowEmptyOption={true}
            emptyOption="Select default"
            customOptions={[...listOfValues.map(value => value.value)]}
          />
        )
      case PROPERTY_TYPE.BOOLEAN:
        return (
          <Listbox
            rounded="rounded-l-md"
            name={`${name}.defaultValue`}
            allowEmptyOption={true}
            emptyOption="Select default"
            customOptions={[...defaultBoolOptions]}
          />
        )
      case PROPERTY_TYPE.RANGE:
        return null
      default:
        return (
          <Input
            rounded="rounded-l-md"
            name={`${name}.defaultValue`}
            type={type && PROPERTY_INPUT_TYPE[type]}
            placeholder="Default value"
            disabled={!type}
          />
        )
    }
  }

  return (
    <div className="flex">
      <div className="flex-col flex-grow">
        <div className="flex flex-row flex-grow max-md:flex-wrap">
          <MoveButtons
            moveDown={moveDown}
            moveUp={moveUp}
            lenght={lenght}
            index={index}
          />
          <Input
            name={`${name}.name`}
            placeholder="Property name"
            rounded="rounded-r-md"
          />
          <Listbox
            name={`${name}.type`}
            optionsSize={'sm'}
            emptyOption="Select type"
            allowEmptyOption={false}
            codebook={CODEBOOK.CATALOGUE_PROPERTY_TYPE}
          />
          <Listbox
            name={`${name}.unit`}
            optionsSize={'sm'}
            emptyOption="Select unit"
            allowEmptyOption={true}
            codebook={CODEBOOK.UNIT}
          />
          {getDefaultField(type?.uid)}
          <Button rounded="rounded-r-md" onClick={handleRemoveProp}>
            <TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" />
          </Button>
        </div>
        {type?.uid === PROPERTY_TYPE.LIST && (
          <div className="flex flex-col">
            <h3 className="text-sm">List of Values:</h3>
            <div className="flex flex-wrap">
              {fields.map((field, index) => (
                <ValueItem
                  removeValue={remove}
                  key={field.id}
                  index={index}
                  name={`${name}.listOfValues.${index}`}
                />
              ))}
              <Button onClick={handleAddValue}>
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyItem
