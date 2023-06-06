import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Input } from '@/components/form/Input'
import { SelectWithError } from '@/components/form/Select'
import { useCodebookSelectValues } from '@/hooks/fetch/useCodebook'
import type { CategoryFormType, Property } from '@/types/catalogue/categoryFormTypes'
import { defaultBoolOptions, PROPERTY_INPUT_TYPE, PROPERTY_TYPE } from '@/types/catalogue/constants'
import { CODEBOOK } from '@/types/constants/codebook'

import MoveButtons from './MoveButtons'

//TODO: fix bugs

//eslint-disable-next-line
const ValueItem = ({ removeValue, index, name, errors }) => {
  const { register } = useFormContext<CategoryFormType>()
  const handleRemoveValue = () => {
    removeValue(index)
  }

  return (
    <div className="flex">
      <Input
        rounded="rounded-l-md"
        register={register}
        name={`${name}.value`}
        placeholder="Value"
        isError={!!errors?.value?.message} //eslint-disable-line
      />
      <Button rounded="rounded-r-md" onClick={handleRemoveValue}>
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
  lenght: number
  moveDown: (index: number) => void

  moveUp: (index: number) => void
}

const PropertyItem = ({ name, removeProp, index, errors, moveDown, moveUp, lenght }: Props) => {
  const { register, watch, control, unregister } = useFormContext<CategoryFormType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.listOfValues`
  })
  const type = useWatch({ control, name: `${name}.typeUID` })
  const unit = useWatch({ control, name: `${name}.unitUID` })
  const units = useCodebookSelectValues(CODEBOOK.UNIT)
  const propertyTypes = useCodebookSelectValues(CODEBOOK.CATALOGUE_PROPERTY_TYPE)

  const handleRemoveProp = () => {
    removeProp(index)
  }
  const handleAddValue = () => {
    append({ value: '' })
  }

  const listOfValues = useMemo(() => watch(`${name}.listOfValues`) || [], [watch, name])

  const getDefaultOption = (name, disabled = false) => ({
    value: '',
    name,
    disabled
  })

  useEffect(() => {
    if (type !== PROPERTY_TYPE.LIST && listOfValues.length !== 0) {
      unregister(`${name}.listOfValues`)
    }
  }, [type, unregister, name, listOfValues])

  return (
    <div className="flex">
      <div className="flex-col flex-grow">
        <div className="flex flex-row flex-grow max-md:flex-wrap">
          <MoveButtons moveDown={moveDown} moveUp={moveUp} lenght={lenght} index={index} />

          <Input
            register={register}
            name={`${name}.name`}
            placeholder="Property name"
            isError={!!errors?.name?.message}
          />
          <SelectWithError
            register={register}
            name={`${name}.typeUID`}
            value={type}
            isError={!!errors?.typeUID?.message}
            options={propertyTypes && [getDefaultOption('Select type', true), ...propertyTypes]}
          />
          <SelectWithError
            register={register}
            name={`${name}.unitUID`}
            value={unit}
            isError={!!errors?.unitUID?.message}
            options={units ? [getDefaultOption('Select Unit'), ...units] : [getDefaultOption('Select Unit')]}
          />

          {type === PROPERTY_TYPE.LIST || type === PROPERTY_TYPE.BOOLEAN ? (
            <SelectWithError
              register={register}
              name={`${name}.defaultValue`}
              isError={!!errors?.typeUID?.message}
              options={
                type === PROPERTY_TYPE.LIST
                  ? [getDefaultOption('Select default'), ...listOfValues.map(value => ({ value: value.value }))]
                  : [getDefaultOption('Select default'), ...defaultBoolOptions]
              }
            />
          ) : (
            <Input
              register={register}
              name={`${name}.defaultValue`}
              type={PROPERTY_INPUT_TYPE[type]}
              placeholder="Default value"
              disabled={type === ''}
              isError={!!errors?.defaultValue?.message}
            />
          )}
          <Button rounded="rounded-r-md" onClick={handleRemoveProp}>
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
