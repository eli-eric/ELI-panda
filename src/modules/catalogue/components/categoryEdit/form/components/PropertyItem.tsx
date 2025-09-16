import { Plus, Trash2 } from 'lucide-react'
import { startTransition, useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import type { FieldArrayPath } from 'react-hook-form'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
    <div className="flex gap-2 mb-2">
      <Input name={`${name}`} placeholder="Enter value" className="flex-1" />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleRemoveValue}
        className="px-3"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
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
  const { fields, append, remove } = useFieldArray<
    CategoryFormType,
    FieldArrayPath<CategoryFormType>
  >({
    control,
    // name needs to be a FieldArrayPath for the form type; cast to satisfy TS
    name: `${name}.listOfValues` as FieldArrayPath<CategoryFormType>
  })

  const handleRemoveProp = () => {
    removeProp(index)
  }
  const handleAddValue = () => {
    append('' as any)
  }
  const type = useWatch({ control, name: `${name}.type` })
  const propertyName = useWatch({ control, name: `${name}.name` })

  //eslint-disable-next-line
  const listOfValues = watch(`${name}.listOfValues`) || []

  /* const getDefaultOption = (name, disabled = false) => ({
    value: '',
    name,
    disabled
  }) */

  useEffect(() => {
    startTransition(() => {
      if (type?.uid !== PROPERTY_TYPE.LIST && listOfValues.length !== 0) {
        unregister(`${name}.listOfValues`)
      }
    })
  }, [type, unregister, name, listOfValues])

  const getDefaultField = (type?: PROPERTY_TYPE | string) => {
    switch (type) {
      case PROPERTY_TYPE.LIST:
        return (
          <Listbox
            name={`${name}.defaultValue`}
            allowEmptyOption={true}
            emptyOption="Select default value"
            customOptions={listOfValues}
          />
        )
      case PROPERTY_TYPE.BOOLEAN:
        return (
          <Listbox
            name={`${name}.defaultValue`}
            allowEmptyOption={true}
            emptyOption="Select default value"
            customOptions={[...defaultBoolOptions]}
          />
        )
      case PROPERTY_TYPE.RANGE:
        return null
      default:
        return (
          <Input
            name={`${name}.defaultValue`}
            type={type && PROPERTY_INPUT_TYPE[type]}
            placeholder="Default value"
            disabled={!type}
          />
        )
    }
  }

  return (
    <Card className="mb-4 border-2 border-l-primary/50">
      <CardContent className="p-4 ">
        <div className="flex items-start gap-3">
          <MoveButtons
            moveDown={moveDown}
            moveUp={moveUp}
            lenght={lenght}
            index={index}
          />

          <div className="flex-1 space-y-4">
            {/* Property configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Property name
                </label>
                <Input
                  name={`${name}.name`}
                  placeholder="Enter property name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Property type
                </label>
                <Listbox
                  name={`${name}.type`}
                  optionsSize={'sm'}
                  emptyOption="Select type"
                  allowEmptyOption={false}
                  codebook={CODEBOOK.CATALOGUE_PROPERTY_TYPE}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Unit
                </label>
                <Listbox
                  name={`${name}.unit`}
                  optionsSize={'sm'}
                  emptyOption="Select unit"
                  allowEmptyOption={true}
                  codebook={CODEBOOK.UNIT}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Default value
                </label>
                {getDefaultField(type?.uid)}
              </div>
            </div>

            {/* Remove button */}
            <div className="flex justify-end border-t pt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveProp}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove property
              </Button>
            </div>

            {/* List of values section */}
            {type?.uid === PROPERTY_TYPE.LIST && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                  List of Values:
                </h4>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <ValueItem
                      removeValue={remove}
                      key={field.id}
                      index={index}
                      name={`${name}.listOfValues.${index}`}
                    />
                  ))}
                  <Tooltip
                    content={`Add value to property: ${propertyName || 'Unnamed Property'}`}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddValue}
                      className="w-full border-dashed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Value
                    </Button>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PropertyItem
