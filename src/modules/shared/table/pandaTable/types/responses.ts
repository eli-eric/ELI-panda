import type { CODEBOOK } from '@/types/constants/codebook'

// TODO prepare data for table
export type TableResponse<T> = {
  totalCount: number
  data?: T[]
  columnDef: ColumnDef<T>[]
}

export type ColumnDef<T> = {
  accessorKey: keyof T
  type: 'string' | 'date' | 'boolean' | 'number' | 'autoComplete'
  enableColumnFilter: boolean
  enableSorting: boolean
} & {
  accessorKey: keyof T
  type: 'listOfValues'
  enableColumnFilter: boolean
  enableSorting: boolean
  codebookCode: CODEBOOK
}
