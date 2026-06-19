import { Search } from 'lucide-react'
import React from 'react'

import { PlusButton, RefreshButton } from '@/components/Buttons'
import { GlobalSearchTrigger } from '@/components/search/GlobalSearchTrigger'
import { Tooltip } from '@/components/Tooltip'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import usePermission from '@/hooks/usePermission'
import type { ROLE } from '@/types/constants/roles'

import { useDebouncedSearchInput } from './hooks/useDebouncedSearchInput'
import { SearchBarWrapper } from './SearchBarWrapper'

interface Props {
    useQuery?: boolean
    left?: JSX.Element
    right?: JSX.Element
    secondRow?: JSX.Element
    tableId: string
    onChange?: (value: string) => void
    isGlobalSearch?: boolean
    hideSidebarTrigger?: boolean
}

export const SearchBar = ({
    useQuery = true,
    left,
    right,
    secondRow,
    tableId,
    onChange,
    isGlobalSearch = false,
    hideSidebarTrigger = false,
}: Props) => {
    const { inputRef, defaultValue, handleChange } = useDebouncedSearchInput({
        tableId,
        enableQueryURL: useQuery,
        onChange,
    })

    return (
        <SearchBarWrapper>
            <div className="flex items-center gap-4">
                {!hideSidebarTrigger && <SidebarTrigger />}
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
                                defaultValue={defaultValue}
                                onChange={handleChange}
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
            {secondRow && <div className="flex flex-wrap items-center gap-2 pt-2">{secondRow}</div>}
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
