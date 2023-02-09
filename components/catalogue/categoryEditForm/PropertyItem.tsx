import { InputWithError } from 'components/ui/form/Input'
import { SelectWithError } from 'components/ui/form/Select'
import { PlusIconButton, TrashIconButton } from 'components/ui/IconButtons'
import { useEffect } from 'react'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { CatalogueFormType, Prop } from 'types/catalogue/catalogueTypes'
import { defaultBoolOptions, PROPERTY_TYPE, propertyTypes, units } from 'types/catalogue/constants'

const ValueItem = ({ removeValue, index, name, errors }) => {
  const { register, formState } = useFormContext<CatalogueFormType>()
  const handleRemoveValue = () => {
    removeValue(index)
  }

  useEffect(() => {
    console.log(formState.errors)
  }, [formState])

  return (
    <div className="flex">
      <InputWithError
        rounded="rounded-l-md"
        register={register}
        name={`${name}.value`}
        placeholder="value"
        isError={!errors?.value?.message}
      />
      <TrashIconButton onClickAction={handleRemoveValue} />
    </div>
  )
}

interface Props {
  name: `groups.${number}.props.${number}`
  removeProp: (index: number) => void
  index: number
  length: number
  errors: FieldErrors<Prop> | undefined
}

const PropertyItem = ({ name, removeProp, index, errors }: Props) => {
  const { register, watch, control, unregister, formState } = useFormContext<CatalogueFormType>()
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
          <InputWithError
            register={register}
            name={`${name}.name`}
            placeholder="prop name"
            rounded="rounded-l-md"
            isError={!errors?.name?.message}
          />
          <SelectWithError
            register={register}
            name={`${name}.typeUID`}
            isError={!errors?.typeUID?.message}
            options={[
              getDefaultOption('Select type', true),
              ...propertyTypes.map(type => ({ ...type, value: type.uid }))
            ]}
          />
          <SelectWithError
            register={register}
            name={`${name}.unitUID`}
            isError={!errors?.unitUID?.message}
            options={[getDefaultOption('Select Unit'), ...units.map(unit => ({ ...unit, value: unit.uid }))]}
          />

          {type === PROPERTY_TYPE.LIST || type === PROPERTY_TYPE.BOOLEAN ? (
            <SelectWithError
              register={register}
              name={`${name}.default`}
              isError={!errors?.typeUID?.message}
              options={
                type === PROPERTY_TYPE.LIST
                  ? [getDefaultOption('Defaul value'), ...listOfValues.map(value => ({ value: value.value }))]
                  : defaultBoolOptions
              }
            />
          ) : (
            <InputWithError
              register={register}
              name={`${name}.default`}
              placeholder="default"
              disabled={type === ''}
              isError={!errors?.default?.message}
            />
          )}
          <TrashIconButton onClickAction={handleRemoveProp} />
        </div>

        {type === PROPERTY_TYPE.LIST && (
          <div>
            <h3>List of Values: </h3>
            <div className="flex flex-wrap">
              {fields.map((field, index) => (
                <ValueItem
                  removeValue={removeValue}
                  key={field.id}
                  index={index}
                  errors={errors?.listOfValues && errors?.listOfValues[index]}
                  name={`${name}.listOfValues.${index}`}
                />
              ))}
              <PlusIconButton onClickAction={handleAddValue} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyItem
