import React from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'

import type { InputProps } from '@/components/form/Input'
import { Input } from '@/components/form/Input'
import type { SelectWithErrorProps } from '@/components/form/Select'
import { SelectWithError } from '@/components/form/Select'
import usePermission from '@/hooks/usePermission'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { ROLE } from '@/types/constants/roles'

import type { CatalogueItem, CatalogueItemDetail } from '../../types/responses'

interface Props {
  detail: CatalogueItemDetail
  index: number
}

// TODO: workaround for Controlled component forwardRef issue
// eslint-disable-next-line
const InputWithRef = React.forwardRef(<T extends FieldValues>({ ...props }: InputProps<T>, ref) => <Input {...props} />)
// eslint-disable-next-line
const SelectWithErrorWithRef = React.forwardRef(<T extends FieldValues>({ ...props }: SelectWithErrorProps<T>, ref) => (
  <SelectWithError {...props} />
))

InputWithRef.displayName = 'InputWithRef'
SelectWithErrorWithRef.displayName = 'SelectWithErrorWithRef'

const GroupProperty = ({ detail, index }: Props) => {
  const { control } = useFormContext<CatalogueItem>()
  const disabled = !usePermission([ROLE.CATALOGUE_EDIT])

  return (
    <Controller
      name={`details.${index}.value`}
      control={control}
      render={({ field }) => {
        if (PROPERTY_TYPE.TEXT === detail.property.type.uid) {
          return <InputWithRef {...field} label={detail.property.name} disabled={disabled} rounded={'rounded-md'} />
        }
        if (PROPERTY_TYPE.NUMBER === detail.property.type.uid) {
          return (
            <InputWithRef
              {...field}
              label={detail.property.name}
              disabled={disabled}
              rounded={'rounded-md'}
              type={'number'}
            />
          )
        }
        if (PROPERTY_TYPE.BOOLEAN === detail.property.type.uid) {
          return (
            <SelectWithErrorWithRef
              {...field}
              disabled={disabled}
              label={detail.property.name}
              rounded={'rounded-md'}
              options={[
                { value: 'true', name: 'true' },
                { value: 'false', name: 'false' }
              ]}
            />
          )
        }
        if (PROPERTY_TYPE.LIST === detail.property.type.uid) {
          return (
            <SelectWithErrorWithRef
              {...field}
              disabled={disabled}
              label={detail.property.name}
              rounded={'rounded-md'}
              options={detail.property.listOfValues.map(value => ({
                value,
                name: value
              }))}
            />
          )
        }
        return <InputWithRef {...field} disabled={disabled} label={detail.property.name} rounded={'rounded-md'} />
      }}
    />
  )
}

export default GroupProperty
