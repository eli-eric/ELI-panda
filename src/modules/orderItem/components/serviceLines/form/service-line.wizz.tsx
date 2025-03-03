import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'
import useTableStateStore from '@/store/useTableStateStore'

import { useServiceLineSteps } from './hooks/useServiceLineSteps'

type Props = {
  setOpen: (open: boolean) => void
}
export const ServiceLineWizard = ({ setOpen }: Props) => {
  const steps = useServiceLineSteps()

  const { setServiceLine } = useServiceLine()
  const tableId = 'items-select-table'
  const { reset: resetTable } = useTableStateStore()

  const handleSubmit = (data: ServiceLineFormType, reset: () => void) => {
    const { items, details, ...rest } = data
    items.forEach(item => {
      setServiceLine({
        ...rest,
        price: Number(rest.price),
        item: { uid: item.uid, name: item.name },
        eun: item.eun,
        serialNumber: item.serialNumber,
        details: Array.isArray(details) ? details : []
      })
    })
    reset()
    resetTable(tableId)
    setOpen(false)
  }

  return (
    <div className="">
      <FormWizard<ServiceLineFormType> steps={steps} onSubmit={handleSubmit} />
    </div>
  )
}
