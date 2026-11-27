import type { TeamMember } from '../types/team.types'

export interface TeamMemberModalContentProps {
    title?: string
    onSelect: (userUids: string[]) => void
    onClose?: () => void
    initialSelected?: TeamMember[]
}

export const isMemberSelected = (uid: string, selected: TeamMember[]): boolean =>
    selected.some(m => m.uid === uid)
