import { Search } from 'lucide-react'
import { useQueryState } from 'next-usequerystate'
import React, { useDeferredValue, useEffect, useRef, useState } from 'react'

import { PlusButton, RefreshButton } from '@/components/Buttons'
import { GlobalSearchTrigger } from '@/components/search/GlobalSearchTrigger'
import { Tooltip } from '@/components/Tooltip'
import { Input } from '@/components/ui/input'
import usePermission from '@/hooks/usePermission'
import useTableStateStore from '@/store/useTableStateStore'
import type { ROLE } from '@/types/constants/roles'

import { SearchBarWrapper } from './SearchBarWrapper'

interface Props {
    useQuery?: boolean
    left?: JSX.Element
    right?: JSX.Element
    tableId: string
    onChange?: (value: string) => void
    isGlobalSearch?: boolean
}

export const SearchBar = ({
    useQuery = true,
    left,
    right,
    tableId,
    onChange,
    isGlobalSearch = false,
}: Props) => {
    const [querySearch, setQuerySearch] = useQueryState('search', {
        history: 'replace',
    })

    const { setSearch, instances, setSearchValue } = useTableStateStore()
    const searchInstance = querySearch || instances[tableId]?.search
    const storeValue = instances[tableId]?.searchBarValue

    // Use deferred value for non-blocking store updates
    const deferredStoreValue = useDeferredValue(storeValue || '')

    // Local state for immediate input responsiveness
    const [localValue, setLocalValue] = useState(deferredStoreValue)

    const onChangeRef = useRef(onChange)

    const [mounted, setMounted] = useState(false)

    // Sync local value with deferred store value
    useEffect(() => {
        setLocalValue(deferredStoreValue)
    }, [deferredStoreValue])

    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            setSearchValue(tableId, searchInstance || '')
        }
    }, [mounted, searchInstance, setSearchValue, tableId])

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            if (mounted) {
                if (onChangeRef.current) {
                    onChangeRef.current(localValue || '')
                }
                setSearch(tableId, localValue)
                if (useQuery) {
                    setQuerySearch(localValue || '', { shallow: true })
                }
            }
        }, 500)
        return () => clearTimeout(delayInputTimeoutId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localValue])

    return (
        <SearchBarWrapper>
            {left && <div className="flex items-center gap-2 flex-shrink-0">{left}</div>}

            {isGlobalSearch ? (
                <div className="flex-1">
                    <div className="relative max-w-md">
                        <GlobalSearchTrigger size="sm" />
                    </div>
                </div>
            ) : (
                <div className="flex-1">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={localValue}
                            onChange={e => {
                                const newValue = e.target.value
                                setLocalValue(newValue) // Immediate local update (no lag)
                                setSearchValue(tableId, newValue) // Deferred store update
                            }}
                            placeholder="Search..."
                            className="pl-10"
                            type="search"
                            name="search"
                        />
                    </div>
                </div>
            )}

            {right && <div className="flex items-center gap-2 flex-shrink-0">{right}</div>}
        </SearchBarWrapper>
    )
}

interface SearchBarButtonsProps {
    handleRefresh: () => void
    handleAdd: () => void
    editRole: ROLE
    children?: React.ReactNode
}

export const SearchBarButtonsComponent = ({
    editRole,
    handleRefresh,
    handleAdd,
    children,
}: SearchBarButtonsProps) => {
    const canEdit = usePermission([editRole])
    return (
        <div className="flex gap-1">
            <Tooltip content="Refresh">
                <div>
                    <RefreshButton onClick={handleRefresh} />
                </div>
            </Tooltip>
            {canEdit && (
                <Tooltip content="Add New">
                    <div>
                        <PlusButton onClick={handleAdd} />
                    </div>
                </Tooltip>
            )}
            {children}
        </div>
    )
}
