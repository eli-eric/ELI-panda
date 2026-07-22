import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { TeamCreateDialog } from '../form/TeamCreateDialog.comp'

interface UseOpenTeamCreateOptions {
    onCreated?: (uid: string) => void
}

export const useOpenTeamCreate = ({ onCreated }: UseOpenTeamCreateOptions = {}) => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()

    const openTeamCreate = () => {
        openModal('dialog', {
            id: 'team-create',
            component: TeamCreateDialog,
            props: {
                title: fm({ id: message.teamsPage.create.title }),
                // The dialog closes itself via onClose on success; only forward
                // selection here to avoid a double closeModal warning.
                onCreated,
            },
        })
    }

    return { openTeamCreate }
}
