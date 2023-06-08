import React from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'

import type { InputProps } from '@/components/form/Input'
import { Input } from '@/components/form/Input'
import type { ListboxPropsT } from '@/components/form/Listbox'
import Listbox from '@/components/form/Listbox'
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
const ListBoxWithRef = React.forwardRef(({ ...props }: ListboxPropsT, ref) => <Listbox {...props} />)

InputWithRef.displayName = 'InputWithRef'
SelectWithErrorWithRef.displayName = 'SelectWithErrorWithRef'
ListBoxWithRef.displayName = 'ListBoxWithRef'

const GroupProperty = ({ detail, index }: Props) => {
  const { control } = useFormContext<CatalogueItem>()
  const disabled = !usePermission([ROLE.CATALOGUE_EDIT])
  console.log('detail', detail)

  return (
    <Controller
      name={`details.${index}.value`}
      control={control}
      render={({ field }) => {
        if (PROPERTY_TYPE.TEXT === detail.property.type.uid) {
          return (
            <InputWithRef
              {...field}
              unit={detail.property.unit.name}
              label={detail.property.name}
              disabled={disabled}
              rounded={'rounded-md'}
            />
          )
        }
        if (PROPERTY_TYPE.NUMBER === detail.property.type.uid) {
          return (
            <InputWithRef
              {...field}
              unit={detail.property.unit.name}
              label={detail.property.name}
              disabled={disabled}
              rounded={'rounded-md'}
              type={'number'}
            />
          )
        }
        if (PROPERTY_TYPE.BOOLEAN === detail.property.type.uid) {
          return (
            <ListBoxWithRef
              {...field}
              useFirstRender={false}
              emptyOption={'None'}
              allowEmptyOption={true}
              disabled={disabled}
              unit={detail.property.unit.name}
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
            <ListBoxWithRef
              {...field}
              useFirstRender={false}
              emptyOption={'None'}
              allowEmptyOption={true}
              unit={detail.property.unit.name}
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
        return <InputWithRef {...field} disabled={disabled} label={detail.property.name} rounded={'rounded-md'} />
      }}
    />
  )
}

export default GroupProperty
