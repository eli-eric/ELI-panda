import React, { startTransition, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { RangeInput } from '@/components/form/RangeInput'
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

  useEffect(() => {
    startTransition(() => {
      Object.keys(detail).forEach(key => {
        setValue(`details.${index}.${key}`, detail[key])
      })
    })
  }, [detail, index, setValue])

  switch (detail.property.type.uid) {
    case PROPERTY_TYPE.TEXT:
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
    case PROPERTY_TYPE.NUMBER:
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
    case PROPERTY_TYPE.BOOLEAN:
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
    case PROPERTY_TYPE.LIST:
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
    case PROPERTY_TYPE.RANGE: {
      const label = detail.property.unit?.name
        ? `${detail.property.name} [${detail.property.unit?.name}]`
        : detail.property.name
      return (
        <RangeInput
          required
          name={`details.${index}.value`}
          label={label}
          disabled={disabled}
        />
      )
    }
    default: {
      return (
        <Input
          name={`details.${index}.value`}
          disabled={disabled}
          label={detail.property.name}
          rounded={'rounded-md'}
        />
      )
    }
  }
}

export default GroupProperty
