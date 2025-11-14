import type { UseFormReset } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { OrderLineWizard } from './OrderLineWizard'

// Store modalId in closure for OrderLineModalContent to access
let currentOrderLineModalId: string | undefined

const OrderLineModalContent = ({
  onSave
}: {
  onSave?: (data: OrderLineFormType) => void
}) => {
  const { closeModal } = useDynamicModalStore()

  const handleSubmit = (
    data: OrderLineFormType,
    reset: UseFormReset<OrderLineFormType>
  ) => {
    onSave?.(data)
    reset()
    if (currentOrderLineModalId) {
      closeModal(currentOrderLineModalId)
    }
  }

  return (
    <div className="space-y-6">
      <OrderLineWizard handleSubmit={handleSubmit} />
    </div>
  )
}

export const useOrderLineModal = () => {
  const { openModal } = useDynamicModalStore()
  const { formatMessage: fm } = useIntl()

  const openOrderLineModal = (onSave?: (data: OrderLineFormType) => void) => {
    currentOrderLineModalId = openModal('dialog', {
      id: 'order-line-add',
      component: () => <OrderLineModalContent onSave={onSave} />,
      props: {
        title: fm({ id: message.ordersPage.orderLines.titles.add }),
        side: 'left' as const,
        size: 'xl' as const
      }
    })

    return currentOrderLineModalId
  }

  return { openOrderLineModal }
}
