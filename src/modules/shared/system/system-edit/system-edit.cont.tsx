import { Suspense } from 'react'

import { useSystemStore } from '../device-info-overlay/store/useShowDeviceStore'
import { SystemEditForm } from './components/system-edit.form'
import { SystemEditSkeleton } from './components/system-edit.skeleton'

export const SystemEditContainer = ({
  uid: propUid,
  onClose
}: { uid?: string; onClose?: () => void } = {}) => {
  const { uid: storeUid } = useSystemStore()

  // Use prop UID as fallback for backward compatibility
  const uid = storeUid || propUid

  if (!uid) {
    return <div>No system selected</div>
  }

  return (
    <Suspense fallback={<SystemEditSkeleton />}>
      <SystemEditForm uid={uid} onClose={onClose} />
    </Suspense>
  )
}
