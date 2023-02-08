import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Input } from 'components/ui/form/Input'
import { Select } from 'components/ui/form/Select'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CatalogueFormType } from 'types/catalogue'
import { defaultBoolOptions, PROPERTY_INPUT_TYPE, PROPERTY_TYPE, propertyTypes, units } from 'types/catalogue/constants'

const Value = ({ removeValue, index, name }) => {
  const { register } = useFormContext()
  const handleRemoveValue = () => {
    removeValue(index)
  }
  return (
    <div className="flex">
      <Input
        register={register}
        name={`${name}.value`}
        required
        type="text"
        placeholder="value"
        className="block appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
      />
      <button
        type="button"
        onClick={handleRemoveValue}
        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

interface Props {
  name: `groups.${number}.props.${number}`
  removeProp: (index: number) => void
  index: number
  length: number
}

const PropertyItem = ({ name, removeProp, index }: Props) => {
  const { register, watch, control, unregister } = useFormContext<CatalogueFormType>()
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

  const removeValue = index => {
    remove(index)
  }
  const type = watch(`${name}.typeUID`)
  const listOfValues = watch(`${name}.listOfValues`) || []

  const getDefaultOption = (name, disabled = false) => {
    return { value: '', name, selected: true, disabled }
  }

  useEffect(() => {
    if (type !== PROPERTY_TYPE.LIST) {
      unregister(`${name}.listOfValues`)
    }
  }, [type, unregister, name])

  return (
    <div className="flex">
      <div className="flex-col flex-grow">
        <div className="flex flex-row flex-grow">
          <Input
            register={register}
            name={`${name}.name`}
            type="text"
            required
            placeholder="prop name"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
          <Select
            register={register}
            name={`${name}.typeUID`}
            required
            options={[
              getDefaultOption('Select type', true),
              ...propertyTypes.map(type => ({ ...type, value: type.uid }))
            ]}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />

          <Select
            register={register}
            name={`${name}.unitUID`}
            options={[getDefaultOption('Select Unit'), ...units.map(unit => ({ ...unit, value: unit.uid }))]}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
          {type === PROPERTY_TYPE.LIST || type === PROPERTY_TYPE.BOOLEAN ? (
            <Select
              register={register}
              name={`${name}.default`}
              typeof={PROPERTY_INPUT_TYPE[type]}
              options={
                type === PROPERTY_TYPE.LIST
                  ? [getDefaultOption('Defaul value'), ...listOfValues.map(value => ({ value: value.value }))]
                  : defaultBoolOptions
              }
              className="block w-full appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          ) : (
            <Input
              register={register}
              name={`${name}.default`}
              type={PROPERTY_INPUT_TYPE[type]}
              placeholder="default"
              disabled={type === ''}
              className="block w-full appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          )}
          <button
            type="button"
            onClick={handleRemoveProp}
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {type === PROPERTY_TYPE.LIST && (
          <div>
            <h3>List of Values: </h3>
            <div className="flex flex-wrap">
              {fields.map((field, index) => (
                <Value removeValue={removeValue} key={field.id} index={index} name={`${name}.listOfValues.${index}`} />
              ))}
              <button
                type="button"
                onClick={handleAddValue}
                className="relative inline-flex text-sm items-center rounded-md border border-gray-300  px-4 py-2 hover:bg-gray-50"
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyItem
