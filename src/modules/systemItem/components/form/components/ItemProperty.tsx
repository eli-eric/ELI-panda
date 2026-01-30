import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { RangeInput } from '@/components/form/RangeInput'
import usePermission from '@/hooks/usePermission'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { ROLE } from '@/types/constants/roles'
import type { PhysicalItemProperty } from '@/types/responses/systems'

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
                <Input
                    name={`physicalItem.properties.${index}.value`}
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
                    name={`physicalItem.properties.${index}.value`}
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
                    name={`physicalItem.properties.${index}.value`}
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
                    name={`physicalItem.properties.${index}.value`}
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
                    name={`physicalItem.properties.${index}.value`}
                    label={label}
                    disabled={disabled}
                />
            )
        }
        default: {
            return (
                <Input
                    name={`physicalItem.properties.${index}.value`}
                    disabled={disabled}
                    label={detail.property.name}
                    rounded={'rounded-md'}
                />
            )
        }
    }
}
