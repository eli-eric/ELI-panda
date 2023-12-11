import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import usePermission from '@/hooks/usePermission'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { ROLE } from '@/types/constants/roles'

import type { CatalogueItemDetail } from '../../types/responses'

interface Props {
  detail: CatalogueItemDetail
  index: number
}

const GroupProperty = ({ detail, index }: Props) => {
  const disabled = !usePermission([ROLE.CATALOGUE_EDIT])
  const { setValue } = useFormContext()

  React.useEffect(() => {
    Object.keys(detail).forEach(key => {
      setValue(`details.${index}.${key}`, detail[key])
    })
  }, [detail, index, setValue])

  if (PROPERTY_TYPE.TEXT === detail.property.type.uid) {
    return (
      <Input
        name={`details.${index}.value`}
        unit={detail.property.unit?.name}
        label={detail.property.name}
        disabled={disabled}
        rounded={'rounded-md'}
        defaultValue={detail.property.defaultValue}
      />
    )
  }
  if (PROPERTY_TYPE.NUMBER === detail.property.type.uid) {
    return (
      <Input
        name={`details.${index}.value`}
        unit={detail.property.unit?.name}
        label={detail.property.name}
        disabled={disabled}
        rounded={'rounded-md'}
        type={'number'}
        defaultValue={detail.property.defaultValue}
      />
    )
  }
  if (PROPERTY_TYPE.BOOLEAN === detail.property.type.uid) {
    return (
      <Listbox
        name={`details.${index}.value`}
        disabled={disabled}
        unit={detail.property.unit?.name}
        customLabel={detail.property.name}
        rounded={'rounded-md'}
        customOptions={['true', 'false']}
        defaultValue={detail.property.defaultValue}
      />
    )
  }
  if (PROPERTY_TYPE.LIST === detail.property.type.uid) {
    return (
      <Listbox
        name={`details.${index}.value`}
        allowEmptyOption={true}
        unit={detail.property.unit?.name}
        disabled={disabled}
        customLabel={detail.property.name}
        rounded={'rounded-md'}
        customOptions={detail.property.listOfValues}
        defaultValue={detail.property.defaultValue}
      />
    )
  }
  return (
    <Input name={`details.${index}.value`} disabled={disabled} label={detail.property.name} rounded={'rounded-md'} />
  )
}

export default GroupProperty
