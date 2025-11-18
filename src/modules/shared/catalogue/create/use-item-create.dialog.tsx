import { useRef } from 'react'

import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ItemCreateForm } from './components/item-create-form'

export const UseItemCreateDialog = () => {
  const { openModal, closeModal } = useDynamicModalStore()
  const modalIdRef = useRef<string | undefined>(undefined)

  const openDialog = (onItemCreated?: (item: CatalogueItem) => void) => {
    modalIdRef.current = openModal('dialog', {
      id: 'item-create',
      component: ItemCreateForm,
      props: {
        title: 'Create New Item',
        onItemCreated,
        onClose: () => {
          if (modalIdRef.current) closeModal(modalIdRef.current)
        }
      }
    })

    return modalIdRef.current
  }

  return openDialog
}
