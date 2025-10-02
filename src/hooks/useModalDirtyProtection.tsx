import { useCallback } from 'react'

import { useModalFormStateStore } from '@/store/useModalFormStateStore'

import useWarningModal from './useWarningModal'

interface UseModalDirtyProtectionOptions {
  slot: 'sheet' | 'dialog1' | 'dialog2'
  warningMessage?: string
}

export const useModalDirtyProtection = ({
  slot,
  warningMessage = 'You have unsaved changes. Are you sure you want to close without saving?'
}: UseModalDirtyProtectionOptions) => {
  const withWarningModal = useWarningModal(warningMessage)
  // Access dirty state lazily inside callback to avoid stale captures

  const onCloseAttempt = useCallback(() => {
    const currentIsDirty = useModalFormStateStore.getState().isDirty
    if (!currentIsDirty) {
      return true // Allow closing - form is clean
    }
    withWarningModal(() => {
      require('@/store/useModalGlobalStore')
        .useModalGlobalStore.getState()
        .closeModal(slot)
      require('@/store/useModalFormStateStore')
        .useModalFormStateStore.getState()
        .reset()
    })()
    return false // Prevent immediate closing, let user decide via warning modal
  }, [withWarningModal, slot])

  return { onCloseAttempt }
}
