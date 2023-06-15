import React from 'react'

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

  if (PROPERTY_TYPE.TEXT === detail.property.type.uid) {
    return (
      <Input
        name={`details.${index}.value`}
        unit={detail.property.unit?.name}
        label={detail.property.name}
        disabled={disabled}
        rounded={'rounded-md'}
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
      />
    )
  }
  if (PROPERTY_TYPE.BOOLEAN === detail.property.type.uid) {
    return (
      <Listbox
        name={`details.${index}.value`}
        useFirstRender={false}
        emptyOption={'None'}
        allowEmptyOption={true}
        disabled={disabled}
        unit={detail.property.unit?.name}
        customLabel={detail.property.name}
        rounded={'rounded-md'}
        customOptions={[
          { uid: 'true', name: 'true' },
          { uid: 'false', name: 'false' }
        ]}
      />
    )
  }
  if (PROPERTY_TYPE.LIST === detail.property.type.uid) {
    return (
      <Listbox
        name={`details.${index}.value`}
        useFirstRender={false}
        emptyOption={'None'}
        allowEmptyOption={true}
        unit={detail.property.unit?.name}
        disabled={disabled}
        customLabel={detail.property.name}
        rounded={'rounded-md'}
        customOptions={detail.property.listOfValues.map(value => ({
          uid: value,
          name: value
        }))}
      />
    )
  }
  return (
    <Input name={`details.${index}.value`} disabled={disabled} label={detail.property.name} rounded={'rounded-md'} />
  )
}

export default GroupProperty
