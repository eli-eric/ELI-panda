import type { Table } from '@tanstack/react-table'
import { Filter, Search } from 'lucide-react'
import { useQueryState } from 'next-usequerystate'
import type { ChangeEvent, FC } from 'react'
import { useEffect, useRef, useTransition } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'
import { FilterBadges } from '@/modules/shared/form/FilterBadges'
import { ColumnVisibilityDropdown } from '@/modules/shared/table/ColumnVisibilityDropdown.comp'
import useTableStateStore from '@/store/useTableStateStore'

import type { SystemLeaf } from '../../types'
import { useLeavesFilterSheet } from '../filters/hooks/useLeavesFilterSheet'

interface LeavesToolbarProps {
    tableId: string
    table: Table<SystemLeaf>
    enableQueryURL?: boolean
}

export const LeavesToolbar: FC<LeavesToolbarProps> = ({
    tableId,
    table,
    enableQueryURL = true,
}) => {
    const { formatMessage: fm } = useIntl()
    const openFilterSheet = useLeavesFilterSheet()

    const { storeFilters } = useFormFilterState({
        tableId,
        enableQueryUrl: enableQueryURL,
    })

    const [querySearch, setQuerySearch] = useQueryState('search', {
        history: 'replace',
    })

    const setSearch = useTableStateStore(s => s.setSearch)
    const storeSearch = useTableStateStore(s => s.instances[tableId]?.search)

    const initialValue = useRef(querySearch || storeSearch || '').current

    const inputRef = useRef<HTMLInputElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastCommittedRef = useRef(initialValue)

    const [, startTransition] = useTransition()

    // Store updates synchronously via Zustand; URL updates async via next-usequerystate.
    // Reading store first prevents the flash where sync effect sees old URL + new store
    // during our own commit window.
    useEffect(() => {
        const next = storeSearch || querySearch || ''
        if (next === lastCommittedRef.current) return
        lastCommittedRef.current = next
        if (inputRef.current && inputRef.current.value !== next) {
            inputRef.current.value = next
        }
    }, [querySearch, storeSearch])

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            lastCommittedRef.current = value
            startTransition(() => {
                setSearch(tableId, value)
                if (enableQueryURL) {
                    setQuerySearch(value || '', { shallow: true })
                }
            })
        }, 500)
    }

    const hasActiveFilters = storeFilters.length > 0

    return (
        <div className="border-b border-border px-4 py-2 space-y-2" data-testid="leaves-toolbar">
            <div className="flex items-center gap-2">
                <Tooltip content={hasActiveFilters ? fm({ id: message.systemHierarchy.leaves.filtersApplied }) : fm({ id: message.systemHierarchy.leaves.openFilters })}>
                    <div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openFilterSheet()}
                            data-testid="leaves-toolbar-filter-btn"
                        >
                            <Filter
                                className={`h-4 w-4 ${hasActiveFilters ? 'fill-current' : ''}`}
                                aria-hidden="true"
                            />
                        </Button>
                    </div>
                </Tooltip>
                <div className="flex-1">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            ref={inputRef}
                            defaultValue={initialValue}
                            onChange={handleInputChange}
                            placeholder="Search..."
                            className="pl-10"
                            type="search"
                            name="search"
                            data-testid="leaves-toolbar-search"
                        />
                    </div>
                </div>
                <ColumnVisibilityDropdown table={table} excludeColumns={['icon']} />
            </div>
            {hasActiveFilters && <FilterBadges tableId={tableId} enableQueryURL={enableQueryURL} />}
        </div>
    )
}
