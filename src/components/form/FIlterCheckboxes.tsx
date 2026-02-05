import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { CheckboxWithLabel } from '@/components/ui/checkbox'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

interface Props {
    name: string
    label: string
    onChange?: (v: any) => void
    isFilter?: boolean
    options?: string[]
    customCodebookOptions?: CodebookType[]
    codebook?: CODEBOOK
}

export const FilterCheckboxes = ({
    name,
    label,
    onChange,
    options,
    codebook,
    customCodebookOptions,
}: Props) => {
    const { control } = useFormContext()
    const { data: codebookOptions } = useCodebook(codebook)

    return (
        <div className="flex flex-col">
            <span className="text-sm pb-1 font-medium text-gray-700 dark:text-gray-200">
                {label}
            </span>
            <Controller
                name={name}
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                    const fieldValue = field.value as string[] | undefined
                    return (
                        <div className="w-full">
                            {options?.map(option => (
                                <CheckboxWithLabel
                                    id={option}
                                    checked={fieldValue?.includes(option) ?? false}
                                    onChange={checked => {
                                        const value = checked
                                            ? [...(fieldValue || []), option]
                                            : fieldValue?.filter(item => item !== option)
                                        field.onChange(value)
                                        onChange && onChange(value)
                                    }}
                                    key={option}
                                    className="pb-1"
                                    label={option}
                                />
                            ))}
                            {(customCodebookOptions || codebookOptions?.data)?.map(option => (
                                <CheckboxWithLabel
                                    id={option.uid}
                                    checked={fieldValue?.includes(option.uid) ?? false}
                                    onChange={checked => {
                                        const value = checked
                                            ? [...(fieldValue || []), option.uid]
                                            : fieldValue?.filter(item => item !== option.uid)
                                        field.onChange(value)
                                        onChange && onChange(value)
                                    }}
                                    key={option.uid}
                                    className="pb-1"
                                    label={option.name}
                                />
                            ))}
                        </div>
                    )
                }}
            />
        </div>
    )
}
