import '@tanstack/react-table'

import type { CodebookType } from '@/hooks/fetch/useCodebook'

declare module '@tanstack/table-core' {
  //eslint-disable-next-line
  interface ColumnMeta<TData extends RowData, TValue> {
    sticky?: boolean
    className?: string

    headerClassName?: string
    filter?: {
      type:
        | 'string'
        | 'date'
        | 'boolean'
        | 'number'
        | 'listOfValues'
        | 'autoComplete'
      enableColumnFilter: boolean
      codebookCode?: CODEBOOK
    }
    noHeader?: boolean
    headerElement?: React.ReactNode
  }

  interface ColumnFilter {
    id: string
    value:
      | string
      | number
      | boolean
      | Date
      | null
      | CodebookType
      | { min?: number; max?: number }
    name?: string
    type?: string
  }
}
