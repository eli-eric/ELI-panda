import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ZoneEditContainer } from '../form/zone-edit.cont'

export const useOpenZoneEdit = () => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()

    const openZoneEdit = (uid: string) =>
        openModal('sheet', {
            id: `zone-edit-${uid}`,
            component: ZoneEditContainer,
            props: {
                uid,
                title: fm({ id: message.zonesPage.actions.editTitle }),
            },
        })

    return { openZoneEdit }
}
