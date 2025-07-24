import React, { type FC } from 'react'

import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { useModalWizardStore } from '../itemMoving/store/useModalWizardStore'
import { useWizardStore } from '../wizard/store/useWizardStore'
import { ItemAssignContainer } from './item-assign.cont'

export function openItemAssignModal() {
  if (typeof window === 'undefined') return // Prevent SSR execution
  
  const { openModal } = useModalGlobalStore.getState()
  
  openModal('dialog1', {
    component: () => <ItemAssignModalContent />,
    props: {
      title: 'Assign Item',
      size: 'l' as const
    }
  })
}

export const ItemAssignModalContent: FC = () => {
  const { resetWizard } = useWizardStore()
  const { setSelectedSystem } = useModalWizardStore()

  // Reset wizard when modal opens
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
