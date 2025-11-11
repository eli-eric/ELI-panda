import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { ItemCreateForm } from './components/item-create-form'

export const UseItemCreateDialog = () => {
  const { openModal } = useModalGlobalStore()
  const openDialog = () => {
    openModal('dialog3', {
      component: ItemCreateForm,
      props: {
        title: 'Create New Item'
      }
    })
  }
  return openDialog
}
