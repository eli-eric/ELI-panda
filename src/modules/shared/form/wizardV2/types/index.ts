import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps } from '@/types/form'

export type WizardStep = {
  title: string
  fields: WizardField[]
}

export type WizardField = {
  componentType:
    | 'input'
    | 'select'
    | 'combo'
    | 'textarea'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'component'
    | 'combo-system'
  component?: React.ReactNode
  field: Field
}

interface Field extends FieldProps {
  name: string
  label: string
  type?: string
  codebook?: CODEBOOK
  required?: boolean
}
