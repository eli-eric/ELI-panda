import React, { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import RangeSlider from 'react-range-slider-input'

interface Props {
  min?: number
  max?: number
  name: string
  label: string
  onChange?: (v: number[]) => void
}

export const RangeSliderComponent = ({ min = 0, max = 100, name, label, onChange }: Props) => {
  const { control, setValue } = useFormContext()

  const value = useWatch({ control, name })

  useEffect(() => {
    if (value) {
      setValue(name, value)
    } else {
      setValue(name, [min, max])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col">
      <label className="text-sm pb-2 font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={[min, max]}
        render={({ field }) => {
          const fieldValue = field.value ?? [min, max]
          return (
            <div className="w-full">
              <RangeSlider
                className="range-slider-primary"
                defaultValue={fieldValue}
                value={fieldValue}
                min={min}
                max={max}
                onThumbDragEnd={() => {
                  onChange && onChange(fieldValue)
                }}
                onInput={v => {
                  field.onChange(v)
                }}
                step={10}
              />
              <div className="flex pt-4 gap-14 w-full justify-between">
                <input
                  type="number"
                  className="block border-gray-300 rounded-md w-full appearance-none border px-2 py-1 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-sm"
                  value={fieldValue[0]}
                  onChange={e => {
                    const value = Number(e.target.value)
                    if (value > max) {
                      toast.error('Min value must be less than max value')
                    }
                    if (value > fieldValue[1]) {
                      toast.error('Min value must be less than max value')
                    } else {
                      field.onChange(v => {
                        if (v) {
                          onChange && onChange([value, v[1]])
                          return [value, v[1]]
                        }
                      })
                    }
                  }}
                />
                <input
                  type="number"
                  onChange={e => {
                    const value = Number(e.target.value)
                    if (value < min) {
                      toast.error('Max value must be greater than min value')
                    }
                    if (value < fieldValue[0]) {
                      toast.error('Max value must be greater than min value')
                    } else {
                      field.onChange(v => {
                        if (v) {
                          onChange && onChange([v[0], value])
                          return [v[0], value]
                        }
                      })
                    }
                  }}
                  className="block border-gray-300 rounded-md w-full appearance-none border px-2 py-1 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-sm"
                  value={fieldValue[1]}
                />
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
