import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
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
              className="range-slider-primary"
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
            <div className="flex pt-4 gap-14 w-full justify-between">
              <input
                type="number"
                className="block border-gray-300 rounded-md w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                value={field.value[0]}
                onChange={e => {
                  if (e.target.value > max.toString()) {
                    toast.error('Min value must be less than max value')
                  }
                  if (e.target.value > field.value[1]) {
                    toast.error('Min value must be less than max value')
                  } else {
                    field.onChange(v => [e.target.value, v[1]])
                  }
                }}
              />
              <input
                type="number"
                onChange={e => {
                  if (e.target.value < min.toString()) {
                    toast.error('Max value must be greater than min value')
                  }
                  if (e.target.value < field.value[0]) {
                    toast.error('Max value must be greater than min value')
                  } else {
                    field.onChange(v => [v[0], e.target.value])
                  }
                }}
                className="block border-gray-300 rounded-md w-full appearance-none border px-3 py-2 placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                value={field.value[1]}
              />
            </div>
          </div>
        )}
      />
    </div>
  )
}
