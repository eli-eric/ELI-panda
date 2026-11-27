import React, { type FC } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useWizardStore } from '../wizard/store/useWizardStore'
import { useWizardContextSystem } from './hooks/useWizardContextSystem'
import { ItemMoveContainer } from './item-move.cont'
import { useModalWizardStore, type WizardContextSystem } from './store/useModalWizardStore'

export function openItemMoveModal(contextSystem?: WizardContextSystem) {
    if (typeof window === 'undefined') return // Prevent SSR execution

    // Snapshot of the move's source system; without it the wizard falls back
    // to fetching by router.query.uid (legacy /system/[uid] view)
    useModalWizardStore.getState().setContextSystem(contextSystem ?? null)

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

    // Kick off the legacy-view fallback fetch as soon as the modal opens so
    // the data is ready by the System Detail / Summary steps
    useWizardContextSystem()

    // Reset wizard when modal opens. contextSystem is intentionally NOT
    // cleared here — StrictMode re-runs this cleanup right after mount, which
    // would wipe the snapshot set by openItemMoveModal; the next open overwrites it.
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
