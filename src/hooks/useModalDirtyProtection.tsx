import { useCallback, useEffect } from 'react'

import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

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
  const closeModal = useModalGlobalStore(s => s.closeModal)
  const resetFormState = useModalFormStateStore(s => s.reset)
  const { isDirty } = useModalFormStateStore()

  useEffect(() => {}, [isDirty])

  // Always get the latest closeModal and resetFormState in the callback
  const forceClose = () => {
    // Always get latest from zustand
    require('@/store/useModalGlobalStore')
      .useModalGlobalStore.getState()
      .closeModal(slot)
    require('@/store/useModalFormStateStore')
      .useModalFormStateStore.getState()
      .reset()
  }

  const onCloseAttempt = useCallback(() => {
    const currentIsDirty = useModalFormStateStore.getState().isDirty
    if (!currentIsDirty) {
      return true // Allow closing - form is clean
    }
    withWarningModal(forceClose)()
    return false // Prevent immediate closing, let user decide via warning modal
  }, [withWarningModal, slot])

  return { onCloseAttempt }
}
