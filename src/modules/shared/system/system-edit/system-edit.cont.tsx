import { Suspense } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'

import { SystemEditForm } from './components/system-edit.form'
import { SystemEditSkeleton } from './components/system-edit.skeleton'

export const SystemEditContainer = ({ uid }: { uid: string }) => {
  const formMethods = useForm()
  return (
    <Suspense fallback={<SystemEditSkeleton />}>
      <Form formMethods={formMethods}>
        <SystemEditForm uid={uid} />
      </Form>
    </Suspense>
  )
}
