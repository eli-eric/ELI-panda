import { useRef } from 'react'

import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { OrderLineEditSheet } from '../components/OrderLineEditSheet.comp'

export const useOrderLineEditSheet = () => {
  const { openModal, closeModal } = useDynamicModalStore()
  const modalIdRef = useRef<string | undefined>(undefined)

  const openEditSheet = (
    orderLine: OrderLineFormType,
    onSave?: (data: OrderLineFormType) => void
  ) => {
    modalIdRef.current = openModal('sheet', {
      id: 'order-line-edit',
      component: OrderLineEditSheet,
      props: {
        title: 'Edit Order Line',
        orderLine,
        onClose: () => {
          if (modalIdRef.current) closeModal(modalIdRef.current)
        }
      },
      onSubmit: (data: OrderLineFormType) => {
        onSave?.(data)
        if (modalIdRef.current) closeModal(modalIdRef.current)
      },
      onClose: () => {
        if (modalIdRef.current) closeModal(modalIdRef.current)
      }
    })
  }

  const closeEditSheet = () => {
    if (modalIdRef.current) {
      closeModal(modalIdRef.current)
    }
  }

  return {
    openEditSheet,
    closeEditSheet
  }
}
