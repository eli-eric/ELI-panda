import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { ItemCreateForm } from './components/item-create-form'

export const UseItemCreateDialog = () => {
  const { openModal, closeModal } = useModalGlobalStore()

  const openDialog = (onItemCreated?: (item: CatalogueItem) => void) => {
    openModal('dialog2', {
      component: ItemCreateForm,
      props: {
        title: 'Create New Item',
        onItemCreated,
        onClose: () => closeModal('dialog2')
      }
    })
  }

  return openDialog
}
