import { Users } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { createMessageValues } from '@/utils/formatters'

import { useRemoveTeamMember } from '../../hooks/useRemoveTeamMember'
import { useTeamMembers } from '../../hooks/useTeamMembers'
import { useTeamMemberSelectionModal } from '../../members/useTeamMemberSelectionModal'
import type { TeamDetail, TeamMember } from '../../types/team.types'
import { useTeamMemberColumns } from './team-members.columns'

interface TeamMembersFieldProps {
    team: TeamDetail
}

const labels = message.teamsPage.members

export const TeamMembersField: FC<TeamMembersFieldProps> = ({ team }) => {
    const { formatMessage: fm } = useIntl()
    const { mutateAsync: setMembers } = useTeamMembers(team.uid)
    const { mutateAsync: removeMember } = useRemoveTeamMember(team.uid)
    const { openMemberModal } = useTeamMemberSelectionModal()
    const withWarningModal = useWarningModal()

    const saveMembers = (userUids: string[]) => {
        toast.promise(setMembers({ userUids }), {
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
                    withWarningModal(() => saveMembers(userUids), fm({ id: labels.clearAllWarning }))()
                    return
                }
                saveMembers(userUids)
            },
        })
    }

    const handleDelete = (member: TeamMember) => {
        const name = `${member.firstName} ${member.lastName}`
        const runRemove = () => {
            toast.promise(removeMember(member.uid), {
                loading: fm({ id: labels.removing }),
                success: fm({ id: labels.removed }),
                error: fm({ id: labels.removeFailed }),
            })
        }
        withWarningModal(runRemove, fm({ id: labels.removeConfirm }, createMessageValues({ name })))()
    }

    const columns = useTeamMemberColumns({ onDelete: handleDelete })

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

            <Table<TeamMember>
                columns={columns}
                data={team.members}
                emptyMessage={fm({ id: labels.empty })}
                className="overflow-x-auto"
                rowClassName="whitespace-nowrap group/row"
            />
        </div>
    )
}
