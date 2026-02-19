import { useEffect } from 'react'

import { cn } from '@/lib/utils'
import { SystemFilterButtonContainer } from '@/modules/systems/components/filters/SystemsFilterButton.cont'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import useTableStateStore from '@/store/useTableStateStore'
import type { PageSizeOption } from '@/types/pagination'
import type { SystemDetail } from '@/types/responses/systems'

import { PaginationV2 as Pagination } from '../../table/PaginationV2'
import { SearchBar } from '../../table/SearchBar'
import { FilterBadges } from '../FilterBadges'
import { SystemSelectTable } from './components/SystemSelect.table'

interface SystemSelectProps {
    /**
     * Currently selected system (if any)
     */
    selectedSystem?: SystemDetail

    /**
     * Callback fired when system is selected or deselected
     * - Called with system when checkbox is checked
     * - Called with undefined when checkbox is unchecked
     */
    onSelect: (system: SystemDetail | undefined) => void

    /**
     * Unique table ID for this instance
     * Used for managing table state (pagination, search, filters) in store
     */
    tableId: string

    /**
     * Whether to show action buttons in table cells
     * @default true
     */
    _hideButtons?: boolean

    /**
     * Default page size for pagination
     * @default 10
     */
    pageSizeDefault?: PageSizeOption

    /**
     * Additional CSS classes for the container
     */
    className?: string

    /**
     * Optional right element for the search bar
     */
    right?: JSX.Element

    /**
     * Optional function to customize row properties (styling, onClick, etc.)
     */
    getRowProps?: (row: any) => any
}

/**
 * Generic, reusable system selection component
 *
 * Features:
 * - Pins selected system to first row (always visible)
 * - Checkbox selection with deselect capability
 * - Store-only filters (not URL-based)
 * - Search functionality
 * - Pagination
 * - Filter badges
 * - Supports subsystem expansion
 *
 * Usage:
 * ```tsx
 * <SystemSelect
 *   selectedSystem={formState.selectedSystem}
 *   onSelect={(system) => setValue('selectedSystem', system)}
 *   tableId="my-unique-table-id"
 * />
 * ```
 */
export const SystemSelect = ({
    selectedSystem,
    onSelect,
    tableId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- reserved for API compatibility
    _hideButtons = true,
    pageSizeDefault = 10,
    className,
    right,
    getRowProps,
}: SystemSelectProps) => {
    const { instances } = useTableStateStore()
    const { systems, loading } = useSystems(tableId, false, pageSizeDefault)

    // NOTE: We do NOT pin selected systems to the top of the table
    // Pinning breaks the hierarchical structure and collapses all expanded subsystems
    // Instead, we just highlight the selected row with orange background

    // Handle checkbox toggle - select or deselect
    const handleSystemToggle = (system: SystemDetail) => {
        if (selectedSystem?.uid === system.uid) {
            // Deselect if clicking the same system
            onSelect(undefined)
        } else {
            // Select new system
            onSelect(system)
        }
    }
    const filter = instances[tableId]?.filter
    const search = instances[tableId]?.search
    const pagination = instances[tableId]?.pagination

    // Reset selection when filters, search, or pagination changes
    useEffect(() => {
        // Only reset if we have a selection
        if (selectedSystem) {
            onSelect(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, search, pagination])

    return (
        <div>
            <SearchBar
                tableId={tableId}
                useQuery={false}
                left={<SystemFilterButtonContainer tableId={tableId} enableQueryURL={false} />}
                right={right}
            />

            <FilterBadges tableId={tableId} enableQueryURL={false} />

            <div className="h-[556px]">
                <SystemSelectTable
                    tableId={tableId}
                    systems={systems?.data}
                    selectedSystemUid={selectedSystem?.uid}
                    onSystemToggle={handleSystemToggle}
                    loading={loading}
                    pageSizeDefault={pageSizeDefault}
                    enableQueryURL={false}
                    className={className}
                    getRowProps={
                        getRowProps ||
                        (row => ({
                            className: cn(
                                'cursor-pointer transition-all',
                                row.original.uid === selectedSystem?.uid
                                    ? 'bg-orange-50 dark:bg-orange-950 border-l-1 border-l-orange-500'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-900',
                            ),
                            onClick: () => {
                                handleSystemToggle(row.original)
                            },
                        }))
                    }
                />
            </div>

            <Pagination
                tableId={tableId}
                settings={{
                    enableQueryURL: false,
                    total: systems?.totalCount,
                    pageSizeDefault,
                }}
            />
        </div>
    )
}
