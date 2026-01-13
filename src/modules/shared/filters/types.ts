import type { UseFormReset } from 'react-hook-form'

export interface FilterValue {
  id: string
  value: unknown
  type?: string
}

export interface SavedFilter {
  uid: string
  name: string
  value: string // JSON string of FilterValue[]
}

// Using 'any' for form values to maintain compatibility with various form schemas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FilterSaveSettingsProps {
  tableId: string
  enableQueryURL: boolean
  resetForm: UseFormReset<any>
  defaultFormValues: Record<string, unknown>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FilterOperationsConfig {
  tableId: string
  enableQueryURL: boolean
  resetForm: UseFormReset<any>
  defaultFormValues: Record<string, unknown>
}
