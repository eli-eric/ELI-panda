import { yupResolver } from '@hookform/resolvers/yup'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { ModalHeaderButtons } from '@/components/header/modal-header.buttons'
import { schema } from '@/modules/systemItem/components/form/SystemForm.schema'
import { useSystemCreate } from '@/modules/systemItem/hooks/useSystemCreate'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SystemDetailSection } from '../system-edit/components/sections/system-detail.section'

export const SystemCreateContainer: FC = () => {
  const formMethods = useForm<any>({
    resolver: yupResolver(schema) as any
  })

  const { closeModal } = useModalGlobalStore()

  const { createSystem, loading } = useSystemCreate()

  const onSubmit = formMethods.handleSubmit(data => {
    createSystem(data)
  })

  return (
    <Form formMethods={formMethods}>
      <ModalHeaderButtons isFetching={loading} onSubmit={onSubmit} />

      <SystemDetailSection />
    </Form>
  )
}
