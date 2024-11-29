import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import { ROLE } from '@/types/constants/roles'

import { PublicationFormComponent } from './components/publication-form.comp'
import { usePublicationMutation } from './hooks/usePublicationMutation'
import type { PublicationForm } from './types/form'
import type { Publication } from './types/responses'

interface Props {
  publication?: Publication
}

export const PublicationDetailContainer: FC<Props> = ({ publication }) => {
  const form = useForm<PublicationForm>({
    defaultValues: publication
  })

  const { mutate } = usePublicationMutation()

  const onSubmit = form.handleSubmit(data => {
    mutate(data)
  })

  const onSubmitAndExit = form.handleSubmit(data => {
    mutate(data)
  })

  return (
    <Form formMethods={form}>
      {/* form fields */}
      <HeaderWithButtons
        editRole={ROLE.BASICS}
        onSubmit={onSubmit}
        onSubmitAndExit={onSubmitAndExit}
      />
      <PublicationFormComponent />
    </Form>
  )
}
