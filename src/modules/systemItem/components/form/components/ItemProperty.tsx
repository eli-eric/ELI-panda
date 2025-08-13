import React from 'react'
import { useFormContext } from 'react-hook-form'

import { RangeInput } from '@/components/form/RangeInput'
import usePermission from '@/hooks/usePermission'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { ROLE } from '@/types/constants/roles'
import type { PhysicalItemProperty } from '@/types/responses/systems'

import { InlineEditInput, InlineEditListbox } from './inline-edit'

interface Props {
  detail: PhysicalItemProperty
  index: number
}

export const ItemProperty = ({ detail, index }: Props) => {
  const disabled = !usePermission([ROLE.CATALOGUE_EDIT])
  const { setValue } = useFormContext()

  React.useEffect(() => {
    Object.keys(detail).forEach(key => {
      setValue(`physicalItem.properties.${index}.${key}`, detail[key])
    })
  }, [detail, index, setValue])

  switch (detail.property.type.uid) {
    case PROPERTY_TYPE.TEXT:
      return (
        <InlineEditInput
          name={`physicalItem.properties.${index}.value`}
          unit={detail.property.unit?.name}
          label={detail.property.name}
          disabled={disabled}
        />
      )
    case PROPERTY_TYPE.NUMBER:
      return (
        <InlineEditInput
          name={`physicalItem.properties.${index}.value`}
          unit={detail.property.unit?.name}
          label={detail.property.name}
          disabled={disabled}
          type={'number'}
        />
      )
    case PROPERTY_TYPE.BOOLEAN:
      return (
        <InlineEditListbox
          name={`physicalItem.properties.${index}.value`}
          disabled={disabled}
          label={detail.property.name}
          customOptions={['true', 'false']}
        />
      )
    case PROPERTY_TYPE.LIST:
      return (
        <InlineEditListbox
          name={`physicalItem.properties.${index}.value`}
          allowEmptyOption={true}
          disabled={disabled}
          label={detail.property.name}
          customOptions={detail.property.listOfValues}
        />
      )
    case PROPERTY_TYPE.RANGE: {
      const label = detail.property.unit?.name
        ? `${detail.property.name} [${detail.property.unit?.name}]`
        : detail.property.name
      return (
        <RangeInput
          required
          name={`physicalItem.properties.${index}.value`}
          label={label}
          disabled={disabled}
        />
      )
    }
    default: {
      return (
        <InlineEditInput
          name={`physicalItem.properties.${index}.value`}
          disabled={disabled}
          label={detail.property.name}
        />
      )
    }
  }
}
