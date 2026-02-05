import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { GrantFormContainer } from '../form/grant-form.cont'

interface UseOpenGrantFormOptions {
    onSuccess?: () => void
}

/**
 * Hook to open the grant creation sheet.
 *
 * @example
 * ```tsx
 * const { openGrantForm } = useOpenGrantForm({ onSuccess: refetch })
 *
 * <Button onClick={openGrantForm}>Create Grant</Button>
 * ```
 */
export const useOpenGrantForm = (options?: UseOpenGrantFormOptions) => {
    const { openModal } = useDynamicModalStore()

    const openGrantForm = () => {
        openModal('sheet', {
            id: 'grant-create',
            component: GrantFormContainer,
            props: {
                title: 'Create Grant',
                onSuccess: options?.onSuccess,
            },
        })
    }

    return { openGrantForm }
}
