import { useCallback } from 'react'

import { useModalFormStateStore } from '@/store/useModalFormStateStore'

import useWarningModal from './useWarningModal'

interface UseModalDirtyProtectionOptions {
  modalId: string
  warningMessage?: string
}

export const useModalDirtyProtection = ({
  modalId,
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
      require('@/store/useDynamicModalStore')
        .useDynamicModalStore.getState()
        .closeModal(modalId)
      require('@/store/useModalFormStateStore')
        .useModalFormStateStore.getState()
        .reset()
    })()
    return false // Prevent immediate closing, let user decide via warning modal
  }, [withWarningModal, modalId])

  return { onCloseAttempt }
}
