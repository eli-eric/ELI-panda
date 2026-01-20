import type { UseFormReset } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type {
  OrderLineFormType,
  OrderLineWizardFormType
} from '@/modules/orderItem/types/form'
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
    data: OrderLineWizardFormType,
    reset: UseFormReset<OrderLineWizardFormType>
  ) => {
    const systemConfigs = data.systemConfigs || []

    // Convert each system config to individual order line
    const orderLines = systemConfigs.map(config => {
      // Create clean OrderLineFormType without wizard fields
      const orderLine: OrderLineFormType = {
        // Copy base data from wizard
        catalogueUid: data.catalogueUid,
        catalogueNumber: data.catalogueNumber,
        price: data.price,
        currency: data.currency,
        // Use individual serial number from config (parsed from comma-separated serialNumbers)
        serialNumber: config.serialNumber || undefined,
        location: data.location,
        itemUsage: data.itemUsage,
        notes: data.notes,
        // Each order line has quantity 1
        quantity: 1,
        // Name from config
        name: config.itemName,
        // Parent system - always from config.parentSystem
        // For "new": this is globalParentSystem
        // For "existing": this is parent of selected system
        parentSystem: config.parentSystem || undefined,
        // System - only for existing system selection
        system:
          config.systemType === 'existing'
            ? config.selectedSystem || undefined
            : undefined
      } as OrderLineFormType

      return orderLine
    })

    // Save all order lines
    orderLines.forEach(orderLine => onSave?.(orderLine))

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
