import { Eye, EyeOff } from 'lucide-react'
import React, { useEffect, useId, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { useDebounce, useIsFirstRender } from 'usehooks-ts'

import { Tooltip } from '@/components/Tooltip'
import { Input as ShadcnInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'

export type InputProps = FieldProps &
    React.InputHTMLAttributes<HTMLInputElement> & {
        unit?: string
        onChange?: (value: string | number | readonly string[] | undefined) => void
        isFilter?: boolean
    }
export const Input = ({
    name,
    placeholder,
    disabled,
    type = 'text',
    className,
    children,
    hidden,
    label,
    onChange,
    unit,
    defaultValue,
    isFilter,
    step = '0.001',
    required,
    ...rest
}: InputProps) => {
    const { control } = useFormContext()

    const [showPassword, setShowPassword] = useState(false)

    const inputValue = useWatch({
        control,
        name,
    })

    const inputValueDebounced = useDebounce(inputValue, 500)
    const isFirstRender = useIsFirstRender()

    useEffect(() => {
        if (!isFirstRender && onChange) {
            onChange(inputValueDebounced)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValueDebounced])

    const toogleShowPassword = () => setShowPassword(!showPassword)

    const idHtml = useId()

    if (hidden) return null

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div className={cn('space-y-1 w-full', className)}>
                        {label && <Label htmlFor={idHtml}>{label}</Label>}
                        <div className="relative">
                            <ShadcnInput
                                {...field}
                                {...rest}
                                id={idHtml}
                                step={step}
                                value={field.value || ''}
                                required={required}
                                type={
                                    type === 'password'
                                        ? showPassword
                                            ? 'text'
                                            : 'password'
                                        : type
                                }
                                disabled={disabled}
                                onChange={e => {
                                    field.onChange(e.target.value)
                                }}
                                placeholder={placeholder}
                                className={cn(
                                    isFilter && field.value && 'border-2 border-lime-500',
                                    type === 'password' && 'pr-10',
                                    unit && type !== 'password' && 'pr-10',
                                )}
                                aria-invalid={error ? 'true' : 'false'}
                            />

                            {type === 'password' && (
                                <div className="absolute inset-y-0 right-0 cursor-pointer flex items-center pr-3">
                                    {showPassword ? (
                                        <Tooltip content="Hide password">
                                            <EyeOff
                                                data-testid="toggle-password-visibility"
                                                aria-label="Show password"
                                                role="button"
                                                className="text-muted-foreground hover:text-foreground h-4 w-4 cursor-pointer"
                                                onClick={toogleShowPassword}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip content="Show password">
                                            <Eye
                                                data-testid="toggle-password-visibility"
                                                role="button"
                                                aria-label="Hide password"
                                                className="text-muted-foreground hover:text-foreground h-4 w-4 cursor-pointer"
                                                onClick={toogleShowPassword}
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                            )}

                            {unit && type !== 'password' && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-muted-foreground text-sm">{unit}</span>
                                </div>
                            )}
                        </div>

                        {error && <p className="text-sm text-destructive">{error.message}</p>}

                        {children && <div className="mt-2">{children}</div>}
                    </div>
                )
            }}
        />
    )
}
