import { useCallback, useEffect } from 'react'
import useWarningModal from './useWarningModal'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

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

  useEffect(() => {
    console.log('useModalDirtyProtection - isDirty:', isDirty)
  }, [isDirty])

  // Always get the latest closeModal and resetFormState in the callback
  const forceClose = () => {
    console.log(
      'User confirmed force close, closing modal and resetting form state'
    )
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
    console.log('onCloseAttempt called, isDirty:', currentIsDirty)
    if (!currentIsDirty) {
      return true // Allow closing - form is clean
    }
    console.log('Triggering warning modal with forceClose callback')
    withWarningModal(forceClose)()
    return false // Prevent immediate closing, let user decide via warning modal
  }, [withWarningModal, slot])

  return { onCloseAttempt }
}
