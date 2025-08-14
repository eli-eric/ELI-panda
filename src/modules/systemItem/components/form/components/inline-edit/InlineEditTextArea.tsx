import { Edit } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'

interface InlineEditTextAreaProps extends FieldProps {
  rows?: number
  placeholder?: string
}

export const InlineEditTextArea = ({
  name,
  label,
  disabled,
  placeholder,
  rows = 3
}: InlineEditTextAreaProps) => {
  const { control } = useFormContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')

  if (disabled) {
    return null
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleStartEdit = () => {
          setEditValue(field.value || '')
          setIsEditing(true)
        }

        const handleSave = () => {
          field.onChange(editValue)
          setIsEditing(false)
        }

        const handleCancel = () => {
          setEditValue(field.value || '')
          setIsEditing(false)
        }

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === 'Escape') {
            handleCancel()
          } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleSave()
          }
        }
        const baseClasses = cn(
          'flex justify-between items-center gap-2 text-xs px-2 py-1 rounded-md transition-all duration-200 border group w-full min-w-0',
          isEditing
            ? 'border-primary bg-background'
            : disabled
              ? 'border-muted/40 bg-muted/20 cursor-not-allowed'
              : 'border-dashed border-primary/40 hover:border-primary/60 cursor-pointer hover:bg-primary/5'
        )

        const displayValue = field.value || 'N/A'
        const shortValue =
          displayValue.length > 100
            ? `${displayValue.substring(0, 100)}...`
            : displayValue

        if (isEditing) {
          return (
            <div className="w-full">
              <Textarea
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  field.onChange(editValue)
                  setIsEditing(false)
                }}
                placeholder={placeholder}
                rows={rows}
                className="text-sm resize-none w-full"
                autoFocus
              />
            </div>
          )
        }

        return (
          <div
            className={cn(
              'space-y-1 p-2 rounded-md border border-dashed border-primary hover:border-primary/60 cursor-pointer hover:bg-primary/5 transition-all duration-200 group'
            )}
            onClick={handleStartEdit}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-muted-foreground text-xs flex items-center gap-1">
                {label}:
                <Edit className="size-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary/70" />
              </span>
            </div>
            <div className="text-sm text-foreground whitespace-pre-wrap break-words">
              {shortValue === 'N/A' ? (
                <span className="text-muted-foreground italic">
                  Click to add {label?.toLowerCase()}
                </span>
              ) : (
                shortValue
              )}
            </div>
            {error && (
              <div className="text-xs text-destructive">{error.message}</div>
            )}
          </div>
        )
      }}
    />
  )
}
