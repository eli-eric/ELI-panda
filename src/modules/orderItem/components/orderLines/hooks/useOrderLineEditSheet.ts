import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { OrderLineEditSheet } from '../components/OrderLineEditSheet.comp'

export const useOrderLineEditSheet = () => {
  const { openModal, closeModal } = useModalGlobalStore()

  const openEditSheet = (
    orderLine: OrderLineFormType,
    onSave?: (data: OrderLineFormType) => void
  ) => {
    openModal('sheet', {
      component: OrderLineEditSheet,
      props: {
        title: 'Edit Order Line',
        orderLine,
        onClose: () => closeModal('sheet')
      },
      onSubmit: (data: OrderLineFormType) => {
        onSave?.(data)
        closeModal('sheet')
      },
      onClose: () => closeModal('sheet')
    })
  }

  const closeEditSheet = () => {
    closeModal('sheet')
  }

  return {
    openEditSheet,
    closeEditSheet
  }
}