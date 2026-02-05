import { lazy, useCallback, useRef } from 'react'

import useWarningModal from '@/hooks/useWarningModal'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'

import { useSystemStore } from '../device-info-overlay/store/useShowDeviceStore'

const SystemEditContainer = lazy(() =>
  import('./system-edit.cont').then(module => ({
    default: module.SystemEditContainer
  }))
)

export const useSystemEditSheet = () => {
  const { openModal } = useDynamicModalStore()
  const { uid: storeUid } = useSystemStore()
  const { reset: resetFormState } = useModalFormStateStore()
  const modalIdRef = useRef<string | undefined>(undefined)
  const withWarningModal = useWarningModal(
    'You have unsaved changes. Are you sure you want to close without saving?'
  )

  // Create dirty protection handler that doesn't violate hooks rules
  const createCloseAttemptHandler = useCallback(
    (modalId: string) => {
      return () => {
        const currentIsDirty = useModalFormStateStore.getState().isDirty
        if (!currentIsDirty) {
          return true // Allow closing - form is clean
        }
        withWarningModal(() => {
          useDynamicModalStore.getState().closeModal(modalId)
          useModalFormStateStore.getState().reset()
        })()
        return false // Prevent immediate closing, let user decide via warning modal
      }
    },
    [withWarningModal]
  )

  return (openUid?: string) => {
    const uid = storeUid || openUid

    if (!uid) {
      // eslint-disable-next-line no-console
      console.warn('useSystemEditSheet: No UID provided')
      return
    }

    const modalId = `system-edit-${uid}`
    const onCloseAttempt = createCloseAttemptHandler(modalId)

    modalIdRef.current = openModal('sheet', {
      id: modalId,
      component: SystemEditContainer,
      props: { uid, size: 'l', title: 'Edit System' },
      onCloseAttempt,
      onClose: () => {
        resetFormState()
      }
    })

    return modalIdRef.current
  }
}
