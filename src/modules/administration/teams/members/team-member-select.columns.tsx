import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Checkbox } from '@/components/ui/checkbox'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import type { TeamMember } from '../types/team.types'
import { isMemberSelected } from './team-member-select.types'

const cols = message.teamsPage.members.columns

interface UseTeamMemberSelectColumnsProps {
    selected: TeamMember[]
    onToggle: (member: TeamMember) => void
}

export const useTeamMemberSelectColumns = ({
    selected,
    onToggle,
}: UseTeamMemberSelectColumnsProps) => {
    const { formatMessage: fm } = useIntl()

    return useMemo(
        (): ColumnDef<TeamMember, any>[] => [
            {
                id: 'select',
                header: () => null,
                size: 40,
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={isMemberSelected(row.original.uid, selected)}
                            onCheckedChange={() => onToggle(row.original)}
                            onClick={e => e.stopPropagation()}
                            aria-label={`${row.original.firstName} ${row.original.lastName}`}
                        />
                    </div>
                ),
            },
            {
                id: 'lastName',
                header: fm({ id: cols.lastName }),
                accessorFn: row => row.lastName,
                size: 140,
                cell: ({ row, getValue }) => (
                    <span className={cn(!row.original.isEnabled && 'opacity-50')}>
                        {getValue() as string}
                    </span>
                ),
            },
            {
                id: 'firstName',
                header: fm({ id: cols.firstName }),
                accessorFn: row => row.firstName,
                size: 140,
            },
            {
                id: 'username',
                header: fm({ id: cols.username }),
                accessorFn: row => row.username,
                size: 140,
            },
            {
                id: 'email',
                header: fm({ id: cols.email }),
                accessorFn: row => row.email,
                size: 200,
            },
        ],
        [selected, onToggle, fm],
    )
}
