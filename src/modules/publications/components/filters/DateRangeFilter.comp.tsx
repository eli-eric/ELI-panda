import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input as ShadcnInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Props {
    name: string
    label?: string
    onChange?: (value: { min: string | null; max: string | null }) => void
    isFilter?: boolean
    disabled?: boolean
    /** Data bounds from the filter-options endpoint, applied as native input min/max. */
    bounds?: { min?: string | null; max?: string | null }
}

/**
 * Date range filter input (two ISO date inputs producing `{min, max}`).
 * Same debounce/guard behavior as RangeInput, but `type="date"` because the
 * free-form publication dates (`dateOfPublication`, `conferenceDate`) are
 * compared lexicographically server-side (ELIPANDA-503).
 */
export const DateRangeFilter = ({ name, label, onChange, isFilter, disabled, bounds }: Props) => {
    const { control, watch } = useFormContext()

    const inputValues = watch(name)

    useEffect(() => {
        if (inputValues) {
            const handler = setTimeout(() => {
                onChange &&
                    onChange({
                        min: inputValues.min || null,
                        max: inputValues.max || null,
                    })
            }, 500)
            return () => clearTimeout(handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValues])

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <Label>{label}</Label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    const fieldValue = field.value || {}
                    return (
                        <div className="flex gap-2 w-full">
                            <ShadcnInput
                                name={`min${name}`}
                                type="date"
                                data-testid={`min${name}`}
                                min={bounds?.min || undefined}
                                max={fieldValue?.max || bounds?.max || undefined}
                                disabled={disabled}
                                className={cn(
                                    'w-full rounded-md border px-3 py-2 text-sm',
                                    isFilter && fieldValue?.min && 'border-green-500',
                                    disabled && 'bg-muted cursor-not-allowed',
                                )}
                                value={fieldValue.min ?? ''}
                                onChange={e =>
                                    field.onChange({
                                        min: e.target.value || null,
                                        max: fieldValue?.max ?? null,
                                    })
                                }
                            />
                            <ShadcnInput
                                name={`max${name}`}
                                type="date"
                                data-testid={`max${name}`}
                                min={fieldValue?.min || bounds?.min || undefined}
                                max={bounds?.max || undefined}
                                disabled={disabled}
                                className={cn(
                                    'w-full rounded-md border px-3 py-2 text-sm',
                                    isFilter && fieldValue?.max && 'border-green-500',
                                    disabled && 'bg-muted cursor-not-allowed',
                                )}
                                value={fieldValue.max ?? ''}
                                onChange={e =>
                                    field.onChange({
                                        min: fieldValue?.min ?? null,
                                        max: e.target.value || null,
                                    })
                                }
                            />
                        </div>
                    )
                }}
            />
        </div>
    )
}
