'use client'

import { ChevronDownIcon } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { FieldProps } from '@/types/form'
import { convertDate } from '@/utils/formatters'

type InputProps = FieldProps & React.InputHTMLAttributes<HTMLInputElement>

const DateInput = ({
  name,
  disabled,
  className,
  hidden,
  label,
  placeholder = 'Select date'
}: InputProps) => {
  const {
    control,
    formState: { defaultValues }
  } = useFormContext()
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)

  // set default value
  useEffect(() => {
    if (defaultValues && defaultValues[name]) {
      const defaultOption = moment(defaultValues[name]).toDate()
      setStartDate(defaultOption)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (hidden) return null

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => {
        const handleDateSelect = (date: Date | undefined) => {
          setStartDate(date)
          if (date) {
            onChange(convertDate(date))
          } else {
            onChange('')
          }
          setOpen(false)
        }

        return (
          <div className={cn('space-y-1', className)}>
            {label && <Label>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={disabled}
                  onClick={() => setOpen(!open)}
                  className={cn(
                    'w-full justify-between font-normal',
                    !startDate && 'text-muted-foreground',
                    error && 'border-destructive'
                  )}
                  aria-invalid={error ? 'true' : 'false'}
                >
                  {startDate ? startDate.toLocaleDateString() : placeholder}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  onSelect={handleDateSelect}
                  disabled={disabled}
                />
              </PopoverContent>
            </Popover>

            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        )
      }}
    />
  )
}

export default DateInput
