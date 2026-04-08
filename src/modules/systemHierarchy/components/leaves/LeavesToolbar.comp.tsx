import type { Table } from '@tanstack/react-table'
import { Filter, Search } from 'lucide-react'
import { useQueryState } from 'next-usequerystate'
import type { FC } from 'react'
import { useDeferredValue, useEffect, useRef, useState } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
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
    const openFilterSheet = useLeavesFilterSheet()

    const { storeFilters } = useFormFilterState({
        tableId,
        enableQueryUrl: enableQueryURL,
    })

    const [, setQuerySearch] = useQueryState('search', {
        history: 'replace',
    })

    const { setSearch, instances, setSearchValue } = useTableStateStore()
    const searchInstance = instances[tableId]?.search
    const storeValue = instances[tableId]?.searchBarValue
    const deferredStoreValue = useDeferredValue(storeValue || '')

    const [localValue, setLocalValue] = useState(deferredStoreValue)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setLocalValue(deferredStoreValue)
    }, [deferredStoreValue])

    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            setSearchValue(tableId, searchInstance || '')
        }
    }, [mounted, searchInstance, setSearchValue, tableId])

    const mountedRef = useRef(mounted)
    mountedRef.current = mounted

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            if (mountedRef.current) {
                setSearch(tableId, localValue)
                if (enableQueryURL) {
                    setQuerySearch(localValue || '', { shallow: true })
                }
            }
        }, 500)
        return () => clearTimeout(delayInputTimeoutId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localValue])

    const hasActiveFilters = storeFilters.length > 0

    return (
        <div
            className="border-b border-border px-4 py-2 space-y-2"
            data-testid="leaves-toolbar"
        >
            <div className="flex items-center gap-2">
                <div className="flex-1">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={localValue}
                            onChange={e => {
                                const newValue = e.target.value
                                setLocalValue(newValue)
                                setSearchValue(tableId, newValue)
                            }}
                            placeholder="Search..."
                            className="pl-10"
                            type="search"
                            name="search"
                            data-testid="leaves-toolbar-search"
                        />
                    </div>
                </div>
                <Tooltip content={hasActiveFilters ? 'Filters Applied' : 'Open Filters'}>
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
                <ColumnVisibilityDropdown table={table} excludeColumns={['icon']} />
            </div>
            {hasActiveFilters && (
                <FilterBadges tableId={tableId} enableQueryURL={enableQueryURL} />
            )}
        </div>
    )
}
