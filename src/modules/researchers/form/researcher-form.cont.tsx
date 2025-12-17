import { zodResolver } from '@hookform/resolvers/zod'
import { type FC,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { useFormDirtyProtection } from '@/hooks/useFormDirtyProtection'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { ROLE } from '@/types/constants/roles'

import { useResearcherMutation } from '../hooks/useResearcherMutation'
import type { Researcher } from '../types/researcher.types'
import { ResearcherFormFields } from './researcher-form.comp'
import { type ResearcherFormData,researcherSchema } from './researcher-form.schema'

interface Props {
  researcher?: Researcher
  onSuccess?: () => void
}

const getModalId = (uid?: string) =>
  uid ? `researcher-edit-${uid}` : 'researcher-create'

export const ResearcherFormContainer: FC<Props> = ({
  researcher,
  onSuccess
}) => {
  const { closeModal } = useDynamicModalStore()
  const { setIsDirty, reset: resetModalFormState } = useModalFormStateStore()

  const defaultValues: ResearcherFormData = {
    firstName: researcher?.firstName ?? '',
    lastName: researcher?.lastName ?? '',
    identificationNumber: researcher?.identificationNumber ?? '',
    orcid: researcher?.orcid ?? '',
    scopusId: researcher?.scopusId ?? '',
    researcherId: researcher?.researcherId ?? '',
    citizenship: researcher?.citizenship ?? null
  }

  const formMethods = useForm<ResearcherFormData>({
    resolver: zodResolver(researcherSchema),
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

  const { mutateAsync, isPending } = useResearcherMutation({
    uid: researcher?.uid
  })

  const handleSubmit = formMethods.handleSubmit(async data => {
    toast.promise(mutateAsync(data), {
      loading: researcher ? 'Saving researcher...' : 'Creating researcher...',
      success: () => {
        onSuccess?.()
        closeModal(getModalId(researcher?.uid))
        return researcher ? 'Researcher saved' : 'Researcher created'
      },
      error: 'Failed to save researcher'
    })
  })

  const handleExit = withDirtyProtection(() => {
    closeModal(getModalId(researcher?.uid))
  })

  return (
    <Form formMethods={formMethods}>
      <SheetFormButtons
        editRole={ROLE.PUBLICATIONS_EDIT}
        loading={isPending}
        onSubmit={handleSubmit}
        onExit={handleExit}
        isFormDirty={isDirty}
        saveLabel={researcher ? 'Save Researcher' : 'Create Researcher'}
        loadingText={
          researcher ? 'Saving researcher...' : 'Creating researcher...'
        }
      />
      <ResearcherFormFields disabled={isPending} />
    </Form>
  )
}
