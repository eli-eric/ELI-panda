import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { useSystemStore } from '../device-info-overlay/store/useShowDeviceStore'
import { SystemEditContainer } from './system-edit.cont'

export const useSystemEditSheet = (directUid?: string) => {
  const { openModal } = useModalGlobalStore()
  const { uid: storeUid } = useSystemStore()

  return () => {
    const uid = directUid || storeUid
    
    if (!uid) {
      console.warn('useSystemEditSheet: No UID provided')
      return
    }

    openModal('sheet', {
      component: SystemEditContainer,
      props: { uid, size: 'l', title: 'Edit System' },
      onSubmit: () => {
        // Handle system edit submission
      }
    })
  }
}
