import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ZoneFormContainer } from '../form/zone-form.cont'

interface UseOpenZoneFormOptions {
    onSuccess?: () => void
}

export const useOpenZoneForm = (options?: UseOpenZoneFormOptions) => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()

    const openZoneForm = () => {
        openModal('sheet', {
            id: 'zone-create',
            component: ZoneFormContainer,
            props: {
                title: fm({ id: message.zonesPage.form.createTitle }),
                onSuccess: options?.onSuccess,
            },
        })
    }

    return { openZoneForm }
}
