import React, { type FC } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useWizardStore } from '../wizard/store/useWizardStore'
import { ItemMoveContainer } from './item-move.cont'
import { useModalWizardStore } from './store/useModalWizardStore'

export function openItemMoveModal() {
    if (typeof window === 'undefined') return // Prevent SSR execution

    const { openModal } = useDynamicModalStore.getState()

    const modalId = openModal('dialog', {
        id: 'item-move',
        component: () => <ItemMoveModalContent />,
        props: {
            title: 'Move Item',
            size: 'l' as const,
        },
    })

    return modalId
}

export const ItemMoveModalContent: FC = () => {
    const { resetWizard } = useWizardStore()
    const { setSelectedSystem } = useModalWizardStore()

    // Reset wizard when modal opens
    React.useEffect(() => {
        return () => {
            resetWizard()
            setSelectedSystem(null)
        }
    }, [resetWizard, setSelectedSystem])

    return <ItemMoveContainer />
}

// Legacy component - kept for backward compatibility but deprecated
export const ItemMoveModal: FC = () => {
    return null // This component is no longer functional - use openItemMoveModal() instead
}
