import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { PublicationFormContainer } from './publication-form.cont'

export const usePublicationCreateSheet = () => {
  const { openModal } = useModalGlobalStore()

  const openCreateSheet = () =>
    openModal('sheet', {
      component: PublicationFormContainer,
      props: { title: 'Create publication' }
    })

  return openCreateSheet
}
