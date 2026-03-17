import { X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { PlusButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useOpenGrantForm } from '@/modules/grants/hooks/useOpenGrantForm'
import type { Grant } from '@/modules/grants/types/grant.types'
import { PaginationV2 as Pagination } from '@/modules/shared/table/PaginationV2'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import {
    PandaTableV2,
    type PandaTableV2Handle,
} from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { ROLE } from '@/types/constants/roles'

import { useGrantsForSelect } from '../hooks/useGrantsForSelect'
import type { GrantModalContentProps, SelectedGrant } from '../types/grant-select.types'
import { isGrantSelected, toSelectedGrant } from '../types/grant-select.types'
import { useGrantSelectColumns } from './grant-select.columns'

const TABLE_ID = 'grant-select-modal'

const tableSettings: PandaTableSettings<Grant> = {
    enableSorting: true,
    enableQueryURL: false,
    enableColumnReordering: false,
    enableColumnHiding: false,
}

/**
 * Modal content for selecting multiple grants.
 *
 * Features:
 * - Selected grants displayed as badges at the top
 * - SearchBar with local state (no URL params)
 * - PandaTableV2 with virtual scrolling
 * - Pagination component
 * - Multi-select with checkboxes and row highlighting
 */
export const GrantModalContent: React.FC<GrantModalContentProps> = ({
    onSelect,
    onClose,
    initialSelected = [],
}) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.publication.form.grants
    // Local state for multi-selection
    const [selectedGrants, setSelectedGrants] = useState<SelectedGrant[]>(initialSelected)
    const tableRef = useRef<PandaTableV2Handle>(null)

    // Fetch grants using table state (search, pagination)
    const { data, isFetching: isLoading, refetch } = useGrantsForSelect(TABLE_ID)
    const grants = data?.data

    // Permission check for creating grants
    const canCreate = usePermission([ROLE.PUBLICATIONS_EDIT])

    // Open grant creation form
    const { openGrantForm } = useOpenGrantForm({ onSuccess: refetch })

    // Toggle grant selection (works for both Grant and SelectedGrant)
    const handleToggle = (grant: Grant | SelectedGrant) => {
        setSelectedGrants(prev => {
            const isSelected = isGrantSelected(grant.uid, prev)

            if (isSelected) {
                return prev.filter(g => g.uid !== grant.uid)
            }

            // For Grant objects, convert to SelectedGrant
            return [...prev, toSelectedGrant(grant as Grant)]
        })
    }

    // Remove from badges
    const handleRemoveFromBadges = (uid: string) => {
        setSelectedGrants(prev => prev.filter(g => g.uid !== uid))
    }

    // Get columns with selection state
    const columns = useGrantSelectColumns({
        selectedGrants,
        onToggle: handleToggle,
    })

    // Create table instance
    const table = usePandaTable<Grant>({
        tableId: TABLE_ID,
        columns,
        data: grants,
        settings: tableSettings,
    })

    // Handle confirm - pass selected grants to parent
    const handleConfirm = () => {
        onSelect(selectedGrants)
        onClose?.()
    }

    // Scroll table to top when page changes
    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    return (
        <div className="flex flex-col gap-3">
            {/* Selected grants badges */}
            {selectedGrants.length > 0 && (
                <div className="flex flex-wrap gap-1 p-2 bg-muted/50 rounded-md">
                    <span className="text-sm text-muted-foreground mr-2 self-center">
                        <FormattedMessage
                            id={labels.selectedCount}
                            values={{ count: selectedGrants.length }}
                        />
                    </span>
                    {selectedGrants.map(g => (
                        <Badge
                            key={g.uid}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1"
                        >
                            <span className="text-xs">{g.name}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveFromBadges(g.uid)}
                                className="ml-1 rounded-full hover:bg-muted p-0.5"
                                aria-label={`Remove ${g.name}`}
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
                                <PlusButton onClick={openGrantForm} />
                            </div>
                        </Tooltip>
                    ) : undefined
                }
            />

            {/* Grants table */}
            <div className="h-[350px] overflow-hidden border rounded-md">
                <PandaTableV2
                    ref={tableRef}
                    tableId={TABLE_ID}
                    table={table}
                    data={grants}
                    settings={tableSettings}
                    loading={isLoading}
                    skeletonRowCount={50}
                    getRowProps={row => ({
                        onClick: () => handleToggle(row.original),
                        className: cn(
                            isGrantSelected(row.original.uid, selectedGrants) &&
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
                onPageChange={handlePageChange}
            />

            {/* Footer buttons */}
            <div className="flex justify-end gap-2 pt-2 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                    <FormattedMessage id={message.common.buttons.close} />
                </Button>
                <Button
                    type="button"
                    disabled={selectedGrants.length === 0}
                    onClick={handleConfirm}
                >
                    <FormattedMessage id={message.common.buttons.continue} />
                    {selectedGrants.length > 0 && (
                        <FormattedMessage
                            id={labels.countSuffix}
                            values={{ count: selectedGrants.length }}
                        />
                    )}
                </Button>
            </div>
        </div>
    )
}
