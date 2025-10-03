import { useMemo } from 'react'

import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'

import { useServiceLineSteps } from './hooks/useServiceLineSteps'

type Props = {
  handleSubmit: () => void
}
export const ServiceLineWizard = ({ handleSubmit }: Props) => {
  const serviceLineSteps = useServiceLineSteps()

  const steps = useMemo(() => serviceLineSteps, [serviceLineSteps])

  return (
    <FormWizard<ServiceLineFormType> steps={steps} onSubmit={handleSubmit} />
  )
}
