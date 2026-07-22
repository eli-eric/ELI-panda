import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { TeamCreateDialog } from '../form/TeamCreateDialog.comp'

interface UseOpenTeamCreateOptions {
    onCreated?: (uid: string) => void
}

export const useOpenTeamCreate = ({ onCreated }: UseOpenTeamCreateOptions = {}) => {
    const { formatMessage: fm } = useIntl()
    const { openModal, closeModal } = useDynamicModalStore()

    const openTeamCreate = () => {
        openModal('dialog', {
            id: 'team-create',
            component: TeamCreateDialog,
            props: {
                title: fm({ id: message.teamsPage.create.title }),
                onCreated: (uid: string) => {
                    closeModal('team-create')
                    onCreated?.(uid)
                },
            },
        })
    }

    return { openTeamCreate }
}
