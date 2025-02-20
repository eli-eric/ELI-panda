import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'

import { useServiceLineSteps } from './hooks/useServiceLineSteps'

export const ServiceLineWizard = () => {
  const steps = useServiceLineSteps()

  const { setServiceLine } = useServiceLine()

  const handleSubmit = (data: ServiceLineFormType, reset) => {
    const { items, ...rest } = data
    items.forEach(item => {
      setServiceLine({ ...rest, price: Number(rest.price), item })
    })
    reset()
  }

  return (
    <div className="">
      <FormWizard<ServiceLineFormType> steps={steps} onSubmit={handleSubmit} />
    </div>
  )
}
