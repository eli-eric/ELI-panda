import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { TableDeleteButton } from '@/components/Buttons'
import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'

import type { TeamMember } from '../../types/team.types'

const labels = message.teamsPage.members
const cols = labels.columns

interface UseTeamMemberColumnsProps {
    onDelete: (member: TeamMember) => void
    disabled?: boolean
}

/** Columns for the team detail members table (with a per-row delete action). */
export const useTeamMemberColumns = ({ onDelete, disabled }: UseTeamMemberColumnsProps) => {
    const { formatMessage: fm } = useIntl()

    return useMemo(
        (): ColumnDef<TeamMember>[] => [
            {
                id: 'lastName',
                header: fm({ id: cols.lastName }),
                accessorFn: row => row.lastName,
                size: 160,
            },
            {
                id: 'firstName',
                header: fm({ id: cols.firstName }),
                accessorFn: row => row.firstName,
                size: 160,
            },
            {
                id: 'username',
                header: fm({ id: cols.username }),
                accessorFn: row => row.username,
                size: 160,
            },
            {
                id: 'email',
                header: fm({ id: cols.email }),
                accessorFn: row => row.email,
                size: 220,
            },
            {
                id: 'status',
                header: fm({ id: cols.status }),
                enableSorting: false,
                size: 110,
                cell: ({ row }) =>
                    row.original.isEnabled ? null : (
                        <Badge variant="outline" className="text-muted-foreground">
                            {fm({ id: labels.disabled })}
                        </Badge>
                    ),
            },
            {
                id: 'actions',
                header: () => <span className="sr-only">{fm({ id: labels.actionsLabel })}</span>,
                enableSorting: false,
                size: 72,
                meta: { className: 'text-right' },
                cell: ({ row }) => (
                    <TableDeleteButton
                        aria-label={fm(
                            { id: labels.removeMember },
                            { name: `${row.original.firstName} ${row.original.lastName}` },
                        )}
                        disabled={disabled}
                        onClick={() => onDelete(row.original)}
                    />
                ),
            },
        ],
        [fm, onDelete, disabled],
    )
}
