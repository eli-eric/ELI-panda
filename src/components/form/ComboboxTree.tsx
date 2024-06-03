import React, { Fragment, useState } from 'react'

import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'

import { ModalSelect } from './ModalSelect'
import { CodebookTreeModal } from './shared/CodebookTreeModal'

type ComboboxPropsT = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    codebook?: CODEBOOK
    isObject?: boolean
    position?: 'top' | 'bottom'
    onSelect?: (item?: any) => void
    isFilter?: boolean
  }

export const ComboboxTree = ({
  codebook,
  name,
  placeholder = 'Click to select',
  label,
  disabled,
  className,
  onSelect,
  isFilter
}: ComboboxPropsT) => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <ModalSelect
        name={name}
        onChange={onSelect}
        isFilter={isFilter}
        className={className}
        disabled={disabled}
        placeholder={placeholder}
        label={label}
        onClick={() => {
          setOpen(true)
        }}
      />

      <CodebookTreeModal
        onSubmit={onSelect}
        codebook={codebook}
        open={open}
        setOpen={setOpen}
        name={name}
      />
    </Fragment>
  )
}
