import { X } from 'lucide-react'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { PlusButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useOpenResearcherForm } from '@/modules/researchers/hooks/useOpenResearcherForm'
import type { Researcher } from '@/modules/researchers/types/researcher.types'
import { PaginationV2 as Pagination } from '@/modules/shared/table/PaginationV2'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { ROLE } from '@/types/constants/roles'

import { useResearchersForSelect } from '../hooks/useResearchersForSelect'
import type {
    ResearcherModalContentProps,
    SelectedResearcher,
} from '../types/researcher-select.types'
import { isResearcherSelected, toSelectedResearcher } from '../types/researcher-select.types'
import { useResearcherSelectColumns } from './researcher-select.columns'

const TABLE_ID = 'researcher-select-modal'

const tableSettings: PandaTableSettings<Researcher> = {
    enableSorting: true,
    enableQueryURL: false,
    enableColumnReordering: false,
    enableColumnHiding: false,
}

/**
 * Modal content for selecting multiple researchers (ELI Authors).
 *
 * Features:
 * - Selected researchers displayed as badges at the top
 * - SearchBar with local state (no URL params)
 * - PandaTableV2 with virtual scrolling
 * - Pagination component
 * - Multi-select with checkboxes and row highlighting
 */
export const ResearcherModalContent: React.FC<ResearcherModalContentProps> = ({
    onSelect,
    onClose,
    initialSelected = [],
}) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.researchersPage.form
    // Local state for multi-selection
    const [selectedResearchers, setSelectedResearchers] =
        useState<SelectedResearcher[]>(initialSelected)

    // Fetch researchers using table state (search, pagination)
    const { data, isFetching: isLoading, refetch } = useResearchersForSelect(TABLE_ID)
    const researchers = data?.data

    // Permission check for creating researchers
    const canCreate = usePermission([ROLE.PUBLICATIONS_EDIT])

    // Open researcher creation form
    const { openResearcherForm } = useOpenResearcherForm({ onSuccess: refetch })

    // Toggle researcher selection (works for both Researcher and SelectedResearcher)
    const handleToggle = (researcher: Researcher | SelectedResearcher) => {
        setSelectedResearchers(prev => {
            const isSelected = isResearcherSelected(researcher.uid, prev)

            if (isSelected) {
                return prev.filter(r => r.uid !== researcher.uid)
            }

            // For Researcher objects, convert to SelectedResearcher
            return [...prev, toSelectedResearcher(researcher as Researcher)]
        })
    }

    // Remove from badges
    const handleRemoveFromBadges = (uid: string) => {
        setSelectedResearchers(prev => prev.filter(r => r.uid !== uid))
    }

    // Get columns with selection state
    const columns = useResearcherSelectColumns({
        selectedResearchers,
        onToggle: handleToggle,
    })

    // Create table instance
    const table = usePandaTable<Researcher>({
        tableId: TABLE_ID,
        columns,
        data: researchers,
        settings: tableSettings,
    })

    // Handle confirm - pass selected researchers to parent
    const handleConfirm = () => {
        onSelect(selectedResearchers)
        onClose?.()
    }

    return (
        <div className="flex flex-col gap-3">
            {/* Selected researchers badges */}
            {selectedResearchers.length > 0 && (
                <div className="flex flex-wrap gap-1 p-2 bg-muted/50 rounded-md">
                    <span className="text-sm text-muted-foreground mr-2 self-center">
                        {fm({ id: labels.selectedCount }, { count: selectedResearchers.length })}
                    </span>
                    {selectedResearchers.map(r => (
                        <Badge
                            key={r.uid}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1"
                        >
                            <span className="text-xs">
                                {r.lastName}, {r.firstName}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemoveFromBadges(r.uid)}
                                className="ml-1 rounded-full hover:bg-muted p-0.5"
                                aria-label={`Remove ${r.firstName} ${r.lastName}`}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Search bar */}
            <SearchBar
                tableId={TABLE_ID}
                useQuery={false}
                right={
                    canCreate ? (
                        <Tooltip content={fm({ id: labels.createNew })}>
                            <div>
                                <PlusButton onClick={openResearcherForm} />
                            </div>
                        </Tooltip>
                    ) : undefined
                }
            />

            {/* Researchers table */}
            <div className="h-[350px] overflow-hidden border rounded-md">
                <PandaTableV2
                    tableId={TABLE_ID}
                    table={table}
                    data={researchers}
                    settings={tableSettings}
                    loading={isLoading}
                    skeletonRowCount={50}
                    getRowProps={row => ({
                        onClick: () => handleToggle(row.original),
                        className: cn(
                            isResearcherSelected(row.original.uid, selectedResearchers) &&
                                'bg-orange-200 dark:bg-orange-800 hover:bg-orange-200 dark:hover:bg-orange-900',
                            'cursor-pointer',
                        ),
                    })}
                />
            </div>

            {/* Pagination */}
            <Pagination
                tableId={TABLE_ID}
                settings={{
                    enableQueryURL: false,
                    total: data?.totalCount,
                }}
            />

            {/* Footer buttons */}
            <div className="flex justify-end gap-2 pt-2 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                    <FormattedMessage id={message.common.buttons.close} />
                </Button>
                <Button
                    type="button"
                    disabled={selectedResearchers.length === 0}
                    onClick={handleConfirm}
                >
                    <FormattedMessage id={message.common.buttons.continue} />
                    {selectedResearchers.length > 0 &&
                        fm({ id: labels.countSuffix }, { count: selectedResearchers.length })}
                </Button>
            </div>
        </div>
    )
}
