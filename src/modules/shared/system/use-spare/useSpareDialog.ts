import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SpareDialogContainer } from './components/spare-dialog.cont'

export const useSpareDialog = () => {
  const { openModal } = useModalGlobalStore()

  return () =>
    openModal('dialog2', {
      component: SpareDialogContainer,
      props: { title: 'Spare Parts' }
    })
}
