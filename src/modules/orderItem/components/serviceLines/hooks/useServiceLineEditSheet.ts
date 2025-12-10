import { useRef } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ServiceLineEditSheet } from '../components/ServiceLineEditSheet.comp'

export const useServiceLineEditSheet = () => {
  const { openModal, closeModal } = useDynamicModalStore()
  const { formatMessage: fm } = useIntl()
  const modalIdRef = useRef<string | undefined>(undefined)

  const openEditSheet = (
    serviceLine: ServiceLine & { id: string },
    onSave?: (data: ServiceLine & { id: string }) => void
  ) => {
    modalIdRef.current = openModal('sheet', {
      id: `service-line-edit-${serviceLine.id}`,
      component: ServiceLineEditSheet,
      props: {
        title: fm({ id: message.ordersPage.serviceLines.titles.edit }),
        serviceLine
      },
      onSubmit: (data: ServiceLine) => {
        onSave?.({
          ...serviceLine,
          ...data,
          price: Number(data.price),
          details: Array.isArray(data.details) ? data.details : []
        } as ServiceLine & { id: string })
        if (modalIdRef.current) closeModal(modalIdRef.current)
      }
    })
  }

  const closeEditSheet = () => {
    if (modalIdRef.current) {
      closeModal(modalIdRef.current)
    }
  }

  return { openEditSheet, closeEditSheet }
}
