import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'

import { useServiceLineSteps } from './hooks/useServiceLineSteps'

export const ServiceLineWizard = () => {
  const steps = useServiceLineSteps()

  const handleSubmit = (formData: ServiceLineFormType) => {
    console.log('Form submitted with data:', formData)
  }

  return (
    <div className="">
      <FormWizard<ServiceLineFormType> steps={steps} onSubmit={handleSubmit} />
    </div>
  )
}
