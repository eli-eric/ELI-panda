import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Input } from 'components/ui/form/Input'
import { Select } from 'components/ui/form/Select'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CatalogueFormType } from 'types/catalogue'
import { propertyTypes, units } from 'types/catalogue/constants'

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
    name: `${name}.listOfValues` as 'groups.0.props.0.listOfValues'
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
  const listOfValues = watch(`${name}.listOfValues`)

  useEffect(() => {
    if (type !== '9b56eba5-d650-442c-9235-0f6fd3cc8a91') {
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
            name={`${name}.typeUID` as `groups.${number}.props.${number}.typeUID`}
            required
            options={[
              { value: '', name: 'Select type', code: 'empty', selected: true, disabled: true },
              ...propertyTypes.map(type => ({ ...type, value: type.uid }))
            ]}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />

          <Select
            register={register}
            name={`${name}.unitUID` as `groups.${number}.props.${number}.unitUID`}
            options={[
              { value: '', name: 'Select unit', code: 'default', selected: true, disabled: false },
              ...units.map(unit => ({ ...unit, value: unit.uid }))
            ]}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
          {type === '9b56eba5-d650-442c-9235-0f6fd3cc8a91' ? (
            listOfValues && (
              <Select
                register={register}
                name={`${name}.default`}
                options={[
                  { value: '', name: 'Default value', code: 'default', selected: true, disabled: false },
                  ...listOfValues.map(value => ({ value: value.value, code: value.value, name: value.value }))
                ]}
                className="block w-full appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              />
            )
          ) : type === '918766a8-a7c0-4361-b85d-21d7b75449bb' ? (
            <Select
              register={register}
              name={`${name}.default`}
              options={[
                { value: '', name: 'Default value', code: 'default', selected: true, disabled: false },
                { value: 1, name: 'true', code: 'true' },
                { value: 0, name: 'false', code: 'true' }
              ]}
              className="block w-full appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          ) : (
            <Input
              register={register}
              name={`${name}.default`}
              type={type === '' ? '' : type === '45f0d238-4067-4033-9e52-58f1d454b6d3' ? 'number' : 'text'}
              placeholder="default"
              disabled={type === ''}
              className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
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

        {type === '9b56eba5-d650-442c-9235-0f6fd3cc8a91' && (
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
