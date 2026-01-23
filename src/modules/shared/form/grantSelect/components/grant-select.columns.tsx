import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import type { Grant } from '@/modules/grants/types/grant.types'

import type { SelectedGrant } from '../types/grant-select.types'
import { isGrantSelected } from '../types/grant-select.types'

interface UseGrantSelectColumnsProps {
  selectedGrants: SelectedGrant[]
  onToggle: (grant: Grant) => void
}

/**
 * Column definitions for grant selection table.
 * Includes checkbox column for multi-select and essential identification fields.
 *
 * @param selectedGrants - Array of currently selected grants
 * @param onToggle - Callback when a grant is toggled
 */
export const useGrantSelectColumns = ({
  selectedGrants,
  onToggle
}: UseGrantSelectColumnsProps) => {
  const columns = useMemo(
    (): ColumnDef<Grant, any>[] => [
      {
        id: 'select',
        header: () => null,
        size: 40,
        enableSorting: false,
        cell: ({ row }) => {
          const isSelected = isGrantSelected(row.original.uid, selectedGrants)

          return (
            <div className="flex items-center justify-center">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggle(row.original)}
                onClick={e => e.stopPropagation()}
                aria-label={`Select ${row.original.name}`}
              />
            </div>
          )
        }
      },
      {
        id: 'name',
        header: 'Name',
        accessorFn: row => row.name,
        size: 300
      },
      {
        id: 'code',
        header: 'Code',
        accessorFn: row => row.code,
        size: 150
      },
      {
        id: 'grantGroup',
        header: 'Grant Group',
        accessorFn: row => row.grantGroup?.name,
        size: 200
      }
    ],
    [selectedGrants, onToggle]
  )

  return columns
}
