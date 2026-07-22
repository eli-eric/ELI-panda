import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { TABLE_IDS } from '@/types/constants/tableIds'

import type { TeamMember } from '../types/team.types'
import { TeamMemberModalContent } from './team-member-modal-content'

interface OpenMemberModalArgs {
    initialSelected: TeamMember[]
    onSelect: (userUids: string[]) => void
}

export const useTeamMemberSelectionModal = () => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()

    const openMemberModal = ({ initialSelected, onSelect }: OpenMemberModalArgs) => {
        openModal('dialog', {
            id: TABLE_IDS.TEAM_MEMBER_SELECT_MODAL,
            component: TeamMemberModalContent,
            props: {
                title: fm({ id: message.teamsPage.members.modalTitle }),
                size: 'xl' as const,
                onSelect,
                initialSelected,
            },
        })
    }

    return { openMemberModal }
}
