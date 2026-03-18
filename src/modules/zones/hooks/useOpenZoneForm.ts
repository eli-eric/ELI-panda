import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ZoneFormContainer } from '../form/zone-form.cont'

interface UseOpenZoneFormOptions {
    onSuccess?: () => void
}

export const useOpenZoneForm = (options?: UseOpenZoneFormOptions) => {
    const { openModal } = useDynamicModalStore()

    const openZoneForm = () => {
        openModal('sheet', {
            id: 'zone-create',
            component: ZoneFormContainer,
            props: {
                title: 'Create Zone',
                onSuccess: options?.onSuccess,
            },
        })
    }

    return { openZoneForm }
}
