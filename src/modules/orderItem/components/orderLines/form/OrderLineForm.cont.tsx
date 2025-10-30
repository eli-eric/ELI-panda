import type { UseFormReset } from 'react-hook-form'

import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { OrderLineWizard } from './OrderLineWizard'

const OrderLineModalContent = ({
  onSave
}: {
  onSave?: (data: OrderLineFormType) => void
}) => {
  const { closeModal } = useModalGlobalStore()

  const handleSubmit = (
    data: OrderLineFormType,
    reset: UseFormReset<OrderLineFormType>
  ) => {
    onSave?.(data)
    reset()
    closeModal('dialog1')
  }

  return (
    <div className="space-y-6">
      <OrderLineWizard handleSubmit={handleSubmit} />
    </div>
  )
}

export const useOrderLineModal = () => {
  const { openModal } = useModalGlobalStore()

  const openOrderLineModal = (onSave?: (data: OrderLineFormType) => void) => {
    openModal('dialog1', {
      component: () => <OrderLineModalContent onSave={onSave} />,
      props: {
        title: message.ordersPage.orderLines.titles.add,
        size: 'xl' as const
      }
    })
  }

  return { openOrderLineModal }
}
