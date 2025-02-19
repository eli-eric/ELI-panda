import type { FieldProps } from '@/types/form'

// Define specific field types
export type WizardFieldType =
  | 'input'
  | 'select'
  | 'combo'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'component'
  | 'combo-system'

// Make the step configuration more specific
export interface WizardStepConfig<T> {
  title: string
  fields: WizardField[]
  validation?: (data: Partial<T>) => boolean
  onStepComplete?: (data: Partial<T>) => void
  shouldShow?: (data: Partial<T>) => boolean
}

export type WizardStep = {
  title: string
  fields: WizardField[]
}

export type WizardField = {
  componentType: WizardFieldType
  component?: React.ReactNode
  field: FieldProps
}
