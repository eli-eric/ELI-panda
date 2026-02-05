import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import type { Researcher } from '@/modules/researchers/types/researcher.types'

import type { SelectedResearcher } from '../types/researcher-select.types'
import { isResearcherSelected } from '../types/researcher-select.types'

interface UseResearcherSelectColumnsProps {
    selectedResearchers: SelectedResearcher[]
    onToggle: (researcher: Researcher) => void
}

/**
 * Column definitions for researcher selection table.
 * Includes checkbox column for multi-select and essential identification fields.
 *
 * @param selectedResearchers - Array of currently selected researchers
 * @param onToggle - Callback when a researcher is toggled
 */
export const useResearcherSelectColumns = ({
    selectedResearchers,
    onToggle,
}: UseResearcherSelectColumnsProps) => {
    const columns = useMemo(
        (): ColumnDef<Researcher, any>[] => [
            {
                id: 'select',
                header: () => null,
                size: 40,
                enableSorting: false,
                cell: ({ row }) => {
                    const isSelected = isResearcherSelected(row.original.uid, selectedResearchers)

                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => onToggle(row.original)}
                                onClick={e => e.stopPropagation()}
                                aria-label={`Select ${row.original.firstName} ${row.original.lastName}`}
                            />
                        </div>
                    )
                },
            },
            {
                id: 'lastName',
                header: 'Last Name',
                accessorFn: row => row.lastName,
                size: 150,
            },
            {
                id: 'firstName',
                header: 'First Name',
                accessorFn: row => row.firstName,
                size: 150,
            },
            {
                id: 'orcid',
                header: 'ORCID',
                accessorFn: row => row.orcid,
                size: 200,
            },
            {
                id: 'scopusId',
                header: 'Scopus ID',
                accessorFn: row => row.scopusId,
                size: 150,
            },
        ],
        [selectedResearchers, onToggle],
    )

    return columns
}
