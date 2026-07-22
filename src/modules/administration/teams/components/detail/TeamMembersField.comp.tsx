import { Users } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import { useTeamMembers } from '../../hooks/useTeamMembers'
import { useTeamMemberSelectionModal } from '../../members/useTeamMemberSelectionModal'
import type { TeamDetail } from '../../types/team.types'

interface TeamMembersFieldProps {
    team: TeamDetail
}

const labels = message.teamsPage.members

export const TeamMembersField: FC<TeamMembersFieldProps> = ({ team }) => {
    const { formatMessage: fm } = useIntl()
    const { mutateAsync } = useTeamMembers(team.uid)
    const { openMemberModal } = useTeamMemberSelectionModal()
    const withWarningModal = useWarningModal()

    const saveMembers = (userUids: string[]) => {
        toast.promise(mutateAsync({ userUids }), {
            loading: fm({ id: labels.saving }),
            success: fm({ id: labels.saved }),
            error: fm({ id: labels.saveFailed }),
        })
    }

    const handleManage = () => {
        openMemberModal({
            initialSelected: team.members,
            onSelect: userUids => {
                // Clearing every member is a destructive full-replace — confirm
                // before wiping a non-empty team.
                if (userUids.length === 0 && team.members.length > 0) {
                    withWarningModal(
                        () => saveMembers(userUids),
                        fm({ id: labels.clearAllWarning }),
                    )()
                    return
                }
                saveMembers(userUids)
            },
        })
    }

    return (
        <div className="space-y-2 px-4 pb-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                    {fm({ id: labels.title })}
                    <span className="ml-2 text-muted-foreground">({team.members.length})</span>
                </span>
                <Button type="button" variant="outline" size="sm" onClick={handleManage}>
                    <Users className="size-4" />
                    {fm({ id: labels.manage })}
                </Button>
            </div>

            {team.members.length === 0 ? (
                <p className="rounded-md bg-muted px-3 py-2 text-sm italic text-muted-foreground">
                    {fm({ id: labels.empty })}
                </p>
            ) : (
                <div className="flex flex-wrap gap-1.5">
                    {team.members.map(member => (
                        <Badge
                            key={member.uid}
                            variant="secondary"
                            className={cn(!member.isEnabled && 'opacity-50')}
                            title={member.isEnabled ? member.email : fm({ id: labels.disabled })}
                        >
                            {member.lastName}, {member.firstName}
                            {!member.isEnabled && (
                                <span className="ml-1 text-xs">
                                    ({fm({ id: labels.disabled })})
                                </span>
                            )}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}
