import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { ExpandableNameCell } from '@/components/form/shared/ExpandableNameCell'
import { highlightText } from '@/utils'

import type { SystemTypeTreeRow } from '../types/system-type-select.types'

/**
 * Column definitions for system type selection table.
 * Includes expandable name column for tree visualization and code column.
 *
 * @param search - Current search term for highlighting
 */
export const useSystemTypeSelectColumns = (search: string) => {
  return useMemo(
    (): ColumnDef<SystemTypeTreeRow, any>[] => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        size: 300,
        cell: ({ row, getValue }) => (
          <ExpandableNameCell row={row} getValue={getValue} filterName={search} />
        )
      },
      {
        id: 'code',
        header: 'Code',
        accessorKey: 'code',
        size: 100,
        cell: ({ getValue }) => highlightText(getValue() || '', search)
      }
    ],
    [search]
  )
}
