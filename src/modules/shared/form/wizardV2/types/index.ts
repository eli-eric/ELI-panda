import type { ColSizeProp } from '@/components/grid/ColSizes'
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
  id: string
  title: string
  fields?: WizardField[]
  component?: React.ReactElement
  validation?: (data: Partial<T>) => boolean
  onStepComplete?: (data: Partial<T>) => void | Promise<void>
  shouldShow?: (data: Partial<T>) => boolean
}

export type WizardStep = {
  title: string
  fields?: WizardField[]
  component?: React.ReactElement
}

export type WizardField = {
  componentType: WizardFieldType
  component?: React.ReactElement
  field: FieldProps
  colSpan?: ColSizeProp
}
