import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input as ShadcnInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Props {
    name: string
    label?: string
    onChange?: (v: any) => void
    required?: boolean
    placeholder?: { min: string; max: string }
    isFilter?: boolean
    disabled?: boolean
}

export const RangeInput = ({ name, label, onChange, isFilter, disabled, placeholder }: Props) => {
    const { control, watch, setError, clearErrors } = useFormContext()

    const inputValues = watch(name)

    useEffect(() => {
        if (inputValues) {
            clearErrors(name)
            const handler = setTimeout(() => {
                onChange &&
                    onChange({
                        min: inputValues.min !== '' ? inputValues.min : null,
                        max: inputValues.max !== '' ? inputValues.max : null,
                    })
            }, 500)
            return () => clearTimeout(handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValues, clearErrors, name, setError])

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <Label>{label}</Label>}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => {
                    const fieldValue = field.value || {}
                    return (
                        <div className="flex gap-2 w-full">
                            <ShadcnInput
                                name={'min' + name}
                                type="number"
                                pattern="[0-9]*"
                                placeholder={placeholder?.min || 'Min'}
                                disabled={disabled}
                                className={cn(
                                    'w-full rounded-md border px-3 py-2 text-sm',
                                    isFilter && fieldValue?.min && 'border-green-500',
                                    error && 'border-red-500',
                                    disabled && 'bg-muted cursor-not-allowed',
                                )}
                                value={fieldValue.min ?? ''}
                                onChange={e => {
                                    const value =
                                        e.target.value === '' ? '' : Number(e.target.value)
                                    field.onChange({
                                        min: value,
                                        max: fieldValue?.max,
                                    })
                                }}
                            />
                            <ShadcnInput
                                name={'max' + name}
                                type="number"
                                pattern="[0-9]*"
                                disabled={disabled}
                                placeholder={placeholder?.max || 'Max'}
                                onChange={e => {
                                    const value =
                                        e.target.value === '' ? '' : Number(e.target.value)
                                    field.onChange({
                                        min: fieldValue?.min,
                                        max: value,
                                    })
                                }}
                                className={cn(
                                    'w-full rounded-md border px-3 py-2 text-sm',
                                    isFilter && fieldValue?.max && 'border-green-500',
                                    error && 'border-red-500',
                                    disabled && 'bg-muted cursor-not-allowed',
                                )}
                                value={fieldValue.max ?? ''}
                            />
                        </div>
                    )
                }}
            />
        </div>
    )
}
