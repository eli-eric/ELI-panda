import '@tanstack/react-table'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    sticky?: boolean
    className?: string
    filter?: {
      type: 'string' | 'date' | 'boolean' | 'number' | 'listOfValues' | 'autoComplete'
      enableColumnFilter: boolean
      codebookCode?: CODEBOOK
    }
    noHeader?: boolean
    headerElement?: React.ReactNode
  }
}
