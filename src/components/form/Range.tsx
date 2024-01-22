import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import RangeSlider from 'react-range-slider-input'

interface Props {
  min: number
  max: number
  name: string
  label: string
  onChange?: (v: number[]) => void
}

export const RangeSliderComponent = ({ min, max, name, label, onChange }: Props) => {
  const { control } = useFormContext()
  return (
    <div className="flex flex-col">
      <label className="text-sm pb-2 font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={[min, max]}
        render={({ field }) => (
          <div>
            <RangeSlider
              {...field}
              min={min}
              max={max}
              onThumbDragEnd={() => {
                onChange && onChange(field.value)
              }}
              onInput={v => {
                field.onChange(v)
              }}
              step={1}
            />
            <div className="flex pt-2 justify-between">
              <span className="text-sm font-medium text-gray-700">{field.value[0]}</span>
              <span className="text-sm font-medium text-gray-700">{field.value[1]}</span>
            </div>
          </div>
        )}
      />
    </div>
  )
}
