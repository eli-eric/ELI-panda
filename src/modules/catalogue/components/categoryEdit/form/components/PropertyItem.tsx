import { Plus, Trash2 } from 'lucide-react'
import { startTransition, useEffect } from 'react'
import type { FieldArrayPath } from 'react-hook-form'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { message } from '@/i18n/src/messages'
import { defaultBoolOptions, PROPERTY_INPUT_TYPE, PROPERTY_TYPE } from '@/types/catalogue/constants'
import { CODEBOOK } from '@/types/constants/codebook'

import type { CategoryFormType } from '../../types'
import MoveButtons from './MoveButtons'

//TODO: fix bugs

//eslint-disable-next-line
const ValueItem = ({ removeValue, index, name }) => {
    const { formatMessage: fm } = useIntl()
    const handleRemoveValue = () => {
        removeValue(index)
    }

    return (
        <div className="flex gap-2 mb-2">
            <Input
                name={`${name}`}
                placeholder={fm({ id: message.catalogue.category.propertyEnterValue })}
                className="flex-1"
            />
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveValue}
                className="px-3"
            >
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </div>
    )
}
interface Props {
    name: `groups.${number}.properties.${number}` | `physicalItemProperties.${number}`
    removeProp: (index: number) => void
    index: number
    length: number
    lenght: number
    moveDown: (index: number) => void

    moveUp: (index: number) => void
}

const PropertyItem = ({ name, removeProp, index, moveDown, moveUp, lenght }: Props) => {
    const { watch, control, unregister } = useFormContext<CategoryFormType>()
    const { formatMessage: fm } = useIntl()
    const { fields, append, remove } = useFieldArray<
        CategoryFormType,
        FieldArrayPath<CategoryFormType>
    >({
        control,
        // name needs to be a FieldArrayPath for the form type; cast to satisfy TS
        name: `${name}.listOfValues` as FieldArrayPath<CategoryFormType>,
    })

    const handleRemoveProp = () => {
        removeProp(index)
    }
    const handleAddValue = () => {
        append('' as any)
    }
    const type = useWatch({ control, name: `${name}.type` })
    const propertyName = useWatch({ control, name: `${name}.name` })

    /* const getDefaultOption = (name, disabled = false) => ({
    value: '',
    name,
    disabled
  }) */

    useEffect(() => {
        startTransition(() => {
            if (type?.uid !== PROPERTY_TYPE.LIST && fields.length !== 0) {
                unregister(`${name}.listOfValues`)
            }
        })
    }, [type, unregister, name, fields.length])

    const getDefaultField = (type?: PROPERTY_TYPE | string) => {
        switch (type) {
            case PROPERTY_TYPE.LIST:
                const currentListValues = fields
                    .map((field, index) => {
                        const fieldValue = watch(`${name}.listOfValues.${index}`)
                        return fieldValue || ''
                    })
                    .filter(value => value.trim() !== '')

                return (
                    <Listbox
                        name={`${name}.defaultValue`}
                        allowEmptyOption={true}
                        emptyOption={fm({
                            id: message.catalogue.category.selectDefaultValue,
                        })}
                        customOptions={currentListValues}
                    />
                )
            case PROPERTY_TYPE.BOOLEAN:
                return (
                    <Listbox
                        name={`${name}.defaultValue`}
                        allowEmptyOption={true}
                        emptyOption={fm({
                            id: message.catalogue.category.selectDefaultValue,
                        })}
                        customOptions={[...defaultBoolOptions]}
                    />
                )
            case PROPERTY_TYPE.RANGE:
                return null
            default:
                return (
                    <Input
                        name={`${name}.defaultValue`}
                        type={type && PROPERTY_INPUT_TYPE[type]}
                        placeholder={fm({
                            id: message.catalogue.category.propertyDefaultValue,
                        })}
                        disabled={!type}
                    />
                )
        }
    }

    return (
        <Card className="mb-4 border-2 border-l-primary/50">
            <CardContent className="p-4 ">
                <div className="flex items-start gap-3">
                    <MoveButtons
                        moveDown={moveDown}
                        moveUp={moveUp}
                        lenght={lenght}
                        index={index}
                    />

                    <div className="flex-1 space-y-4">
                        {/* Property configuration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    {fm({ id: message.catalogue.category.propertyName })}
                                </label>
                                <Input
                                    name={`${name}.name`}
                                    placeholder={fm({
                                        id: message.catalogue.category.propertyName,
                                    })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    {fm({ id: message.catalogue.category.propertyType })}
                                </label>
                                <Listbox
                                    name={`${name}.type`}
                                    optionsSize={'sm'}
                                    emptyOption={fm({
                                        id: message.catalogue.category.selectType,
                                    })}
                                    allowEmptyOption={false}
                                    codebook={CODEBOOK.CATALOGUE_PROPERTY_TYPE}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    {fm({ id: message.catalogue.category.propertyUnit })}
                                </label>
                                <Listbox
                                    name={`${name}.unit`}
                                    optionsSize={'sm'}
                                    emptyOption={fm({
                                        id: message.catalogue.category.selectUnit,
                                    })}
                                    allowEmptyOption={true}
                                    codebook={CODEBOOK.UNIT}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    {fm({ id: message.catalogue.category.propertyDefaultValue })}
                                </label>
                                {getDefaultField(type?.uid)}
                            </div>
                        </div>

                        {/* Remove button */}
                        <div className="flex justify-end border-t pt-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRemoveProp}
                                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {fm({ id: message.catalogue.category.propertyRemove })}
                            </Button>
                        </div>

                        {/* List of values section */}
                        {type?.uid === PROPERTY_TYPE.LIST && (
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                                    {fm({ id: message.catalogue.category.propertyListOfValues })}
                                </h4>
                                <div className="space-y-2">
                                    {fields.map((field, index) => (
                                        <ValueItem
                                            removeValue={remove}
                                            key={field.id}
                                            index={index}
                                            name={`${name}.listOfValues.${index}`}
                                        />
                                    ))}
                                    <Tooltip
                                        content={fm(
                                            { id: message.catalogue.category.propertyAddTooltip },
                                            {
                                                name:
                                                    propertyName ||
                                                    fm({
                                                        id: message.catalogue.category
                                                            .unnamedProperty,
                                                    }),
                                            },
                                        )}
                                    >
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={handleAddValue}
                                            className="w-full border-dashed"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            {fm({
                                                id: message.catalogue.category.propertyAddValue,
                                            })}
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PropertyItem
