import React, { startTransition, useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import RangeSlider from 'react-range-slider-input'

interface Props {
  min?: number
  max?: number
  name: string
  label: string
  onChange?: (v: any) => void
}

export const RangeSliderComponent = ({
  min = 0,
  max = 100,
  name,
  label,
  onChange
}: Props) => {
  const { control, setValue } = useFormContext()

  const inputValues = useWatch({ control, name })

  useEffect(() => {
    startTransition(() => {
      if (inputValues) {
        setValue(name, inputValues)
      } else {
        setValue(name, { min, max })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col">
      <span className="text-sm pb-2 font-medium text-gray-700 dark:text-gray-200">
        {label}
      </span>
      <Controller
        name={name}
        control={control}
        defaultValue={{ min, max }}
        render={({ field }) => {
          const fieldValue = field.value ?? [min, max]
          return (
            <div className="w-full">
              <RangeSlider
                className="range-slider-primary"
                defaultValue={fieldValue}
                value={[fieldValue.min, fieldValue.max]}
                min={min}
                max={max}
                onThumbDragEnd={() => {
                  onChange && onChange(fieldValue)
                }}
                onInput={v => {
                  field.onChange({ max: v[1], min: v[0] })
                }}
                step={1}
              />
              <div className="flex pt-4 gap-14 w-full justify-between">
                <input
                  name="min"
                  type="number"
                  placeholder={min.toString()}
                  className="form-field rounded-md border-gray-200 border px-2 py-1 text-sm"
                  value={fieldValue.min ?? ''}
                  onChange={e => {
                    const value =
                      e.target.value === '' ? '' : Number(e.target.value)

                    if (value > fieldValue.max) {
                      toast.error('Min value must be less than max value')
                    } else {
                      field.onChange(v => {
                        if (v) {
                          const newValue = {
                            min: value || null,
                            max: v.max || null
                          }
                          onChange && onChange(newValue)
                          return newValue
                        }
                      })
                    }
                  }}
                />
                <input
                  name="max"
                  type="number"
                  placeholder={max.toString()}
                  onChange={e => {
                    const value =
                      e.target.value === '' ? '' : Number(e.target.value)
                    if (value < fieldValue.min) {
                      toast.error('Max value must be greater than min value')
                    } else {
                      field.onChange(v => {
                        if (v) {
                          const newValue = {
                            min: v.min || null,
                            max: value || null
                          }
                          onChange && onChange(newValue)
                          return newValue
                        }
                      })
                    }
                  }}
                  className="form-field rounded-md border-gray-200 border px-2 py-1 text-sm"
                  value={fieldValue.max ?? ''}
                />
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
