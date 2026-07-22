import { Users } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'

import { useTeam } from '../../hooks/useTeam'
import { useTeamSelection } from '../../hooks/useTeamSelection'
import { TeamDetailFields } from './TeamDetailFields.cont'
import { TeamDetailHeader } from './TeamDetailHeader.comp'
import { TeamMembersField } from './TeamMembersField.comp'

const detail = message.teamsPage.detail

const CenteredMessage: FC<{ children: string; testId?: string }> = ({ children, testId }) => (
    <div
        className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground"
        data-testid={testId}
    >
        <Users className="size-8 opacity-50" />
        <p className="text-sm">{children}</p>
    </div>
)

export const TeamDetailView: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedUid } = useTeamSelection()
    const { data: team, isLoading, isError } = useTeam(selectedUid)

    if (!selectedUid) {
        return (
            <CenteredMessage testId="team-detail-empty">
                {fm({ id: detail.selectPrompt })}
            </CenteredMessage>
        )
    }

    if (isLoading) {
        return (
            <div className="space-y-3 p-4" data-testid="team-detail-skeleton">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        )
    }

    if (isError || !team) {
        return (
            <CenteredMessage testId="team-detail-not-found">
                {fm({ id: detail.notFound })}
            </CenteredMessage>
        )
    }

    return (
        <div className="flex h-full flex-col overflow-y-auto">
            <TeamDetailHeader team={team} />
            <TeamDetailFields team={team} />
            <TeamMembersField team={team} />
        </div>
    )
}
