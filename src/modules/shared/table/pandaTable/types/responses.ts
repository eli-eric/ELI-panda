import type { CODEBOOK } from '@/types/constants/codebook'

// TODO prepare data for table
export type TableResponse<T> = {
  totalCount: number
  data?: T[]
  columnDef: ColumnDef<T>[]
}

export type ColumnDef<T> = {
  header: string
  accessorKey: keyof T
  type: 'string' | 'date' | 'boolean' | 'number'
  enableColumnFilter: boolean
  enableSorting: boolean
} & {
  header: string
  accessorKey: keyof T
  type: 'listOfValues'
  enableColumnFilter: boolean
  enableSorting: boolean
  codebookCode: CODEBOOK
}
