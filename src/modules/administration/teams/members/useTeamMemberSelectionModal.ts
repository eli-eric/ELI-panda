import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

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
            id: 'team-member-select',
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
