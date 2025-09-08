import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SystemEditContainer } from './system-edit.cont'

export const useSystemEditSheet = ({ uid }: { uid: string }) => {
  const { openModal } = useModalGlobalStore()

  return () => {
    openModal('sheet', {
      component: SystemEditContainer,
      props: { uid, size: 'l', title: 'Edit System' },
      onSubmit: () => {
        // Handle system edit submission
      }
    })
  }
}
