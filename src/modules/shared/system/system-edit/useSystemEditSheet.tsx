import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'

import { useModalDirtyProtection } from '@/hooks/useModalDirtyProtection'
import { useSystemStore } from '../device-info-overlay/store/useShowDeviceStore'
import { SystemEditContainer } from './system-edit.cont'

export const useSystemEditSheet = (directUid?: string) => {
  const { openModal } = useModalGlobalStore()
  const { uid: storeUid } = useSystemStore()
  const { reset: resetFormState } = useModalFormStateStore()

  const { onCloseAttempt } = useModalDirtyProtection({ slot: 'sheet' })

  return () => {
    const uid = directUid || storeUid

    if (!uid) {
      console.warn('useSystemEditSheet: No UID provided')
      return
    }

    openModal('sheet', {
      component: SystemEditContainer,
      props: { uid, size: 'l', title: 'Edit System' },
      onCloseAttempt,
      onSubmit: () => {
        // Handle system edit submission
      },
      onClose: () => {
        resetFormState()
      }
    })
  }
}
