'use client'

import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { message } from '@/i18n/src/messages'

import { useSystemHistory } from '../../hooks/queries/useSystemHistory'
import type { SystemLeaf } from '../../types'
import { HISTORY_TYPE } from '../../types/history'
import { SystemHistoryFeed } from '../history/SystemHistoryFeed.comp'

interface HistoryTabProps {
    system: SystemLeaf
}

type HistoryTypeFilter = 'ALL' | HISTORY_TYPE

export const HistoryTabContainer: FC<HistoryTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const [historyTypeFilter, setHistoryTypeFilter] = useState<HistoryTypeFilter>('ALL')
    const [userFilter, setUserFilter] = useState<string>('ALL')

    const { data, isLoading, isError, error } = useSystemHistory(system.uid)

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message || 'Failed to load history')
        }
    }, [isError, error])

    // Extract unique users from history data
    const uniqueUsers = useMemo(() => {
        if (!data) return []
        const users = data.map(h => h.changedBy).filter(Boolean)
        return Array.from(new Set(users)).sort()
    }, [data])

    // Filter history based on selected filters
    const filteredHistory = useMemo(() => {
        if (!data) return []

        let filtered = data

        // Filter by history type
        if (historyTypeFilter !== 'ALL') {
            filtered = filtered.filter(h => h.historyType === historyTypeFilter)
        }

        // Filter by user
        if (userFilter !== 'ALL') {
            filtered = filtered.filter(h => h.changedBy === userFilter)
        }

        return filtered
    }, [data, historyTypeFilter, userFilter])

    if (isLoading) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.common.ui.loading })}
            </div>
        )
    }

    return (
        <div className="h-full min-h-0 flex flex-col overflow-hidden">
            {/* Filters Section */}
            <div className="flex flex-col gap-4 px-4 pt-4 pb-3 border-b bg-background shrink-0 sm:flex-row sm:items-end">
                {/* History Type Filter */}
                <div className="flex-1 space-y-2">
                    <Label className="text-xs text-muted-foreground">
                        {fm({ id: message.systemHierarchy.history.filters.historyType })}
                    </Label>
                    <RadioGroup
                        value={historyTypeFilter}
                        onValueChange={value => setHistoryTypeFilter(value as HistoryTypeFilter)}
                        className="flex flex-wrap gap-4"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="ALL" id="filter-all" />
                            <Label htmlFor="filter-all" className="cursor-pointer font-normal">
                                {fm({ id: message.systemHierarchy.history.filters.all })}
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value={HISTORY_TYPE.GENERAL} id="filter-general" />
                            <Label htmlFor="filter-general" className="cursor-pointer font-normal">
                                {fm({ id: message.systemHierarchy.history.filters.general })}
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value={HISTORY_TYPE.ITEM} id="filter-item" />
                            <Label htmlFor="filter-item" className="cursor-pointer font-normal">
                                {fm({ id: message.systemHierarchy.history.filters.itemChanges })}
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value={HISTORY_TYPE.MOVE} id="filter-move" />
                            <Label htmlFor="filter-move" className="cursor-pointer font-normal">
                                {fm({ id: message.systemHierarchy.history.filters.moves })}
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value={HISTORY_TYPE.ITEM_MOVE} id="filter-item-move" />
                            <Label
                                htmlFor="filter-item-move"
                                className="cursor-pointer font-normal"
                            >
                                {fm({ id: message.systemHierarchy.history.filters.itemMoves })}
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* User Filter */}
                <div className="w-full space-y-2 sm:w-56">
                    <Label className="text-xs text-muted-foreground">
                        {fm({ id: message.systemHierarchy.history.filters.changedByUser })}
                    </Label>
                    <Select value={userFilter} onValueChange={setUserFilter}>
                        <SelectTrigger size="sm" className="w-full">
                            <SelectValue
                                placeholder={fm({
                                    id: message.systemHierarchy.history.filters.allUsers,
                                })}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">
                                {fm({ id: message.systemHierarchy.history.filters.allUsers })}
                            </SelectItem>
                            {uniqueUsers.map(user => (
                                <SelectItem key={user} value={user}>
                                    {user}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Timeline - flex-1 to fill remaining space */}
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-style px-4 pb-8">
                <SystemHistoryFeed history={filteredHistory} className="pb-6" />
            </div>
        </div>
    )
}
