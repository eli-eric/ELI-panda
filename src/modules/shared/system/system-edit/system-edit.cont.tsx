import { Suspense } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'

import { SystemEditForm } from './components/system-edit.form'
import { SystemEditSkeleton } from './components/system-edit.skeleton'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { ROLE } from '@/types/constants/roles'
import { useSystemCreateParent } from '../system-create/hooks/useSystemCreateParent'
import { useSystemCreateParentStore } from '../system-create/store/useSystemCreateParentStore'

export const SystemEditContainer = ({ uid }: { uid: string }) => {
  const formMethods = useForm()

  return (
    <Suspense fallback={<SystemEditSkeleton />}>
      <SystemEditForm uid={uid} />
    </Suspense>
  )
}
