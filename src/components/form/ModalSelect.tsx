import { Table2, X } from 'lucide-react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

export type ModalSelectPropsT = FieldProps & {
  onChange?: (value: any) => void
  className?: string
  defaultValue?: CodebookType[] | string | null
  onClick?: () => void
  isFilter?: boolean
}

export const ModalSelect = ({
  defaultValue = null,
  name,
  label,
  disabled,
  className,
  placeholder = 'Click here to select',
  onChange,
  onClick,
  isFilter
}: ModalSelectPropsT) => {
  const { control, setValue } = useFormContext()

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValue(name, null)
    onChange && onChange(null)
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const value =
          typeof field.value === 'string' ? field.value : field.value?.name
        return (
          <div className={cn('space-y-1 w-full', className)}>
            {label && <Label>{label}</Label>}
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                disabled={disabled}
                onClick={onClick}
                className={cn(
                  'w-full justify-between h-9 px-3 font-normal',
                  !value && 'text-muted-foreground',
                  error && 'border-destructive',
                  isFilter && field.value && 'border-2 border-lime-500'
                )}
              >
                <span className="truncate text-left">
                  {value || placeholder}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  {!disabled && value && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={handleClear}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleClear(e as any)
                        }
                      }}
                      className="p-0.5 hover:bg-accent rounded-sm cursor-pointer"
                      aria-label="Clear selection"
                    >
                      <X className="h-3 w-3" />
                    </div>
                  )}
                  <Table2 className="h-4 w-4 opacity-50" />
                </div>
              </Button>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        )
      }}
    />
  )
}
