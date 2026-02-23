import { useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'

type TextAreaWithErrorProps = FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextArea = ({
    name,
    placeholder,
    disabled,
    label,
    className,
    isFilter,
    defaultValue,
    rows,
}: TextAreaWithErrorProps) => {
    const { control } = useFormContext()
    const id = useId()

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field, fieldState: { error } }) => (
                <div className={cn('space-y-1 w-full', className)}>
                    {label && <Label htmlFor={id}>{label}</Label>}
                    <Textarea
                        {...field}
                        id={id}
                        value={field.value || ''}
                        rows={rows || 5}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={cn(
                            error && 'border-destructive',
                            isFilter && field.value && 'border-2 border-lime-500',
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                    />
                    {error && <p className="text-sm text-destructive">{error.message}</p>}
                </div>
            )}
        />
    )
}
