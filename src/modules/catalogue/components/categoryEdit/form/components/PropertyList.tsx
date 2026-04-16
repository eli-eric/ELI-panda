import { Plus } from 'lucide-react'
import { useCallback } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { CategoryFormType } from '../../types'
import PropertyItem from './PropertyItem'

interface Props {
    name: `groups.${number}`
}

const PropertyList = ({ name }: Props) => {
    const { control } = useFormContext<CategoryFormType>()
    const { formatMessage: fm } = useIntl()
    const groupName = useWatch({ control, name: `${name}.name` })
    const { fields, append, remove, move } = useFieldArray<CategoryFormType>({
        control,
        name: `${name}.properties`,
    })

    const handleAddProp = () => {
        append({
            name: '',
            type: null,
            unit: null,
            defaultValue: '',
        })
    }

    const handleMoveDown = useCallback(
        (index: number) => {
            if (index < fields.length - 1) move(index, index + 1)
        },
        [fields.length, move],
    )
    const handleMoveUp = useCallback(
        (index: number) => {
            if (index > 0) move(index, index - 1)
        },
        [move],
    )
    return (
        <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
                {fm({ id: message.catalogue.category.groupProperties })}
            </div>

            {fields.length > 0 && (
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <PropertyItem
                            key={field.id}
                            removeProp={remove}
                            index={index}
                            name={`${name}.properties.${index}`}
                            length={fields.length}
                            moveDown={handleMoveDown}
                            moveUp={handleMoveUp}
                            lenght={fields.length}
                        />
                    ))}
                </div>
            )}

            <Tooltip
                content={fm(
                    { id: message.catalogue.category.propertyAddToGroupTooltip },
                    {
                        name: groupName || fm({ id: message.catalogue.category.unnamedGroup }),
                    },
                )}
            >
                <Button
                    type="button"
                    onClick={handleAddProp}
                    variant="outline"
                    size="sm"
                    className="w-full border-dashed"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {fm({ id: message.catalogue.category.propertyAdd })}
                </Button>
            </Tooltip>
        </div>
    )
}

export default PropertyList
