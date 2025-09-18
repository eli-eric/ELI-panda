import { lazy } from 'react'

import { useModalDirtyProtection } from '@/hooks/useModalDirtyProtection'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { useSystemStore } from '../device-info-overlay/store/useShowDeviceStore'

const SystemEditContainer = lazy(() =>
  import('./system-edit.cont').then(module => ({
    default: module.SystemEditContainer
  }))
)

export const useSystemEditSheet = (directUid?: string) => {
  const { openModal } = useModalGlobalStore()
  const { uid: storeUid } = useSystemStore()
  const { reset: resetFormState } = useModalFormStateStore()

  const { onCloseAttempt } = useModalDirtyProtection({ slot: 'sheet' })

  return () => {
    const uid = directUid || storeUid

    if (!uid) {
      // eslint-disable-next-line no-console
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
