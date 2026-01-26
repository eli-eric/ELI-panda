import { zodResolver } from '@hookform/resolvers/zod'
import { type FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { useFormDirtyProtection } from '@/hooks/useFormDirtyProtection'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { ROLE } from '@/types/constants/roles'

import { useGrantMutation } from '../hooks/useGrantMutation'
import type { Grant } from '../types/grant.types'
import { GrantFormFields } from './grant-form.comp'
import { type GrantFormData, grantSchema } from './grant-form.schema'

interface Props {
  grant?: Grant
  onSuccess?: () => void
}

const getModalId = (uid?: string) =>
  uid ? `grant-edit-${uid}` : 'grant-create'

export const GrantFormContainer: FC<Props> = ({ grant, onSuccess }) => {
  const { closeModal } = useDynamicModalStore()
  const { setIsDirty, reset: resetModalFormState } = useModalFormStateStore()

  const defaultValues: GrantFormData = {
    code: grant?.code ?? '',
    name: grant?.name ?? '',
    grantGroup: grant?.grantGroup ?? null
  }

  const formMethods = useForm<GrantFormData>({
    resolver: zodResolver(grantSchema),
    defaultValues,
    mode: 'onSubmit'
  })

  const { isDirty } = formMethods.formState

  // Sync form dirty state with global modal store
  useEffect(() => {
    setIsDirty(isDirty)
    return resetModalFormState
  }, [isDirty, setIsDirty, resetModalFormState])

  const { withDirtyProtection } = useFormDirtyProtection(formMethods)

  const { mutateAsync, isPending } = useGrantMutation({
    uid: grant?.uid
  })

  const handleSubmit = formMethods.handleSubmit(async data => {
    toast.promise(mutateAsync(data), {
      loading: grant ? 'Saving grant...' : 'Creating grant...',
      success: () => {
        onSuccess?.()
        closeModal(getModalId(grant?.uid))
        return grant ? 'Grant saved' : 'Grant created'
      },
      error: 'Failed to save grant'
    })
  })

  const handleExit = withDirtyProtection(() => {
    closeModal(getModalId(grant?.uid))
  })

  return (
    <Form formMethods={formMethods}>
      <SheetFormButtons
        editRole={ROLE.PUBLICATIONS_EDIT}
        loading={isPending}
        onSubmit={handleSubmit}
        onExit={handleExit}
        isFormDirty={isDirty}
        saveLabel={grant ? 'Save Grant' : 'Create Grant'}
        loadingText={grant ? 'Saving grant...' : 'Creating grant...'}
      />
      <GrantFormFields disabled={isPending} />
    </Form>
  )
}
