import { Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { useTeamDeleteAction } from '../../hooks/useTeamDeleteAction'
import type { TeamDetail } from '../../types/team.types'

interface TeamDetailHeaderProps {
    team: TeamDetail
}

export const TeamDetailHeader: FC<TeamDetailHeaderProps> = ({ team }) => {
    const { formatMessage: fm } = useIntl()
    const canEdit = useAccessControl(ROLE.ADMIN)()
    const { deleteTeam } = useTeamDeleteAction()

    return (
        <div className="flex items-center justify-between gap-2 border-b border-border p-4">
            <h2 className="truncate text-lg font-semibold">{team.name}</h2>
            {canEdit && (
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
            )}
        </div>
    )
}
