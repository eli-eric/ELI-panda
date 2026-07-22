import { Plus, Search } from 'lucide-react'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'

import { useOpenTeamCreate } from '../../hooks/useOpenTeamCreate'
import { useTeams } from '../../hooks/useTeams'
import { useTeamSelection } from '../../hooks/useTeamSelection'
import { TeamListRow } from './TeamListRow.comp'

const labels = message.teamsPage.list

export const TeamsListPanel: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { data: teams, isLoading, isError } = useTeams()
    const { selectedUid, selectTeam } = useTeamSelection()
    const { openTeamCreate } = useOpenTeamCreate({ onCreated: selectTeam })
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase()
        if (!term) return teams ?? []
        return (teams ?? []).filter(
            t => t.name.toLowerCase().includes(term) || (t.code ?? '').toLowerCase().includes(term),
        )
    }, [teams, search])

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b border-border p-2">
                <SidebarTrigger className="shrink-0" />
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder={fm({ id: labels.searchPlaceholder })}
                        className="pl-8"
                        data-testid="teams-search"
                    />
                </div>
                <Button type="button" size="sm" onClick={openTeamCreate} data-testid="teams-new">
                    <Plus className="size-4" />
                    {fm({ id: labels.newTeam })}
                </Button>
            </div>

            <div className="flex-1 space-y-0.5 overflow-y-auto p-2">
                {isLoading ? (
                    <div className="space-y-1 p-1" data-testid="teams-list-skeleton">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-9 w-full" />
                        ))}
                    </div>
                ) : isError ? (
                    <p className="px-3 py-2 text-sm text-destructive">
                        {fm({ id: labels.loadFailed })}
                    </p>
                ) : filtered.length === 0 ? (
                    <p className="px-3 py-2 text-sm text-muted-foreground">
                        {fm({ id: labels.empty })}
                    </p>
                ) : (
                    filtered.map(team => (
                        <TeamListRow
                            key={team.uid}
                            team={team}
                            isActive={team.uid === selectedUid}
                            onSelect={selectTeam}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
