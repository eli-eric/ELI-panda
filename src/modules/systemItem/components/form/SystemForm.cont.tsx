import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'

import useSystemDetail from '../../hooks/useSystemDetail'
import { useSystemSubmit } from '../../hooks/useSystemSubmit'
import type { SystemDetailFormType } from '../../types/form'
import HeaderComponent from '../Header.comp'
import SystemFormComponent from './SystemForm.comp'
import { schema } from './SystemForm.schema'

const useSystemForm = () => {
  const { submit, loadingSubmit } = useSystemSubmit()
  const { systemDetail } = useSystemDetail()

  const formMethods = useForm<SystemDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...systemDetail
    }
  })

  const { control, formState, handleSubmit } = formMethods

  useFormNotification<SystemDetailFormType>({ control })
  const FormWarningModal = useFormLeaveWarning({ formState })

  const renderForm = () => (
    <form onSubmit={handleSubmit(submit)}>
      <FormProvider {...formMethods}>
        <HeaderComponent loading={loadingSubmit} />
        <div className="py-6">
          <SystemFormComponent />
        </div>
      </FormProvider>
      <FormWarningModal />
    </form>
  )

  return { renderForm }
}

export default useSystemForm
