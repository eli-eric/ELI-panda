import { Search } from 'lucide-react'
import { useQueryState } from 'next-usequerystate'
import React, { useEffect, useRef, useTransition } from 'react'

import { PlusButton, RefreshButton } from '@/components/Buttons'
import { GlobalSearchTrigger } from '@/components/search/GlobalSearchTrigger'
import { Tooltip } from '@/components/Tooltip'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import usePermission from '@/hooks/usePermission'
import useTableStateStore from '@/store/useTableStateStore'
import type { ROLE } from '@/types/constants/roles'

import { SearchBarWrapper } from './SearchBarWrapper'

interface Props {
    useQuery?: boolean
    left?: JSX.Element
    right?: JSX.Element
    secondRow?: JSX.Element
    tableId: string
    onChange?: (value: string) => void
    isGlobalSearch?: boolean
}

export const SearchBar = ({
    useQuery = true,
    left,
    right,
    secondRow,
    tableId,
    onChange,
    isGlobalSearch = false,
}: Props) => {
    const [querySearch, setQuerySearch] = useQueryState('search', {
        history: 'replace',
    })

    const setSearch = useTableStateStore(s => s.setSearch)
    const storeSearch = useTableStateStore(s => s.instances[tableId]?.search)

    const initialValue = useRef(querySearch || storeSearch || '').current

    const inputRef = useRef<HTMLInputElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastCommittedRef = useRef(initialValue)

    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    const [, startTransition] = useTransition()

    // Store updates synchronously via Zustand; URL updates async via next-usequerystate.
    // Use `??` (not `||`) so an empty-string commit ('') is authoritative —
    // `||` would treat '' as falsy and fall back to stale querySearch, causing a flash
    // when user clears the input.
    useEffect(() => {
        const next = storeSearch ?? querySearch ?? ''
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            lastCommittedRef.current = value
            if (onChangeRef.current) onChangeRef.current(value)
            startTransition(() => {
                setSearch(tableId, value)
                if (useQuery) {
                    setQuerySearch(value || '', { shallow: true })
                }
            })
        }, 500)
    }

    return (
        <SearchBarWrapper>
            <div className="flex items-center gap-4">
                <SidebarTrigger />
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
                                ref={inputRef}
                                defaultValue={initialValue}
                                onChange={handleInputChange}
                                placeholder="Search..."
                                className="pl-10"
                                type="search"
                                name="search"
                            />
                        </div>
                    </div>
                )}

                {right && <div className="flex items-center gap-2 flex-shrink-0">{right}</div>}
            </div>
            {secondRow && (
                <div className="flex flex-wrap items-center gap-2 pt-2">{secondRow}</div>
            )}
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
