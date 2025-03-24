import React from 'react'

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
  disabled?: boolean
}

const GroupProperty = ({ detail, index, disabled: forceDisabled }: Props) => {
  const disabledPermission = !usePermission([ROLE.CATALOGUE_EDIT])
  const disabled = forceDisabled || disabledPermission
  const fieldName = `details.${index}.value`

  switch (detail.property.type.uid) {
    case PROPERTY_TYPE.TEXT:
      return (
        <Input
          name={fieldName}
          unit={detail.property.unit?.name}
          label={detail.property.name}
          disabled={disabled}
          rounded={'rounded-md'}
          defaultValue={detail.value ?? detail.property.defaultValue}
        />
      )
    case PROPERTY_TYPE.NUMBER:
      return (
        <Input
          name={fieldName}
          unit={detail.property.unit?.name}
          label={detail.property.name}
          disabled={disabled}
          rounded={'rounded-md'}
          type={'number'}
          defaultValue={detail.value ?? detail.property.defaultValue}
        />
      )
    case PROPERTY_TYPE.BOOLEAN:
      return (
        <Listbox
          name={fieldName}
          disabled={disabled}
          unit={detail.property.unit?.name}
          customLabel={detail.property.name}
          rounded={'rounded-md'}
          customOptions={['true', 'false']}
          defaultValue={detail.value ?? detail.property.defaultValue}
        />
      )
    case PROPERTY_TYPE.LIST:
      return (
        <Listbox
          name={fieldName}
          allowEmptyOption={true}
          unit={detail.property.unit?.name}
          disabled={disabled}
          customLabel={detail.property.name}
          rounded={'rounded-md'}
          customOptions={detail.property.listOfValues}
          defaultValue={detail.value ?? detail.property.defaultValue}
        />
      )
    case PROPERTY_TYPE.RANGE: {
      const label = detail.property.unit?.name
        ? `${detail.property.name} [${detail.property.unit?.name}]`
        : detail.property.name
      return (
        <RangeInput
          required
          name={fieldName}
          label={label}
          disabled={disabled}
        />
      )
    }
    default: {
      return (
        <Input
          name={fieldName}
          disabled={disabled}
          label={detail.property.name}
          rounded={'rounded-md'}
          defaultValue={detail.value}
        />
      )
    }
  }
}

export default GroupProperty
