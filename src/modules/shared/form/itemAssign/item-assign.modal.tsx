import React, { type FC } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useWizardContextSystem } from '../itemMoving/hooks/useWizardContextSystem'
import {
    useModalWizardStore,
    type WizardContextSystem,
} from '../itemMoving/store/useModalWizardStore'
import { useWizardStore } from '../wizard/store/useWizardStore'
import { ItemAssignContainer } from './item-assign.cont'

export function openItemAssignModal(contextSystem?: WizardContextSystem) {
    if (typeof window === 'undefined') return // Prevent SSR execution

    // Snapshot of the assignment's destination system; without it the wizard
    // falls back to fetching by router.query.uid (legacy /system/[uid] view)
    useModalWizardStore.getState().setContextSystem(contextSystem ?? null)

    const { openModal } = useDynamicModalStore.getState()

    const modalId = openModal('dialog', {
        id: 'item-assign',
        component: () => <ItemAssignModalContent />,
        props: {
            title: 'Assign Item',
            size: 'xl' as const,
        },
    })

    return modalId
}

export const ItemAssignModalContent: FC = () => {
    const { resetWizard } = useWizardStore()
    const { setSelectedSystem } = useModalWizardStore()

    // Kick off the legacy-view fallback fetch as soon as the modal opens so
    // the data is ready by the Summary step
    useWizardContextSystem()

    // Reset wizard when modal opens. contextSystem is intentionally NOT
    // cleared here — StrictMode re-runs this cleanup right after mount, which
    // would wipe the snapshot set by openItemAssignModal; the next open overwrites it.
    React.useEffect(() => {
        return () => {
            resetWizard()
            setSelectedSystem(null)
        }
    }, [resetWizard, setSelectedSystem])

    return <ItemAssignContainer />
}

// Legacy component - kept for backward compatibility but deprecated
export const ItemAssignModal: FC = () => {
    return null // This component is no longer functional - use openItemAssignModal() instead
}
