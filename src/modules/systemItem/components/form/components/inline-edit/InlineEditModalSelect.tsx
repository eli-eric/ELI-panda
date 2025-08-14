import { Edit, Table2, X } from 'lucide-react'
import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'

interface InlineEditModalSelectProps extends FieldProps {
  onClick?: () => void
  onClear?: () => void
  defaultValue?: CodebookType[] | string | null
}

export const InlineEditModalSelect = ({
  name,
  label,
  disabled,
  placeholder = 'Click to select',
  onClick,
  onClear,
  defaultValue = null
}: InlineEditModalSelectProps) => {
  const { control, setValue } = useFormContext()

  // Always render; show read-only styling when disabled

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const handleClear = (e: React.MouseEvent) => {
          e.stopPropagation()
          setValue(name, null)
          onClear?.()
        }

        const getDisplayValue = () => {
          if (!field.value) return 'N/A'
          if (typeof field.value === 'string') return field.value
          if (field.value?.name) {
            // For location, show name (code) format
            if (field.value?.code) {
              return `${field.value.name} (${field.value.code})`
            }
            return field.value.name
          }
          return 'N/A'
        }

        const baseClasses = cn(
          'flex justify-between items-center gap-2 text-xs px-2 py-1 rounded-md transition-all duration-200 border group w-full min-w-0',
          disabled
            ? 'border-muted/40 bg-muted/20 cursor-not-allowed'
            : 'border-dashed border-primary hover:border-primary/60 cursor-pointer hover:bg-primary/5'
        )

        return (
          <div
            className={baseClasses}
            onClick={!disabled ? onClick : undefined}
            aria-disabled={disabled}
          >
            <span className="font-medium text-muted-foreground flex items-center gap-1">
              {label}:
              <Edit className="size-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary/70" />
            </span>
            <div className="text-right max-w-[60%] flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
              <span
                className="block w-full truncate text-foreground"
                title={getDisplayValue()}
              >
                {getDisplayValue()}
              </span>
              <div
                className={cn(
                  'flex items-center gap-0.5 transition-opacity',
                  disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                )}
              >
                {field.value && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-0.5 hover:bg-red-100 hover:text-red-700 rounded text-red-600 transition-colors"
                    title="Clear selection"
                  >
                    <X className="size-3" />
                  </button>
                )}
                <Table2 className="size-3 text-muted-foreground" />
              </div>
              {error && (
                <div className="text-xs text-destructive">{error.message}</div>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}
