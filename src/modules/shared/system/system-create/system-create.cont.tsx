import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { ROLE } from '@/types/constants/roles'
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

  const {
    formState: { isDirty }
  } = formMethods

  const { createSystem, loading } = useSystemCreateHook()
  const { closeModal } = useModalGlobalStore()

  const onSubmit = (data: SystemCreateFormData) => {
    createSystem(data)
  }

  const onExit = () => {
    closeModal('sheet')
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <SheetFormButtons
        editRole={ROLE.SYSTEM_EDIT}
        loading={loading}
        onSubmit={formMethods.handleSubmit(onSubmit)}
        onExit={onExit}
        isFormDirty={isDirty}
      />

      <SystemDetailSection />
    </Form>
  )
}
