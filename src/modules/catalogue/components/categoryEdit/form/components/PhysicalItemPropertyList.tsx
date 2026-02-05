import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/Buttons'

import type { CategoryFormType } from '../../types'
import PropertyItem from './PropertyItem'

interface Props {
    name: `physicalItemProperties`
}

export const PhysicalItemPropertyList = ({ name }: Props) => {
    const { control } = useFormContext<CategoryFormType>()
    const { fields, append, remove, move } = useFieldArray<CategoryFormType>({
        control,
        name: name,
    })

    const handleAddProp = () => {
        append({
            name: '',
            type: undefined,
            unit: undefined,
            defaultValue: '',
        })
    }

    const handleMoveDown = index => {
        if (index < fields.length - 1) move(index, index + 1)
    }
    const handleMoveUp = index => {
        if (index > 0) move(index, index - 1)
    }
    return (
        <div className="flex-1">
            <ul className="">
                {fields.map((field, index) => (
                    <li key={field.id} className="border-b px-2 py-2">
                        <PropertyItem
                            removeProp={remove}
                            index={index}
                            name={`${name}.${index}`}
                            length={fields.length}
                            moveDown={handleMoveDown}
                            moveUp={handleMoveUp}
                            lenght={fields.length}
                        />
                    </li>
                ))}
            </ul>
            <Button onClick={handleAddProp}>
                <Plus className="h-4 w-4" aria-hidden="true" />
            </Button>
        </div>
    )
}
