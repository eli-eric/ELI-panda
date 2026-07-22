import { Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import { useTeamDeleteAction } from '../../hooks/useTeamDeleteAction'
import type { TeamDetail } from '../../types/team.types'

interface TeamDetailHeaderProps {
    team: TeamDetail
}

// The whole /administration/teams route is admin-guarded (proxy + nav), so the
// detail actions (edit fields, members, delete) are uniformly ungated here.
export const TeamDetailHeader: FC<TeamDetailHeaderProps> = ({ team }) => {
    const { formatMessage: fm } = useIntl()
    const { deleteTeam } = useTeamDeleteAction()

    return (
        <div className="flex items-center justify-between gap-2 border-b border-border p-4">
            <h2 className="truncate text-lg font-semibold">{team.name}</h2>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => deleteTeam(team.uid, team.name)}
                data-testid="team-delete"
            >
                <Trash2 className="size-4" />
                {fm({ id: message.common.buttons.delete })}
            </Button>
        </div>
    )
}
