import { Suspense } from 'react'

import { SystemEditForm } from './components/system-edit.form'
import { SystemEditSkeleton } from './components/system-edit.skeleton'

export const SystemEditContainer = ({ uid }: { uid: string }) => {
  console.log('SystemEditContainer', uid)
  return (
    <Suspense fallback={<SystemEditSkeleton />}>
      <SystemEditForm uid={uid} />
    </Suspense>
  )
}
