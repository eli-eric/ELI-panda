import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { InputWithError } from 'src/components/ui/form/Input'
import { SelectWithError } from 'src/components/ui/form/Select'

import { Button } from '@/components/ui/Buttons'
import { CategoryFormType, Property } from '@/types/catalogue/categoryFormTypes'
import {
  defaultBoolOptions,
  PROPERTY_INPUT_TYPE,
  PROPERTY_TYPE,
  propertyTypes,
  units,
} from '@/types/catalogue/constants'

const ValueItem = ({ removeValue, index, name, errors }) => {
  const { register } = useFormContext<CategoryFormType>()
  const handleRemoveValue = () => {
    removeValue(index)
  }
  return (
    <div className="flex">
      <InputWithError
        rounded="rounded-l-md"
        register={register}
        name={`${name}.value`}
        placeholder="Value"
        isError={!errors?.value?.message}
      />
      <Button onClick={handleRemoveValue}>
        <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
      </Button>
    </div>
  )
}
interface Props {
  name: `groups.${number}.properties.${number}`
  removeProp: (index: number) => void
  index: number
  length: number
  errors: FieldErrors<Property> | undefined
}

const PropertyItem = ({ name, removeProp, index, errors }: Props) => {
  const { register, watch, control, unregister } =
    useFormContext<CategoryFormType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.listOfValues`,
  })
  const handleRemoveProp = () => {
    removeProp(index)
  }
  const handleAddValue = () => {
    append({ value: '' })
  }
  const type = watch(`${name}.typeUID`)
  const listOfValues = watch(`${name}.listOfValues`) || []

  const getDefaultOption = (name, disabled = false) => {
    return { value: '', name, disabled }
  }

  useEffect(() => {
    if (type !== PROPERTY_TYPE.LIST) {
      unregister(`${name}.listOfValues`)
    }
  }, [type, unregister, name])

  return (
    <div className="flex">
      <div className="flex-col flex-grow">
        <div className="flex flex-row flex-grow max-md:flex-wrap">
          <InputWithError
            register={register}
            name={`${name}.name`}
            placeholder="Property name"
            rounded="rounded-l-md"
            isError={!errors?.name?.message}
          />
          <SelectWithError
            register={register}
            name={`${name}.typeUID`}
            isError={!errors?.typeUID?.message}
            options={[
              getDefaultOption('Select type', true),
              ...propertyTypes.map(type => ({ ...type, value: type.uid })),
            ]}
          />
          <SelectWithError
            register={register}
            name={`${name}.unitUID`}
            isError={!errors?.unitUID?.message}
            options={[
              getDefaultOption('Select Unit'),
              ...units.map(unit => ({ ...unit, value: unit.uid })),
            ]}
          />

          {type === PROPERTY_TYPE.LIST || type === PROPERTY_TYPE.BOOLEAN ? (
            <SelectWithError
              register={register}
              name={`${name}.default`}
              isError={!errors?.typeUID?.message}
              options={
                type === PROPERTY_TYPE.LIST
                  ? [
                      getDefaultOption('Select default'),
                      ...listOfValues.map(value => ({ value: value.value })),
                    ]
                  : [getDefaultOption('Select default'), ...defaultBoolOptions]
              }
            />
          ) : (
            <InputWithError
              register={register}
              name={`${name}.default`}
              type={PROPERTY_INPUT_TYPE[type]}
              placeholder="Default value"
              disabled={type === ''}
              isError={!errors?.defaultValue?.message}
            />
          )}
          <Button onClick={handleRemoveProp}>
            <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
          </Button>
        </div>
        {type === PROPERTY_TYPE.LIST && (
          <div className="flex flex-col">
            <h3 className="text-sm">List of Values:</h3>
            <div className="flex flex-wrap">
              {fields.map((field, index) => (
                <ValueItem
                  removeValue={remove}
                  key={field.id}
                  index={index}
                  errors={errors?.listOfValues && errors?.listOfValues[index]}
                  name={`${name}.listOfValues.${index}`}
                />
              ))}
              <Button onClick={handleAddValue}>
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyItem
