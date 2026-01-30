import React from 'react'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { RangeInput } from '@/components/form/RangeInput'
import { CheckboxWithLabel } from '@/components/ui/checkbox'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

import { useServiceLineSelectionStore } from './store/useServiceLineSelectionStore'

interface Props {
    detail: CatalogueItemDetail
}

export const SelectableGroupProperty = ({ detail }: Props) => {
    const { toggleProperty, isPropertySelected } = useServiceLineSelectionStore()
    const propertyUid = detail.property.uid
    const isSelected = isPropertySelected(propertyUid)
    const fieldName = `details.${detail.property.uid}.value`

    // Only enable the field if it's selected
    const disabled = !isSelected

    // Handle the checkbox click
    const handleCheckboxChange = () => {
        toggleProperty(propertyUid)
    }

    // Render the property with a checkbox
    const renderProperty = () => {
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
                return <RangeInput required name={fieldName} label={label} disabled={disabled} />
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

    return (
        <div className="flex flex-col space-y-1">
            <CheckboxWithLabel
                id={`property-${propertyUid}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
                label="Include in service line"
            />
            <div className={`${disabled ? 'opacity-50' : ''}`}>{renderProperty()}</div>
        </div>
    )
}
