import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { PublicationFormContainer } from './publication-form.cont'

export const usePublicationCreateSheet = () => {
  const { openModal } = useDynamicModalStore()

  const openCreateSheet = () => {
    const modalId = openModal('sheet', {
      id: 'publication-create',
      component: PublicationFormContainer,
      props: { title: 'Create publication' }
    })

    return modalId
  }

  return openCreateSheet
}
