import { X } from 'lucide-react'
import type { FC } from 'react'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { TABLE_IDS } from '@/types/constants/tableIds'

import { useAssignableUsers } from '../hooks/useAssignableUsers'
import type { TeamMember } from '../types/team.types'
import { useTeamMemberSelectColumns } from './team-member-select.columns'
import type { TeamMemberModalContentProps } from './team-member-select.types'
import { isMemberSelected } from './team-member-select.types'

const TABLE_ID = TABLE_IDS.TEAM_MEMBER_SELECT_MODAL
const labels = message.teamsPage.members

const tableSettings: PandaTableSettings<TeamMember> = {
    enableSorting: true,
    enableQueryURL: false,
    enableColumnReordering: false,
    enableColumnHiding: false,
}

/**
 * Multi-select dialog for team members, modeled on the publications
 * researcher-select modal. Set-based: seeded with the current members
 * (incl. disabled, shown only as badges), toggling enabled users from the
 * assignable-users list; Continue returns the full selected uid set.
 */
export const TeamMemberModalContent: FC<TeamMemberModalContentProps> = ({
    onSelect,
    onClose,
    initialSelected = [],
}) => {
    const { formatMessage: fm } = useIntl()
    const [selected, setSelected] = useState<TeamMember[]>(initialSelected)

    const { data, isFetching } = useAssignableUsers(TABLE_ID)
    const users = data ?? []

    const toggle = (member: TeamMember) =>
        setSelected(prev =>
            isMemberSelected(member.uid, prev)
                ? prev.filter(m => m.uid !== member.uid)
                : [...prev, member],
        )

    const removeFromBadges = (uid: string) => setSelected(prev => prev.filter(m => m.uid !== uid))

    const columns = useTeamMemberSelectColumns({ selected, onToggle: toggle })

    const table = usePandaTable<TeamMember>({
        tableId: TABLE_ID,
        columns,
        data: users,
        settings: tableSettings,
    })

    const handleConfirm = () => {
        onSelect(selected.map(m => m.uid))
        onClose?.()
    }

    return (
        <div className="flex flex-col gap-3">
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1 rounded-md bg-muted/50 p-2">
                    <span className="mr-2 self-center text-sm text-muted-foreground">
                        {fm({ id: labels.selectedCount }, { count: selected.length })}
                    </span>
                    {selected.map(m => (
                        <Badge
                            key={m.uid}
                            variant="secondary"
                            className={cn(
                                'flex items-center gap-1 pr-1',
                                !m.isEnabled && 'opacity-50',
                            )}
                        >
                            <span className="text-xs">
                                {m.lastName}, {m.firstName}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeFromBadges(m.uid)}
                                className="ml-1 rounded-full p-0.5 hover:bg-muted"
                                aria-label={fm(
                                    { id: labels.removeMember },
                                    { name: `${m.firstName} ${m.lastName}` },
                                )}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            <SearchBar tableId={TABLE_ID} useQuery={false} />

            <div className="h-[350px] overflow-hidden rounded-md border">
                <PandaTableV2
                    tableId={TABLE_ID}
                    table={table}
                    data={users}
                    settings={tableSettings}
                    loading={isFetching}
                    skeletonRowCount={20}
                    getRowProps={row => ({
                        onClick: () => toggle(row.original),
                        className: cn(
                            isMemberSelected(row.original.uid, selected) &&
                                'bg-orange-200 dark:bg-orange-800 hover:bg-orange-200 dark:hover:bg-orange-900',
                            'cursor-pointer',
                        ),
                    })}
                />
            </div>

            <div className="flex justify-end gap-2 border-t pt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    <FormattedMessage id={message.common.buttons.close} />
                </Button>
                <Button type="button" onClick={handleConfirm}>
                    <FormattedMessage id={labels.confirm} />
                </Button>
            </div>
        </div>
    )
}
