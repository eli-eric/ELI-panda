import type { ColumnDef, Table } from '@tanstack/react-table'
import type { ReactNode } from 'react'

// Define a type for row event handlers
export type RowClickHandler<T extends object> = (
  row: T,
  index: number,
  event: React.MouseEvent
) => void

// Define a type for getRowProps function
export type GetRowProps<T extends object> = (
  row: T,
  index: number
) => React.HTMLAttributes<HTMLTableRowElement>

// Define a type for column pinning options
export type PinnedPosition = 'left' | 'right' | false

// Define a type for column meta data
export interface ColumnMeta {
  sticky?: boolean
  className?: string
  pin?: PinnedPosition
}

export interface TableProps<T extends object> {
  /**
   * The columns configuration for the table.
   */
  columns: ColumnDef<T, any>[]

  /**
   * The data to be displayed in the table.
   */
  data: T[]

  /**
   * Additional CSS class for the table container.
   */
  className?: string

  /**
   * Additional CSS class for the table header.
   */
  headerClassName?: string

  /**
   * Additional CSS class for table rows.
   */
  rowClassName?: string

  /**
   * Additional CSS class for the table footer.
   */
  footerClassName?: string

  /**
   * Whether to enable sorting functionality.
   * @default true
   */
  enableSorting?: boolean

  /**
   * Whether to enable pagination.
   * @default false
   */
  enablePagination?: boolean

  /**
   * Whether to enable footer rendering.
   * @default false
   */
  enableFooter?: boolean

  /**
   * Whether to enable column pinning.
   * @default false
   */
  enablePinning?: boolean

  /**
   * Default number of rows per page when pagination is enabled.
   * @default 10
   */
  defaultPageSize?: number

  /**
   * Whether the table is in a loading state.
   * Displays skeleton rows when true.
   * @default false
   */
  loading?: boolean

  /**
   * Message to display when there is no data.
   * @default "No data available"
   */
  emptyMessage?: ReactNode

  /**
   * Fixed height for the table with vertical scrolling.
   * When set, the header becomes sticky and the body becomes scrollable.
   * Example: "400px" or "50vh"
   */
  fixedHeight?: string

  /**
   * Function to generate custom props for each row.
   * Allows adding custom event handlers (like onClick) and other attributes to rows.
   * Example: (row) => ({ onClick: () => handleRowClick(row), className: row.isSelected ? 'selected' : '' })
   */
  getRowProps?: GetRowProps<T>

  /**
   * Whether to enable filtering functionality.
   * @default false
   */
  enableFiltering?: boolean

  /**
   * Whether to skip the empty message.
   * @default false
   */
  skipEmptyMessage?: boolean
}

export interface TableHeaderProps<T extends object> {
  table: Table<T>
  enableSorting?: boolean
  enableFiltering?: boolean
  headerClassName?: string
}

export interface TableBodyProps<T extends object> {
  table: any
  columns: any[]
  loading?: boolean
  rowClassName?: string
  getRowProps?: GetRowProps<T>
  skipEmptyMessage?: boolean
}

export interface TablePaginationProps<T extends object> {
  table: any
}

export interface TableFooterProps<T extends object> {
  table: Table<T>
  footerClassName?: string
}

export interface SortIndicatorProps {
  column: any
}

export interface FilterDropdownProps {
  column: any
  onFilterChange: (value: string) => void
  currentFilter: string
}

export interface PageSizeDropdownProps {
  value: number
  onChange: (value: number) => void
  pageSizeOptions: number[]
}
