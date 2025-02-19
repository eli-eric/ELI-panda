import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'

import { useServiceLineSteps } from './service-line.steps'

export const ServiceLineWizard = () => {
  const steps = useServiceLineSteps()

  const handleSubmit = (formData: ServiceLineFormType) => {
    console.log('Form submitted with data:', formData)
  }

  return (
    <FormWizard<ServiceLineFormType> steps={steps} onSubmit={handleSubmit} />
  )
}
