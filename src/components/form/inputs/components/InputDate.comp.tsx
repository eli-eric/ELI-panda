'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'

type InputProps = FieldProps &
    React.InputHTMLAttributes<HTMLInputElement> & {
        unit?: string
        onChange?: (value: string | number | readonly string[] | undefined) => void
        isFilter?: boolean
    }

export const InputDate = ({
    name,
    placeholder = 'Select date',
    disabled,
    className,
    hidden,
    label,
    onChange,
    defaultValue,
}: InputProps) => {
    const { control } = useFormContext()
    const idHtml = useId()
    const [open, setOpen] = useState(false)

    if (hidden) return null

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field, fieldState: { error } }) => {
                // Convert string value to Date object
                const dateValue = field.value ? new Date(field.value) : undefined

                const handleDateSelect = (date: Date | undefined) => {
                    const dateString = date ? date.toISOString().split('T')[0] : ''

                    if (onChange) {
                        field.onChange(onChange(dateString))
                    } else {
                        field.onChange(dateString)
                    }
                    setOpen(false)
                }

                return (
                    <div className={cn('space-y-2', className)}>
                        {label && (
                            <Label htmlFor={idHtml} className="text-sm font-medium">
                                {label}
                            </Label>
                        )}
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id={idHtml}
                                    disabled={disabled}
                                    className={cn(
                                        'w-full justify-between font-normal',
                                        !dateValue && 'text-muted-foreground',
                                        error && 'border-destructive',
                                    )}
                                    data-testid={name}
                                    aria-invalid={error ? 'true' : 'false'}
                                >
                                    {dateValue ? dateValue.toLocaleDateString() : placeholder}
                                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={dateValue}
                                    captionLayout="dropdown"
                                    onSelect={handleDateSelect}
                                    disabled={disabled}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )
            }}
        />
    )
}
