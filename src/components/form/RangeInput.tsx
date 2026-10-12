import React, { useEffect, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input as ShadcnInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/** One bound of a range control: ISO string for `type='date'`, number otherwise. */
export type RangeValue = string | number | null

interface Props {
    onChange?(value: { min: RangeValue; max: RangeValue }): void
    name: string
    label?: string
    required?: boolean
    placeholder?: { min: string; max: string }
    isFilter?: boolean
    disabled?: boolean
    /**
     * `date` renders native ISO date inputs, used for the free-form publication
     * dates (`dateOfPublication`, `conferenceDate`) that are compared
     * lexicographically server-side (ELIPANDA-503). Defaults to `number`.
     */
    type?: 'number' | 'date'
    /** Data bounds from the filter-options endpoint; native min/max on date inputs. */
    bounds?: { min?: string | null; max?: string | null }
}

export const RangeInput = ({
    name,
    label,
    onChange,
    isFilter,
    disabled,
    placeholder,
    type = 'number',
    bounds,
}: Props) => {
    const { control, watch, clearErrors } = useFormContext()

    const inputValues = watch(name)
    const changedByUser = useRef(false)
    const onChangeRef = useRef(onChange)
    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange])

    useEffect(() => {
        // RHF reset() hydrates an existing filter; opening a sheet must not reapply it.
        if (!changedByUser.current) return
        changedByUser.current = false
        clearErrors(name)
        const handler = setTimeout(() => {
            onChangeRef.current?.({
                min: inputValues.min == null || inputValues.min === '' ? null : inputValues.min,
                max: inputValues.max == null || inputValues.max === '' ? null : inputValues.max,
            })
        }, 500)
        return () => clearTimeout(handler)
    }, [inputValues, clearErrors, name])

    // Dates are kept as ISO strings; numbers coerce as before.
    const readValue = (raw: string) => (type === 'date' ? raw : raw === '' ? '' : Number(raw))
    const isDate = type === 'date'

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
                                data-testid={'min' + name}
                                type={type}
                                pattern={isDate ? undefined : '[0-9]*'}
                                placeholder={isDate ? undefined : placeholder?.min || 'Min'}
                                min={isDate ? bounds?.min || undefined : undefined}
                                max={
                                    isDate ? fieldValue?.max || bounds?.max || undefined : undefined
                                }
                                disabled={disabled}
                                className={cn(
                                    'w-full rounded-md border px-3 py-2 text-sm',
                                    isFilter && fieldValue?.min && 'border-green-500',
                                    error && 'border-red-500',
                                    disabled && 'bg-muted cursor-not-allowed',
                                )}
                                value={fieldValue.min ?? ''}
                                onChange={e => {
                                    changedByUser.current = true
                                    field.onChange({
                                        min: readValue(e.target.value),
                                        max: fieldValue?.max,
                                    })
                                }}
                            />
                            <ShadcnInput
                                name={'max' + name}
                                data-testid={'max' + name}
                                type={type}
                                pattern={isDate ? undefined : '[0-9]*'}
                                placeholder={isDate ? undefined : placeholder?.max || 'Max'}
                                min={
                                    isDate ? fieldValue?.min || bounds?.min || undefined : undefined
                                }
                                max={isDate ? bounds?.max || undefined : undefined}
                                disabled={disabled}
                                onChange={e => {
                                    changedByUser.current = true
                                    field.onChange({
                                        min: fieldValue?.min,
                                        max: readValue(e.target.value),
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
