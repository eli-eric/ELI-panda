import React from 'react'

export function Select({ register, options, name, ...rest }) {
  return (
    <select {...register(name)} {...rest}>
      {options.map(option => (
        <option key={option.code} value={option.code}>
          {option.value}
        </option>
      ))}
    </select>
  )
}
