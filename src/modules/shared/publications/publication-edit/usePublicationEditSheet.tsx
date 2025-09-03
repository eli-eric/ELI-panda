import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { PublicationEditContainer } from './publication-edit.cont'

export const usePublicationEditSheet = (uid: string) => {
  const { openModal, closeModal } = useModalGlobalStore()

  const onEditCLick = () =>
    openModal('sheet', {
      component: PublicationEditContainer,
      props: { uid, title: 'Edit publication' }
    })

  const onCloseClick = () => {
    closeModal('sheet')
  }

  return [onEditCLick, onCloseClick] as const
}
