import type { FC } from 'react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import type { TeamListItem } from '../../types/team.types'

interface TeamListRowProps {
    team: TeamListItem
    isActive: boolean
    onSelect: (uid: string) => void
}

export const TeamListRow: FC<TeamListRowProps> = ({ team, isActive, onSelect }) => (
    <button
        type="button"
        onClick={() => onSelect(team.uid)}
        aria-current={isActive}
        data-testid={`team-row-${team.uid}`}
        className={cn(
            'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm',
            'hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer',
            isActive && 'bg-accent text-accent-foreground font-medium',
        )}
    >
        <span className="flex min-w-0 flex-col">
            <span className="truncate">{team.name}</span>
            {team.code && (
                <span className="truncate text-xs text-muted-foreground">{team.code}</span>
            )}
        </span>
        <Badge variant="secondary" className="shrink-0">
            {team.memberCount}
        </Badge>
    </button>
)
