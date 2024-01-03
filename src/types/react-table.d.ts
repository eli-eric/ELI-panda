import '@tanstack/react-table'

declare module '@tanstack/table-core' {
  //eslint-disable-next-line
  interface ColumnMeta<TData extends RowData, TValue> {
    sticky?: boolean
    className?: string

    headerClassName?: string
    filter?: {
      type: 'string' | 'date' | 'boolean' | 'number' | 'listOfValues' | 'autoComplete'
      enableColumnFilter: boolean
      codebookCode?: CODEBOOK
    }
    noHeader?: boolean
    headerElement?: React.ReactNode
  }
}
