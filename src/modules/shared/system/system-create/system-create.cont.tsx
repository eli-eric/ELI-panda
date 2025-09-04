import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { ModalHeaderButtons } from '@/components/header/modal-header.buttons'
import { SystemLevel } from '@/types/gql/graphql'

import { SystemDetailSection } from '../system-edit/components/sections/system-detail.section'
import { type SystemCreateFormData, systemCreateSchema } from './schema'
import { useSystemCreateHook } from './useSystemCreateHook'

export const SystemCreateContainer: FC = () => {
  const formMethods = useForm<SystemCreateFormData>({
    resolver: zodResolver(systemCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      systemType: null,
      systemLevel: SystemLevel.KeySystems,
      location: null,
      zone: null,
      systemCode: null,
      attribute: null,
      description: ''
    }
  })

  const { createSystem, loading } = useSystemCreateHook()

  const onSubmit = (data: SystemCreateFormData) => {
    createSystem(data)
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <ModalHeaderButtons isFetching={loading} />

      <SystemDetailSection />
    </Form>
  )
}
